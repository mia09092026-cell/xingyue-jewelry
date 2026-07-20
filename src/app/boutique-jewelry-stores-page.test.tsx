import { render } from "@testing-library/react";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { TargetAudiencePage } from "@/components/target-audience-page";
import {
  boutiqueStoresContentByLocale,
  boutiqueStoresSectionOrder,
  emergingBrandsContentByLocale,
} from "@/content/i18n/target-audience";
import { contactInquiryHref, normalizeSource } from "@/lib/contact-links";
import {
  getHtmlAttributesForPath,
  getLanguageAlternates,
  localizedPath,
} from "@/lib/i18n";
import { faqPageSchema, serviceSchema } from "@/lib/structured-data";
import sitemap from "@/app/sitemap";
import { metadata as englishMetadata } from "@/app/for-boutique-jewelry-stores/page";
import { generateMetadata as generateLocalizedMetadata } from "@/app/[locale]/for-boutique-jewelry-stores/page";

describe("boutique jewelry stores audience page", () => {
  it("has typed content for all three locales with the shared eleven-section order", () => {
    expect(Object.keys(boutiqueStoresContentByLocale).sort()).toEqual(["ar", "en", "es"]);

    for (const locale of ["en", "es", "ar"] as const) {
      const content = boutiqueStoresContentByLocale[locale];
      expect(content.sectionOrder).toEqual(boutiqueStoresSectionOrder);
      expect(content.sectionOrder).toHaveLength(11);
      expect(content.process.steps).toHaveLength(5);
      expect(content.faq.items.length).toBeGreaterThanOrEqual(5);
      expect(JSON.stringify(content)).not.toMatch(/fixed MOQ|fixed sample fee|fixed lead time|guarantee|ranking|profit|sales promise|success guarantee/i);
    }
  });

  it("renders the same eleven sections through the shared component", () => {
    for (const locale of ["en", "es", "ar"] as const) {
      const { container, unmount } = render(
        <TargetAudiencePage locale={locale} audience="boutique-stores" />,
      );
      expect(
        Array.from(container.querySelectorAll("[data-target-section]")).map((section) =>
          section.getAttribute("data-target-section"),
        ),
      ).toEqual(boutiqueStoresSectionOrder);
      unmount();
    }
  });

  it("uses localized Contact CTAs, source code and Arabic RTL", () => {
    expect(normalizeSource("boutique-stores")).toBe("boutique-stores");

    for (const locale of ["en", "es", "ar"] as const) {
      const href = contactInquiryHref({ locale, source: "boutique-stores", interest: "other" });
      expect(href).toContain(`${localizedPath("/contact", locale)}?`);
      expect(href).toContain("source=boutique-stores");
    }

    expect(getHtmlAttributesForPath("/for-boutique-jewelry-stores")).toEqual({ lang: "en", dir: "ltr" });
    expect(getHtmlAttributesForPath("/es/for-boutique-jewelry-stores")).toEqual({ lang: "es", dir: "ltr" });
    expect(getHtmlAttributesForPath("/ar/for-boutique-jewelry-stores")).toEqual({ lang: "ar", dir: "rtl" });
  });

  it("publishes localized SEO, sitemap, llms and schema contracts", () => {
    expect(getLanguageAlternates("/for-boutique-jewelry-stores")).toEqual({
      en: "https://xingyuejewelry.com/for-boutique-jewelry-stores",
      ar: "https://xingyuejewelry.com/ar/for-boutique-jewelry-stores",
      es: "https://xingyuejewelry.com/es/for-boutique-jewelry-stores",
      "x-default": "https://xingyuejewelry.com/for-boutique-jewelry-stores",
    });

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://xingyuejewelry.com/for-boutique-jewelry-stores",
        "https://xingyuejewelry.com/es/for-boutique-jewelry-stores",
        "https://xingyuejewelry.com/ar/for-boutique-jewelry-stores",
      ]),
    );

    const service = serviceSchema(boutiqueStoresContentByLocale.en.schema.service);
    expect(service).toMatchObject({
      "@type": "Service",
      serviceType: "Jewelry manufacturing support",
      audience: { "@type": "Audience", audienceType: "Boutique jewelry stores" },
    });
    const faq = faqPageSchema(boutiqueStoresContentByLocale.en.faq.items);
    expect(faq.mainEntity).toHaveLength(boutiqueStoresContentByLocale.en.faq.items.length);

    const llms = readFileSync("public/llms.txt", "utf8");
    expect(llms).toContain("https://xingyuejewelry.com/for-boutique-jewelry-stores");
    expect(llms).toContain("https://xingyuejewelry.com/es/for-boutique-jewelry-stores");
    expect(llms).toContain("https://xingyuejewelry.com/ar/for-boutique-jewelry-stores");
    expect(existsSync("src/app/api/inquiry")).toBe(false);
  });

  it("uses the current locale as canonical while sharing all language alternates", async () => {
    expect(englishMetadata.title).toContain("Boutique Stores");
    expect(englishMetadata.description).toContain("product assortment planning");
    expect(englishMetadata.openGraph).toMatchObject({
      type: "website",
      url: "https://xingyuejewelry.com/for-boutique-jewelry-stores",
    });
    expect(englishMetadata.alternates).toEqual({
      canonical: "https://xingyuejewelry.com/for-boutique-jewelry-stores",
      languages: getLanguageAlternates("/for-boutique-jewelry-stores"),
    });

    for (const locale of ["es", "ar"] as const) {
      const metadata = await generateLocalizedMetadata({
        params: Promise.resolve({ locale }),
      });
      expect(metadata.alternates?.canonical).toBe(
        `https://xingyuejewelry.com/${locale}/for-boutique-jewelry-stores`,
      );
      expect(metadata.alternates?.languages).toEqual(englishMetadata.alternates?.languages);
      expect(metadata.openGraph).toMatchObject({
        type: "website",
        url: `https://xingyuejewelry.com/${locale}/for-boutique-jewelry-stores`,
      });
    }

    expect(emergingBrandsContentByLocale.en.hero.title).not.toBe(
      boutiqueStoresContentByLocale.en.hero.title,
    );
  });
});
