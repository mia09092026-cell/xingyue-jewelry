import { describe, expect, it } from "vitest";
import { emailInquiryHref } from "./contact-links";

describe("localized contact links", () => {
  it("builds language-specific email subjects", () => {
    expect(emailInquiryHref("en")).toContain("subject=Wholesale%20Jewelry%20Inquiry");
    expect(emailInquiryHref("es")).toContain(
      `subject=${encodeURIComponent("Consulta de joyería mayorista XINGYUE")}`,
    );
    expect(emailInquiryHref("ar")).toContain(
      `subject=${encodeURIComponent("استفسار مجوهرات بالجملة من XINGYUE")}`,
    );
  });
});
