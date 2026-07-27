import { FactoryInformationPage } from "@/components/factory-information-page";
import { factoryPagesContentByLocale } from "@/content/i18n/factory-pages";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

const path = "/custom-process" as const;
const content = factoryPagesContentByLocale.en[path];

export const metadata = createPageMetadata({
  ...content.seo,
  path,
  languages: getLanguageAlternates(path),
  locale: "en",
});

export default function CustomProcessPage() {
  return <FactoryInformationPage locale="en" path={path} />;
}
