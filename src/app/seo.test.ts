import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { collectionLandingPages } from "@/lib/collection-data";
import { getLanguageAlternates, localizedPath, localizedPublicPages } from "@/lib/i18n";
import { collectionCategories, products } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import nextConfig from "../../next.config";
import { metadata as productsMetadata } from "./products/page";
import { generateMetadata as generateLocalizedProductsMetadata } from "./[locale]/products/page";
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
    expect(urls).toContain("https://xingyuejewelry.com/products");
    expect(urls).toContain("https://xingyuejewelry.com/lab-grown-gemstones");
    expect(urls).toContain("https://xingyuejewelry.com/ar/lab-grown-gemstones");
    expect(urls).toContain("https://xingyuejewelry.com/es/lab-grown-gemstones");
    expect(urls).toContain("https://xingyuejewelry.com/faq");
    expect(urls).not.toContain("https://xingyuejewelry.com/collections");
    expect(urls).not.toContain("https://xingyuejewelry.com/es/collections");
    expect(urls).not.toContain("https://xingyuejewelry.com/ar/collections");
    for (const path of localizedPublicPages) {
      expect(urls).toContain(`https://xingyuejewelry.com${localizedPath(path, "ar")}`);
      expect(urls).toContain(`https://xingyuejewelry.com${localizedPath(path, "es")}`);
    }
    for (const page of collectionLandingPages) {
      expect(urls).toContain(`https://xingyuejewelry.com/collections/${page.slug}`);
    }
    for (const product of products) {
      expect(urls).toContain(`https://xingyuejewelry.com/products/${product.slug}`);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("permanently redirects only the legacy top-level collection routes", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/collections", destination: "/products", permanent: true },
        { source: "/es/collections", destination: "/es/products", permanent: true },
        { source: "/ar/collections", destination: "/ar/products", permanent: true },
      ]),
    );
    expect(redirects).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ source: "/collections/:path*" })]),
    );
  });

  it("uses the products route as canonical with complete language alternates", async () => {
    expect(productsMetadata.alternates).toEqual({
      canonical: "https://xingyuejewelry.com/products",
      languages: {
        en: "https://xingyuejewelry.com/products",
        es: "https://xingyuejewelry.com/es/products",
        ar: "https://xingyuejewelry.com/ar/products",
        "x-default": "https://xingyuejewelry.com/products",
      },
    });

    const spanish = await generateLocalizedProductsMetadata({
      params: Promise.resolve({ locale: "es" }),
    });
    const arabic = await generateLocalizedProductsMetadata({
      params: Promise.resolve({ locale: "ar" }),
    });

    expect(spanish.alternates?.canonical).toBe("https://xingyuejewelry.com/es/products");
    expect(arabic.alternates?.canonical).toBe("https://xingyuejewelry.com/ar/products");
    expect(spanish.alternates?.languages).toEqual(productsMetadata.alternates?.languages);
    expect(arabic.alternates?.languages).toEqual(productsMetadata.alternates?.languages);
  });

  it("builds canonical and social metadata", () => {
    const value = createPageMetadata({
      title: "About XINGYUE",
      description: "Factory profile",
      path: "/about",
      languages: getLanguageAlternates("/about"),
    });

    expect(value.alternates?.canonical).toBe("https://xingyuejewelry.com/about");
    expect(value.alternates?.languages).toEqual({
      en: "https://xingyuejewelry.com/about",
      ar: "https://xingyuejewelry.com/ar/about",
      es: "https://xingyuejewelry.com/es/about",
      "x-default": "https://xingyuejewelry.com/about",
    });
    expect(value.openGraph?.url).toBe("https://xingyuejewelry.com/about");
    expect(value.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("adds hreflang alternates to localized sitemap entries", () => {
    const home = sitemap().find((entry) => entry.url === "https://xingyuejewelry.com/");
    const arabicHome = sitemap().find((entry) => entry.url === "https://xingyuejewelry.com/ar");

    expect(home?.alternates?.languages).toEqual({
      en: "https://xingyuejewelry.com/",
      ar: "https://xingyuejewelry.com/ar",
      es: "https://xingyuejewelry.com/es",
      "x-default": "https://xingyuejewelry.com/",
    });
    expect(arabicHome?.alternates?.languages).toEqual(home?.alternates?.languages);
  });

  it("adds hreflang alternates to the localized lab-grown gemstone sitemap entries", () => {
    const gemstoneCatalog = sitemap().find(
      (entry) => entry.url === "https://xingyuejewelry.com/lab-grown-gemstones",
    );
    const arabicGemstoneCatalog = sitemap().find(
      (entry) => entry.url === "https://xingyuejewelry.com/ar/lab-grown-gemstones",
    );
    const spanishGemstoneCatalog = sitemap().find(
      (entry) => entry.url === "https://xingyuejewelry.com/es/lab-grown-gemstones",
    );

    expect(gemstoneCatalog?.alternates?.languages).toEqual({
      en: "https://xingyuejewelry.com/lab-grown-gemstones",
      ar: "https://xingyuejewelry.com/ar/lab-grown-gemstones",
      es: "https://xingyuejewelry.com/es/lab-grown-gemstones",
      "x-default": "https://xingyuejewelry.com/lab-grown-gemstones",
    });
    expect(arabicGemstoneCatalog?.alternates?.languages).toEqual(
      gemstoneCatalog?.alternates?.languages,
    );
    expect(spanishGemstoneCatalog?.alternates?.languages).toEqual(
      gemstoneCatalog?.alternates?.languages,
    );
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
    expect(value).toContain("https://xingyuejewelry.com/products");
    expect(value).not.toContain("https://xingyuejewelry.com/collections\n");
    expect(value).toContain("/collections/moissanite-wholesale");
    expect(value).toContain("/contact");
  });
});
