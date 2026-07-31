import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

afterEach(() => {
  vi.unstubAllGlobals();
  window.dataLayer = undefined;
  window.history.replaceState({}, "", "/");
});

describe("Phase 6 shared inquiry model", () => {
  it("accepts every approved inquiry field and consolidates it into the original A:P sheet mapping", () => {
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
      expect(inquirySheetHeaders).toHaveLength(16);
      expect(inquiryRecordToSheetRow(record)).toHaveLength(16);
      expect(record.customRequirement).toContain("Business Type: Emerging jewelry brand");
      expect(record.customRequirement).toContain("Target Market: North America");
      expect(record.customRequirement).toContain("Reference URL: https://example.com/reference-board");
      expect(record.customRequirement).toContain("Material: S925 silver");
      expect(record.customRequirement).toContain("Stone: Moissanite");
      expect(record.customRequirement).toContain("Packaging Requirements: Private label packaging");
      expect(record.customRequirement).toContain("Expected Timing: Targeting a seasonal launch");
      expect(record.note).toBe("Consent Given: true");
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
    expect(consent.closest("form")).toHaveAttribute("data-clarity-mask", "true");
    expect(screen.queryByLabelText("Business Type")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Custom Requirement")).toBeInTheDocument();

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

describe("Phase 6 contact form analytics", () => {
  it("tracks one lead only after confirmed HTTP and API success with a safe URL inquiry type", async () => {
    window.history.replaceState(
      {},
      "",
      "/es/contact?source=products&interest=moissanite-jewelry#quote",
    );
    window.dataLayer = [];

    let resolveFetch!: (value: {
      ok: boolean;
      json: () => Promise<{ ok: boolean; reference: string }>;
    }) => void;
    const fetchPromise = new Promise<{
      ok: boolean;
      json: () => Promise<{ ok: boolean; reference: string }>;
    }>((resolve) => {
      resolveFetch = resolve;
    });
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(fetchPromise));

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="es"
        sourcePath="/es/contact"
      />,
    );

    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);
    expect(window.dataLayer).toEqual([]);

    resolveFetch({
      ok: true,
      json: async () => ({ ok: true, reference: "INQ-123" }),
    });

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "generate_lead",
          form_name: "contact_inquiry",
          page_path: "/es/contact",
          locale: "es",
          inquiry_type: "moissanite-jewelry",
        },
      ]);
    });
  });

  it.each([
    {
      label: "an HTTP validation failure",
      responseOk: false,
      payloadOk: false,
      code: "VALIDATION_ERROR",
      errorType: "validation",
    },
    {
      label: "an API validation failure",
      responseOk: true,
      payloadOk: false,
      code: "VALIDATION_ERROR",
      errorType: "validation",
    },
    {
      label: "an HTTP failure despite an API success payload",
      responseOk: false,
      payloadOk: true,
      code: "SHEETS_WRITE_FAILED",
      errorType: "server",
    },
    {
      label: "a server failure",
      responseOk: false,
      payloadOk: false,
      code: "SHEETS_WRITE_FAILED",
      errorType: "server",
    },
    {
      label: "a missing server configuration",
      responseOk: false,
      payloadOk: false,
      code: "CONFIG_MISSING",
      errorType: "server",
    },
    {
      label: "a rate-limited failure",
      responseOk: false,
      payloadOk: false,
      code: "RATE_LIMITED",
      errorType: "rate_limited",
    },
  ])("tracks $label without lead or private response data", async ({
    responseOk,
    payloadOk,
    code,
    errorType,
  }) => {
    window.history.replaceState({}, "", "/contact?source=private-query");
    window.dataLayer = [];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: responseOk,
        json: async () => ({
          ok: payloadOk,
          code,
          message: "Private API diagnostic that must not enter analytics",
        }),
      }),
    );

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "private-buyer@example.com" },
    });
    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "form_error",
          form_name: "contact_inquiry",
          error_type: errorType,
          page_path: "/contact",
        },
      ]);
    });
  });

  it.each([
    { label: "a string", payloadOk: "false" },
    { label: "a number", payloadOk: 1 },
  ])("rejects $label payload ok value instead of generating a lead", async ({
    payloadOk,
  }) => {
    window.history.replaceState({}, "", "/contact?source=malformed-success");
    window.dataLayer = [];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          ok: payloadOk,
          message: "Private malformed success detail",
        }),
      }),
    );

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );
    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "form_error",
          form_name: "contact_inquiry",
          error_type: "unknown",
          page_path: "/contact",
        },
      ]);
    });
    expect(screen.getByText(/Submission failed/i)).toBeInTheDocument();
  });

  it.each([
    {
      label: "response JSON rejects",
      json: () => Promise.reject(new Error("Private response parse detail")),
    },
    {
      label: "response JSON is null",
      json: async () => null,
    },
    {
      label: "response JSON is an array",
      json: async () => [{ ok: true, message: "Private array detail" }],
    },
    {
      label: "response JSON omits a boolean ok",
      json: async () => ({ message: "Private incomplete response detail" }),
    },
  ])("classifies $label as an unknown response failure, not network", async ({
    json,
  }) => {
    window.history.replaceState({}, "", "/contact?source=malformed-response");
    window.dataLayer = [];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json,
      }),
    );

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "private-buyer@example.com" },
    });
    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "form_error",
          form_name: "contact_inquiry",
          error_type: "unknown",
          page_path: "/contact",
        },
      ]);
    });
    expect(screen.getByText(/Submission failed/i)).toBeInTheDocument();
  });

  it("tracks network failures without user fields or thrown error details", async () => {
    window.history.replaceState({}, "", "/contact?source=network-test");
    window.dataLayer = [];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Private network diagnostic")),
    );

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "private-buyer@example.com" },
    });
    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "form_error",
          form_name: "contact_inquiry",
          error_type: "network",
          page_path: "/contact",
        },
      ]);
    });
  });

  it("does not derive inquiry_type from the free-text product-interest field", async () => {
    window.history.replaceState({}, "", "/contact");
    window.dataLayer = [];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, reference: "INQ-456" }),
      }),
    );

    render(
      <ContactInquiryForm
        emailHref="mailto:sales@example.com"
        locale="en"
        sourcePath="/contact"
      />,
    );
    fireEvent.change(screen.getByLabelText("Product Interest"), {
      target: { value: "Private custom product request" },
    });
    fireEvent.submit(screen.getByRole("checkbox").closest("form")!);

    await waitFor(() => {
      expect(window.dataLayer).toEqual([
        {
          event: "generate_lead",
          form_name: "contact_inquiry",
          page_path: "/contact",
          locale: "en",
        },
      ]);
    });
  });
});
