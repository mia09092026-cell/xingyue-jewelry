import { absoluteUrl } from "./seo";
import { siteConfig } from "./site-config";
import { products } from "./site-data";
import type { SupportedLocale } from "./i18n";

type Product = (typeof products)[number];
type LinkItem = { name: string; path: string };

const organizationDescriptions: Record<SupportedLocale, string> = {
  en: "Zarivelle 织澜 supplies finished 925 silver, moissanite, lab-grown colored gemstone and lab-grown diamond jewelry wholesale for boutiques, brands and online sellers, with OEM/ODM support, quality control and private-label packaging from Wuzhou.",
  es: "Zarivelle 织澜 ofrece joyería terminada en plata 925, moissanita, gemas de color cultivadas en laboratorio y diamantes de laboratorio al por mayor para boutiques, marcas y vendedores online, con soporte OEM/ODM, control de calidad y embalaje de marca privada desde Wuzhou.",
  ar: "تقدم Zarivelle 织澜 مجوهرات جاهزة من الفضة 925 والموسانيت والأحجار الملونة المزروعة مخبرياً والألماس المزروع بالجملة للمتاجر والعلامات التجارية والبائعين عبر الإنترنت، مع دعم OEM/ODM ومراقبة الجودة والتغليف بعلامة خاصة من ووتشو.",
};

export function organizationSchema(locale: SupportedLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/zarivelle-logo.svg"),
    email: siteConfig.email,
    description: organizationDescriptions[locale],
    knowsAbout: [
      "Wholesale finished 925 silver jewelry",
      "Moissanite wholesale jewelry",
      "Lab-grown colored gemstone jewelry",
      "Lab-grown diamond jewelry",
      "Finished jewelry wholesale",
      "OEM/ODM jewelry manufacturing",
      "Jewelry quality control",
      "Private-label packaging",
      "Wuzhou jewelry supply",
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

export function articleSchema({
  author,
  dateModified,
  datePublished,
  description,
  headline,
  image,
  path,
}: {
  author: string;
  dateModified: string;
  datePublished: string;
  description: string;
  headline: string;
  image: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: absoluteUrl(image),
    datePublished,
    dateModified,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/zarivelle-logo.svg"),
      },
    },
  };
}
