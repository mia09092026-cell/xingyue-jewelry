import type { Metadata } from "next";
import { StartJewelryBrandPage } from "@/components/start-jewelry-brand-page";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedStartJewelryBrandPageProps = { params: LocaleParams };

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({ params }: LocalizedStartJewelryBrandPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.startBrand!.seo,
    path: localizedPath("/start-a-jewelry-brand", locale),
    languages: getLanguageAlternates("/start-a-jewelry-brand"),
  });
}

export default async function LocalizedStartJewelryBrandPage({ params }: LocalizedStartJewelryBrandPageProps) {
  const locale = await readPrefixedLocale(params);

  return <StartJewelryBrandPage locale={locale} />;
}
