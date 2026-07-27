import type { Metadata } from "next";
import { FactoryInformationPage } from "@/components/factory-information-page";
import { factoryPagesContentByLocale } from "@/content/i18n/factory-pages";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

const path = "/custom-process" as const;

type LocalizedCustomProcessPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedCustomProcessPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = factoryPagesContentByLocale[locale][path];

  return createPageMetadata({
    ...content.seo,
    path: localizedPath(path, locale),
    languages: getLanguageAlternates(path),
    locale,
  });
}

export default async function LocalizedCustomProcessPage({
  params,
}: LocalizedCustomProcessPageProps) {
  const locale = await readPrefixedLocale(params);
  return <FactoryInformationPage locale={locale} path={path} />;
}
