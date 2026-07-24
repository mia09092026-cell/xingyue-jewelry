import { contactConfig } from "@/lib/contact-config";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuejewelry.com";

export const siteConfig = {
  name: "XINGYUE",
  url: configuredUrl.replace(/\/$/, ""),
  email: contactConfig.email,
  description:
    "Lab-grown diamond and colored gemstone manufacturing support from Wuzhou for jewelry brands, retailers and designers.",
  socialImage: "/images/factory-workshop-overview.webp",
};
