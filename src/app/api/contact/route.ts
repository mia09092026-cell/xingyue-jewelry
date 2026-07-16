import {
  createContactInquiryReference,
  createInquirySheetRecord,
  parseContactInquiryPayload,
} from "@/lib/contact-inquiry";
import { googleSheetsErrorToResponse } from "@/lib/google-sheets";
import { MissingGoogleSheetsConfigError, saveInquiryRecord } from "@/lib/inquiry-storage";

export const runtime = "nodejs";

const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || request.headers.get("user-agent") || "anonymous";
}

function isRateLimited(key: string, now = Date.now()) {
  const current = rateLimitBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  if (current.count >= maxSubmissionsPerWindow) return true;
  current.count += 1;
  return false;
}

function isMissingGoogleSheetsConfigError(error: unknown) {
  return error instanceof MissingGoogleSheetsConfigError || (error instanceof Error && error.name === "MissingGoogleSheetsConfigError");
}

export function GET() {
  return Response.json(
    { ok: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "VALIDATION_ERROR", message: "Invalid inquiry payload." }, { status: 400 });
  }

  const parsed = parseContactInquiryPayload(body);
  if (!parsed.ok) {
    return Response.json(
      {
        ok: false,
        code: parsed.unknownFields?.length ? "UNKNOWN_FIELDS" : "VALIDATION_ERROR",
        message: parsed.unknownFields?.length ? "The inquiry payload contains unsupported fields." : "Please complete the required inquiry fields.",
        fieldErrors: parsed.fieldErrors,
        ...(parsed.unknownFields?.length ? { unknownFields: parsed.unknownFields } : {}),
      },
      { status: 400 },
    );
  }

  const rawBody = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  if (typeof rawBody.honeypot === "string" && rawBody.honeypot.trim()) {
    return Response.json({ ok: true, reference: createContactInquiryReference() });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { ok: false, code: "RATE_LIMITED", message: "Too many inquiry submissions. Please try again later." },
      { status: 429 },
    );
  }

  const record = createInquirySheetRecord(parsed.data, {
    locale: parsed.metadata.locale,
    source: parsed.metadata.source,
    consent: true,
  });

  try {
    await saveInquiryRecord(record);
  } catch (error) {
    const failure = googleSheetsErrorToResponse(error);
    if (isMissingGoogleSheetsConfigError(error) || failure.category === "missing_environment_variables") {
      return Response.json(
        { ok: false, code: "CONFIG_MISSING", message: "Inquiry service is being configured. Please contact us by WhatsApp or email." },
        { status: 503 },
      );
    }
    return Response.json(
      { ok: false, code: "SHEETS_WRITE_FAILED", message: "Submission failed. Please contact us by WhatsApp or email." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, reference: createContactInquiryReference() });
}
