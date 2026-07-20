import type { Metadata } from "next";
import { TargetAudiencePage } from "@/components/target-audience-page";
import { boutiqueStoresContentByLocale } from "@/content/i18n/target-audience";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type LocalizedBoutiqueJewelryStoresPageProps = { params: LocaleParams };

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({ params }: LocalizedBoutiqueJewelryStoresPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);

  return createPageMetadata({
    ...boutiqueStoresContentByLocale[locale].seo,
    path: localizedPath("/for-boutique-jewelry-stores", locale),
    languages: getLanguageAlternates("/for-boutique-jewelry-stores"),
  });
}

export default async function LocalizedBoutiqueJewelryStoresPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await readPrefixedLocale(params);

  return <TargetAudiencePage locale={locale} audience="boutique-stores" />;
}
