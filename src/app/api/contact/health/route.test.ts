import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";

const canRunGoogleSheetsTestWriteMock = vi.hoisted(() => vi.fn());
const getGoogleSheetsHealthStatusMock = vi.hoisted(() => vi.fn());
const probeGoogleSheetsWriteMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/google-sheets", () => ({
  canRunGoogleSheetsTestWrite: canRunGoogleSheetsTestWriteMock,
  getGoogleSheetsHealthStatus: getGoogleSheetsHealthStatusMock,
  probeGoogleSheetsWrite: probeGoogleSheetsWriteMock,
}));

describe("contact Google Sheets health API", () => {
  beforeEach(() => {
    canRunGoogleSheetsTestWriteMock.mockReset();
    getGoogleSheetsHealthStatusMock.mockReset();
    probeGoogleSheetsWriteMock.mockReset();
  });

  it("runs a real write probe and returns only safe step results", async () => {
    getGoogleSheetsHealthStatusMock.mockReturnValue({
      ready: true,
      variables: {
        GOOGLE_SHEETS_CLIENT_EMAIL: true,
        GOOGLE_SHEETS_PRIVATE_KEY: true,
        GOOGLE_SHEETS_SPREADSHEET_ID: true,
        GOOGLE_SHEETS_SHEET_NAME: true,
      },
      privateKey: {
        present: true,
        validFormat: true,
        hasBegin: true,
        hasEnd: true,
      },
      sheetName: {
        configured: true,
        defaulted: false,
        defaultName: "Inquiries",
      },
    });
    probeGoogleSheetsWriteMock.mockResolvedValue({
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: true,
      errorCategory: null,
    });

    const response = await GET(new Request("https://example.com/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      writable: true,
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: true,
      errorCategory: null,
      ready: true,
      variables: {
        GOOGLE_SHEETS_CLIENT_EMAIL: true,
        GOOGLE_SHEETS_PRIVATE_KEY: true,
        GOOGLE_SHEETS_SPREADSHEET_ID: true,
        GOOGLE_SHEETS_SHEET_NAME: true,
      },
      privateKey: {
        present: true,
        validFormat: true,
        hasBegin: true,
        hasEnd: true,
      },
      sheetName: {
        configured: true,
        defaulted: false,
        defaultName: "Inquiries",
      },
    });
    expect(probeGoogleSheetsWriteMock).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName: "Health Check Test",
        sourcePage: "/api/contact/health",
      }),
    );
    expect(JSON.stringify(payload)).not.toContain("PRIVATE KEY");
    expect(JSON.stringify(payload)).not.toContain("service@example");
    expect(JSON.stringify(payload)).not.toContain("spreadsheet-id");
  });

  it("reports the exact safe step where the write probe fails", async () => {
    getGoogleSheetsHealthStatusMock.mockReturnValue({
      ready: true,
      variables: {
        GOOGLE_SHEETS_CLIENT_EMAIL: true,
        GOOGLE_SHEETS_PRIVATE_KEY: true,
        GOOGLE_SHEETS_SPREADSHEET_ID: true,
        GOOGLE_SHEETS_SHEET_NAME: true,
      },
      privateKey: {
        present: true,
        validFormat: true,
        hasBegin: true,
        hasEnd: true,
      },
      sheetName: {
        configured: true,
        defaulted: false,
        defaultName: "Inquiries",
      },
    });
    probeGoogleSheetsWriteMock.mockResolvedValue({
      canConnectGoogle: true,
      canOpenSpreadsheet: false,
      canFindSheetTab: false,
      canWriteTestRow: false,
      errorCategory: "spreadsheet_not_found",
    });

    const response = await GET(new Request("https://example.com/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: false,
      writable: false,
      canConnectGoogle: true,
      canOpenSpreadsheet: false,
      canFindSheetTab: false,
      canWriteTestRow: false,
      errorCategory: "spreadsheet_not_found",
    });
  });

  it("blocks test writes outside development or protected environments", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(false);

    const response = await POST(new Request("https://example.com/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({
      ok: false,
      writable: false,
      message: "Google Sheets health test writes are disabled for this environment.",
    });
    expect(probeGoogleSheetsWriteMock).not.toHaveBeenCalled();
  });

  it("writes one safe health-check row when allowed", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    probeGoogleSheetsWriteMock.mockResolvedValue({
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: true,
      errorCategory: null,
    });

    const response = await POST(new Request("http://localhost:3000/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      success: true,
      writable: true,
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: true,
      errorCategory: null,
    });
    expect(probeGoogleSheetsWriteMock).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName: "Health Check Test",
        sourcePage: "/api/contact/health",
      }),
    );
  });

  it("returns a safe failure category when the health-check write fails", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    probeGoogleSheetsWriteMock.mockResolvedValue({
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: false,
      errorCategory: "permission_denied",
    });

    const response = await POST(new Request("http://localhost:3000/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: false,
      success: false,
      writable: false,
      canConnectGoogle: true,
      canOpenSpreadsheet: true,
      canFindSheetTab: true,
      canWriteTestRow: false,
      errorCategory: "permission_denied",
    });
  });
});
