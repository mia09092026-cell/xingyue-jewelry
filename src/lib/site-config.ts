import { contactConfig } from "@/lib/contact-config";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zarivelle.com";

export const siteConfig = {
  name: "Zarivelle",
  url: configuredUrl.replace(/\/$/, ""),
  email: contactConfig.email,
  description:
    "Wholesale finished 925 silver, moissanite, colored lab-grown gemstone and lab-grown diamond jewelry for boutiques, brands and online sellers. Low MOQ, OEM/ODM support and fast dispatch.",
  socialImage: "/images/factory-workshop-overview.webp",
};
