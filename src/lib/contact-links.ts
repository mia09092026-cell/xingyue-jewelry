import {
  contactInquiryFields,
  type ContactInquiry,
  type ContactInquiryField,
} from "@/lib/contact-inquiry";
import { contactConfig } from "@/lib/contact-config";
import { isSupportedLocale, localizedPath, type SupportedLocale } from "@/lib/i18n";

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

export const contactSourceCodes = [
  "general",
  "header",
  "mobile-menu",
  "footer",
  "homepage-hero",
  "homepage-how-we-work",
  "homepage-sample-moq",
  "homepage-quality-control",
  "homepage-prepare-inquiry",
  "homepage-final-cta",
  "products",
  "collection-detail",
  "start-jewelry-brand",
  "emerging-brands",
  "contact-page",
] as const;

export type ContactSource = (typeof contactSourceCodes)[number];
export const contactMethodCodes = ["form", "whatsapp", "email"] as const;
export type ContactMethod = (typeof contactMethodCodes)[number];

export const contactMessageContexts = [
  "general",
  "product",
  "start-jewelry-brand",
  "sample-moq",
  "quality-control",
  "contact-form",
] as const;

export type ContactMessageContext = (typeof contactMessageContexts)[number];

export function normalizeLocale(value?: string): SupportedLocale {
  return value && isSupportedLocale(value) ? value : "en";
}

export function normalizeSource(value?: string): ContactSource {
  return value && contactSourceCodes.includes(value as ContactSource)
    ? (value as ContactSource)
    : "general";
}

export function normalizeInterest(value?: string): ProductInterestCode {
  return value && productInterestCodes.includes(value as ProductInterestCode)
    ? (value as ProductInterestCode)
    : "other";
}

export function productInterestFromSlug(slug?: string): ProductInterestCode {
  const value = slug?.toLowerCase() ?? "";
  if (value.includes("moissanite")) return "moissanite-jewelry";
  if (value.includes("diamond")) return "lab-grown-diamond-jewelry";
  if (value.includes("silver")) return "sterling-silver-jewelry";
  if (value.includes("ring")) return "custom-rings";
  if (value.includes("earring")) return "earrings";
  if (value.includes("pendant")) return "pendants";
  if (value.includes("tennis")) return "tennis-jewelry";
  if (value.includes("stone") || value.includes("gemstone")) return "loose-stones";
  if (value.includes("packaging") || value.includes("private-label")) return "private-label-packaging";
  return "other";
}

export function productInterestLabel(locale: SupportedLocale, code: string) {
  return productInterestCodes.includes(code as ProductInterestCode)
    ? productInterestLabels[locale][code as ProductInterestCode]
    : "";
}

type ContactInquiryHrefOptions = {
  interest?: string;
  locale?: string;
  source?: string;
  sourcePath?: string;
};

function sourceFromPath(sourcePath?: string) {
  const path = sourcePath?.toLowerCase() ?? "";
  if (path.includes("/products") || path.includes("/lab-grown-gemstones")) return "products";
  if (path.includes("/collections/")) return "collection-detail";
  if (path.includes("/start-a-jewelry-brand")) return "start-jewelry-brand";
  if (path.includes("/for-emerging-jewelry-brands")) return "emerging-brands";
  if (path.endsWith("/contact")) return "contact-page";
  return "general";
}

export function contactSourceFromPath(sourcePath?: string): ContactSource {
  return normalizeSource(sourceFromPath(sourcePath));
}

export function contactInquiryHref({
  interest,
  locale,
  source,
  sourcePath,
}: ContactInquiryHrefOptions) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedSource = normalizeSource(source ?? sourceFromPath(sourcePath));
  const params = new URLSearchParams({
    locale: normalizedLocale,
    source: normalizedSource,
    contactMethod: "form",
  });

  if (interest) {
    params.set("interest", normalizeInterest(interest));
  }

  return `${localizedPath("/contact", normalizedLocale)}?${params.toString()}`;
}

const emailSubjects: Record<SupportedLocale, string> = {
  en: "Wholesale Jewelry Inquiry",
  es: "Consulta de joyería mayorista XINGYUE",
  ar: "استفسار مجوهرات بالجملة من XINGYUE",
};

const contextEmailSubjects: Record<ContactMessageContext, Record<SupportedLocale, string>> = {
  general: emailSubjects,
  product: {
    en: "Product inquiry",
    es: "Consulta sobre producto",
    ar: "استفسار عن المنتج",
  },
  "start-jewelry-brand": {
    en: "Start a jewelry brand inquiry",
    es: "Consulta para iniciar una marca de joyería",
    ar: "استفسار حول إطلاق علامة مجوهرات",
  },
  "sample-moq": {
    en: "Sample and project-specific MOQ inquiry",
    es: "Consulta sobre muestras y MOQ del proyecto",
    ar: "استفسار عن العينات والحد الأدنى للطلب حسب المشروع",
  },
  "quality-control": {
    en: "Quality checks inquiry",
    es: "Consulta sobre controles de calidad",
    ar: "استفسار عن فحوصات الجودة",
  },
  "contact-form": {
    en: "Jewelry Project Inquiry",
    es: "Consulta de proyecto de joyería",
    ar: "استفسار عن مشروع مجوهرات",
  },
};

