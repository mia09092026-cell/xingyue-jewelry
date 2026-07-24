import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";

const saveInquiryRecordMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/inquiry-storage", () => ({
  MissingGoogleSheetsConfigError: class MissingGoogleSheetsConfigError extends Error {},
  saveInquiryRecord: saveInquiryRecordMock,
}));

function validInquiry(overrides: Record<string, unknown> = {}) {
  return {
    name: "Avery Chen",
    email: "avery@example.com",
    companyOrBrand: "Luna Jewelry",
    whatsapp: "+1 555 0100",
    businessType: "Boutique jewelry store",
    productInterest: "Lab-grown diamond tennis bracelets",
    targetQuantity: "A project-specific estimate",
    destinationCountry: "United States",
    targetMarket: "North America",
    referenceUrl: "https://example.com/reference",
    material: "18K gold",
    stone: "Lab-grown diamond",
    packagingRequirements: "Private label packaging",
    expectedTiming: "Planning for a seasonal launch",
    message: "Looking for custom necklaces for a boutique launch.",
    locale: "en",
    source: "/contact",
    consent: true,
    honeypot: "",
    ...overrides,
  };
}

describe("contact inquiry API route", () => {
  beforeEach(() => saveInquiryRecordMock.mockReset());

  it("allows POST only", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
  });

  it("accepts a valid contact inquiry and maps all approved fields", async () => {
    const response = await POST(new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validInquiry()),
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ ok: true, reference: expect.stringMatching(/^XY-/) });
    expect(saveInquiryRecordMock).toHaveBeenCalledWith(expect.objectContaining({
      sourcePage: "/contact",
      customerName: "Avery Chen",
      companyName: "Luna Jewelry",
      customerEmail: "avery@example.com",
      customRequirement: expect.stringContaining(
        "Business Type: Boutique jewelry store",
      ),
      note: "Consent Given: true",
    }));

    const savedRecord = saveInquiryRecordMock.mock.calls[0]?.[0];
    expect(savedRecord.customRequirement).toContain(
      "Target Market: North America",
    );
    expect(savedRecord.customRequirement).toContain(
      "Reference URL: https://example.com/reference",
    );
    expect(savedRecord.customRequirement).toContain("Material: 18K gold");
    expect(savedRecord.customRequirement).toContain(
      "Stone: Lab-grown diamond",
    );
    expect(savedRecord.customRequirement).toContain(
      "Packaging Requirements: Private label packaging",
    );
    expect(savedRecord.customRequirement).toContain(
      "Expected Timing: Planning for a seasonal launch",
    );
    expect(savedRecord).not.toHaveProperty("businessType");
    expect(savedRecord).not.toHaveProperty("consentGiven");
  });

  it("returns field-level errors for consent, URL and unknown fields", async () => {
    const response = await POST(new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validInquiry({ consent: false, referenceUrl: "javascript:alert(1)", unexpected: "drop" })),
    }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      code: "UNKNOWN_FIELDS",
      fieldErrors: { consent: "consent_required", referenceUrl: "invalid_reference_url" },
      unknownFields: ["unexpected"],
    });
    expect(saveInquiryRecordMock).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON without exposing internals", async () => {
    const response = await POST(new Request("http://localhost:3000/api/contact", { method: "POST", body: "{" }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ ok: false, code: "VALIDATION_ERROR", message: "Invalid inquiry payload." });
  });

  it("does not write honeypot submissions", async () => {
    const response = await POST(new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validInquiry({ honeypot: "bot" })),
    }));
    expect(response.status).toBe(200);
    expect(saveInquiryRecordMock).not.toHaveBeenCalled();
  });

});
