import { absoluteUrl } from "./seo";
import { siteConfig } from "./site-config";
import { products } from "./site-data";
import type { SupportedLocale } from "./i18n";

type Product = (typeof products)[number];
type LinkItem = { name: string; path: string };

const organizationDescriptions: Record<SupportedLocale, string> = {
  en: "Xingyue provides lab-grown diamond and colored gemstone manufacturing support from Wuzhou for jewelry brands, retailers and designers.",
  es: "Xingyue ofrece apoyo de fabricación de diamantes de laboratorio y gemas de color desde Wuzhou para marcas, minoristas y diseñadores de joyería.",
  ar: "تقدم Xingyue من ووتشو دعماً لتصنيع مجوهرات الألماس المزروع والأحجار الكريمة الملونة للعلامات التجارية وتجار التجزئة والمصممين.",
};

export function organizationSchema(locale: SupportedLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-star-moon.png"),
    email: siteConfig.email,
    description: organizationDescriptions[locale],
    knowsAbout: [
      "Lab-grown diamonds",
      "Colored gemstones",
      "Custom jewelry manufacturing",
      "Jewelry sampling",
      "Private-label packaging",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: ["English", "Spanish", "Arabic"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["en", "es", "ar"],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbSchema(items: LinkItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(items: LinkItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({
  audience,
  description,
  name,
  serviceType,
}: {
  audience: string;
  description: string;
  name: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    material: product.material,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}