const contextBySource: Record<ContactSource, ContactMessageContext> = {
  general: "general",
  header: "general",
  "mobile-menu": "general",
  footer: "general",
  "homepage-hero": "general",
  "homepage-how-we-work": "general",
  "homepage-final-cta": "general",
  products: "product",
  "collection-detail": "product",
  "start-jewelry-brand": "start-jewelry-brand",
  "emerging-brands": "general",
  "homepage-sample-moq": "sample-moq",
  "homepage-quality-control": "quality-control",
  "homepage-prepare-inquiry": "contact-form",
  "contact-page": "contact-form",
};

const messageLabels: Record<SupportedLocale, Record<ContactInquiryField, string>> = {
  en: {
    name: "Name",
    email: "Email",
    companyOrBrand: "Company / Brand",
    whatsapp: "WhatsApp",
    businessType: "Business Type",
    productInterest: "Product Interest",
    targetQuantity: "Target Quantity or Range",
    destinationCountry: "Destination Country",
    targetMarket: "Target Market",
    referenceUrl: "Reference Image / Design",
    material: "Material",
    stone: "Stone",
    packagingRequirements: "Packaging Requirements",
    expectedTiming: "Expected Timing",
    message: "Message",
  },
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    companyOrBrand: "Empresa / Marca",
    whatsapp: "WhatsApp",
    businessType: "Tipo de negocio",
    productInterest: "Producto de interés",
    targetQuantity: "Cantidad objetivo o rango",
    destinationCountry: "País de destino",
    targetMarket: "Mercado objetivo",
    referenceUrl: "Imagen / diseño de referencia",
    material: "Material",
    stone: "Piedra",
    packagingRequirements: "Requisitos de empaque",
    expectedTiming: "Plazo esperado",
    message: "Mensaje",
  },
  ar: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    companyOrBrand: "الشركة / العلامة التجارية",
    whatsapp: "واتساب",
    businessType: "نوع النشاط التجاري",
    productInterest: "المنتج المطلوب",
    targetQuantity: "الكمية المستهدفة أو النطاق",
    destinationCountry: "دولة الوجهة",
    targetMarket: "السوق المستهدف",
    referenceUrl: "رابط الصورة أو التصميم",
    material: "الخامة",
    stone: "الحجر",
    packagingRequirements: "متطلبات التغليف",
    expectedTiming: "التوقيت المتوقع",
    message: "الرسالة",
  },
};

const whatsappOpenings: Record<ContactMessageContext, Record<SupportedLocale, string>> = {
  general: {
    en: "Hello Xingyue, I would like to discuss a jewelry project.",
    es: "Hola Xingyue, me gustaría hablar sobre un proyecto de joyería.",
    ar: "مرحباً Xingyue، أود مناقشة مشروع مجوهرات.",
  },
  product: {
    en: "Hello Xingyue, I am interested in discussing this product for my collection.",
    es: "Hola Xingyue, me interesa analizar este producto para mi colección.",
    ar: "مرحباً Xingyue، أرغب في مناقشة هذا المنتج لمجموعتي.",
  },
  "start-jewelry-brand": {
    en: "Hello Xingyue, I am planning a jewelry brand and would like to discuss the first product direction.",
    es: "Hola Xingyue, estoy preparando una marca de joyería y quiero hablar sobre la primera dirección de producto.",
    ar: "مرحباً Xingyue، أعمل على إطلاق علامة مجوهرات وأرغب في مناقشة اتجاه المنتج الأول.",
  },
  "sample-moq": {
    en: "Hello Xingyue, I would like to discuss sample scope and project-specific MOQ for a jewelry project.",
    es: "Hola Xingyue, me gustaría hablar sobre el alcance de las muestras y el MOQ específico del proyecto.",
    ar: "مرحباً Xingyue، أرغب في مناقشة نطاق العينات والحد الأدنى للطلب حسب المشروع.",
  },
  "quality-control": {
    en: "Hello Xingyue, I would like to discuss quality checks and pre-shipment review for a jewelry project.",
    es: "Hola Xingyue, me gustaría hablar sobre los controles de calidad y la revisión antes del envío.",
    ar: "مرحباً Xingyue، أرغب في مناقشة فحوصات الجودة والمراجعة قبل الشحن.",
  },
  "contact-form": {
    en: "Hello Xingyue, I would like to discuss a jewelry project.",
    es: "Hola Xingyue, me gustaría hablar sobre un proyecto de joyería.",
    ar: "مرحباً Xingyue، أود مناقشة مشروع مجوهرات.",
  },
};

