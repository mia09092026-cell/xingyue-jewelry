import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { brand } from "@/lib/site-data";

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

const emailSubjects: Record<SupportedLocale, string> = {
  en: "Wholesale Jewelry Inquiry",
  es: "Consulta de joyería mayorista XINGYUE",
  ar: "استفسار مجوهرات بالجملة من XINGYUE",
};

export function emailInquiryHref(locale: SupportedLocale = "en", subject = emailSubjects[locale]) {
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}`;
}
