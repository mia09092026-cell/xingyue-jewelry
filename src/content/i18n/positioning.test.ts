import { describe, expect, it } from "vitest";
import { getI18nContent } from ".";
import type { SupportedLocale } from "@/lib/i18n";

const expectedPositioning: Record<SupportedLocale, string> = {
  en: "Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner",
  es: "Fabricante de joyería personalizada en plata 925 y socio OEM/ODM",
  ar: "مصنّع مجوهرات فضة إسترلينية 925 حسب الطلب وشريك OEM/ODM",
};

const expectedBrandPartnerCopy: Record<
  SupportedLocale,
  {
    aboutEyebrow: string;
    audience: string;
    heroCtas: [string, string];
    homeEyebrow: string;
    profileEyebrow: string;
  }
> = {
  en: {
    aboutEyebrow: "How We Work With Brands",
    audience: "Boutique Jewelry Stores & Design Studios",
    heroCtas: ["Discuss Your Custom Jewelry Project", "Explore Materials & Capabilities"],
    homeEyebrow: "Custom Jewelry Manufacturing from Wuzhou",
    profileEyebrow: "Who We Support",
  },
  es: {
    aboutEyebrow: "Cómo trabajamos con las marcas",
    audience: "Joyerías boutique y estudios de diseño",
    heroCtas: ["Habla de tu proyecto de joyería", "Explora materiales y capacidades"],
    homeEyebrow: "Fabricación de joyería personalizada desde Wuzhou",
    profileEyebrow: "A quién ayudamos",
  },
  ar: {
    aboutEyebrow: "كيف نعمل مع العلامات التجارية",
    audience: "متاجر المجوهرات الراقية واستوديوهات التصميم",
    heroCtas: ["ناقش مشروع مجوهراتك", "استكشف المواد وقدرات التصنيع"],
    homeEyebrow: "تصنيع مجوهرات مخصصة من ووتشو",
    profileEyebrow: "من نخدم",
  },
};

const expectedProductCards = [
  {
    title: {
      en: "Custom 925 Sterling Silver Jewelry",
      es: "Joyería personalizada en plata 925",
      ar: "مجوهرات فضة 925 مخصصة",
    },
    href: "/collections/custom-jewelry-manufacturing",
  },
  {
    title: {
      en: "Lab-Created Colored Gemstone Jewelry",
      es: "Joyería con gemas de color creadas en laboratorio",
      ar: "مجوهرات بأحجار ملونة مصنّعة مخبرياً",
    },
    href: "/collections/lab-grown-colored-gemstones",
  },
  {
    title: {
      en: "Custom Moissanite Jewelry",
      es: "Joyería personalizada con moissanita",
      ar: "مجوهرات موسانيت مخصصة",
    },
    href: "/collections/moissanite-wholesale",
  },
  {
    title: {
      en: "Lab-Grown Diamond Jewelry",
      es: "Joyería con diamantes de laboratorio",
      ar: "مجوهرات بألماس مزروع",
    },
    href: "/collections/lab-grown-diamond-jewelry",
  },
  {
    title: {
      en: "Custom 925 Sterling Silver & K-Gold Jewelry",
      es: "Joyería personalizada en plata 925 y oro K",
      ar: "مجوهرات فضة 925 وذهب K مخصصة",
    },
    href: "/collections/custom-jewelry-manufacturing",
  },
] as const;

const unsupportedOwnershipClaims: Record<SupportedLocale, RegExp> = {
  en: /\bowned factory\b|\bour factory\b|\bfactory-direct\b|\bin-house factory\b/i,
  es: /\bfábrica propia\b|\bnuestra fábrica\b|\bfábrica interna\b/i,
  ar: /مصنعنا|مصنع مملوك/,
};

