import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates, localizedPath } from "@/lib/i18n";
import {
  generatePrefixedLocaleParams,
  readPrefixedLocale,
  type LocaleParams,
} from "@/lib/localized-route";
import { createPageMetadata } from "@/lib/seo";
import { faqPageSchema, serviceSchema, websiteSchema } from "@/lib/structured-data";

type LocalizedHomePageProps = {
  params: LocaleParams;
};

export const generateStaticParams = generatePrefixedLocaleParams;

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

  return createPageMetadata({
    ...content.home.seo,
    path: localizedPath("/", locale),
    languages: getLanguageAlternates("/"),
    image: content.home.heroImage.src,
    locale,
  });
}

export default async function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const locale = await readPrefixedLocale(params);
  const content = getI18nContent(locale);

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
      <LocalizedHome locale={locale} />
    </>
  );
}
