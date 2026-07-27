import { readFileSync } from "node:fs";
import { cleanup, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import LocalizedHomePage, {
  generateMetadata as generateLocalizedHomeMetadata,
} from "./[locale]/page";
import Home, { metadata as englishHomeMetadata } from "./page";
import robots from "./robots";
import sitemap from "./sitemap";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const homeCases = [
  {
    locale: "en",
    canonical: "https://xingyuejewelry.com/",
    ogLocale: "en_US",
    title: "Custom 925 Sterling Silver Jewelry Manufacturer | Xingyue",
    description:
      "Custom 925 sterling silver jewelry manufacturing with lab-created colored gemstones, moissanite, OEM/ODM sampling, quality control and private-label packaging.",
    serviceName: "Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner",
    renderPage: async () => <Home />,
  },
  {
    locale: "es",
    canonical: "https://xingyuejewelry.com/es",
    ogLocale: "es_ES",
    title: "Fabricante de joyería personalizada en plata 925 | Xingyue",
    description:
      "Fabricación OEM/ODM de joyería personalizada en plata 925 con gemas de color creadas en laboratorio, moissanita, muestras, control de calidad y empaque privado.",
    serviceName: "Fabricante de joyería personalizada en plata 925 y socio OEM/ODM",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
  },
  {
    locale: "ar",
    canonical: "https://xingyuejewelry.com/ar",
    ogLocale: "ar",
    title: "مصنّع مجوهرات فضة 925 حسب الطلب | Xingyue",
    description:
      "تصنيع OEM/ODM لمجوهرات فضة 925 حسب الطلب مع أحجار ملونة مصنّعة مخبرياً وموسانيت وعينات وفحص جودة وتغليف بعلامة خاصة.",
    serviceName: "مصنّع مجوهرات فضة إسترلينية 925 حسب الطلب وشريك OEM/ODM",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }),
  },
] as const;

function readSchemas(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
    (script) => JSON.parse(script.textContent || "{}") as Record<string, unknown>,
  );
}

afterEach(cleanup);

describe("multilingual homepage SEO and GEO contracts", () => {
  it.each(homeCases)(
    "publishes localized canonical, hreflang, social metadata and factory imagery in $locale",
    async ({ locale, canonical, description, ogLocale, title }) => {
      const metadata =
        locale === "en"
          ? englishHomeMetadata
          : await generateLocalizedHomeMetadata({
              params: Promise.resolve({ locale }),
            });

      expect(metadata.title).toBe(title);
      expect(metadata.description).toBe(description);
      expect(metadata.alternates?.canonical).toBe(canonical);
      expect(metadata.alternates?.languages).toEqual({
        en: "https://xingyuejewelry.com/",
        es: "https://xingyuejewelry.com/es",
        ar: "https://xingyuejewelry.com/ar",
        "x-default": "https://xingyuejewelry.com/",
      });
      expect(metadata.openGraph).toMatchObject({
        locale: ogLocale,
        url: canonical,
        images: [
          {
            url: "https://xingyuejewelry.com/images/factory-workshop-overview.webp",
          },
        ],
      });
      expect(metadata.robots).not.toMatchObject({ index: false });
    },
  );

  it.each(homeCases)(
    "uses visible localized content for WebSite, Service and FAQPage schema in $locale",
    async ({ renderPage, serviceName }) => {
      const page = await renderPage();
      const { container } = render(page as ReactElement);
      const schemas = readSchemas(container);
      const service = schemas.find((schema) => schema["@type"] === "Service");
      const faq = schemas.find((schema) => schema["@type"] === "FAQPage");

      expect(schemas.some((schema) => schema["@type"] === "WebSite")).toBe(true);
      expect(service).toMatchObject({
        name: serviceName,
        provider: {
          "@type": "Organization",
          name: "XINGYUE",
          url: "https://xingyuejewelry.com",
        },
      });
      expect(String(service?.description)).not.toHaveLength(0);
      expect(faq?.mainEntity).toHaveLength(6);
    },
  );

  it("describes one multilingual manufacturing entity without unsupported proof claims", () => {
    const organization = organizationSchema("en");
    const website = websiteSchema();

    expect(organization.description).toContain(
      "custom 925 sterling silver jewelry",
    );
    expect(organization.knowsAbout).toEqual([
      "Custom 925 sterling silver jewelry",
      "Lab-created colored gemstone jewelry",
      "Custom moissanite jewelry",
      "Lab-grown diamond jewelry",
      "Custom K-gold jewelry",
      "OEM/ODM jewelry manufacturing",
      "CAD and sample development",
      "Jewelry quality control",
      "Private-label packaging",
    ]);
    expect(organization.contactPoint).toMatchObject({
      contactType: "sales",
      email: "sales@xingyuejewelry.com",
      availableLanguage: ["English", "Spanish", "Arabic"],
    });
    expect(website.inLanguage).toEqual(["en", "es", "ar"]);
    expect(JSON.stringify(organization)).not.toMatch(
      /aggregateRating|review|award|certificate|employee|capacity/i,
    );
  });

  it("keeps the homepage indexable and aligned across sitemap, robots and llms.txt", () => {
    const homeEntries = sitemap().filter(({ url }) =>
      [
        "https://xingyuejewelry.com/",
        "https://xingyuejewelry.com/es",
        "https://xingyuejewelry.com/ar",
      ].includes(url),
    );
    const llms = readFileSync("public/llms.txt", "utf8");

    expect(robots().rules).toContainEqual({ userAgent: "OAI-SearchBot", allow: "/" });
    expect(homeEntries).toHaveLength(3);
    expect(homeEntries.every((entry) => entry.alternates?.languages?.["x-default"] ===
      "https://xingyuejewelry.com/")).toBe(true);
    expect(llms).toContain(
      "Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner",
    );
    expect(llms).toContain("Lab-Created Colored Gemstone Jewelry");
    expect(llms).toContain("Custom Moissanite Jewelry");
    expect(llms.indexOf("Custom 925 Sterling Silver Jewelry")).toBeLessThan(
      llms.indexOf("Lab-Grown Diamond Jewelry"),
    );
    expect(llms).toContain("https://xingyuejewelry.com/es");
    expect(llms).toContain("https://xingyuejewelry.com/ar");
    expect(llms).not.toMatch(
      /fixed MOQ of|guaranteed lead time of|operates? (an )?owned laborator/i,
    );
  });
});
