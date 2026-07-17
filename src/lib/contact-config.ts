const businessEmail = "sales@xingyuejewelry.com";
const businessWhatsApp = "+8613324888759";

export const contactConfig = {
  email: businessEmail,
  whatsapp: businessWhatsApp,
  whatsappHref: `https://wa.me/${businessWhatsApp.replace(/\D/g, "")}`,
} as const;
