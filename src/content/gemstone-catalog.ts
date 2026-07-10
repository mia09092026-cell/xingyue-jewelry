import type { SupportedLocale } from "@/lib/i18n";

export type GemstoneCatalogCopy = {
  seo: {
    title: string;
    description: string;
  };
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroNote: string;
  colors: {
    eyebrow: string;
    title: string;
    copy: string;
    view: string;
    representative: string;
    names: Record<string, string>;
  };
  types: {
    eyebrow: string;
    title: string;
    copy: string;
    colors: string;
    moq: string;
    fromPrice: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  fields: {
    color: string;
    shape: string;
    sizeRange: string;
    quality: string;
    moq: string;
    referencePrice: string;
    availability: string;
  };
  cta: {
    getWholesalePrice: string;
    addInquiry: string;
    whatsapp: string;
    email: string;
    sendInquiry: string;
    requestCatalog: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    copy: string;
    disclaimer: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ title: string; copy: string }>;
  };
  payment: {
    eyebrow: string;
    title: string;
    copy: string;
    options: string[];
  };
  closing: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const gemstoneCatalogContent: { en: GemstoneCatalogCopy } = {
  en: {
    seo: {
      title: "Lab-Grown Gemstones Wholesale by Color | Xingyue Jewelry",
      description:
        "Wholesale lab-grown ruby, sapphire, emerald, spinel, moissanite and colored gemstones by color, size and shape. OEM/ODM jewelry manufacturing and custom stone sourcing.",
    },
    navLabel: "Lab-Grown Gemstones",
    eyebrow: "B2B Loose Stone Sourcing",
    title: "Lab-Grown Gemstones Wholesale by Color",
    subtitle:
      "A quote-ready sourcing catalog for jewelry brands, wholesalers and OEM / ODM buyers.",
    heroNote:
      "Browse color families, calibrated sizes, mixed cuts and project-based stone sourcing. Final supply is confirmed against your size, quality, quantity and production brief.",
    colors: {
      eyebrow: "Source by Color",
      title: "Build a stone direction around your market.",
      copy:
        "Start with a color family, then confirm stone type, cut, millimeter size, matching tolerance and order quantity.",
      view: "View Stones",
      representative: "Representative stones",
      names: {
        red: "Red",
        blue: "Blue",
        green: "Green",
        pink: "Pink",
        purple: "Purple",
        "yellow-champagne": "Yellow / Champagne",
        "white-colorless": "White / Colorless",
      },
    },
    types: {
      eyebrow: "Stone Categories",
      title: "Wholesale gemstone programs for repeat production.",
      copy:
        "Choose a material direction for samples, calibrated batches, matched pairs or custom jewelry manufacturing.",
      colors: "Available colors",
      moq: "MOQ",
      fromPrice: "Reference price",
    },
    catalog: {
      eyebrow: "Quote-Ready Stone Cards",
      title: "Popular specifications for buyer discussion.",
      copy:
        "These cards are sourcing examples, not fixed retail inventory. Send the stone name with your target size, quantity and quality requirement.",
    },
    fields: {
      color: "Color",
      shape: "Shape",
      sizeRange: "Size range",
      quality: "Quality",
      moq: "MOQ",
      referencePrice: "Reference price",
      availability: "Availability",
    },
    cta: {
      getWholesalePrice: "Get Wholesale Price",
      addInquiry: "Add to Inquiry",
      whatsapp: "Contact on WhatsApp",
      email: "Email Inquiry",
      sendInquiry: "Send Inquiry",
      requestCatalog: "Request Stone Catalog",
    },
    pricing: {
      eyebrow: "Reference Pricing",
      title: "Reference wholesale price guidance",
      copy:
        "Use these bands for early budget planning. A formal quotation follows specification review and availability confirmation.",
      disclaimer:
        "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.",
    },
    capabilities: {
      eyebrow: "Wholesale & Custom Support",
      title: "From loose stones to finished jewelry production.",
      copy:
        "Xingyue supports the technical details overseas buyers need before approving samples and bulk production.",
      items: [
        {
          title: "Calibrated & Matched Supply",
          copy: "Discuss millimeter sizes, matching tolerance, pairs, lots and repeat-order consistency.",
        },
        {
          title: "MOQ & Bulk Planning",
          copy: "MOQ is confirmed by material, size, cut, color, calibration and production volume.",
        },
        {
          title: "Custom Cutting & Sourcing",
          copy: "Share CAD, setting dimensions or reference images for custom stone recommendations.",
        },
        {
          title: "OEM / ODM Jewelry",
          copy: "Combine loose stone sourcing with 14K / 18K gold, S925, setting, QC and packaging.",
        },
        {
          title: "Certificate Options",
          copy: "Certificate support is discussed by stone type, size, grade, market and budget.",
        },
        {
          title: "Worldwide Delivery",
          copy: "Sampling, production lead time, export packing and shipping are confirmed before order.",
        },
      ],
    },
    payment: {
      eyebrow: "B2B Order Support",
      title: "Payment options for confirmed orders",
      copy:
        "For confirmed wholesale or sample orders, we can provide PayPal invoice, secure credit card payment link, bank transfer, or Wise transfer. Large custom orders usually require a deposit before production and balance before shipment.",
      options: [
        "PayPal invoice",
        "Credit card payment link",
        "Bank transfer / T/T",
        "Wise transfer",
        "Sample order payment",
        "Deposit before production",
        "Balance before shipping",
      ],
    },
    closing: {
      eyebrow: "Prepare Your Stone Brief",
      title: "Tell us the color, cut, size and quantity you need.",
      copy:
        "Add a stone to the inquiry form or send your reference design. We will review availability, MOQ, calibration, quality and production options.",
    },
  },
};

export function getGemstoneCatalogContent(_locale: SupportedLocale = "en") {
  return gemstoneCatalogContent.en;
}
