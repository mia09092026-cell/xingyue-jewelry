import {
  createContactInquiryReference,
  createInquirySheetRecord,
  parseContactInquiry,
} from "@/lib/contact-inquiry";
import { saveInquiryRecord } from "@/lib/inquiry-storage";

export const runtime = "nodejs";

type ContactRequestBody = {
  locale?: unknown;
  sourcePage?: unknown;
  currentUrl?: unknown;
  browserInfo?: unknown;
  website?: unknown;
};

const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || request.headers.get("user-agent") || "anonymous";
}

function isRateLimited(key: string, now = Date.now()) {
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return false;
  }

  if (current.count >= maxSubmissionsPerWindow) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        message: "Invalid inquiry payload.",
      },
      { status: 400 },
    );
  }

  const source = body && typeof body === "object" ? (body as ContactRequestBody) : {};

  if (readString(source.website)) {
    return Response.json({
      ok: true,
      reference: createContactInquiryReference(),
    });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      {
        ok: false,
        message: "Too many inquiry submissions. Please try again later.",
      },
      { status: 429 },
    );
  }

  const inquiry = parseContactInquiry(body);

  if (!inquiry.ok) {
    return Response.json(
      {
        ok: false,
        message: "Please complete the required inquiry fields.",
        fieldErrors: inquiry.fieldErrors,
      },
      { status: 400 },
    );
  }

  const browserInfo = readString(source.browserInfo) || request.headers.get("user-agent") || "";
  const record = createInquirySheetRecord(inquiry.data, {
    locale: readString(source.locale),
    sourcePage: readString(source.sourcePage),
    currentUrl: readString(source.currentUrl),
    browserInfo,
  });

  try {
    await saveInquiryRecord(record);
  } catch {
    return Response.json(
      {
        ok: false,
        message: "Submission failed. Please contact us by WhatsApp or email.",
      },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    reference: createContactInquiryReference(),
  });
}
