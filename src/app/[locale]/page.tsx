import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedHomePageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.home.seo,
    path: localizedPath("/", locale),
    languages: getLanguageAlternates("/"),
  });
}

export default async function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const locale = await readPrefixedLocale(params);

  return <LocalizedHome locale={locale} />;
}
