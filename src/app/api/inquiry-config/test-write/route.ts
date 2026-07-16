export const runtime = "nodejs";

export function POST(_request: Request) {
  return Response.json({ ok: false, success: false, message: "Not found." }, { status: 404 });
}
