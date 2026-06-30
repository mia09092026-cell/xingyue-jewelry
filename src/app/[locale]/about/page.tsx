import type { Metadata } from "next";
import { LocalizedAbout } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedAboutPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedAboutPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.about.seo,
    path: localizedPath("/about", locale),
    languages: getLanguageAlternates("/about"),
  });
}

export default async function LocalizedAboutPage({ params }: LocalizedAboutPageProps) {
  const locale = await readPrefixedLocale(params);

  return <LocalizedAbout locale={locale} />;
}
