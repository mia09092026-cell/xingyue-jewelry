const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuejewelry.com";

export const siteConfig = {
  name: "XINGYUE",
  url: configuredUrl.replace(/\/$/, ""),
  email: "sales@xingyuejewelry.com",
  description:
    "Moissanite and lab-grown diamond jewelry manufacturing for overseas wholesale buyers.",
  socialImage: "/images/xingyue-hero.webp",
};
