export const runtime = "nodejs";

export function GET(_request: Request) {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}

export function POST(_request: Request) {
  return Response.json(
    { ok: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." },
    { status: 405, headers: { Allow: "GET" } },
  );
}
