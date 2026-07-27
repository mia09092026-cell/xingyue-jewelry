import { describe, expect, it } from "vitest";
import { getI18nContent } from ".";
import type { SupportedLocale } from "@/lib/i18n";

const expectedPositioning: Record<SupportedLocale, string> = {
  en: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory",
  es: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM",
  ar: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM",
};

const expectedBrandPartnerCopy: Record<
  SupportedLocale,
  {
    aboutEyebrow: string;
    audience: string;
    homeEyebrow: string;
    profileEyebrow: string;
  }
> = {
  en: {
    aboutEyebrow: "How We Work With Brands",
    audience: "Boutique Jewelry Stores & Design Studios",
    homeEyebrow: "From Wuzhou to the World",
    profileEyebrow: "Who We Support",
  },
  es: {
    aboutEyebrow: "Cómo trabajamos con las marcas",
    audience: "Joyerías boutique y estudios de diseño",
    homeEyebrow: "De Wuzhou al mundo",
    profileEyebrow: "A quién ayudamos",
  },
  ar: {
    aboutEyebrow: "كيف نعمل مع العلامات التجارية",
    audience: "متاجر المجوهرات الراقية واستوديوهات التصميم",
    homeEyebrow: "من ووتشو إلى العالم",
    profileEyebrow: "من نخدم",
  },
};

const unsupportedProofClaims: Record<SupportedLocale, RegExp> = {
  en: /\d+\s*(employees|workers|square meters|sqm|pieces per month)|guaranteed lead time|certified factory/i,
  es: /\d+\s*(empleados|trabajadores|metros cuadrados|piezas al mes)|entrega garantizada|fábrica certificada/i,
  ar: /\d+\s*(موظف|عامل|متر مربع|قطعة شهرياً)|تسليم مضمون|مصنع معتمد/i,
};

describe("localized B2B positioning", () => {
  it.each(["en", "es", "ar"] as const)(
    "uses approved own-factory positioning without fabricated proof claims in %s content",
    (locale) => {
      const content = getI18nContent(locale);

      expect(content.home.title).toBe(expectedPositioning[locale]);
      expect(JSON.stringify(content)).not.toMatch(unsupportedProofClaims[locale]);
    },
  );

  it.each(["en", "es", "ar"] as const)(
    "uses natural brand-partner and audience copy in %s",
    (locale) => {
      const content = getI18nContent(locale);
      const expected = expectedBrandPartnerCopy[locale];

      expect(content.home.eyebrow).toBe(expected.homeEyebrow);
      expect(content.about.eyebrow).toBe(expected.aboutEyebrow);
      expect(content.about.profileEyebrow).toBe(expected.profileEyebrow);
      expect(content.about.facts[1]?.value).toBe(expected.audience);
    },
  );

  it("avoids literal Arabic jewelry translations and singular service phrasing", () => {
    const arabicContent = JSON.stringify(getI18nContent("ar"));

    expect(arabicContent).not.toMatch(/المجوهرات المزروعة|إعدادات ذهب|مصمم للعلامات/);
    expect(getI18nContent("ar").about.profileTitle).toBe(
      "نخدم العلامات التجارية الناشئة ومتاجر المجوهرات الراقية والمصممين المستقلين.",
    );
  });

  it("uses one product image-availability map across English, Spanish and Arabic", () => {
    const productImages = (["en", "es", "ar"] as const).map((locale) =>
      getI18nContent(locale).products.cards.map(({ id, image }) => ({ id, image })),
    );

    expect(productImages[1]).toEqual(productImages[0]);
    expect(productImages[2]).toEqual(productImages[0]);
    expect(productImages[0]).toEqual([
      {
        id: "lab-grown-diamond-rings",
        image: "/images/xingyue-ring-sample.jpg",
      },
      {
        id: "lab-created-colored-gemstone-pendants",
        image: "/images/lab-created-colored-gemstone-pendant.webp",
      },
      { id: "moissanite-earrings", image: "/images/b2b-sample-packaging.jpg" },
      { id: "custom-tennis-bracelets", image: "/images/xingyue-tennis-bracelet.jpg" },
    ]);
  });
});
