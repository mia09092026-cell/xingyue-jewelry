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

type ArticleMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
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

export function createArticleMetadata({
  title,
  description,
  path,
  image,
  publishedAt,
  updatedAt,
  author,
  tags,
}: ArticleMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: socialImage }],
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: [author],
      tags,
      locale: openGraphLocales.en,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
