import { describe, expect, it } from "vitest";
import { getI18nContent } from ".";
import type { SupportedLocale } from "@/lib/i18n";

const expectedPositioning: Record<SupportedLocale, string> = {
  en: "Jewelry Manufacturing & Supply Chain Partner",
  es: "Socio de fabricación y cadena de suministro de joyería",
  ar: "شريك تصنيع وسلسلة توريد المجوهرات",
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
    homeEyebrow: "Jewelry Manufacturing Partner for Emerging Brands",
    profileEyebrow: "Who We Support",
  },
  es: {
    aboutEyebrow: "Cómo trabajamos con las marcas",
    audience: "Joyerías boutique y estudios de diseño",
    homeEyebrow: "Socio de fabricación de joyería para marcas emergentes",
    profileEyebrow: "A quién ayudamos",
  },
  ar: {
    aboutEyebrow: "كيف نعمل مع العلامات التجارية",
    audience: "متاجر المجوهرات الراقية واستوديوهات التصميم",
    homeEyebrow: "شريك تصنيع المجوهرات للعلامات التجارية الناشئة",
    profileEyebrow: "من نخدم",
  },
};

const unsupportedOwnershipClaims: Record<SupportedLocale, RegExp> = {
  en: /\bfactory\b|\bmanufacturer\b/i,
  es: /\bfábrica\b|\bfabricante\b/i,
  ar: /مصنع/,
};

describe("localized B2B positioning", () => {
  it.each(["en", "es", "ar"] as const)(
    "uses partner positioning without ownership claims in %s content",
    (locale) => {
      const content = getI18nContent(locale);

      expect(content.home.title).toBe(expectedPositioning[locale]);
      expect(JSON.stringify(content)).not.toMatch(unsupportedOwnershipClaims[locale]);
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
      { id: "lab-grown-diamond-pendants", image: null },
      { id: "moissanite-earrings", image: "/images/b2b-sample-packaging.jpg" },
      { id: "custom-tennis-bracelets", image: "/images/xingyue-tennis-bracelet.jpg" },
    ]);
  });
});
