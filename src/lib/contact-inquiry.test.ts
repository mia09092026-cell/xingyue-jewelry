import { describe, expect, it } from "vitest";
import {
  contactInquiryFieldLabels,
  createContactInquiryReference,
  parseContactInquiry,
} from "./contact-inquiry";

describe("contact inquiry data model", () => {
  it("accepts a complete wholesale inquiry with the requested fields", () => {
    const result = parseContactInquiry({
      contactName: "Avery Chen",
      phone: "+1 555 0100",
      companyBrand: "Luna Jewelry",
      projectType: "oem-odm",
      estimatedQuantity: "300 pieces",
      deliveryCity: "Los Angeles",
      budgetRange: "usd-5000-10000",
      requirements:
        "Need S925 moissanite tennis bracelets with private label packaging and sample confirmation.",
    });

    expect(result.ok).toBe(true);
    expect(result.ok && result.data).toMatchObject({
      contactName: "Avery Chen",
      phone: "+1 555 0100",
      companyBrand: "Luna Jewelry",
      projectType: "oem-odm",
      estimatedQuantity: "300 pieces",
      deliveryCity: "Los Angeles",
      budgetRange: "usd-5000-10000",
    });
  });

  it("returns field-level errors when required inquiry details are missing", () => {
    const result = parseContactInquiry({
      contactName: "",
      phone: "",
      companyBrand: "",
      projectType: "",
      estimatedQuantity: "",
      deliveryCity: "",
      budgetRange: "",
      requirements: "",
    });

    expect(result.ok).toBe(false);
    expect(!result.ok && result.fieldErrors).toEqual({
      contactName: contactInquiryFieldLabels.contactName,
      phone: contactInquiryFieldLabels.phone,
      companyBrand: contactInquiryFieldLabels.companyBrand,
      projectType: contactInquiryFieldLabels.projectType,
      estimatedQuantity: contactInquiryFieldLabels.estimatedQuantity,
      deliveryCity: contactInquiryFieldLabels.deliveryCity,
      budgetRange: contactInquiryFieldLabels.budgetRange,
      requirements: contactInquiryFieldLabels.requirements,
    });
  });

  it("creates a readable inquiry reference for successful submissions", () => {
    expect(createContactInquiryReference("2026-06-28T05:10:00.000Z")).toMatch(
      /^XY-20260628-[A-Z0-9]{4}$/,
    );
  });
});
