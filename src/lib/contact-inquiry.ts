export const contactInquiryFieldLabels = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "WhatsApp / Phone",
  country: "Country",
  productInterest: "Product Interest",
  quantity: "Quantity",
  customRequirement: "Custom Requirement",
  message: "Message",
} as const;

export type ContactInquiryField = keyof typeof contactInquiryFieldLabels;

export type ContactInquiry = Record<ContactInquiryField, string>;

export type ContactInquiryFieldErrors = Partial<Record<ContactInquiryField, string>>;

export type ContactInquiryParseResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; fieldErrors: ContactInquiryFieldErrors };

export type ContactInquiryLocale = "en" | "ar" | "es";

export type ContactInquiryMetadata = {
  locale?: string;
  sourcePage?: string;
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
};

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
] as const;

const requiredFields = Object.keys(contactInquiryFieldLabels) as ContactInquiryField[];

const formulaPrefixPattern = /^[=+\-@]/;

function readTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeSheetCell(value: unknown) {
  const normalized = readTrimmedString(value);

  if (formulaPrefixPattern.test(normalized)) {
    return `'${normalized}`;
  }

  return normalized;
}

export function parseContactInquiry(input: unknown): ContactInquiryParseResult {
  const source =
    input && typeof input === "object" ? (input as Partial<Record<ContactInquiryField, unknown>>) : {};

  const data = requiredFields.reduce((draft, field) => {
    draft[field] = readTrimmedString(source[field]);
    return draft;
  }, {} as ContactInquiry);

  const fieldErrors = requiredFields.reduce((errors, field) => {
    if (!data[field]) {
      errors[field] = contactInquiryFieldLabels[field];
    }
    return errors;
  }, {} as ContactInquiryFieldErrors);

  if (data.email && !isValidEmail(data.email)) {
    fieldErrors.email = contactInquiryFieldLabels.email;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data };
}

export function sheetLanguageFromLocale(locale: string | undefined): InquirySheetRecord["pageLanguage"] {
  if (locale === "ar") {
    return "阿语";
  }

  if (locale === "es") {
    return "西语";
  }

  return "英文";
}

export function createInquirySheetRecord(
  inquiry: ContactInquiry,
  metadata: ContactInquiryMetadata = {},
  now = new Date(),
): InquirySheetRecord {
  return {
    submittedAt: now.toLocaleString("zh-CN", { hour12: false, timeZone: "Asia/Shanghai" }),
    pageLanguage: sheetLanguageFromLocale(metadata.locale),
    sourcePage: sanitizeSheetCell(metadata.sourcePage),
    customerName: sanitizeSheetCell(inquiry.name),
    companyName: sanitizeSheetCell(inquiry.company),
    customerEmail: sanitizeSheetCell(inquiry.email),
    phone: sanitizeSheetCell(inquiry.phone),
    country: sanitizeSheetCell(inquiry.country),
    productInterest: sanitizeSheetCell(inquiry.productInterest),
    quantity: sanitizeSheetCell(inquiry.quantity),
    customRequirement: sanitizeSheetCell(inquiry.customRequirement),
    message: sanitizeSheetCell(inquiry.message),
    currentUrl: sanitizeSheetCell(metadata.currentUrl),
    browserInfo: sanitizeSheetCell(metadata.browserInfo),
    followUpStatus: "新询盘",
    note: "",
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
  ];
}

export function createContactInquiryReference(now = new Date().toISOString()) {
  const parsedDate = new Date(now);
  const datePart = Number.isNaN(parsedDate.getTime())
    ? new Date().toISOString().slice(0, 10).replaceAll("-", "")
    : parsedDate.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");

  return `XY-${datePart}-${suffix}`;
}
