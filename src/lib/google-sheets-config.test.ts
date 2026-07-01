import { afterEach, describe, expect, it, vi } from "vitest";
import {
  canRunGoogleSheetsTestWrite,
  getGoogleSheetsEnvStatus,
  hasGoogleSheetsConfig,
} from "./google-sheets";

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
  delete process.env.INQUIRY_TEST_TOKEN;
}

describe("Google Sheets configuration helpers", () => {
  afterEach(() => {
    clearGoogleEnv();
    vi.unstubAllEnvs();
  });

  it("reports only true/false environment variable status", () => {
    clearGoogleEnv();
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "spreadsheet-id";

    expect(getGoogleSheetsEnvStatus()).toEqual({
      GOOGLE_SHEETS_CLIENT_EMAIL: true,
      GOOGLE_SHEETS_PRIVATE_KEY: false,
      GOOGLE_SHEETS_SPREADSHEET_ID: true,
      GOOGLE_SHEETS_SHEET_NAME: false,
    });
    expect(hasGoogleSheetsConfig()).toBe(false);
  });

  it("treats the Google Sheets config as ready only when every variable exists", () => {
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nredacted\\n-----END PRIVATE KEY-----";
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "spreadsheet-id";
    process.env.GOOGLE_SHEETS_SHEET_NAME = "Inquiries";

    expect(getGoogleSheetsEnvStatus()).toEqual({
      GOOGLE_SHEETS_CLIENT_EMAIL: true,
      GOOGLE_SHEETS_PRIVATE_KEY: true,
      GOOGLE_SHEETS_SPREADSHEET_ID: true,
      GOOGLE_SHEETS_SHEET_NAME: true,
    });
    expect(hasGoogleSheetsConfig()).toBe(true);
  });

  it("allows test writes in local development without exposing credentials", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(canRunGoogleSheetsTestWrite(new Request("http://localhost/api/inquiry-config/test-write"))).toBe(
      true,
    );
  });

  it("requires a matching token for protected non-development test writes", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.INQUIRY_TEST_TOKEN = "safe-preview-token";

    expect(
      canRunGoogleSheetsTestWrite(
        new Request("https://example.com/api/inquiry-config/test-write", {
          headers: { "x-inquiry-test-token": "wrong-token" },
        }),
      ),
    ).toBe(false);
    expect(
      canRunGoogleSheetsTestWrite(
        new Request("https://example.com/api/inquiry-config/test-write", {
          headers: { "x-inquiry-test-token": "safe-preview-token" },
        }),
      ),
    ).toBe(true);
  });
});
