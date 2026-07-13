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
          category.alt,
        ]) {
          expect(field.trim()).not.toBe("");
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
          item.alt,
          item.description,
        ]) {
          expect(field.trim()).not.toBe("");
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
        image: expect.stringMatching(/^\/images\//),
        alt: expect.any(String),
        description: expect.any(String),
        tags: expect.any(Array),
      });
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
    for (const image of imagePaths) {
      expect(image).toMatch(/^\/images\//);
      expect(existsSync(resolve("public", image.replace(/^\//, "")))).toBe(true);
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
