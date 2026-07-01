import { afterEach, describe, expect, it, vi } from "vitest";
import { createInquirySheetRecord } from "./contact-inquiry";
import {
  appendInquiryToGoogleSheet,
  canRunGoogleSheetsTestWrite,
  classifyGoogleSheetsApiError,
  defaultGoogleSheetsSheetName,
  getGoogleSheetsEnvStatus,
  getGoogleSheetsHealthStatus,
  hasGoogleSheetsConfig,
  normalizeGooglePrivateKey,
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

  it("defaults the sheet tab name while still reporting whether the env variable exists", () => {
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nredacted\\n-----END PRIVATE KEY-----";
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "spreadsheet-id";

    expect(getGoogleSheetsEnvStatus()).toEqual({
      GOOGLE_SHEETS_CLIENT_EMAIL: true,
      GOOGLE_SHEETS_PRIVATE_KEY: true,
      GOOGLE_SHEETS_SPREADSHEET_ID: true,
      GOOGLE_SHEETS_SHEET_NAME: false,
    });
    expect(hasGoogleSheetsConfig()).toBe(true);
    expect(getGoogleSheetsHealthStatus()).toMatchObject({
      ready: true,
      sheetName: {
        configured: false,
        defaulted: true,
        defaultName: defaultGoogleSheetsSheetName,
      },
    });
  });

  it("normalizes private keys from Vercel escaped newlines, actual newlines, and outer quotes", () => {
    const escaped = '"-----BEGIN PRIVATE KEY-----\\nredacted\\n-----END PRIVATE KEY-----"';
    const actual = "'-----BEGIN PRIVATE KEY-----\r\nredacted\r\n-----END PRIVATE KEY-----'";

    expect(normalizeGooglePrivateKey(escaped)).toBe(
      "-----BEGIN PRIVATE KEY-----\nredacted\n-----END PRIVATE KEY-----",
    );
    expect(normalizeGooglePrivateKey(actual)).toBe(
      "-----BEGIN PRIVATE KEY-----\nredacted\n-----END PRIVATE KEY-----",
    );
  });

  it("rejects private keys without PEM begin and end markers", () => {
    expect(() => normalizeGooglePrivateKey("redacted")).toThrowError(
      expect.objectContaining({
        category: "invalid_private_key",
      }),
    );
  });

  it("classifies common Google Sheets API failures without exposing response details", () => {
    expect(
      classifyGoogleSheetsApiError(
        400,
        JSON.stringify({ error: "invalid_grant", error_description: "Invalid JWT Signature." }),
        "authorize_google_sheets",
      ),
    ).toMatchObject({ category: "invalid_private_key", status: 400 });

    expect(
      classifyGoogleSheetsApiError(
        403,
        JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "Caller does not have access" } }),
        "append_inquiry",
      ),
    ).toMatchObject({ category: "permission_denied", status: 403 });

    expect(
      classifyGoogleSheetsApiError(
        404,
        JSON.stringify({ error: { status: "NOT_FOUND", message: "Requested entity was not found." } }),
        "read_header_row",
      ),
    ).toMatchObject({ category: "spreadsheet_not_found", status: 404 });

    expect(
      classifyGoogleSheetsApiError(
        400,
        JSON.stringify({ error: { message: "Unable to parse range: 'Inquiries'!A:P" } }),
        "append_inquiry",
      ),
    ).toMatchObject({ category: "sheet_tab_not_found", status: 400 });
  });

  it("classifies service-account signing failures as invalid private key before any Google request", async () => {
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nredacted\\n-----END PRIVATE KEY-----";
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "spreadsheet-id";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const record = createInquirySheetRecord(
      {
        name: "Test Buyer",
        company: "Test Company",
        email: "buyer@example.com",
        phone: "+1 555 0100",
        country: "United States",
        productInterest: "Lab grown diamond jewelry",
        quantity: "100",
        customRequirement: "Private label",
        message: "Test inquiry",
      },
      { locale: "en", sourcePage: "/contact" },
    );

    await expect(appendInquiryToGoogleSheet(record)).rejects.toMatchObject({
      category: "invalid_private_key",
      operation: "create_service_account_jwt",
    });
    expect(fetchSpy).not.toHaveBeenCalled();
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
