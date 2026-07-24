import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { SupportedLocale } from "./i18n";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  languages?: NonNullable<Metadata["alternates"]>["languages"];
  locale?: SupportedLocale;
};

const openGraphLocales: Record<SupportedLocale, string> = {
  en: "en_US",
  es: "es_ES",
  ar: "ar",
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.socialImage,
  languages,
  locale,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: socialImage }],
      ...(locale
        ? {
            locale: openGraphLocales[locale],
            alternateLocale: (["en", "es", "ar"] as const)
              .filter((candidate) => candidate !== locale)
              .map((candidate) => openGraphLocales[candidate]),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
