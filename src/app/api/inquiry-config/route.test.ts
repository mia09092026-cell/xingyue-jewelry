import { afterEach, describe, expect, it } from "vitest";
import { GET } from "./route";

const googleEnvKeys = [
  "GOOGLE_SHEETS_CLIENT_EMAIL",
  "GOOGLE_SHEETS_PRIVATE_KEY",
  "GOOGLE_SHEETS_SPREADSHEET_ID",
  "GOOGLE_SHEETS_SHEET_NAME",
] as const;

function clearGoogleEnv() {
  for (const key of googleEnvKeys) {
    delete process.env[key];
  }
}

describe("inquiry config status API", () => {
  afterEach(() => {
    clearGoogleEnv();
  });

  it("returns only boolean configuration status and no secret values", async () => {
    clearGoogleEnv();
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nredacted\\n-----END PRIVATE KEY-----";

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      ready: false,
      variables: {
        GOOGLE_SHEETS_CLIENT_EMAIL: true,
        GOOGLE_SHEETS_PRIVATE_KEY: true,
        GOOGLE_SHEETS_SPREADSHEET_ID: false,
        GOOGLE_SHEETS_SHEET_NAME: false,
      },
    });
    expect(JSON.stringify(payload)).not.toContain("service@example");
    expect(JSON.stringify(payload)).not.toContain("PRIVATE KEY");
  });
});
