const canonicalFieldLabels = {
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
} as const;

export type ContactInquiryLegacyField = "company" | "phone" | "country" | "quantity" | "customRequirement";
export type ContactInquiryField = keyof typeof canonicalFieldLabels;
export const contactInquiryFieldLabels = {
  ...canonicalFieldLabels,
  company: "Company",
  phone: "WhatsApp / Phone",
  country: "Country",
  quantity: "Quantity",
  customRequirement: "Custom Requirement",
} as typeof canonicalFieldLabels & Record<ContactInquiryLegacyField, string>;
export const contactInquiryFields = Object.keys(canonicalFieldLabels) as ContactInquiryField[];
export type ContactInquiry = Record<ContactInquiryField, string> & Partial<Record<ContactInquiryLegacyField, string>>;
export type LegacyContactInquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  quantity: string;
  customRequirement: string;
  message: string;
};
export type ContactInquiryValidationField = ContactInquiryField | "consent";
export type ContactInquiryFieldErrorCode = "required" | "consent_required" | "invalid_email" | "invalid_reference_url" | "too_long";
export type ContactInquiryFieldErrors = Partial<Record<ContactInquiryValidationField, ContactInquiryFieldErrorCode>>;

export type ContactInquiryParseResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; fieldErrors: ContactInquiryFieldErrors };

export type ContactInquiryLocale = "en" | "ar" | "es";
export type ContactInquiryPayloadMetadata = { locale: ContactInquiryLocale; source: string; consent: true };
export type ContactInquiryPayloadParseResult =
  | { ok: true; data: ContactInquiry; metadata: ContactInquiryPayloadMetadata }
  | { ok: false; fieldErrors: ContactInquiryFieldErrors; unknownFields?: string[] };

export type ContactInquiryMetadata = {
  locale?: string;
  source?: string;
  sourcePage?: string;
  consent?: boolean;
  currentUrl?: string;
  browserInfo?: string;
};

export type InquirySheetRecord = {
  submittedAt: string;
  pageLanguage: "英文" | "阿语" | "西语";
  sourcePage: string;
  customerName: string;
  companyName: string;
  customerEmail: string;
  phone: string;
  country: string;
  productInterest: string;
  quantity: string;
  customRequirement: string;
  message: string;
  currentUrl: string;
  browserInfo: string;
  followUpStatus: "新询盘";
  note: string;
  businessType: string;
  targetMarket: string;
  referenceUrl: string;
  material: string;
  stone: string;
  packagingRequirements: string;
  expectedTiming: string;
  consentGiven: string;
};

// Keep the original A:P columns in their existing order. New columns are appended only.
export const inquirySheetHeaders = [
  "提交时间",
  "页面语言",
  "来源页面",
  "客户姓名",
  "公司名称",
  "客户邮箱",
  "WhatsApp或电话",
  "国家或地区",
  "感兴趣产品",
  "采购数量",
  "定制需求",
  "留言内容",
  "当前页面链接",
  "浏览器信息",
  "跟进状态",
  "备注",
  "Business Type",
  "Target Market",
  "Reference URL",
  "Material",
  "Stone",
  "Packaging Requirements",
  "Expected Timing",
  "Consent Given",
] as const;

export const inquirySheetRange = "A:X";

const requiredFields: ContactInquiryField[] = [
  "name",
  "email",
  "businessType",
  "productInterest",
  "targetQuantity",
  "destinationCountry",
  "message",
];

const fieldMaxLengths: Record<ContactInquiryField, number> = {
  name: 120,
  email: 254,
  companyOrBrand: 160,
  whatsapp: 60,
  businessType: 120,
  productInterest: 200,
  targetQuantity: 120,
  destinationCountry: 120,
  targetMarket: 160,
  referenceUrl: 2048,
  material: 120,
  stone: 120,
  packagingRequirements: 200,
  expectedTiming: 160,
  message: 4000,
};

const formulaPrefixPattern = /^[=+\-@]/;
const payloadSystemFields = new Set(["locale", "source", "consent", "honeypot"]);
const legacyPayloadFields = new Set(["company", "phone", "country", "quantity", "customRequirement"]);

function readTrimmedString(value: unknown) {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";
}

function readLocale(value: unknown): ContactInquiryLocale {
  return value === "ar" || value === "es" ? value : "en";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidReferenceUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function readRecord(input: unknown): Record<string, unknown> {
  return input && typeof input === "object" ? (input as Record<string, unknown>) : {};
}

function readField(source: Record<string, unknown>, field: ContactInquiryField) {
  const legacyByField: Partial<Record<ContactInquiryField, ContactInquiryLegacyField>> = {
    companyOrBrand: "company",
    whatsapp: "phone",
    destinationCountry: "country",
    targetQuantity: "quantity",
    packagingRequirements: "customRequirement",
  };
  return readTrimmedString(source[field] ?? (legacyByField[field] ? source[legacyByField[field]!] : ""));
}

function validateInquiryFields(input: unknown): ContactInquiryParseResult {
  const source = readRecord(input);
  const data = contactInquiryFields.reduce((draft, field) => {
    draft[field] = readField(source, field);
    return draft;
  }, {} as ContactInquiry);
  const fieldErrors: ContactInquiryFieldErrors = {};

  for (const field of requiredFields) {
    if (!data[field]) fieldErrors[field] = "required";
  }
  for (const field of contactInquiryFields) {
    if (data[field].length > fieldMaxLengths[field]) fieldErrors[field] = "too_long";
  }
  if (data.email && !isValidEmail(data.email)) fieldErrors.email = "invalid_email";
  if (data.referenceUrl && !isValidReferenceUrl(data.referenceUrl)) fieldErrors.referenceUrl = "invalid_reference_url";

  return Object.keys(fieldErrors).length > 0 ? { ok: false, fieldErrors } : { ok: true, data };
}

export function parseContactInquiry(input: unknown): ContactInquiryParseResult {
  return validateInquiryFields(input);
}

export function parseContactInquiryPayload(input: unknown): ContactInquiryPayloadParseResult {
  const source = readRecord(input);
  const allowedFields = new Set([...contactInquiryFields, ...payloadSystemFields, ...legacyPayloadFields]);
  const unknownFields = Object.keys(source).filter((field) => !allowedFields.has(field));
  const parsed = validateInquiryFields(source);
  const fieldErrors: ContactInquiryFieldErrors = parsed.ok ? {} : parsed.fieldErrors;

  if (source.consent !== true) fieldErrors.consent = "consent_required";
  if (unknownFields.length > 0 || Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, ...(unknownFields.length > 0 ? { unknownFields } : {}) };
  }

  return {
    ok: true,
    data: parsed.ok ? parsed.data : ({} as ContactInquiry),
    metadata: { locale: readLocale(source.locale), source: readTrimmedString(source.source), consent: true },
  };
}

