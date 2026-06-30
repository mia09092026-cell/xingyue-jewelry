import { siteConfig } from "./site-config";

export const supportedLocales = ["en", "ar", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
};

export const localizedPublicPages = [
  "/",
  "/products",
  "/collections/lab-grown-diamond-jewelry",
  "/collections/custom-jewelry-manufacturing",
  "/about",
  "/faq",
  "/contact",
] as const;

export const localizedCollectionSlugs = [
  "lab-grown-diamond-jewelry",
  "custom-jewelry-manufacturing",
] as const;

export type LocalizedPublicPage = (typeof localizedPublicPages)[number];
export type LocalizedCollectionSlug = (typeof localizedCollectionSlugs)[number];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

export function isLocalizedCollectionSlug(value: string): value is LocalizedCollectionSlug {
  return localizedCollectionSlugs.includes(value as LocalizedCollectionSlug);
}

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path.replace(/\/$/, "") || "/" : `/${path.replace(/\/$/, "")}`;
}

export function localizedPath(path: string, locale: SupportedLocale) {
  const normalizedPath = normalizePath(path);

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const [, segment] = normalizePath(pathname).split("/");

  return segment && isSupportedLocale(segment) ? segment : defaultLocale;
}

export function getHtmlAttributesForPath(pathname: string) {
  const locale = getLocaleFromPath(pathname);

  return {
    lang: locale,
    dir: locale === "ar" ? "rtl" : "ltr",
  } as const;
}

function absoluteI18nUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function getLanguageAlternates(path: string) {
  const normalizedPath = normalizePath(path);
  const englishUrl = absoluteI18nUrl(localizedPath(normalizedPath, "en"));

  return {
    en: englishUrl,
    ar: absoluteI18nUrl(localizedPath(normalizedPath, "ar")),
    es: absoluteI18nUrl(localizedPath(normalizedPath, "es")),
    "x-default": englishUrl,
  };
}
