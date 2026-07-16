import { describe, expect, it } from "vitest";
import { createContactInquiryReference, inquirySheetHeaders, parseContactInquiry, sanitizeSheetCell } from "./contact-inquiry";

const validInquiry = {
  name: "Avery Chen",
  email: "avery@example.com",
  companyOrBrand: "Luna Jewelry",
  whatsapp: "+1 555 0100",
  businessType: "Boutique store",
  productInterest: "Tennis jewelry",
  targetQuantity: "Project estimate",
  destinationCountry: "United States",
  targetMarket: "North America",
  referenceUrl: "https://example.com/reference",
  material: "18K gold",
  stone: "Lab-grown diamond",
  packagingRequirements: "Private label packaging",
  expectedTiming: "Seasonal launch planning",
  message: "Need a wholesale quote.",
};

describe("contact inquiry data model", () => {
  it("accepts a complete inquiry with all approved fields", () => {
    const result = parseContactInquiry(validInquiry);
    expect(result).toEqual({ ok: true, data: validInquiry });
  });

  it("returns field-level errors for required fields", () => {
    const result = parseContactInquiry({});
    expect(result).toEqual({
      ok: false,
      fieldErrors: {
        name: "required",
        email: "required",
        businessType: "required",
        productInterest: "required",
        targetQuantity: "required",
        destinationCountry: "required",
        message: "required",
      },
    });
  });

  it("rejects invalid email and reference URLs", () => {
    const result = parseContactInquiry({ ...validInquiry, email: "not-an-email", referenceUrl: "javascript:bad" });
    expect(result).toEqual({ ok: false, fieldErrors: { email: "invalid_email", referenceUrl: "invalid_reference_url" } });
  });

  it("keeps the original sixteen sheet headers before appended fields", () => {
    expect(inquirySheetHeaders.slice(0, 16)).toEqual([
      "提交时间", "页面语言", "来源页面", "客户姓名", "公司名称", "客户邮箱", "WhatsApp或电话", "国家或地区",
      "感兴趣产品", "采购数量", "定制需求", "留言内容", "当前页面链接", "浏览器信息", "跟进状态", "备注",
    ]);
    expect(inquirySheetHeaders.slice(16)).toEqual([
      "Business Type", "Target Market", "Reference URL", "Material", "Stone", "Packaging Requirements", "Expected Timing", "Consent Given",
    ]);
  });

  it("sanitizes spreadsheet formula prefixes", () => {
    expect(sanitizeSheetCell("=IMPORTXML('https://example.com')")).toBe("'=IMPORTXML('https://example.com')");
    expect(sanitizeSheetCell("+8613324888759")).toBe("'+8613324888759");
    expect(sanitizeSheetCell("regular message")).toBe("regular message");
  });

  it("creates a readable inquiry reference", () => {
    expect(createContactInquiryReference("2026-06-28T05:10:00.000Z")).toMatch(/^XY-20260628-[A-Z0-9]{4}$/);
  });
});
