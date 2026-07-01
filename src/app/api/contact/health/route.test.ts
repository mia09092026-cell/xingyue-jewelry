import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";

const appendInquiryToGoogleSheetMock = vi.hoisted(() => vi.fn());
const canRunGoogleSheetsTestWriteMock = vi.hoisted(() => vi.fn());
const getGoogleSheetsHealthStatusMock = vi.hoisted(() => vi.fn());
const googleSheetsErrorToResponseMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/google-sheets", () => ({
  appendInquiryToGoogleSheet: appendInquiryToGoogleSheetMock,
  canRunGoogleSheetsTestWrite: canRunGoogleSheetsTestWriteMock,
  getGoogleSheetsHealthStatus: getGoogleSheetsHealthStatusMock,
  googleSheetsErrorToResponse: googleSheetsErrorToResponseMock,
}));

describe("contact Google Sheets health API", () => {
  beforeEach(() => {
    appendInquiryToGoogleSheetMock.mockReset();
    canRunGoogleSheetsTestWriteMock.mockReset();
    getGoogleSheetsHealthStatusMock.mockReset();
    googleSheetsErrorToResponseMock.mockReset();
  });

  it("returns only safe configuration booleans and private key format status", async () => {
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

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      writable: null,
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
    expect(JSON.stringify(payload)).not.toContain("PRIVATE KEY");
    expect(JSON.stringify(payload)).not.toContain("service@example");
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
    expect(appendInquiryToGoogleSheetMock).not.toHaveBeenCalled();
  });

  it("writes one safe health-check row when allowed", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    appendInquiryToGoogleSheetMock.mockResolvedValue(undefined);

    const response = await POST(new Request("http://localhost:3000/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, success: true, writable: true });
    expect(appendInquiryToGoogleSheetMock).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName: "Google Sheets Health Check",
        sourcePage: "/api/contact/health",
      }),
    );
  });

  it("returns a safe failure category when the health-check write fails", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    appendInquiryToGoogleSheetMock.mockRejectedValue(new Error("raw Google response should stay server-side"));
    googleSheetsErrorToResponseMock.mockReturnValue({
      category: "permission_denied",
      status: 403,
      operation: "append_inquiry",
    });

    const response = await POST(new Request("http://localhost:3000/api/contact/health"));
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({
      ok: false,
      success: false,
      writable: false,
      category: "permission_denied",
      operation: "append_inquiry",
    });
    expect(JSON.stringify(payload)).not.toContain("raw Google response");
  });
});