const whatsappFieldOrder: Record<ContactMessageContext, ContactInquiryField[]> = {
  general: [
    "name",
    "companyOrBrand",
    "businessType",
    "productInterest",
    "targetQuantity",
    "destinationCountry",
    "targetMarket",
    "material",
    "stone",
    "referenceUrl",
    "packagingRequirements",
    "expectedTiming",
    "message",
  ],
  product: [
    "name",
    "companyOrBrand",
    "businessType",
    "productInterest",
    "targetQuantity",
    "destinationCountry",
    "targetMarket",
    "material",
    "stone",
    "referenceUrl",
    "packagingRequirements",
    "expectedTiming",
    "message",
  ],
  "start-jewelry-brand": [
    "name",
    "companyOrBrand",
    "businessType",
    "productInterest",
    "targetQuantity",
    "destinationCountry",
    "targetMarket",
    "material",
    "stone",
    "packagingRequirements",
    "expectedTiming",
    "message",
  ],
  "sample-moq": [
    "name",
    "companyOrBrand",
    "productInterest",
    "targetQuantity",
    "destinationCountry",
    "targetMarket",
    "material",
    "stone",
    "referenceUrl",
    "packagingRequirements",
    "expectedTiming",
    "message",
  ],
  "quality-control": [
    "name",
    "companyOrBrand",
    "productInterest",
    "targetQuantity",
    "destinationCountry",
    "targetMarket",
    "material",
    "stone",
    "referenceUrl",
    "packagingRequirements",
    "expectedTiming",
    "message",
  ],
  "contact-form": contactInquiryFields.filter((field) => field !== "email" && field !== "whatsapp"),
};

function resolveContext(source: ContactSource, context?: ContactMessageContext) {
  return context ?? contextBySource[source];
}

function resolveEmailAddress(emailHref?: string) {
  if (!emailHref?.startsWith("mailto:")) return contactConfig.email;
  return emailHref.slice("mailto:".length).split("?", 1)[0] || contactConfig.email;
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function buildWhatsAppInquiryUrl({
  context,
  formData,
  interest,
  locale,
  source,
}: {
  context?: ContactMessageContext;
  formData?: Partial<ContactInquiry>;
  interest?: string;
  locale?: string;
  source?: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedSource = normalizeSource(source);
  const normalizedInterest = normalizeInterest(interest);
  const messageContext = resolveContext(normalizedSource, context);
  const labels = messageLabels[normalizedLocale];
  const lines = [whatsappOpenings[messageContext][normalizedLocale]];

  for (const field of whatsappFieldOrder[messageContext]) {
    const value = formData?.[field];
    if (nonEmpty(value)) lines.push(`${labels[field]}: ${value.trim()}`);
  }

  const message = lines.join("\n");
  const params = new URLSearchParams({
    text: message,
    locale: normalizedLocale,
    source: normalizedSource,
    interest: normalizedInterest,
    contactMethod: "whatsapp",
  });
  return `${contactConfig.whatsappHref}?${params.toString()}`;
}

export function buildInquiryEmailUrl({
  context,
  emailHref,
  formData,
  includeTracking = true,
  interest,
  locale,
  source,
  subject,
}: {
  context?: ContactMessageContext;
  emailHref?: string;
  formData?: Partial<ContactInquiry>;
  includeTracking?: boolean;
  interest?: string;
  locale?: string;
  source?: string;
  subject?: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedSource = normalizeSource(source);
  const normalizedInterest = normalizeInterest(interest);
  const messageContext = resolveContext(normalizedSource, context);
  const labels = messageLabels[normalizedLocale];
  const bodyLines = contactInquiryFields
    .filter((field) => nonEmpty(formData?.[field]))
    .map((field) => `${labels[field]}: ${String(formData?.[field]).trim()}`);
  const suffix = formData?.companyOrBrand || formData?.name;
  const baseSubject = subject ?? contextEmailSubjects[messageContext][normalizedLocale];
  const finalSubject = messageContext === "contact-form" && nonEmpty(suffix)
    ? `${baseSubject} - ${suffix.trim()}`
    : baseSubject;
  const params = new URLSearchParams({ subject: finalSubject });

  if (bodyLines.length > 0) params.set("body", bodyLines.join("\n"));
  if (includeTracking) {
    params.set("locale", normalizedLocale);
    params.set("source", normalizedSource);
    params.set("interest", normalizedInterest);
    params.set("contactMethod", "email");
  }

  return `mailto:${resolveEmailAddress(emailHref)}?${params.toString().replace(/\+/g, "%20")}`;
}

export function emailInquiryHref(
  locale: string = "en",
  subject?: string,
  options: { context?: ContactMessageContext; interest?: string; source?: string } = {},
) {
  const normalizedLocale = normalizeLocale(locale);
  return buildInquiryEmailUrl({
    context: options.context ?? "general",
    interest: options.interest,
    locale: normalizedLocale,
    source: options.source ?? "general",
    subject,
  });
}
