import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const saveInquiryRecordMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/inquiry-storage", () => ({
  MissingGoogleSheetsConfigError: class MissingGoogleSheetsConfigError extends Error {},
  saveInquiryRecord: saveInquiryRecordMock,
}));

function validInquiry(overrides: Record<string, unknown> = {}) {
  return {
    name: "Avery Chen",
    company: "Luna Jewelry",
    email: "avery@example.com",
    phone: "+1 555 0100",
    country: "United States",
    productInterest: "Lab-grown diamond tennis bracelets",
    quantity: "300 pieces",
    customRequirement: "Private label packaging",
    message: "Looking for custom lab-grown diamond necklaces for a boutique launch.",
    locale: "en",
    sourcePage: "/contact",
    currentUrl: "https://xingyuejewelry.com/contact",
    browserInfo: "Vitest Browser",
    website: "",
    ...overrides,
  };
}

describe("contact inquiry API route", () => {
  beforeEach(() => {
    saveInquiryRecordMock.mockReset();
  });

  it("accepts a valid contact inquiry submission", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "Vitest Browser",
          "x-forwarded-for": "203.0.113.10",
        },
        body: JSON.stringify(validInquiry()),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      reference: expect.stringMatching(/^XY-/),
    });
    expect(saveInquiryRecordMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pageLanguage: "英文",
        sourcePage: "/contact",
        customerName: "Avery Chen",
        companyName: "Luna Jewelry",
        customerEmail: "avery@example.com",
        phone: "'+1 555 0100",
        country: "United States",
        productInterest: "Lab-grown diamond tennis bracelets",
        quantity: "300 pieces",
        customRequirement: "Private label packaging",
        currentUrl: "https://xingyuejewelry.com/contact",
        browserInfo: "Vitest Browser",
        followUpStatus: "新询盘",
        note: "",
      }),
    );
  });

  it("rejects an incomplete inquiry submission with validation details", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.11" },
        body: JSON.stringify({ name: "Avery Chen" }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      fieldErrors: {
        company: "Company",
        email: "Email",
        phone: "WhatsApp / Phone",
        country: "Country",
        productInterest: "Product Interest",
        quantity: "Quantity",
        customRequirement: "Custom Requirement",
        message: "Message",
      },
    });
    expect(saveInquiryRecordMock).not.toHaveBeenCalled();
  });

  it("rejects invalid email addresses", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.12" },
        body: JSON.stringify(validInquiry({ email: "not-an-email" })),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      fieldErrors: { email: "Email" },
    });
    expect(saveInquiryRecordMock).not.toHaveBeenCalled();
  });

  it("does not write honeypot spam submissions", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.13" },
        body: JSON.stringify(validInquiry({ website: "https://spam.example" })),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ ok: true });
    expect(saveInquiryRecordMock).not.toHaveBeenCalled();
  });

  it("returns a configuration code when Google Sheets environment variables are missing", async () => {
    const missingConfigError = Object.assign(new Error("Google Sheets is not configured."), {
      name: "MissingGoogleSheetsConfigError",
    });
    saveInquiryRecordMock.mockRejectedValue(missingConfigError);

    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.15" },
        body: JSON.stringify(validInquiry({ locale: "es" })),
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      code: "CONFIG_MISSING",
      message: "Inquiry service is being configured. Please contact us by WhatsApp or email.",
    });
  });

  it("rate limits repeated submissions from the same IP", async () => {
    const ip = "203.0.113.14";

    for (let index = 0; index < 5; index += 1) {
      const response = await POST(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "x-forwarded-for": ip },
          body: JSON.stringify(validInquiry({ email: `buyer${index}@example.com` })),
        }),
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": ip },
        body: JSON.stringify(validInquiry({ email: "blocked@example.com" })),
      }),
    );

    expect(blocked.status).toBe(429);
  });
});
