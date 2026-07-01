import { getGoogleSheetsEnvStatus, hasGoogleSheetsConfig } from "@/lib/google-sheets";

export const runtime = "nodejs";

export function GET() {
  return Response.json({
    ok: true,
    ready: hasGoogleSheetsConfig(),
    variables: getGoogleSheetsEnvStatus(),
  });
}