export function sanitizeSheetCell(value: unknown) {
  const normalized = readTrimmedString(value);
  return formulaPrefixPattern.test(normalized) ? `'${normalized}` : normalized;
}

export function sheetLanguageFromLocale(locale: string | undefined): InquirySheetRecord["pageLanguage"] {
  if (locale === "ar") return "阿语";
  if (locale === "es") return "西语";
  return "英文";
}

function normalizeInquiry(inquiry: ContactInquiry | LegacyContactInquiry): ContactInquiry {
  const source = inquiry as Partial<ContactInquiry> & Partial<LegacyContactInquiry>;
  return {
    name: source.name ?? "",
    email: source.email ?? "",
    companyOrBrand: source.companyOrBrand ?? source.company ?? "",
    whatsapp: source.whatsapp ?? source.phone ?? "",
    businessType: source.businessType ?? "",
    productInterest: source.productInterest ?? "",
    targetQuantity: source.targetQuantity ?? source.quantity ?? "",
    destinationCountry: source.destinationCountry ?? source.country ?? "",
    targetMarket: source.targetMarket ?? "",
    referenceUrl: source.referenceUrl ?? "",
    material: source.material ?? "",
    stone: source.stone ?? "",
    packagingRequirements: source.packagingRequirements ?? source.customRequirement ?? "",
    expectedTiming: source.expectedTiming ?? "",
    message: source.message ?? "",
  };
}

export function createInquirySheetRecord(inquiry: ContactInquiry | LegacyContactInquiry, metadata: ContactInquiryMetadata = {}, now = new Date()): InquirySheetRecord {
  const normalized = normalizeInquiry(inquiry);
  const customRequirement = [normalized.material, normalized.stone, normalized.packagingRequirements].filter(Boolean).join(" | ");
  return {
    submittedAt: now.toLocaleString("zh-CN", { hour12: false, timeZone: "Asia/Shanghai" }),
    pageLanguage: sheetLanguageFromLocale(metadata.locale),
    sourcePage: sanitizeSheetCell(metadata.source ?? metadata.sourcePage),
    customerName: sanitizeSheetCell(normalized.name),
    companyName: sanitizeSheetCell(normalized.companyOrBrand),
    customerEmail: sanitizeSheetCell(normalized.email),
    phone: sanitizeSheetCell(normalized.whatsapp),
    country: sanitizeSheetCell(normalized.destinationCountry),
    productInterest: sanitizeSheetCell(normalized.productInterest),
    quantity: sanitizeSheetCell(normalized.targetQuantity),
    customRequirement: sanitizeSheetCell(customRequirement),
    message: sanitizeSheetCell(normalized.message),
    currentUrl: sanitizeSheetCell(metadata.currentUrl),
    browserInfo: sanitizeSheetCell(metadata.browserInfo),
    followUpStatus: "新询盘",
    note: "",
    businessType: sanitizeSheetCell(normalized.businessType),
    targetMarket: sanitizeSheetCell(normalized.targetMarket),
    referenceUrl: sanitizeSheetCell(normalized.referenceUrl),
    material: sanitizeSheetCell(normalized.material),
    stone: sanitizeSheetCell(normalized.stone),
    packagingRequirements: sanitizeSheetCell(normalized.packagingRequirements),
    expectedTiming: sanitizeSheetCell(normalized.expectedTiming),
    consentGiven: metadata.consent === true ? "true" : "false",
  };
}

export function inquiryRecordToSheetRow(record: InquirySheetRecord) {
  return [
    record.submittedAt,
    record.pageLanguage,
    record.sourcePage,
    record.customerName,
    record.companyName,
    record.customerEmail,
    record.phone,
    record.country,
    record.productInterest,
    record.quantity,
    record.customRequirement,
    record.message,
    record.currentUrl,
    record.browserInfo,
    record.followUpStatus,
    record.note,
    record.businessType,
    record.targetMarket,
    record.referenceUrl,
    record.material,
    record.stone,
    record.packagingRequirements,
    record.expectedTiming,
    record.consentGiven,
  ];
}

export function createContactInquiryReference(now = new Date().toISOString()) {
  const parsedDate = new Date(now);
  const datePart = Number.isNaN(parsedDate.getTime()) ? new Date().toISOString().slice(0, 10).replaceAll("-", "") : parsedDate.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");
  return `XY-${datePart}-${suffix}`;
}
