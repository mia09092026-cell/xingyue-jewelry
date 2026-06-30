import type { Metadata } from "next";
import { LocalizedFaq } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedFaqPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedFaqPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.faq.seo,
    path: localizedPath("/faq", locale),
    languages: getLanguageAlternates("/faq"),
  });
}

export default async function LocalizedFaqPage({ params }: LocalizedFaqPageProps) {
  const locale = await readPrefixedLocale(params);

  return <LocalizedFaq locale={locale} />;
}
