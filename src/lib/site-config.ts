const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuejewelry.com";

export const siteConfig = {
  name: "XINGYUE",
  url: configuredUrl.replace(/\/$/, ""),
  email: "sales@xingyuejewelry.com",
  description:
    "Jewelry manufacturing and supply chain support for emerging brands, boutique stores and independent designers.",
  socialImage: "/images/xingyue-hero.webp",
};
