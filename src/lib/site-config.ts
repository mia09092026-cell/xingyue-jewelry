import { contactConfig } from "@/lib/contact-config";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuejewelry.com";

export const siteConfig = {
  name: "XINGYUE",
  url: configuredUrl.replace(/\/$/, ""),
  email: contactConfig.email,
  description:
    "Xingyue operates its own jewelry factory in Wuzhou, manufacturing lab-grown diamond jewelry and custom OEM/ODM collections for brands, designers, boutiques and wholesale buyers.",
  socialImage: "/images/factory-workshop-overview.webp",
};
