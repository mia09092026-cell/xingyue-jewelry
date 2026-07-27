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

const path = "/manufacturing-capabilities" as const;

type LocalizedManufacturingCapabilitiesPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedManufacturingCapabilitiesPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = factoryPagesContentByLocale[locale][path];

  return createPageMetadata({
    ...content.seo,
    path: localizedPath(path, locale),
    languages: getLanguageAlternates(path),
    locale,
  });
}

export default async function LocalizedManufacturingCapabilitiesPage({
  params,
}: LocalizedManufacturingCapabilitiesPageProps) {
  const locale = await readPrefixedLocale(params);
  return <FactoryInformationPage locale={locale} path={path} />;
}
