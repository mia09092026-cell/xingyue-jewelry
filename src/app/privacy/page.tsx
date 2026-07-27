import { LegalInformationPage } from "@/components/legal-information-page";
import { legalPagesContentByLocale } from "@/content/i18n/legal-pages";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

const path = "/privacy" as const;
const content = legalPagesContentByLocale.en[path];

export const metadata = createPageMetadata({
  ...content.seo,
  path,
  languages: getLanguageAlternates(path),
  locale: "en",
});

export default function PrivacyPage() {
  return <LegalInformationPage locale="en" path={path} />;
}
