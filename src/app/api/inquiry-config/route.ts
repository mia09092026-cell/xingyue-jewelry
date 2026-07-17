export const runtime = "nodejs";

export function GET() {
  return Response.json({ ok: false, message: "Not found." }, { status: 404 });
}
