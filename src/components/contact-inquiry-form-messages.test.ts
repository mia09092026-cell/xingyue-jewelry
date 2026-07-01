import { describe, expect, it } from "vitest";
import { getLocalizedInquiryErrorMessage } from "./contact-inquiry-form";

describe("localized inquiry form error messages", () => {
  it("returns configuration-in-progress messages in every supported language", () => {
    expect(getLocalizedInquiryErrorMessage("en", "CONFIG_MISSING")).toBe(
      "Inquiry service is being configured. Please contact us by WhatsApp or email.",
    );
    expect(getLocalizedInquiryErrorMessage("ar", "CONFIG_MISSING")).toBe(
      "خدمة الاستفسار قيد الإعداد. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
    );
    expect(getLocalizedInquiryErrorMessage("es", "CONFIG_MISSING")).toBe(
      "El servicio de consultas se está configurando. Por favor contáctanos por WhatsApp o correo electrónico.",
    );
  });
});
