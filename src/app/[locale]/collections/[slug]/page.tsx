import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedCollection } from "@/components/localized-pages";
import { getI18nContent, getLocalizedCollectionContent } from "@/content/i18n";
import {
  getLanguageAlternates,
  isLocalizedCollectionSlug,
  localizedCollectionSlugs,
  localizedPath,
  type SupportedLocale,
} from "@/lib/i18n";
import { prefixedLocales } from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedCollectionPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    localizedCollectionSlugs.map((slug) => ({ locale, slug })),
  );
}

function isPrefixedLocale(value: string): value is Exclude<SupportedLocale, "en"> {
  return value === "ar" || value === "es";
}

async function readParams(params: LocalizedCollectionPageProps["params"]) {
  const { locale, slug } = await params;

  if (!isPrefixedLocale(locale) || !isLocalizedCollectionSlug(slug)) {
    notFound();
  }

  const collection = getLocalizedCollectionContent(locale, slug);

  if (!collection) {
    notFound();
  }

  return { collection, locale, slug };
}

export async function generateMetadata({
  params,
}: LocalizedCollectionPageProps): Promise<Metadata> {
  const { collection, locale, slug } = await readParams(params);
  const path = `/collections/${slug}`;

  return createPageMetadata({
    ...collection.seo,
    path: localizedPath(path, locale),
    image: collection.image,
    languages: getLanguageAlternates(path),
  });
}

export default async function LocalizedCollectionPage({
  params,
}: LocalizedCollectionPageProps) {
  const { locale, slug } = await readParams(params);
  const content = getI18nContent(locale);

  return <LocalizedCollection locale={content.locale} slug={slug} />;
}
