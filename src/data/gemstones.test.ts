import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  gemstoneCatalogItems,
  gemstoneColorGroups,
  gemstonePriceDisclaimer,
  gemstoneTypeCategories,
} from "./gemstones";
import * as gemstoneData from "./gemstones";
import type { SupportedLocale } from "@/lib/i18n";

describe("lab-grown gemstone catalog data", () => {
  it("resolves every buyer-visible catalog field in English, Spanish, and Arabic", () => {
    const getLocalizedCatalog = Reflect.get(
      gemstoneData,
      "getLocalizedGemstoneCatalog",
    ) as
      | ((locale: SupportedLocale) => {
          colorGroups: typeof gemstoneColorGroups;
          typeCategories: typeof gemstoneTypeCategories;
          catalogItems: typeof gemstoneCatalogItems;
        })
      | undefined;

    expect(getLocalizedCatalog).toBeTypeOf("function");
    if (!getLocalizedCatalog) return;

    const english = getLocalizedCatalog("en");
    for (const locale of ["en", "es", "ar"] as const) {
      const localized = getLocalizedCatalog(locale);

      expect(localized.colorGroups).toHaveLength(english.colorGroups.length);
      expect(localized.typeCategories).toHaveLength(english.typeCategories.length);
      expect(localized.catalogItems).toHaveLength(english.catalogItems.length);

      for (const group of localized.colorGroups) {
        expect(group.name.trim()).not.toBe("");
        expect(group.alt.trim()).not.toBe("");
        expect(group.representativeStones.every((stone) => stone.trim())).toBe(true);
      }
      for (const category of localized.typeCategories) {
        for (const field of [
          category.name,
          category.description,
          category.availableColors,
          category.moq,
          category.fromPrice,
        ]) {
          expect(field.trim()).not.toBe("");
        }
        if (category.image) {
          expect(category.alt?.trim()).not.toBe("");
        } else {
          expect(category.alt).toBeNull();
        }
      }
      for (const item of localized.catalogItems) {
        for (const field of [
          item.name,
          item.color,
          item.gemstoneType,
          item.shape,
          item.sizeRange,
          item.quality,
          item.moq,
          item.referencePrice,
          item.availability,
          item.description,
        ]) {
          expect(field.trim()).not.toBe("");
        }
        if (item.image) {
          expect(item.alt?.trim()).not.toBe("");
        } else {
          expect(item.alt).toBeNull();
        }
        expect(item.tags.every((tag) => tag.trim())).toBe(true);
      }
    }

    for (const locale of ["es", "ar"] as const) {
      const localized = getLocalizedCatalog(locale);
      localized.typeCategories.forEach((category, index) => {
        expect(category.description).not.toBe(english.typeCategories[index].description);
      });
      localized.catalogItems.forEach((item, index) => {
        expect(item.description).not.toBe(english.catalogItems[index].description);
        expect(item.tags).not.toEqual(english.catalogItems[index].tags);
      });
    }
  });

  it("defines all required color and gemstone buying paths", () => {
    expect(gemstoneColorGroups).toHaveLength(7);
    expect(gemstoneColorGroups.map((group) => group.slug)).toEqual([
      "red",
      "blue",
      "green",
      "pink",
      "purple",
      "yellow-champagne",
      "white-colorless",
    ]);
    expect(gemstoneTypeCategories).toHaveLength(10);
    expect(gemstoneTypeCategories.map((category) => category.slug)).toEqual(
      expect.arrayContaining([
        "lab-grown-ruby",
        "lab-grown-sapphire",
        "lab-grown-emerald",
        "colored-moissanite",
        "lab-grown-colored-diamonds",
        "calibrated-gemstones-wholesale",
      ]),
    );
  });

  it("keeps every stone card quote-ready and inquiry focused", () => {
    expect(gemstoneCatalogItems.length).toBeGreaterThanOrEqual(6);

    for (const item of gemstoneCatalogItems) {
      expect(item).toMatchObject({
        slug: expect.any(String),
        name: expect.any(String),
        color: expect.any(String),
        gemstoneType: expect.any(String),
        shape: expect.any(String),
        sizeRange: expect.any(String),
        quality: expect.any(String),
        moq: expect.any(String),
        referencePrice: expect.any(String),
        availability: expect.any(String),
        description: expect.any(String),
        tags: expect.any(Array),
      });
      if (item.image) {
        expect(item.image).toMatch(/^\/images\//);
        expect(item.alt).toEqual(expect.any(String));
      } else {
        expect(item.alt).toBeNull();
      }
      expect(item.referencePrice).toMatch(/US\$|Quote/i);
    }
  });

  it("uses unique slugs and only local image files", () => {
    const slugs = [
      ...gemstoneColorGroups.map((item) => item.slug),
      ...gemstoneTypeCategories.map((item) => item.slug),
      ...gemstoneCatalogItems.map((item) => item.slug),
    ];
    const imagePaths = [
      ...gemstoneColorGroups.map((item) => item.image),
      ...gemstoneTypeCategories.map((item) => item.image),
      ...gemstoneCatalogItems.map((item) => item.image),
    ];

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const image of imagePaths.filter((path) => path !== null)) {
      expect(image).toMatch(/^\/images\//);
      expect(existsSync(resolve("public", image.replace(/^\//, "")))).toBe(true);
    }
  });

  it("uses dedicated color images with tuned focal positions", () => {
    const expected = {
      blue: ["/images/gemstone-colors/blue-gemstones.webp", "50% 52%"],
      green: ["/images/gemstone-colors/green-gemstones.webp", "50% 54%"],
      pink: ["/images/gemstone-colors/pink-gemstones.webp", "54% 50%"],
      purple: ["/images/gemstone-colors/purple-gemstones.webp", "50% 46%"],
      "yellow-champagne": [
        "/images/gemstone-colors/yellow-champagne-gemstones.webp",
        "50% 58%",
      ],
      "white-colorless": [
        "/images/gemstone-colors/white-colorless-gemstones.webp",
        "50% 44%",
      ],
    } as const;

    for (const [slug, [image, imagePosition]] of Object.entries(expected)) {
      expect(gemstoneColorGroups.find((group) => group.slug === slug)).toMatchObject({
        image,
        imagePosition,
      });
    }

    expect(
      new Set(
        gemstoneColorGroups
          .filter((group) => group.slug !== "red")
          .map((group) => group.image),
      ).size,
    ).toBe(6);
  });

  it("reuses new imagery only for semantically matching product cards", () => {
    const typeImages = Object.fromEntries(
      gemstoneTypeCategories.map((category) => [category.slug, category.image]),
    );
    const catalogImages = Object.fromEntries(
      gemstoneCatalogItems.map((item) => [item.slug, item.image]),
    );

    expect(typeImages["lab-grown-sapphire"]).toBe(
      "/images/gemstone-colors/blue-gemstones.webp",
    );
    expect(typeImages["lab-grown-emerald"]).toBe(
      "/images/gemstone-colors/green-gemstones.webp",
    );
    expect(catalogImages["sapphire-cushion-calibrated"]).toBe(
      "/images/gemstone-colors/blue-gemstones.webp",
    );
    expect(catalogImages["emerald-green-emerald-cut"]).toBe(
      "/images/gemstone-colors/green-gemstones.webp",
    );

    expect(typeImages["lab-grown-spinel"]).toBeNull();
    expect(typeImages["lab-grown-alexandrite"]).toBeNull();
    expect(typeImages["colored-moissanite"]).toBeNull();
    expect(catalogImages["colored-moissanite-mixed-cuts"]).toBeNull();

    for (const locale of ["en", "es", "ar"] as const) {
      const localized = gemstoneData.getLocalizedGemstoneCatalog(locale);
      const localizedTypeImages = Object.fromEntries(
        localized.typeCategories.map((category) => [category.slug, category.image]),
      );
      const localizedCatalogImages = Object.fromEntries(
        localized.catalogItems.map((item) => [item.slug, item.image]),
      );

      expect(localizedTypeImages["lab-grown-spinel"]).toBeNull();
      expect(localizedTypeImages["lab-grown-alexandrite"]).toBeNull();
      expect(localizedTypeImages["colored-moissanite"]).toBeNull();
      expect(localizedCatalogImages["colored-moissanite-mixed-cuts"]).toBeNull();
    }
  });

  it("localizes descriptive alt text for the replaced images", () => {
    const expectations = {
      en: {
        colorGroups: {
          blue: "Blue lab-grown gemstones in mixed cuts on a white background",
          green: "Green lab-grown gemstones in mixed shapes on a white background",
          pink: "Pink lab-grown gemstones in oval and cushion cuts on a white background",
          purple: "Purple cushion-cut lab-grown gemstone on a white background",
          "yellow-champagne":
            "Yellow and champagne lab-grown gemstones in radiant cuts on a white background",
          "white-colorless":
            "Colorless lab-grown gemstones in mixed cushion cuts on a white background",
        },
        typeCategories: {
          "lab-grown-sapphire":
            "Blue lab-grown sapphires in mixed cuts on a white background",
          "lab-grown-emerald":
            "Green lab-grown emeralds in mixed cuts on a white background",
        },
        catalogItems: {
          "sapphire-cushion-calibrated":
            "Blue lab-grown sapphires including a cushion cut on a white background",
          "emerald-green-emerald-cut":
            "Green lab-grown emerald selection including emerald cuts on a white background",
        },
      },
      es: {
        colorGroups: {
          blue: "Gemas azules de laboratorio en varias tallas sobre fondo blanco",
          green: "Gemas verdes de laboratorio en formas variadas sobre fondo blanco",
          pink: "Gemas rosas de laboratorio con tallas oval y cojín sobre fondo blanco",
          purple: "Gema morada de laboratorio talla cojín sobre fondo blanco",
          "yellow-champagne":
            "Gemas amarillas y champán de laboratorio con talla radiante sobre fondo blanco",
          "white-colorless":
            "Gemas incoloras de laboratorio con distintas tallas cojín sobre fondo blanco",
        },
        typeCategories: {
          "lab-grown-sapphire":
            "Zafiros azules de laboratorio en varias tallas sobre fondo blanco",
          "lab-grown-emerald":
            "Esmeraldas verdes de laboratorio en varias tallas sobre fondo blanco",
        },
        catalogItems: {
          "sapphire-cushion-calibrated":
            "Zafiros azules de laboratorio, incluida una talla cojín, sobre fondo blanco",
          "emerald-green-emerald-cut":
            "Selección de esmeraldas verdes de laboratorio con tallas esmeralda sobre fondo blanco",
        },
      },
      ar: {
        colorGroups: {
          blue: "أحجار كريمة زرقاء مُنتَجة في المختبر بقصّات متعددة على خلفية بيضاء",
          green: "أحجار كريمة خضراء مُنتَجة في المختبر بأشكال متنوعة على خلفية بيضاء",
          pink: "أحجار كريمة وردية مُنتَجة في المختبر بقصّات بيضاوية ووسادية على خلفية بيضاء",
          purple: "حجر كريم بنفسجي مُنتَج في المختبر بقصّة وسادة على خلفية بيضاء",
          "yellow-champagne":
            "أحجار كريمة صفراء وشمبانيا مُنتَجة في المختبر بقصّات مشعّة على خلفية بيضاء",
          "white-colorless":
            "أحجار كريمة عديمة اللون مُنتَجة في المختبر بقصّات وسادية متنوعة على خلفية بيضاء",
        },
        typeCategories: {
          "lab-grown-sapphire":
            "أحجار ياقوت أزرق مُنتَجة في المختبر بقصّات متعددة على خلفية بيضاء",
          "lab-grown-emerald":
            "أحجار زمرد خضراء مُنتَجة في المختبر بقصّات متعددة على خلفية بيضاء",
        },
        catalogItems: {
          "sapphire-cushion-calibrated":
            "أحجار ياقوت أزرق مُنتَجة في المختبر، منها حجر بقصّة وسادة، على خلفية بيضاء",
          "emerald-green-emerald-cut":
            "تشكيلة زمرد أخضر مُنتَج في المختبر تتضمن قصّات زمردية على خلفية بيضاء",
        },
      },
    } as const;

    for (const locale of ["en", "es", "ar"] as const) {
      const localized = gemstoneData.getLocalizedGemstoneCatalog(locale);
      for (const [slug, alt] of Object.entries(expectations[locale].colorGroups)) {
        expect(localized.colorGroups.find((group) => group.slug === slug)?.alt).toBe(alt);
      }
      for (const [slug, alt] of Object.entries(expectations[locale].typeCategories)) {
        expect(
          localized.typeCategories.find((category) => category.slug === slug)?.alt,
        ).toBe(alt);
      }
      for (const [slug, alt] of Object.entries(expectations[locale].catalogItems)) {
        expect(localized.catalogItems.find((item) => item.slug === slug)?.alt).toBe(alt);
      }
    }
  });

  it("publishes the non-binding wholesale price disclaimer", () => {
    expect(gemstonePriceDisclaimer).toBe(
      "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.",
    );
  });

  it("qualifies every requested reference range with its pricing variables", () => {
    const prices = Object.fromEntries(
      gemstoneTypeCategories.map((category) => [category.slug, category.fromPrice]),
    );

    expect(prices["lab-grown-ruby"]).toBe(
      "From US$8–35 / ct depending on size, color and quality",
    );
    expect(prices["lab-grown-sapphire"]).toBe(
      "From US$5–28 / ct depending on size, color and quality",
    );
    expect(prices["lab-grown-emerald"]).toBe(
      "From US$10–45 / ct depending on size, clarity and cut",
    );
    expect(prices["colored-moissanite"]).toBe(
      "From US$3–18 / ct depending on color and size",
    );
    expect(prices["cubic-zirconia"]).toBe(
      "From US$0.5–5 / ct depending on cut and quantity",
    );
    expect(prices["lab-grown-colored-diamonds"]).toBe(
      "Quote by size, color, clarity and certificate",
    );
  });
});