describe("localized B2B positioning", () => {
  it.each(["en", "es", "ar"] as const)(
    "uses manufacturing-partner positioning without unverified ownership claims in %s content",
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
      expect([
        content.cta.discussCollection,
        content.cta.exploreCapabilities,
      ]).toEqual(expected.heroCtas);
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

  it.each([
    {
      locale: "en",
      proof: "925 Silver / 14K / 18K",
      capability: "Custom 925 Sterling Silver & K-Gold Jewelry",
      pendant: "Lab-Created Colored Gemstone Pendant",
      pendantAlt: "Blue lab-created colored gemstone pendant and matching earrings",
      braceletMaterial: "S925 silver / 10K / 14K / 18K gold custom order",
    },
    {
      locale: "es",
      proof: "Plata 925 / oro 14K / 18K",
      capability: "Joyería personalizada en plata 925 y oro K",
      pendant: "Colgante con gema de color creada en laboratorio",
      pendantAlt:
        "Colgante y pendientes a juego con gemas azules creadas en laboratorio",
      braceletMaterial: "Plata S925 u oro 10K / 14K / 18K bajo pedido",
    },
    {
      locale: "ar",
      proof: "فضة 925 / ذهب 14K / 18K",
      capability: "مجوهرات فضة 925 وذهب K مخصصة",
      pendant: "قلادة بحجر ملون مصنّع مخبرياً",
      pendantAlt: "قلادة وأقراط متطابقة بأحجار زرقاء مصنّعة مخبرياً",
      braceletMaterial: "طلب مخصص بفضة S925 أو ذهب 10K / 14K / 18K",
    },
  ] as const)(
    "adds 925 silver at the requested homepage and product positions in $locale",
    ({ locale, proof, capability, pendant, pendantAlt, braceletMaterial }) => {
      const content = getI18nContent(locale);
      const pendantCard = content.products.cards.find(
        ({ id }) => id === "lab-created-colored-gemstone-pendants",
      );
      const braceletCard = content.products.cards.find(
        ({ id }) => id === "custom-tennis-bracelets",
      );

      expect(content.home.stats[0]?.value).toBe(proof);
      expect(content.home.productCards.at(-1)?.title).toBe(capability);
      expect(pendantCard).toMatchObject({
        name: pendant,
        image: "/images/lab-created-colored-gemstone-pendant.webp",
        alt: pendantAlt,
      });
      expect(braceletCard?.material).toBe(braceletMaterial);
      expect(content.products.cards.map(({ id }) => String(id))).not.toContain(
        "lab-grown-diamond-pendants",
      );
    },
  );

  it.each(["en", "es", "ar"] as const)(
    "keeps the approved 925-first proof, product, and FAQ hierarchy in %s",
    (locale) => {
      const content = getI18nContent(locale);

      expect(content.home.stats.map(({ value }) => value)).toEqual([
        locale === "en"
          ? "925 Silver / 14K / 18K"
          : locale === "es"
            ? "Plata 925 / oro 14K / 18K"
            : "فضة 925 / ذهب 14K / 18K",
        locale === "en"
          ? "Project-Specific Sampling & MOQ"
          : locale === "es"
            ? "Muestras y MOQ según el proyecto"
            : "العينات والحد الأدنى حسب المشروع",
        locale === "en"
          ? "OEM/ODM Coordination"
          : locale === "es"
            ? "Coordinación OEM/ODM"
            : "تنسيق OEM/ODM",
      ]);
      expect(content.home.productCards).toHaveLength(5);
      expect(
        content.home.productCards.map(({ title, href }) => ({ title, href })),
      ).toEqual(
        expectedProductCards.map((card) => ({
          title: card.title[locale],
          href: card.href,
        })),
      );
      expect(content.home.faqs).toHaveLength(6);
      expect(content.home.faqs[0]?.question).toBe(
        locale === "en"
          ? "Do you manufacture custom 925 sterling silver jewelry?"
          : locale === "es"
            ? "¿Fabrican joyería personalizada en plata 925?"
            : "هل تصنّعون مجوهرات فضة 925 حسب الطلب؟",
      );
    },
  );

  it("keeps Arabic RTL and natural project-specific MOQ wording", () => {
    const content = getI18nContent("ar");

    expect(content.dir).toBe("rtl");
    expect(JSON.stringify(content.home)).toContain(
      "الحد الأدنى للطلب حسب المشروع",
    );
  });
});
