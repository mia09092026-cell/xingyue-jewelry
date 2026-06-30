import type { Metadata } from "next";
import { LocalizedProducts } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

const content = getI18nContent("en");

export const metadata: Metadata = createPageMetadata({
  ...content.products.seo,
  path: "/products",
  languages: getLanguageAlternates("/products"),
});

export default function ProductsPage() {
  return <LocalizedProducts locale="en" />;
}
