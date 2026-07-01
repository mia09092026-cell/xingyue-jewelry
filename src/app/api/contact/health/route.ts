import { createInquirySheetRecord } from "@/lib/contact-inquiry";
import {
  appendInquiryToGoogleSheet,
  canRunGoogleSheetsTestWrite,
  getGoogleSheetsHealthStatus,
  googleSheetsErrorToResponse,
} from "@/lib/google-sheets";

export const runtime = "nodejs";

export function GET() {
  const health = getGoogleSheetsHealthStatus();

  return Response.json({
    ok: true,
    writable: null,
    ...health,
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

  const record = createInquirySheetRecord(
    {
      name: "Google Sheets Health Check",
      company: "Xingyue Jewelry",
      email: "health-check@example.com",
      phone: "+86 133 2488 8759",
      country: "Health Check",
      productInterest: "Google Sheets contact API health check",
      quantity: "1 test row",
      customRequirement: "Configuration verification only",
      message: "This is an automated test row from /api/contact/health.",
    },
    {
      locale: "en",
      sourcePage: "/api/contact/health",
      currentUrl: request.url,
      browserInfo: request.headers.get("user-agent") ?? "Contact API health check",
    },
  );

  try {
    await appendInquiryToGoogleSheet(record);
  } catch (error) {
    const failure = googleSheetsErrorToResponse(error);

    return Response.json(
      {
        ok: false,
        success: false,
        writable: false,
        category: failure.category,
        operation: failure.operation,
      },
      { status: failure.status },
    );
  }

  return Response.json({ ok: true, success: true, writable: true });
}
