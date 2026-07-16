import { describe, expect, it } from "vitest";
import {
  getHtmlAttributesForPath,
  getLanguageAlternates,
  getLocaleFromPath,
  isSupportedLocale,
  localizedPath,
  localizedPublicPages,
} from "./i18n";

describe("i18n routing helpers", () => {
  it("keeps English as the default path while prefixing Arabic and Spanish", () => {
    expect(localizedPath("/", "en")).toBe("/");
    expect(localizedPath("/contact", "en")).toBe("/contact");
    expect(localizedPath("/", "ar")).toBe("/ar");
    expect(localizedPath("/contact", "ar")).toBe("/ar/contact");
    expect(localizedPath("/products", "es")).toBe("/es/products");
    expect(localizedPath("/lab-grown-gemstones", "ar")).toBe("/ar/lab-grown-gemstones");
    expect(localizedPath("/lab-grown-gemstones", "es")).toBe("/es/lab-grown-gemstones");
  });

  it("detects locale and document direction from public paths", () => {
    expect(getLocaleFromPath("/")).toBe("en");
    expect(getLocaleFromPath("/products")).toBe("en");
    expect(getLocaleFromPath("/ar/contact")).toBe("ar");
    expect(getLocaleFromPath("/es/faq")).toBe("es");
    expect(getHtmlAttributesForPath("/ar")).toEqual({ lang: "ar", dir: "rtl" });
    expect(getHtmlAttributesForPath("/es/contact")).toEqual({ lang: "es", dir: "ltr" });
    expect(getHtmlAttributesForPath("/contact")).toEqual({ lang: "en", dir: "ltr" });
  });

  it("builds hreflang alternates with x-default pointing to English", () => {
    expect(getLanguageAlternates("/collections/lab-grown-diamond-jewelry")).toEqual({
      en: "https://xingyuejewelry.com/collections/lab-grown-diamond-jewelry",
      ar: "https://xingyuejewelry.com/ar/collections/lab-grown-diamond-jewelry",
      es: "https://xingyuejewelry.com/es/collections/lab-grown-diamond-jewelry",
      "x-default": "https://xingyuejewelry.com/collections/lab-grown-diamond-jewelry",
    });
  });

  it("limits first-phase localized pages to the approved B2B routes", () => {
    expect(localizedPublicPages).toEqual([
      "/",
      "/products",
      "/collections/lab-grown-diamond-jewelry",
      "/collections/custom-jewelry-manufacturing",
      "/lab-grown-gemstones",
      "/about",
      "/faq",
      "/contact",
      "/start-a-jewelry-brand",
    ]);
    expect(isSupportedLocale("ar")).toBe(true);
    expect(isSupportedLocale("fr")).toBe(false);
  });
});
