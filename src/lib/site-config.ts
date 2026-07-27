import { contactConfig } from "@/lib/contact-config";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuejewelry.com";

export const siteConfig = {
  name: "XINGYUE",
  url: configuredUrl.replace(/\/$/, ""),
  email: contactConfig.email,
  description:
    "Custom 925 sterling silver jewelry manufacturing with lab-created colored gemstones, moissanite, OEM/ODM sampling, quality control and private-label packaging.",
  socialImage: "/images/factory-workshop-overview.webp",
};
