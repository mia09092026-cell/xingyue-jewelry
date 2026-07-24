import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { faqPageSchema, serviceSchema, websiteSchema } from "@/lib/structured-data";

const content = getI18nContent("en");

export const metadata = createPageMetadata({
  ...content.home.seo,
  path: "/",
  languages: getLanguageAlternates("/"),
  image: content.home.heroImage.src,
  locale: "en",
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd
        data={serviceSchema({
          name: content.home.title,
          description: content.home.subtitle,
          serviceType: content.home.title,
          audience: content.home.audience.items.join(", "),
        })}
      />
      <JsonLd data={faqPageSchema(content.home.faqs)} />
      <LocalizedHome locale="en" />
    </>
  );
}
