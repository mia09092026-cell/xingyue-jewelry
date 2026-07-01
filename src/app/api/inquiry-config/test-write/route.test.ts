import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const appendInquiryToGoogleSheetMock = vi.hoisted(() => vi.fn());
const canRunGoogleSheetsTestWriteMock = vi.hoisted(() => vi.fn());
const hasGoogleSheetsConfigMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/google-sheets", () => ({
  appendInquiryToGoogleSheet: appendInquiryToGoogleSheetMock,
  canRunGoogleSheetsTestWrite: canRunGoogleSheetsTestWriteMock,
  hasGoogleSheetsConfig: hasGoogleSheetsConfigMock,
}));

describe("Google Sheets test write API", () => {
  beforeEach(() => {
    appendInquiryToGoogleSheetMock.mockReset();
    canRunGoogleSheetsTestWriteMock.mockReset();
    hasGoogleSheetsConfigMock.mockReset();
  });

  it("rejects requests outside development or protected environments", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(false);

    const response = await POST(new Request("https://example.com/api/inquiry-config/test-write"));
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({
      ok: false,
      success: false,
      message: "Google Sheets test writes are disabled for this environment.",
    });
    expect(appendInquiryToGoogleSheetMock).not.toHaveBeenCalled();
  });

  it("reports missing Google Sheets configuration without exposing secrets", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    hasGoogleSheetsConfigMock.mockReturnValue(false);

    const response = await POST(new Request("http://localhost:3000/api/inquiry-config/test-write"));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload).toEqual({
      ok: false,
      success: false,
      message: "Google Sheets environment variables are not configured.",
    });
    expect(JSON.stringify(payload)).not.toContain("PRIVATE KEY");
    expect(appendInquiryToGoogleSheetMock).not.toHaveBeenCalled();
  });

  it("writes one safe test inquiry row and returns success", async () => {
    canRunGoogleSheetsTestWriteMock.mockReturnValue(true);
    hasGoogleSheetsConfigMock.mockReturnValue(true);
    appendInquiryToGoogleSheetMock.mockResolvedValue(undefined);

    const response = await POST(new Request("http://localhost:3000/api/inquiry-config/test-write"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, success: true });
    expect(appendInquiryToGoogleSheetMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pageLanguage: "英文",
        sourcePage: "/api/inquiry-config/test-write",
        customerName: "Google Sheets Test",
        customerEmail: "test@example.com",
        followUpStatus: "新询盘",
      }),
    );
  });
});
