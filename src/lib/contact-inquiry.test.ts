import { describe, expect, it } from "vitest";
import {
  contactInquiryFieldLabels,
  createContactInquiryReference,
  inquirySheetHeaders,
  sanitizeSheetCell,
  parseContactInquiry,
} from "./contact-inquiry";

describe("contact inquiry data model", () => {
  it("accepts a complete wholesale inquiry with the requested fields", () => {
    const result = parseContactInquiry({
      name: "Avery Chen",
      company: "Luna Jewelry",
      email: "avery@example.com",
      phone: "+1 555 0100",
      country: "United States",
      productInterest: "Lab-grown diamond tennis bracelets",
      quantity: "300 pieces",
      customRequirement: "Private label packaging",
      message:
        "Need S925 moissanite tennis bracelets with private label packaging and sample confirmation.",
    });

    expect(result.ok).toBe(true);
    expect(result.ok && result.data).toMatchObject({
      name: "Avery Chen",
      company: "Luna Jewelry",
      email: "avery@example.com",
      phone: "+1 555 0100",
      country: "United States",
      productInterest: "Lab-grown diamond tennis bracelets",
      quantity: "300 pieces",
      customRequirement: "Private label packaging",
    });
  });

  it("returns field-level errors when required inquiry details are missing", () => {
    const result = parseContactInquiry({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      productInterest: "",
      quantity: "",
      customRequirement: "",
      message: "",
    });

    expect(result.ok).toBe(false);
    expect(!result.ok && result.fieldErrors).toEqual({
      name: contactInquiryFieldLabels.name,
      company: contactInquiryFieldLabels.company,
      email: contactInquiryFieldLabels.email,
      phone: contactInquiryFieldLabels.phone,
      country: contactInquiryFieldLabels.country,
      productInterest: contactInquiryFieldLabels.productInterest,
      quantity: contactInquiryFieldLabels.quantity,
      customRequirement: contactInquiryFieldLabels.customRequirement,
      message: contactInquiryFieldLabels.message,
    });
  });

  it("rejects invalid email addresses", () => {
    const result = parseContactInquiry({
      name: "Avery Chen",
      company: "Luna Jewelry",
      email: "not-an-email",
      phone: "+1 555 0100",
      country: "United States",
      productInterest: "Lab-grown diamond tennis bracelets",
      quantity: "300 pieces",
      customRequirement: "Private label packaging",
      message: "Need a wholesale quote.",
    });

    expect(result.ok).toBe(false);
    expect(!result.ok && result.fieldErrors).toMatchObject({
      email: contactInquiryFieldLabels.email,
    });
  });

  it("uses Chinese Google Sheets headers in the requested order", () => {
    expect(inquirySheetHeaders).toEqual([
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
    ]);
  });

  it("sanitizes spreadsheet formula prefixes before writing user input", () => {
    expect(sanitizeSheetCell("=IMPORTXML('https://example.com')")).toBe(
      "'=IMPORTXML('https://example.com')",
    );
    expect(sanitizeSheetCell("+8613324888759")).toBe("'+8613324888759");
    expect(sanitizeSheetCell("regular message")).toBe("regular message");
  });

  it("creates a readable inquiry reference for successful submissions", () => {
    expect(createContactInquiryReference("2026-06-28T05:10:00.000Z")).toMatch(
      /^XY-20260628-[A-Z0-9]{4}$/,
    );
  });
});
