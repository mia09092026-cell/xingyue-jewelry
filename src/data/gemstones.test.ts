import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  gemstoneCatalogItems,
  gemstoneColorGroups,
  gemstonePriceDisclaimer,
  gemstoneTypeCategories,
} from "./gemstones";

describe("lab-grown gemstone catalog data", () => {
  it("defines all required color and gemstone buying paths", () => {
    expect(gemstoneColorGroups).toHaveLength(8);
    expect(gemstoneColorGroups.map((group) => group.slug)).toEqual([
      "red",
      "blue",
      "green",
      "pink",
      "purple",
      "yellow-champagne",
      "white-colorless",
      "black",
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
