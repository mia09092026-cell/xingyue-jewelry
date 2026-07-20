import { TargetAudiencePage } from "@/components/target-audience-page";
import { boutiqueStoresContentByLocale } from "@/content/i18n/target-audience";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  ...boutiqueStoresContentByLocale.en.seo,
  path: "/for-boutique-jewelry-stores",
  languages: getLanguageAlternates("/for-boutique-jewelry-stores"),
});

export default function BoutiqueJewelryStoresPage() {
  return <TargetAudiencePage locale="en" audience="boutique-stores" />;
}
