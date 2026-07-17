import { describe, expect, it } from "vitest";
import type { ContactInquiry } from "./contact-inquiry";
import {
  buildInquiryEmailUrl,
  buildWhatsAppInquiryUrl,
  contactInquiryHref,
  contactSourceCodes,
  normalizeInterest,
  normalizeLocale,
  normalizeSource,
  productInterestFromSlug,
} from "./contact-links";
import { contactConfig } from "./contact-config";
import { brand } from "./site-data";
import { siteConfig } from "./site-config";

const completeInquiry: ContactInquiry = {
  name: "Mia",
  email: "mia@example.com",
  companyOrBrand: "Mia Studio",
  whatsapp: "+1 555 0100",
  businessType: "Independent designer",
  productInterest: "moissanite-jewelry",
  targetQuantity: "100-200 pieces",
  destinationCountry: "Canada",
  targetMarket: "Boutique retail",
  referenceUrl: "https://example.com/reference",
  material: "S925 silver",
  stone: "Moissanite",
  packagingRequirements: "Private label box",
  expectedTiming: "This is my target timing",
  message: "Please review this project brief.",
};

describe("Phase 7A contact flow helpers", () => {
  it("uses one configured email and WhatsApp source", () => {
    expect(brand.email).toBe(contactConfig.email);
    expect(brand.whatsapp).toBe(contactConfig.whatsapp);
    expect(brand.whatsappHref).toBe(contactConfig.whatsappHref);
    expect(siteConfig.email).toBe(contactConfig.email);
  });

  it("allows only the stable locale, source and interest codes", () => {
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("es")).toBe("es");
    expect(normalizeLocale("ar")).toBe("ar");
    expect(normalizeLocale("fr")).toBe("en");
    expect(normalizeSource("products")).toBe("products");
    expect(normalizeSource("/free-text-source")).toBe("general");
    expect(normalizeInterest("moissanite-jewelry")).toBe("moissanite-jewelry");
    expect(normalizeInterest("customer name and email")).toBe("other");
    expect(contactSourceCodes).toContain("mobile-menu");
    expect(productInterestFromSlug("moissanite-solitaire-ring")).toBe("moissanite-jewelry");
    expect(productInterestFromSlug("unknown-catalog-item")).toBe("other");
  });

  it("uses machine-readable Contact query context without PII", () => {
    const href = contactInquiryHref({
      locale: "es",
      source: "products",
      interest: "moissanite-jewelry",
    });

    expect(href).toBe("/es/contact?locale=es&source=products&contactMethod=form&interest=moissanite-jewelry");
    expect(href).not.toContain("Mia");
    expect(href).not.toContain("@example.com");
  });

  it("builds a URL-encoded English WhatsApp inquiry without internal fields", () => {
    const href = buildWhatsAppInquiryUrl({
      locale: "en",
      source: "products",
      interest: "moissanite-jewelry",
      context: "product",
      formData: completeInquiry,
    });
    const url = new URL(href);

    expect(url.origin + url.pathname).toBe(contactConfig.whatsappHref);
    expect(url.searchParams.get("locale")).toBe("en");
    expect(url.searchParams.get("source")).toBe("products");
    expect(url.searchParams.get("interest")).toBe("moissanite-jewelry");
    expect(url.searchParams.get("contactMethod")).toBe("whatsapp");
    expect(url.searchParams.get("text")).toContain("Hello Xingyue, I am interested in discussing this product for my collection.");
    expect(url.searchParams.get("text")).toContain("Name: Mia");
    expect(url.searchParams.get("text")).not.toContain("consent");
    expect(url.searchParams.get("text")).not.toContain("honeypot");
    expect(url.searchParams.get("text")).not.toContain("products");
    expect(url.searchParams.get("text")).not.toContain("mia@example.com");
  });

  it("renders natural Spanish and Arabic WhatsApp templates and omits empty fields", () => {
    const spanish = new URL(buildWhatsAppInquiryUrl({
      locale: "es",
      source: "start-jewelry-brand",
      interest: "private-label-packaging",
      context: "start-jewelry-brand",
      formData: { ...completeInquiry, message: "", referenceUrl: "" },
    })).searchParams.get("text");
    const arabic = new URL(buildWhatsAppInquiryUrl({
      locale: "ar",
      source: "quality-control",
      interest: "custom-rings",
      context: "quality-control",
      formData: completeInquiry,
    })).searchParams.get("text");

    expect(spanish).toContain("Hola Xingyue, estoy preparando una marca de joyería y quiero hablar sobre la primera dirección de producto.");
    expect(spanish).not.toContain("Reference Image");
    expect(spanish).not.toMatch(/\n\s*\n/);
    expect(arabic).toContain("مرحباً Xingyue، أرغب في مناقشة فحوصات الجودة والمراجعة قبل الشحن.");
    expect(arabic).toContain("الكمية المستهدفة أو النطاق");
  });

  it("builds localized Email subject and body without consent or honeypot", () => {
    const href = buildInquiryEmailUrl({
      locale: "ar",
      source: "contact-page",
      interest: "moissanite-jewelry",
      context: "contact-form",
      formData: completeInquiry,
    });
    const url = new URL(href);
    const body = url.searchParams.get("body") ?? "";

    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(contactConfig.email);
    expect(url.searchParams.get("subject")).toContain("استفسار");
    expect(body).toContain("الاسم: Mia");
    expect(body).toContain("الكمية المستهدفة أو النطاق: 100-200 pieces");
    for (const key of ["locale", "source", "interest", "contactMethod"]) {
      expect(url.searchParams.get(key)).not.toMatch(/Mia|@example\.com|555|Please review/i);
    }
    expect(body).not.toContain("consent");
    expect(body).not.toContain("honeypot");
    expect(body).not.toContain("contact-page");
  });

  it("does not create blank lines or send anything when fields are empty", () => {
    const href = buildWhatsAppInquiryUrl({
      locale: "en",
      source: "general",
      context: "general",
      formData: {
        ...completeInquiry,
        name: "",
        companyOrBrand: "",
        email: "",
        whatsapp: "",
        businessType: "",
        productInterest: "",
        targetQuantity: "",
        destinationCountry: "",
        targetMarket: "",
        referenceUrl: "",
        material: "",
        stone: "",
        packagingRequirements: "",
        expectedTiming: "",
        message: "",
      },
    });
    const text = new URL(href).searchParams.get("text") ?? "";

    expect(text).not.toMatch(/\n\s*\n/);
    expect(text).not.toContain("MOQ:");
    expect(text).not.toContain("sample fee");
    expect(text).not.toContain("lead time");
  });
});
