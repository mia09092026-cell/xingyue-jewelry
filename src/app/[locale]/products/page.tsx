import type { Metadata } from "next";
import { LocalizedProducts } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedProductsPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedProductsPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.products.seo,
    path: localizedPath("/products", locale),
    languages: getLanguageAlternates("/products"),
  });
}

export default async function LocalizedProductsPage({ params }: LocalizedProductsPageProps) {
  const locale = await readPrefixedLocale(params);

  return <LocalizedProducts locale={locale} />;
}
