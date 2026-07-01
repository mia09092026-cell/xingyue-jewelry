import { createInquirySheetRecord } from "@/lib/contact-inquiry";
import {
  appendInquiryToGoogleSheet,
  canRunGoogleSheetsTestWrite,
  hasGoogleSheetsConfig,
} from "@/lib/google-sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!canRunGoogleSheetsTestWrite(request)) {
    return Response.json(
      {
        ok: false,
        success: false,
        message: "Google Sheets test writes are disabled for this environment.",
      },
      { status: 403 },
    );
  }

  if (!hasGoogleSheetsConfig()) {
    return Response.json(
      {
        ok: false,
        success: false,
        message: "Google Sheets environment variables are not configured.",
      },
      { status: 503 },
    );
  }

  const record = createInquirySheetRecord(
    {
      name: "Google Sheets Test",
      company: "Xingyue Jewelry",
      email: "test@example.com",
      phone: "+86 133 2488 8759",
      country: "Test",
      productInterest: "Google Sheets integration test",
      quantity: "1 test row",
      customRequirement: "Configuration verification only",
      message: "This is an automated test row from the inquiry configuration helper.",
    },
    {
      locale: "en",
      sourcePage: "/api/inquiry-config/test-write",
      currentUrl: request.url,
      browserInfo: request.headers.get("user-agent") ?? "Configuration test",
    },
  );

  try {
    await appendInquiryToGoogleSheet(record);
  } catch {
    return Response.json(
      {
        ok: false,
        success: false,
        message: "Google Sheets test write failed.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, success: true });
}
