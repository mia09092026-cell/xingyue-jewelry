import type { Metadata } from "next";
import { TargetAudiencePage } from "@/components/target-audience-page";
import { emergingBrandsContentByLocale } from "@/content/i18n/target-audience";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedEmergingJewelryBrandsPageProps = { params: LocaleParams };

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({ params }: LocalizedEmergingJewelryBrandsPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  return createPageMetadata({
    ...emergingBrandsContentByLocale[locale].seo,
    path: localizedPath("/for-emerging-jewelry-brands", locale),
    languages: getLanguageAlternates("/for-emerging-jewelry-brands"),
  });
}

export default async function LocalizedEmergingJewelryBrandsPage({ params }: LocalizedEmergingJewelryBrandsPageProps) {
  const locale = await readPrefixedLocale(params);
  return <TargetAudiencePage locale={locale} />;
}
