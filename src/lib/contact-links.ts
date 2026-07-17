import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { brand } from "@/lib/site-data";

type ContactInquiryHrefOptions = {
  interest?: string;
  locale?: SupportedLocale;
  sourcePath: string;
};

export const productInterestCodes = [
  "lab-grown-diamond-jewelry",
  "moissanite-jewelry",
  "colored-gemstone-jewelry",
  "sterling-silver-jewelry",
  "custom-rings",
  "earrings",
  "pendants",
  "tennis-jewelry",
  "loose-stones",
  "private-label-packaging",
  "other",
] as const;

export type ProductInterestCode = (typeof productInterestCodes)[number];

export const productInterestLabels: Record<SupportedLocale, Record<ProductInterestCode, string>> = {
  en: {
    "lab-grown-diamond-jewelry": "Lab-grown diamond jewelry",
    "moissanite-jewelry": "Moissanite jewelry",
    "colored-gemstone-jewelry": "Colored gemstone jewelry",
    "sterling-silver-jewelry": "Sterling silver jewelry",
    "custom-rings": "Custom rings",
    earrings: "Earrings",
    pendants: "Pendants",
    "tennis-jewelry": "Tennis jewelry",
    "loose-stones": "Loose stones",
    "private-label-packaging": "Private label & packaging",
    other: "Other",
  },
  es: {
    "lab-grown-diamond-jewelry": "Joyería con diamantes de laboratorio",
    "moissanite-jewelry": "Joyería de moissanita",
    "colored-gemstone-jewelry": "Joyería con piedras de color",
    "sterling-silver-jewelry": "Joyería de plata de ley",
    "custom-rings": "Anillos personalizados",
    earrings: "Pendientes",
    pendants: "Colgantes",
    "tennis-jewelry": "Joyería tennis",
    "loose-stones": "Piedras sueltas",
    "private-label-packaging": "Marca privada y empaque",
    other: "Otro",
  },
  ar: {
    "lab-grown-diamond-jewelry": "مجوهرات بألماس مصنع مخبريًا",
    "moissanite-jewelry": "مجوهرات المويسانتي",
    "colored-gemstone-jewelry": "مجوهرات بالأحجار الكريمة الملونة",
    "sterling-silver-jewelry": "مجوهرات من الفضة الإسترلينية",
    "custom-rings": "خواتم مخصصة",
    earrings: "أقراط",
    pendants: "قلائد متدلية",
    "tennis-jewelry": "مجوهرات تنس",
    "loose-stones": "أحجار مفردة",
    "private-label-packaging": "علامة خاصة وتغليف",
    other: "أخرى",
  },
};

export function productInterestLabel(locale: SupportedLocale, code: string) {
  return productInterestCodes.includes(code as ProductInterestCode)
    ? productInterestLabels[locale][code as ProductInterestCode]
    : "";
}

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
