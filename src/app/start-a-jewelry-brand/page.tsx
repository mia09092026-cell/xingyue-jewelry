import { JsonLd } from "@/components/json-ld";
import { StartJewelryBrandPage } from "@/components/start-jewelry-brand-page";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { websiteSchema } from "@/lib/structured-data";

const content = getI18nContent("en");

export const metadata = createPageMetadata({
  ...content.startBrand!.seo,
  path: "/start-a-jewelry-brand",
  languages: getLanguageAlternates("/start-a-jewelry-brand"),
});

export default function StartAJewelryBrandPage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <StartJewelryBrandPage locale="en" />
    </>
  );
}
