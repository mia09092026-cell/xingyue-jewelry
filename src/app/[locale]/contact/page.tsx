import type { Metadata } from "next";
import { LocalizedContact } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedContactPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedContactPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.contact.seo,
    path: localizedPath("/contact", locale),
    languages: getLanguageAlternates("/contact"),
  });
}

export default async function LocalizedContactPage({ params }: LocalizedContactPageProps) {
  const locale = await readPrefixedLocale(params);

  return <LocalizedContact locale={locale} />;
}
