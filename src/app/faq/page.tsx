import type { Metadata } from "next";
import { LocalizedFaq } from "@/components/localized-pages";
import { getI18nContent } from "@/content/i18n";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

const content = getI18nContent("en");

export const metadata: Metadata = createPageMetadata({
  ...content.faq.seo,
  path: "/faq",
  languages: getLanguageAlternates("/faq"),
});

export default function FaqPage() {
  return <LocalizedFaq locale="en" />;
}
