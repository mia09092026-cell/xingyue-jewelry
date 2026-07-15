import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { faqPageSchema, websiteSchema } from "@/lib/structured-data";

const content = getI18nContent("en");

export const metadata = createPageMetadata({
  ...content.home.seo,
  path: "/",
  languages: getLanguageAlternates("/"),
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqPageSchema(content.home.faqs)} />
      <LocalizedHome locale="en" />
    </>
  );
}
