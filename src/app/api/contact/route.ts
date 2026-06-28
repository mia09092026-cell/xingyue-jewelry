import { createContactInquiryReference, parseContactInquiry } from "@/lib/contact-inquiry";

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

  return Response.json({
    ok: true,
    message: "Inquiry submitted.",
    reference: createContactInquiryReference(),
  });
}
