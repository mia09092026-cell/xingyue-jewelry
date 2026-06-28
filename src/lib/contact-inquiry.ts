export const contactInquiryFieldLabels = {
  contactName: "Contact Person",
  phone: "Phone / WhatsApp",
  companyBrand: "Company / Brand",
  projectType: "Project Type",
  estimatedQuantity: "Estimated Quantity",
  deliveryCity: "Delivery City",
  budgetRange: "Budget Range",
  requirements: "Requirements",
} as const;

export type ContactInquiryField = keyof typeof contactInquiryFieldLabels;

export type ContactInquiry = Record<ContactInquiryField, string>;

export type ContactInquiryFieldErrors = Partial<Record<ContactInquiryField, string>>;

export type ContactInquiryParseResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; fieldErrors: ContactInquiryFieldErrors };

export const contactProjectTypes = [
  { value: "moissanite-wholesale", label: "Moissanite Wholesale" },
  { value: "lab-grown-diamond-jewelry", label: "Lab-Grown Diamond Jewelry" },
  { value: "colored-gemstones", label: "Lab-Grown Colored Gemstones" },
  { value: "chains", label: "Cuban / Tennis Chains" },
  { value: "custom-manufacturing", label: "Custom Jewelry Manufacturing" },
  { value: "oem-odm", label: "OEM / ODM Production" },
] as const;

export const contactBudgetRanges = [
  { value: "under-usd-3000", label: "Under USD 3,000" },
  { value: "usd-3000-5000", label: "USD 3,000 - 5,000" },
  { value: "usd-5000-10000", label: "USD 5,000 - 10,000" },
  { value: "usd-10000-30000", label: "USD 10,000 - 30,000" },
  { value: "usd-30000-plus", label: "USD 30,000+" },
  { value: "to-be-discussed", label: "To Be Discussed" },
] as const;

const requiredFields = Object.keys(contactInquiryFieldLabels) as ContactInquiryField[];

function readTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function hasOption(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.some((option) => option.value === value);
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

  if (data.projectType && !hasOption(contactProjectTypes, data.projectType)) {
    fieldErrors.projectType = contactInquiryFieldLabels.projectType;
  }

  if (data.budgetRange && !hasOption(contactBudgetRanges, data.budgetRange)) {
    fieldErrors.budgetRange = contactInquiryFieldLabels.budgetRange;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data };
}

export function createContactInquiryReference(now = new Date().toISOString()) {
  const parsedDate = new Date(now);
  const datePart = Number.isNaN(parsedDate.getTime())
    ? new Date().toISOString().slice(0, 10).replaceAll("-", "")
    : parsedDate.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");

  return `XY-${datePart}-${suffix}`;
}
