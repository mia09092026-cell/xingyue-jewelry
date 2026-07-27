import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home, { metadata as englishHomeMetadata } from "@/app/page";
import LocalizedHomePage, {
  generateMetadata as generateLocalizedHomeMetadata,
} from "@/app/[locale]/page";
import { getI18nContent } from "@/content/i18n";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema } from "@/lib/structured-data";

afterEach(cleanup);

const positioningCases = [
  {
    locale: "en",
    heading: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory",
    factoryPhrase: /our own jewelry factory in Wuzhou/i,
    title: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory | Xingyue",
    renderPage: async () => <Home />,
  },
  {
    locale: "es",
    heading: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM",
    factoryPhrase: /nuestra propia fábrica de joyería en Wuzhou/i,
    title:
      "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM | Xingyue",
    renderPage: () =>
      LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
  },
  {
    locale: "ar",
    heading: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM",
    factoryPhrase: /مصنعنا الخاص للمجوهرات في ووتشو/i,
    title: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM | Xingyue",
    renderPage: () =>
      LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }),
  },
] as const;

describe("approved own-factory positioning", () => {
  it.each(positioningCases)(
    "makes the own-factory OEM/ODM identity visible in $locale",
    async ({ factoryPhrase, heading, locale, renderPage }) => {
      const content = getI18nContent(locale);

      expect(content.home.title).toBe(heading);
      expect(content.home.subtitle).toMatch(factoryPhrase);

      const page = await renderPage();
      render(page);

      expect(
        screen.getByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
      expect(screen.getByText(factoryPhrase)).toBeInTheDocument();
    },
  );

  it.each(positioningCases)(
    "publishes matching localized metadata in $locale",
    async ({ locale, title }) => {
      const metadata =
        locale === "en"
          ? englishHomeMetadata
          : await generateLocalizedHomeMetadata({
              params: Promise.resolve({ locale }),
            });

      expect(metadata.title).toBe(title);
      expect(metadata.description).toMatch(/factory|fábrica|مصنع/i);
    },
  );

  it("describes the same real factory identity in site config and Organization schema", () => {
    expect(siteConfig.description).toContain(
      "own jewelry factory in Wuzhou",
    );

    const schema = organizationSchema("en");
    expect(schema.description).toContain("own jewelry factory in Wuzhou");
    expect(schema.knowsAbout).toEqual(
      expect.arrayContaining([
        "Lab-grown diamond jewelry manufacturing",
        "OEM/ODM jewelry manufacturing",
        "CAD design and jewelry sampling",
      ]),
    );
    expect(JSON.stringify(schema)).not.toMatch(
      /aggregateRating|review|award|employee|capacity|factorySize|fixed MOQ/i,
    );
  });
});
