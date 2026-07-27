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
    title: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory | Xingyue",
    serviceName: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory",
    renderPage: async () => <Home />,
  },
  {
    locale: "es",
    canonical: "https://xingyuejewelry.com/es",
    ogLocale: "es_ES",
    title: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM | Xingyue",
    serviceName: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
  },
  {
    locale: "ar",
    canonical: "https://xingyuejewelry.com/ar",
    ogLocale: "ar",
    title: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM | Xingyue",
    serviceName: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM",
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
    async ({ locale, canonical, ogLocale, title }) => {
      const metadata =
        locale === "en"
          ? englishHomeMetadata
          : await generateLocalizedHomeMetadata({
              params: Promise.resolve({ locale }),
            });

      expect(metadata.title).toBe(title);
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
      expect(faq?.mainEntity).toHaveLength(3);
    },
  );

  it("describes one multilingual manufacturing entity without unsupported proof claims", () => {
    const organization = organizationSchema("en");
    const website = websiteSchema();

    expect(organization.description).toContain("own jewelry factory in Wuzhou");
    expect(organization.knowsAbout).toEqual(
      expect.arrayContaining([
        "Lab-grown diamond jewelry manufacturing",
        "OEM/ODM jewelry manufacturing",
        "CAD design and jewelry sampling",
      ]),
    );
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
    expect(llms).toContain("From Wuzhou to the World");
    expect(llms).toContain("operates its own jewelry factory in Wuzhou");
    expect(llms).toContain("https://xingyuejewelry.com/factory");
    expect(llms).toContain("https://xingyuejewelry.com/es");
    expect(llms).toContain("https://xingyuejewelry.com/ar");
    expect(llms).not.toMatch(
      /fixed MOQ of|guaranteed lead time of|operates? (an )?owned laborator/i,
    );
  });
});
