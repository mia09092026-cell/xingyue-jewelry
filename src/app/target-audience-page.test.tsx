import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TargetAudiencePage } from "@/components/target-audience-page";
import { emergingBrandsContentByLocale } from "@/content/i18n/target-audience";
import { getLanguageAlternates, getHtmlAttributesForPath, localizedPath } from "@/lib/i18n";
import sitemap from "@/app/sitemap";
import { faqPageSchema, serviceSchema } from "@/lib/structured-data";
import { contactInquiryHref } from "@/lib/contact-links";
import { metadata as englishMetadata } from "@/app/for-emerging-jewelry-brands/page";
import { generateMetadata as generateLocalizedMetadata } from "@/app/[locale]/for-emerging-jewelry-brands/page";

const sectionOrder = [
  "hero",
  "who-this-is-for",
  "common-challenges",
  "how-xingyue-supports",
  "product-directions",
  "sampling-moq-planning",
  "quality-packaging",
  "how-we-work",
  "prepare-your-inquiry",
  "faq",
  "final-cta",
] as const;

describe("emerging jewelry brands audience page", () => {
  it("has one shared component and complete typed content for all locales", () => {
    expect(Object.keys(emergingBrandsContentByLocale).sort()).toEqual(["ar", "en", "es"]);

    for (const locale of ["en", "es", "ar"] as const) {
      const content = emergingBrandsContentByLocale[locale];
      expect(content.sectionOrder).toEqual(sectionOrder);
      expect(content.faq.items.length).toBeGreaterThanOrEqual(7);
      expect(content.process.steps).toHaveLength(6);
      expect(content.hero.primaryCta).toBeTruthy();
    }
  });

  it("renders the same eleven sections in the same DOM order", () => {
    for (const locale of ["en", "es", "ar"] as const) {
      const { container, unmount } = render(<TargetAudiencePage locale={locale} />);
      const sections = Array.from(container.querySelectorAll("[data-target-section]"));

      expect(sections.map((section) => section.getAttribute("data-target-section"))).toEqual(
        sectionOrder,
      );
      unmount();
    }

    render(<TargetAudiencePage locale="en" />);
    expect(screen.getByRole("heading", { name: /develop your jewelry collection/i })).toBeInTheDocument();
  });

  it("uses localized contact CTAs and keeps Arabic direction metadata correct", () => {
    for (const locale of ["en", "es", "ar"] as const) {
      const href = contactInquiryHref({ locale, source: "emerging-brands", interest: "other" });
      expect(href).toContain(`${localizedPath("/contact", locale)}?`);
      expect(href).toContain("source=emerging-brands");
      expect(href).toContain("interest=other");
    }

    expect(getHtmlAttributesForPath("/for-emerging-jewelry-brands")).toEqual({ lang: "en", dir: "ltr" });
    expect(getHtmlAttributesForPath("/es/for-emerging-jewelry-brands")).toEqual({ lang: "es", dir: "ltr" });
    expect(getHtmlAttributesForPath("/ar/for-emerging-jewelry-brands")).toEqual({ lang: "ar", dir: "rtl" });
  });

  it("publishes complete hreflang, sitemap, and schema contracts", () => {
    expect(getLanguageAlternates("/for-emerging-jewelry-brands")).toEqual({
      en: "https://xingyuejewelry.com/for-emerging-jewelry-brands",
      ar: "https://xingyuejewelry.com/ar/for-emerging-jewelry-brands",
      es: "https://xingyuejewelry.com/es/for-emerging-jewelry-brands",
      "x-default": "https://xingyuejewelry.com/for-emerging-jewelry-brands",
    });

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://xingyuejewelry.com/for-emerging-jewelry-brands",
        "https://xingyuejewelry.com/es/for-emerging-jewelry-brands",
        "https://xingyuejewelry.com/ar/for-emerging-jewelry-brands",
      ]),
    );

    const service = serviceSchema(emergingBrandsContentByLocale.en.schema.service);
    expect(service).toMatchObject({
      "@type": "Service",
      serviceType: "Jewelry manufacturing support",
      audience: { "@type": "Audience", audienceType: "Emerging jewelry brands" },
    });
    const faq = faqPageSchema(emergingBrandsContentByLocale.en.faq.items);
    expect(faq.mainEntity).toHaveLength(emergingBrandsContentByLocale.en.faq.items.length);
  });

  it("uses the current locale as canonical while sharing all language alternates", async () => {
    expect(englishMetadata.alternates).toEqual({
      canonical: "https://xingyuejewelry.com/for-emerging-jewelry-brands",
      languages: getLanguageAlternates("/for-emerging-jewelry-brands"),
    });

    for (const locale of ["es", "ar"] as const) {
      const metadata = await generateLocalizedMetadata({
        params: Promise.resolve({ locale }),
      });
      expect(metadata.alternates?.canonical).toBe(
        `https://xingyuejewelry.com/${locale}/for-emerging-jewelry-brands`,
      );
      expect(metadata.alternates?.languages).toEqual(englishMetadata.alternates?.languages);
    }
  });
});
