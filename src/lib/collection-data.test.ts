import { describe, expect, it } from "vitest";
import { products } from "./site-data";
import { collectionLandingPages, getCollectionLandingPage } from "./collection-data";

describe("collectionLandingPages", () => {
  it("exposes the six collection landing pages in the expected order", () => {
    expect(collectionLandingPages.map((page) => page.slug)).toEqual([
      "moissanite-wholesale",
      "lab-grown-diamond-jewelry",
      "lab-grown-colored-gemstones",
      "cuban-chains",
      "tennis-chains",
      "custom-jewelry-manufacturing",
    ]);
  });

  it("provides complete landing page content for each collection", () => {
    collectionLandingPages.forEach((page) => {
      expect(page.eyebrow.trim()).not.toHaveLength(0);
      expect(page.alt.trim()).not.toHaveLength(0);
      expect(page.metaTitle.trim()).not.toHaveLength(0);
      expect(page.metaDescription.trim()).not.toHaveLength(0);
      expect(page.title.length).toBeGreaterThan(20);
      expect(page.description.length).toBeGreaterThan(80);
      expect(page.image.startsWith("/images/")).toBe(true);
      expect(page.options.length).toBeGreaterThanOrEqual(3);
      expect(page.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(page.customization.length).toBeGreaterThanOrEqual(3);
      expect(page.qualityNotes.length).toBeGreaterThanOrEqual(2);
      expect(page.educationLinks.length).toBeGreaterThanOrEqual(1);
      expect(page.faqs.length).toBeGreaterThanOrEqual(2);
      page.qualityNotes.forEach((note) => {
        expect(note.title.trim()).not.toHaveLength(0);
        expect(note.copy.trim()).not.toHaveLength(0);
      });
      page.educationLinks.forEach((link) => {
        expect(link.href).toMatch(/^\/education/);
        expect(link.title.trim()).not.toHaveLength(0);
        expect(link.copy.trim()).not.toHaveLength(0);
      });
      page.faqs.forEach((faq) => {
        expect(faq.question.trim()).not.toHaveLength(0);
        expect(faq.answer.trim()).not.toHaveLength(0);
      });
      page.relatedProductSlugs.forEach((slug) => {
        expect(products.some((product) => product.slug === slug)).toBe(true);
      });
    });
  });

  it("round-trips every page by slug lookup", () => {
    collectionLandingPages.forEach((page) => {
      expect(getCollectionLandingPage(page.slug)).toBe(page);
    });
  });

  it("keeps metadata unique and buyer FAQs inside the typed data source", () => {
    expect(new Set(collectionLandingPages.map((page) => page.metaTitle)).size).toBe(6);
    expect(new Set(collectionLandingPages.map((page) => page.metaDescription)).size).toBe(6);
    expect(
      getCollectionLandingPage("moissanite-wholesale")?.faqs.some(
        (faq) => faq.question === "Can I order loose moissanite before finished jewelry?",
      ),
    ).toBe(true);
  });
});

describe("getCollectionLandingPage", () => {
  it('returns the Tennis Chain page for "tennis-chains"', () => {
    expect(getCollectionLandingPage("tennis-chains")?.title).toMatch(/Tennis Chain/i);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getCollectionLandingPage("missing-slug")).toBeUndefined();
  });
});
