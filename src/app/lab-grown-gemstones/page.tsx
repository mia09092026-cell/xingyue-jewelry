import type { Metadata } from "next";
import { GemstoneCatalogPage } from "@/components/gemstone-catalog-page";
import { getGemstoneCatalogContent } from "@/content/gemstone-catalog";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

const content = getGemstoneCatalogContent("en");

export const metadata: Metadata = createPageMetadata({
  ...content.seo,
  path: "/lab-grown-gemstones",
  image: "/images/xingyue-colored-gemstones.jpg",
  languages: getLanguageAlternates("/lab-grown-gemstones"),
});

export default function LabGrownGemstonesPage() {
  return <GemstoneCatalogPage locale="en" />;
}
