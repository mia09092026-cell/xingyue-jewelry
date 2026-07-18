import { absoluteUrl } from "./seo";
import { siteConfig } from "./site-config";
import { products } from "./site-data";
import type { SupportedLocale } from "./i18n";

type Product = (typeof products)[number];
type LinkItem = { name: string; path: string };

const organizationDescriptions: Record<SupportedLocale, string> = {
  en: siteConfig.description,
  es: "Socio de fabricación y cadena de suministro de joyería para marcas emergentes, tiendas boutique y diseñadores independientes.",
  ar: "شريك تصنيع وسلسلة توريد المجوهرات للعلامات الناشئة ومتاجر البوتيك والمصممين المستقلين.",
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
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
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
