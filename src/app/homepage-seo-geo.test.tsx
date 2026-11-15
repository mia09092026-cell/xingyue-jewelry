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
import { buildLlmsText } from "@/lib/llms";

const homeCases = [
  {
    locale: "en",
    canonical: "https://zarivelle.com/",
    ogLocale: "en_US",
    title: "Zarivelle 织澜 | Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry",
    description:
      "Wholesale finished 925 silver, moissanite, colored lab-grown gemstone and lab-grown diamond jewelry for boutiques, brands and online sellers. Low MOQ, fast dispatch and OEM/ODM support.",
    serviceName: "Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry",
    renderPage: async () => <Home />,
  },
  {
    locale: "es",
    canonical: "https://zarivelle.com/es",
    ogLocale: "es_ES",
    title: "Fabricante de joyería personalizada en plata 925 | Zarivelle",
    description:
      "Fabricación OEM/ODM de joyería personalizada en plata 925 con gemas de color creadas en laboratorio, moissanita, muestras, control de calidad y empaque privado.",
    serviceName: "Fabricante de joyería personalizada en plata 925 y socio OEM/ODM",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
  },
  {
    locale: "ar",
    canonical: "https://zarivelle.com/ar",
    ogLocale: "ar",
    title: "مصنّع مجوهرات فضة 925 حسب الطلب | Zarivelle",
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
        en: "https://zarivelle.com/",
        es: "https://zarivelle.com/es",
        ar: "https://zarivelle.com/ar",
        "x-default": "https://zarivelle.com/",
      });
      expect(metadata.openGraph).toMatchObject({
        locale: ogLocale,
        url: canonical,
        images: [
          {
            url: "https://zarivelle.com/images/factory-workshop-overview.webp",
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
          name: "Zarivelle",
          url: "https://zarivelle.com",
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
      "finished 925 silver",
    );
    expect(organization.knowsAbout).toEqual([
      "Wholesale finished 925 silver jewelry",
      "Moissanite wholesale jewelry",
      "Lab-grown colored gemstone jewelry",
      "Lab-grown diamond jewelry",
      "Finished jewelry wholesale",
      "OEM/ODM jewelry manufacturing",
      "Jewelry quality control",
      "Private-label packaging",
      "Wuzhou jewelry supply",
    ]);
    expect(organization.contactPoint).toMatchObject({
      contactType: "sales",
      email: "sales@zarivelle.com",
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
        "https://zarivelle.com/",
        "https://zarivelle.com/es",
        "https://zarivelle.com/ar",
      ].includes(url),
    );
    const llms = buildLlmsText();

    expect(robots().rules).toContainEqual({ userAgent: "OAI-SearchBot", allow: "/" });
    expect(homeEntries).toHaveLength(3);
    expect(homeEntries.every((entry) => entry.alternates?.languages?.["x-default"] ===
      "https://zarivelle.com/")).toBe(true);
    expect(llms).toContain(
      "Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry",
    );
    expect(llms).toContain("Lab-Grown Colored Gemstone Jewelry");
    expect(llms).toContain("Moissanite Finished Jewelry");
    expect(llms.indexOf("925 Silver Finished Jewelry")).toBeLessThan(
      llms.indexOf("Lab-Grown Diamond Jewelry"),
    );
    expect(llms).toContain("https://zarivelle.com/es");
    expect(llms).toContain("https://zarivelle.com/ar");
    expect(llms).not.toMatch(
      /fixed MOQ of|guaranteed lead time of|operates? (an )?owned laborator/i,
    );
  });
});
