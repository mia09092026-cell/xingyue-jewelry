import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactInquiryForm, buildInquiryEmailHref } from "@/components/contact-inquiry-form";
import { LocalizedProducts } from "@/components/localized-pages";
import {
  createInquirySheetRecord,
  inquiryRecordToSheetRow,
  inquirySheetHeaders,
  parseContactInquiryPayload,
} from "@/lib/contact-inquiry";
import { GET as getContact } from "@/app/api/contact/route";
import { GET as getHealth } from "@/app/api/contact/health/route";

const completePayload = {
  name: "Avery Chen",
  email: "avery@example.com",
  companyOrBrand: "Luna Jewelry",
  whatsapp: "+1 555 0100",
  businessType: "Emerging jewelry brand",
  productInterest: "Moissanite Jewelry",
  targetQuantity: "Pilot range to be confirmed",
  destinationCountry: "United States",
  targetMarket: "North America",
  referenceUrl: "https://example.com/reference-board",
  material: "S925 silver",
  stone: "Moissanite",
  packagingRequirements: "Private label packaging",
  expectedTiming: "Targeting a seasonal launch",
  message: "Please review the collection direction and sampling route.",
  locale: "en",
  source: "/contact",
  consent: true,
  honeypot: "",
};

describe("Phase 6 shared inquiry model", () => {
  it("accepts every approved inquiry field and preserves it in the sheet mapping", () => {
    const parsed = parseContactInquiryPayload(completePayload);

    expect(parsed).toEqual({
      ok: true,
      data: expect.objectContaining({
        name: "Avery Chen",
        businessType: "Emerging jewelry brand",
        productInterest: "Moissanite Jewelry",
        targetQuantity: "Pilot range to be confirmed",
        destinationCountry: "United States",
        companyOrBrand: "Luna Jewelry",
        whatsapp: "+1 555 0100",
        referenceUrl: "https://example.com/reference-board",
        material: "S925 silver",
        stone: "Moissanite",
        targetMarket: "North America",
        packagingRequirements: "Private label packaging",
        expectedTiming: "Targeting a seasonal launch",
        message: "Please review the collection direction and sampling route.",
      }),
      metadata: { locale: "en", source: "/contact", consent: true },
    });

    if (parsed.ok) {
      const record = createInquirySheetRecord(parsed.data, parsed.metadata);
      expect(record).toMatchObject({
        businessType: "Emerging jewelry brand",
        targetMarket: "North America",
        referenceUrl: "https://example.com/reference-board",
        material: "S925 silver",
        stone: "Moissanite",
        packagingRequirements: "Private label packaging",
        expectedTiming: "Targeting a seasonal launch",
        consentGiven: "true",
      });
      expect(inquirySheetHeaders.slice(0, 16)).toHaveLength(16);
      expect(inquirySheetHeaders).toContain("Business Type");
      expect(inquirySheetHeaders).toContain("Reference URL");
      expect(inquiryRecordToSheetRow(record).slice(16)).toEqual([
        "Emerging jewelry brand",
        "North America",
        "https://example.com/reference-board",
        "S925 silver",
        "Moissanite",
        "Private label packaging",
        "Targeting a seasonal launch",
        "true",
      ]);
    }
  });

  it("rejects missing consent, invalid reference URLs, overlong messages, and unknown fields", () => {
    const result = parseContactInquiryPayload({
      ...completePayload,
      consent: false,
      referenceUrl: "javascript:alert(1)",
      message: "x".repeat(4001),
      unexpected: "must not be persisted",
    });

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: {
        consent: "consent_required",
        referenceUrl: "invalid_reference_url",
        message: "too_long",
      },
      unknownFields: ["unexpected"],
    });
  });
});

describe("Phase 6 Email CTA", () => {
  it("encodes the visible inquiry fields without consent, honeypot, or internal metadata", () => {
    const href = buildInquiryEmailHref({
      emailHref: "mailto:sales@example.com?subject=Old%20Subject",
      locale: "en",
      inquiry: completePayload,
    });
    const decoded = decodeURIComponent(href);

    expect(decoded).toContain("subject=Jewelry Project Inquiry - Luna Jewelry");
    expect(decoded).toContain("Business Type: Emerging jewelry brand");
    expect(decoded).toContain("Reference Image / Design: https://example.com/reference-board");
    expect(decoded).toContain("Message: Please review the collection direction and sampling route.");
    for (const value of [
      "Avery Chen",
      "avery@example.com",
      "+1 555 0100",
      "Moissanite Jewelry",
      "Pilot range to be confirmed",
      "United States",
      "North America",
      "S925 silver",
      "Moissanite",
      "Private label packaging",
      "Targeting a seasonal launch",
    ]) {
      expect(decoded).toContain(value);
    }
    expect(decoded).not.toContain("consent");
    expect(decoded).not.toContain("honeypot");
    expect(decoded).not.toContain("source");
  });
});

describe("Phase 6 safe methods and localized product intent", () => {
  it("rejects GET requests to the inquiry API without invoking persistence", async () => {
    const response = await getContact();

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
    await expect(response.json()).resolves.toMatchObject({ ok: false });
  });

  it("returns a minimal health response without probing or writing Google Sheets", async () => {
    const response = await getHealth(new Request("https://example.com/api/contact/health"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("uses a stable machine-readable product interest code on the Spanish products page", () => {
    render(<LocalizedProducts locale="es" />);

    expect(screen.getByRole("link", { name: /Solicitar precio mayorista/i })).toHaveAttribute(
      "href",
      "/es/contact?locale=es&source=products&contactMethod=form&interest=other",
    );
  });
});

describe("Phase 6 contact form accessibility", () => {
  it("renders consent unchecked and associates field errors with aria-describedby", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        ok: false,
        code: "VALIDATION_ERROR",
        fieldErrors: {
          email: "invalid_email",
          consent: "consent_required",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );

    const consent = screen.getByRole("checkbox", { name: /agree that xingyue/i });
    expect(consent).not.toBeChecked();
    expect(screen.getByLabelText("Business Type")).toBeRequired();
    expect(screen.getByLabelText("Reference Image / Design")).toHaveAttribute("dir", "ltr");

    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-describedby", "field-error-email");
    expect(screen.getByText(/Please enter a valid email address/i)).toHaveAttribute(
      "id",
      "field-error-email",
    );
  });
});
