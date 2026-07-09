import { createInquirySheetRecord } from "@/lib/contact-inquiry";
import {
  canRunGoogleSheetsTestWrite,
  getGoogleSheetsHealthStatus,
  probeGoogleSheetsWrite,
  type GoogleSheetsWriteProbeResult,
} from "@/lib/google-sheets";

export const runtime = "nodejs";

const healthCacheDurationMs = 5 * 60 * 1000;
let cachedProductionProbe:
  | { expiresAt: number; result: GoogleSheetsWriteProbeResult }
  | undefined;

function createHealthCheckRecord(request: Request) {
  return createInquirySheetRecord(
    {
      name: "Health Check Test",
      company: "Xingyue Jewelry",
      email: "health-check@example.com",
      phone: "+86 133 2488 8759",
      country: "Health Check",
      productInterest: "Google Sheets contact API health check",
      quantity: "1 test row",
      customRequirement: "Configuration verification only",
      message: "Health Check Test",
    },
    {
      locale: "en",
      sourcePage: "/api/contact/health",
      currentUrl: request.url,
      browserInfo: request.headers.get("user-agent") ?? "Contact API health check",
    },
  );
}

async function runHealthProbe(request: Request) {
  const now = Date.now();

  if (
    process.env.NODE_ENV === "production" &&
    cachedProductionProbe &&
    cachedProductionProbe.expiresAt > now
  ) {
    return cachedProductionProbe.result;
  }

  const result = await probeGoogleSheetsWrite(createHealthCheckRecord(request));

  if (process.env.NODE_ENV === "production") {
    cachedProductionProbe = {
      expiresAt: now + healthCacheDurationMs,
      result,
    };
  }

  return result;
}

function healthResponse(
  result: GoogleSheetsWriteProbeResult,
  extra: Record<string, unknown> = {},
) {
  return {
    ok: result.canWriteTestRow,
    writable: result.canWriteTestRow,
    ...result,
    ...extra,
  };
}

export async function GET(request: Request) {
  const health = getGoogleSheetsHealthStatus();
  const result = await runHealthProbe(request);

  return Response.json({
    ...healthResponse(result),
    ...health,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}

export async function POST(request: Request) {
  if (!canRunGoogleSheetsTestWrite(request)) {
    return Response.json(
      {
        ok: false,
        writable: false,
        message: "Google Sheets health test writes are disabled for this environment.",
      },
      { status: 403 },
    );
  }

  const result = await probeGoogleSheetsWrite(createHealthCheckRecord(request));

  return Response.json(
    healthResponse(result, { success: result.canWriteTestRow }),
  );
}
