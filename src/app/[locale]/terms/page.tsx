import type { Metadata } from "next";
import { LegalInformationPage } from "@/components/legal-information-page";
import { legalPagesContentByLocale } from "@/content/i18n/legal-pages";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

const path = "/terms" as const;

type LocalizedTermsPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedTermsPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = legalPagesContentByLocale[locale][path];

  return createPageMetadata({
    ...content.seo,
    path: localizedPath(path, locale),
    languages: getLanguageAlternates(path),
    locale,
  });
}

export default async function LocalizedTermsPage({
  params,
}: LocalizedTermsPageProps) {
  const locale = await readPrefixedLocale(params);
  return <LegalInformationPage locale={locale} path={path} />;
}
