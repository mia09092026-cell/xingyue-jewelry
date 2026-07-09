import { generateKeyPairSync } from "crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createInquirySheetRecord, inquirySheetHeaders } from "./contact-inquiry";
import {
  appendInquiryToGoogleSheet,
  canRunGoogleSheetsTestWrite,
  classifyGoogleSheetsApiError,
  defaultGoogleSheetsSheetName,
  getGoogleSheetsEnvStatus,
  getGoogleSheetsHealthStatus,
  hasGoogleSheetsConfig,
  normalizeGooglePrivateKey,
  probeGoogleSheetsWrite,
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

function configureGoogleSheetsTestEnv() {
  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 1024,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });

  process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "service@example.iam.gserviceaccount.com";
  process.env.GOOGLE_SHEETS_PRIVATE_KEY = privateKey;
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "spreadsheet-id";
  process.env.GOOGLE_SHEETS_SHEET_NAME = "Inquiries";
}

function healthCheckRecord() {
  return createInquirySheetRecord(
    {
      name: "Health Check Test",
      company: "Xingyue Jewelry",
      email: "health-check@example.com",
      phone: "+86 133 2488 8759",
      country: "Health Check",
      productInterest: "Google Sheets write health check",
      quantity: "1 test row",
      customRequirement: "Configuration verification only",
      message: "Health Check Test",
    },
    { locale: "en", sourcePage: "/api/contact/health" },
  );
}

describe("Google Sheets configuration helpers", () => {
  afterEach(() => {
    clearGoogleEnv();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
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

  it("classifies a disabled Google Sheets API as google API error rather than sheet permission", () => {
    expect(
      classifyGoogleSheetsApiError(
        403,
        JSON.stringify({
          error: {
            status: "PERMISSION_DENIED",
            message: "Google Sheets API has not been used in project before or it is disabled.",
            errors: [{ reason: "accessNotConfigured" }],
          },
        }),
        "open_spreadsheet",
      ),
    ).toMatchObject({ category: "google_sheets_api_error", status: 403 });
  });

  it("probes Google auth, spreadsheet, tab, and writes through Inquiries!A:P", async () => {
    configureGoogleSheetsTestEnv();
    const fetchMock = vi.spyOn(globalThis, "fetch");
    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ sheets: [{ properties: { title: "Inquiries" } }] }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ values: [inquirySheetHeaders] }), { status: 200 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ updates: {} }), { status: 200 }));

    const result = await probeGoogleSheetsWrite(healthCheckRecord());

    expect(result).toEqual({
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: true,
      errorCategory: null,
    });
    const appendCall = fetchMock.mock.calls[3];
    expect(decodeURIComponent(String(appendCall?.[0]))).toContain("/values/Inquiries!A:P:append");
    expect(String(appendCall?.[1]?.body)).toContain("Health Check Test");
  });

  it("reports spreadsheet_not_found after Google auth succeeds but the spreadsheet cannot open", async () => {
    configureGoogleSheetsTestEnv();
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ error: { status: "NOT_FOUND", message: "Requested entity was not found." } }),
          { status: 404 },
        ),
      );

    await expect(probeGoogleSheetsWrite(healthCheckRecord())).resolves.toEqual({
      canConnectGoogle: true,
      canOpenSpreadsheet: false,
      canFindSheetTab: false,
      canWriteTestRow: false,
      errorCategory: "spreadsheet_not_found",
    });
  });

  it("reports sheet_tab_not_found when the configured Inquiries tab is absent", async () => {
    configureGoogleSheetsTestEnv();
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ sheets: [{ properties: { title: "Sheet1" } }] }),
          { status: 200 },
        ),
      );

    await expect(probeGoogleSheetsWrite(healthCheckRecord())).resolves.toEqual({
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: false,
      canWriteTestRow: false,
      errorCategory: "sheet_tab_not_found",
    });
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
