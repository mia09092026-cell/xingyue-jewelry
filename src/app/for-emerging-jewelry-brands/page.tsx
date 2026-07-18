import { TargetAudiencePage } from "@/components/target-audience-page";
import { emergingBrandsContentByLocale } from "@/content/i18n/target-audience";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  ...emergingBrandsContentByLocale.en.seo,
  path: "/for-emerging-jewelry-brands",
  languages: getLanguageAlternates("/for-emerging-jewelry-brands"),
});

export default function EmergingJewelryBrandsPage() {
  return <TargetAudiencePage locale="en" />;
}
