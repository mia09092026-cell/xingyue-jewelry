import type { Metadata } from "next";
import { GemstoneCatalogPage } from "@/components/gemstone-catalog-page";
import { getGemstoneCatalogContent } from "@/content/gemstone-catalog";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";

type LocalizedGemstoneCatalogPageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedGemstoneCatalogPageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getGemstoneCatalogContent(locale);

  return createPageMetadata({
    ...content.seo,
    path: localizedPath("/lab-grown-gemstones", locale),
    image: "/images/xingyue-colored-gemstones.jpg",
    languages: getLanguageAlternates("/lab-grown-gemstones"),
  });
}

export default async function LocalizedGemstoneCatalogPage({
  params,
}: LocalizedGemstoneCatalogPageProps) {
  const locale = await readPrefixedLocale(params);

  return <GemstoneCatalogPage locale={locale} />;
}
