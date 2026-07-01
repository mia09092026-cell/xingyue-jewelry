import { localizedPath, type SupportedLocale } from "@/lib/i18n";

type ContactInquiryHrefOptions = {
  interest?: string;
  locale?: SupportedLocale;
  sourcePath: string;
};

export function contactInquiryHref({
  interest,
  locale = "en",
  sourcePath,
}: ContactInquiryHrefOptions) {
  const params = new URLSearchParams({ source: sourcePath });

  if (interest) {
    params.set("interest", interest);
  }

  return `${localizedPath("/contact", locale)}?${params.toString()}`;
}
