import type { Metadata } from "next";
import { GemstoneCatalogPage } from "@/components/gemstone-catalog-page";
import { getGemstoneCatalogContent } from "@/content/gemstone-catalog";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const content = getGemstoneCatalogContent("en");
const canonicalUrl = absoluteUrl("/lab-grown-gemstones");

export const metadata: Metadata = createPageMetadata({
  ...content.seo,
  path: "/lab-grown-gemstones",
  image: "/images/xingyue-colored-gemstones.jpg",
  languages: {
    en: canonicalUrl,
    "x-default": canonicalUrl,
  },
});

export default function LabGrownGemstonesPage() {
  return <GemstoneCatalogPage locale="en" />;
}
