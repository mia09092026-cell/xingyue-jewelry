import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { collectionLandingPages } from "@/lib/collection-data";
import { collectionCategories, products } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import robots from "./robots";
import sitemap from "./sitemap";

describe("SEO foundations", () => {
  it("publishes crawler rules and a sitemap", () => {
    const value = robots();

    expect(value.sitemap).toBe("https://xingyuejewelry.com/sitemap.xml");
    expect(value.rules).toContainEqual({ userAgent: "OAI-SearchBot", allow: "/" });
    expect(value.rules).toContainEqual({ userAgent: "ChatGPT-User", allow: "/" });
    expect(value.rules).toContainEqual({ userAgent: "GPTBot", disallow: "/" });
  });

  it("lists every static, collection, and product URL once", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://xingyuejewelry.com/");
    expect(urls).toContain("https://xingyuejewelry.com/collections");
    for (const page of collectionLandingPages) {
      expect(urls).toContain(`https://xingyuejewelry.com/collections/${page.slug}`);
    }
    for (const product of products) {
      expect(urls).toContain(`https://xingyuejewelry.com/products/${product.slug}`);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("builds canonical and social metadata", () => {
    const value = createPageMetadata({
      title: "About XINGYUE",
      description: "Factory profile",
      path: "/about",
    });

    expect(value.alternates?.canonical).toBe("https://xingyuejewelry.com/about");
    expect(value.openGraph?.url).toBe("https://xingyuejewelry.com/about");
    expect(value.twitter?.card).toBe("summary_large_image");
  });

  it("keeps buyer-facing product metadata free of prototype labels", async () => {
    const { generateMetadata } = await import("./products/[slug]/page");
    const value = await generateMetadata({
      params: Promise.resolve({ slug: "missing-product" }),
    });

    expect(value.title).toBe("Product Not Found | XINGYUE");
    expect(String(value.title)).not.toMatch(/Product Detail/i);
  });

  it("keeps primary visual assets web sized", () => {
    const workshop = resolve("public/images/b2b-manual-setting-workshop.webp");
    const hero = resolve("public/images/xingyue-hero.webp");

    expect(statSync(workshop).size).toBeLessThan(500 * 1024);
    expect(statSync(hero).size).toBeLessThan(700 * 1024);
    expect(siteConfig.socialImage).toBe("/images/xingyue-hero.webp");
    expect(
      collectionLandingPages.find((page) => page.slug === "custom-jewelry-manufacturing")
        ?.image,
    ).toBe("/images/b2b-manual-setting-workshop.webp");
  });

  it("uses the compressed workshop image across public page data", () => {
    const publicImagePaths = [
      ...collectionCategories.map((collection) => collection.image),
      ...products.flatMap((product) => [
        product.image,
        ...product.gallery.map((image) => image.src),
        ...product.b2bSellingPoints.map((sellingPoint) => sellingPoint.image),
      ]),
    ];

    expect(publicImagePaths).not.toContain("/images/b2b-manual-setting-workshop.jpg");
  });

  it("publishes an AI-readable site summary for GEO discovery", () => {
    const value = readFileSync(resolve("public/llms.txt"), "utf8");

    expect(value).toContain("https://xingyuejewelry.com/sitemap.xml");
    expect(value).toContain("/collections/moissanite-wholesale");
    expect(value).toContain("/contact");
  });
});
