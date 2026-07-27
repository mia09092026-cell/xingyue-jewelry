import type { SupportedLocale } from "@/lib/i18n";
import type {
  ContactInquiryField,
  ContactInquiryFieldErrorCode,
  ContactInquiryLegacyField,
} from "@/lib/contact-inquiry";
import {
  factoryPagesContentByLocale,
  type FactoryPageContent,
  type FactoryPagePath,
} from "./factory-pages";
import {
  legalPagesContentByLocale,
  type LegalPageContent,
  type LegalPagePath,
} from "./legal-pages";
import { startBrandContentByLocale } from "./start-brand";

type NavItem = { label: string; href: string };
type SeoCopy = { title: string; description: string };
type Card = { title: string; copy: string; image?: string; alt?: string };
type VisualCard = Card & { image: string; alt: string; imageClassName?: string };
type GemstoneColorCard = { title: string; image: string; alt: string };
type FaqItem = { question: string; answer: string };
type SectionImage = { src: string; alt: string } | null;
type InquiryFieldStatus = "required" | "conditional" | "optional";
type InquiryField = { label: string; status: InquiryFieldStatus };
type StartBrandCard = { title: string; copy: string };

export type StartBrandContent = {
  seo: SeoCopy;
  sectionOrder: string[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  audience: { eyebrow: string; title: string; copy: string; items: string[] };
  preparation: {
    eyebrow: string;
    title: string;
    copy: string;
    groups: Array<{ title: string; items: string[] }>;
  };
  productDirection: {
    eyebrow: string;
    title: string;
    copy: string;
    items: StartBrandCard[];
    linkLabel: string;
  };
  support: {
    eyebrow: string;
    title: string;
    copy: string;
    phases: StartBrandCard[];
    boundary: string;
  };
  sampleMoq: {
    eyebrow: string;
    title: string;
    copy: string;
    items: StartBrandCard[];
    cta: string;
  };
  brandingPackaging: {
    eyebrow: string;
    title: string;
    copy: string;
    items: string[];
    boundary: string;
  };
  qualityProduction: {
    eyebrow: string;
    title: string;
    copy: string;
    items: StartBrandCard[];
    cta: string;
  };
  inquiry: {
    eyebrow: string;
    title: string;
    copy: string;
    statusLabels: Record<InquiryFieldStatus, string>;
    fields: InquiryField[];
    cta: string;
  };
  faq: { eyebrow: string; title: string; copy: string; items: FaqItem[] };
  finalCta: { eyebrow: string; title: string; copy: string; cta: string };
  links: {
    products: string;
    about: string;
    howWeWork: string;
    sampleMoq: string;
    quality: string;
  };
};
export type ProductSummaryId =
  | "lab-grown-diamond-rings"
  | "lab-created-colored-gemstone-pendants"
  | "moissanite-earrings"
  | "custom-tennis-bracelets";

export type ProductSummary = {
  id: ProductSummaryId;
  name: string;
  category: string;
  material: string;
  copy: string;
  image: string | null;
  alt: string | null;
  imageClassName?: string;
};
type CollectionContent = {
  seo: SeoCopy;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  options: string[];
  capabilities: string[];
  customization: string[];
  quality: Card[];
  faqs: FaqItem[];
};

export type ContactFormCopy = {
  introTitle: string;
  introCopy: string;
  fieldLabels: Partial<Record<ContactInquiryField | ContactInquiryLegacyField, string>>;
  placeholders: Partial<Record<ContactInquiryField | ContactInquiryLegacyField, string>>;
  submitting: string;
  submit: string;
  email: string;
  successTitle: string;
  successMessage: string;
  referenceLabel: string;
  errorFallback: string;
  validationPrefix: string;
  errorMessages?: Partial<Record<ContactInquiryFieldErrorCode | "consent_required" | "service_unavailable" | "duplicate_submission" | "network_error", string>>;
  consentLabel?: string;
  consentRequired?: string;
  quantityHelper?: string;
  referenceHelper?: string;
  privacyNotice?: string;
};

type LocaleContent = {
  locale: SupportedLocale;
  dir: "ltr" | "rtl";
  navigation: NavItem[];
  footer: {
    intro: string;
    pages: string;
    collections: string;
    reachUs: string;
    email: string;
    inquiry: string;
  };
  cta: {
    getWholesalePrice: string;
    requestCatalog: string;
    sendInquiry: string;
    contactWhatsapp: string;
    sendDesign: string;
    headerStartProject: string;
    discussCollection: string;
    exploreCapabilities: string;
    viewProducts: string;
    finalStartProject: string;
    discussSamplesMoq: string;
    discussQualityRequirements: string;
    sendProjectDetails: string;
  };
  home: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    copy: string;
    heroImage: { src: string; alt: string };
    gemstoneColors: {
      eyebrow: string;
      title: string;
      copy: string;
      linkLabel: string;
      items: GemstoneColorCard[];
    };
    manufacturingVisuals: {
      eyebrow: string;
      title: string;
      copy: string;
      items: VisualCard[];
    };
    stats: Array<{ value: string; label: string }>;
    audience: {
      eyebrow: string;
      title: string;
      items: string[];
    };
    coreValues: {
      eyebrow: string;
      title: string;
      copy: string;
      items: Card[];
    };
    workflow: {
      eyebrow: string;
      title: string;
      copy: string;
      steps: Card[];
    };
    sampleMoq: {
      eyebrow: string;
      title: string;
      copy: string;
      items: Card[];
      image: SectionImage;
    };
    qualityControl: {
      eyebrow: string;
      title: string;
      copy: string;
      items: Card[];
      image: SectionImage;
    };
    inquiryPrep: {
      eyebrow: string;
      title: string;
      copy: string;
      statusLabels: Record<InquiryFieldStatus, string>;
      fields: InquiryField[];
      image: SectionImage;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      copy: string;
    };
    sections: {
      productsEyebrow: string;
      productsTitle: string;
      productsCopy: string;
      manufacturingEyebrow: string;
      manufacturingTitle: string;
      manufacturingCopy: string;
    };
    productCards: Card[];
    manufacturingCards: Card[];
    faqs: FaqItem[];
  };
  products: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    sectionTitle: string;
    sectionCopy: string;
    cards: ProductSummary[];
    proofTitle: string;
    proofCopy: string;
    proofCards: Card[];
  };
  collections: Record<string, CollectionContent>;
  about: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    profileEyebrow: string;
    profileTitle: string;
    profileCopy: string[];
    facts: Array<{ value: string; label: string }>;
    capabilityTitle: string;
    capabilityCopy: string;
    capabilities: Card[];
  };
  faq: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: Array<{ title: string; items: FaqItem[] }>;
  };
  contact: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    checklistTitle: string;
    checklistCopy: string;
    cards: Card[];
    form: ContactFormCopy;
    note: string;
  };
  startBrand?: StartBrandContent;
  factoryPages?: Record<FactoryPagePath, FactoryPageContent>;
  legalPages?: Record<LegalPagePath, LegalPageContent>;
};

const sharedImages = {
  labDiamond: "/images/b2b-certificate-packaging.jpg",
  workshop: "/images/b2b-manual-setting-workshop.webp",
  qc: "/images/b2b-finished-jewelry-qc.jpg",
  packaging: "/images/b2b-sample-packaging.jpg",
  loose: "/images/b2b-bulk-loose-stones.jpg",
  hero: "/images/xingyue-loose-moissanite.jpg",
  bracelet: "/images/xingyue-tennis-bracelet.jpg",
};

const productSummaryMedia: Record<
  ProductSummaryId,
  Pick<ProductSummary, "image" | "imageClassName">
> = {
  "lab-grown-diamond-rings": {
    image: "/images/xingyue-ring-sample.jpg",
    imageClassName: "scale-[1.22]",
  },
  "lab-created-colored-gemstone-pendants": {
    image: "/images/lab-created-colored-gemstone-pendant.webp",
  },
  "moissanite-earrings": { image: sharedImages.packaging },
  "custom-tennis-bracelets": { image: sharedImages.bracelet },
};

export const i18nContent: Record<SupportedLocale, LocaleContent> = {
  en: {
    locale: "en",
    dir: "ltr",
    navigation: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Factory", href: "/factory" },
      { label: "Capabilities", href: "/manufacturing-capabilities" },
      { label: "Custom Process", href: "/custom-process" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      intro:
        "Jewelry manufacturing and supply chain support for emerging brands, boutique stores, independent designers and entrepreneurs.",
      pages: "Pages",
      collections: "B2B Paths",
      reachUs: "Reach Us",
      email: "Email",
      inquiry: "OEM / ODM Inquiry",
    },
    cta: {
      getWholesalePrice: "Get Wholesale Price",
      requestCatalog: "Request Catalog",
      sendInquiry: "Send Inquiry",
      contactWhatsapp: "Contact Us on WhatsApp",
      sendDesign: "Send Your Design",
      headerStartProject: "Start Your Project",
      discussCollection: "Request a Manufacturing Quote",
      exploreCapabilities: "Explore Manufacturing Support",
      viewProducts: "View Products",
      finalStartProject: "Start Your Jewelry Project",
      discussSamplesMoq: "Discuss Samples & MOQ",
      discussQualityRequirements: "Discuss Your Quality Requirements",
      sendProjectDetails: "Send Your Project Details",
    },
    home: {
      seo: {
        title: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory | Xingyue",
        description:
          "Work directly with Xingyue's own jewelry factory in Wuzhou for lab-grown diamond jewelry, CAD, sampling, OEM/ODM production, quality checks and private-label packaging.",
      },
      eyebrow: "From Wuzhou to the World",
      title: "Lab-Grown Diamond Jewelry Manufacturer & OEM/ODM Factory",
      subtitle: "Work directly with our own jewelry factory in Wuzhou for lab-grown diamond jewelry, CAD development, sampling, OEM/ODM production, quality checks, packaging and shipment preparation.",
      copy:
        "Xingyue Jewelry manufactures lab-grown diamond jewelry and custom collections for overseas brands, designers, boutique stores and wholesale buyers, with colored lab-created gemstones, moissanite, S925 silver and K-gold options confirmed by project.",
      heroImage: {
        src: "/images/factory-workshop-overview.webp",
        alt: "Jewelry artisans working at setting benches in a Wuzhou workshop",
      },
      gemstoneColors: {
        eyebrow: "Lab-Grown Gemstone Colors",
        title: "Colored gemstone directions for jewelry production.",
        copy: "Review representative color families, then confirm stone type, cut, size, matching requirements and quantity for your project.",
        linkLabel: "Explore the Gemstone Catalog",
        items: [
          { title: "Blue", image: "/images/lab-grown-blue-gemstones.webp", alt: "Blue lab-grown colored gemstones in mixed cuts on a white background" },
          { title: "Green", image: "/images/lab-grown-green-gemstones.webp", alt: "Green lab-grown colored gemstones in mixed cuts on a white background" },
          { title: "Pink", image: "/images/lab-grown-pink-gemstones.webp", alt: "Pink lab-grown colored gemstones in mixed cuts on a white background" },
          { title: "Purple", image: "/images/lab-grown-purple-gemstones.webp", alt: "Purple lab-grown colored gemstones in mixed cuts on a white background" },
          { title: "White / Colorless", image: "/images/lab-grown-colorless-gemstones.webp", alt: "White and colorless lab-grown gemstones in mixed cuts on a white background" },
          { title: "Yellow / Champagne", image: "/images/lab-grown-yellow-gemstones.webp", alt: "Yellow and champagne lab-grown colored gemstones in mixed cuts on a white background" },
        ],
      },
      manufacturingVisuals: {
        eyebrow: "Inside the Manufacturing Workflow",
        title: "Workshop coordination and hands-on jewelry craft.",
        copy: "These authorized workshop images show representative stages used to coordinate jewelry production, from the production floor and wax preparation to manual stone setting.",
        items: [
          {
            title: "Workshop Coordination",
            copy: "A shared production floor supports coordinated bench work across the confirmed jewelry project.",
            image: "/images/factory-workshop-overview.webp",
            alt: "Jewelry artisans working at setting benches in a Wuzhou workshop",
          },
          {
            title: "Wax Model Preparation",
            copy: "Wax models are prepared and reviewed as one of the steps before metal production for applicable custom pieces.",
            image: "/images/jewelry-wax-model-preparation.webp",
            alt: "Hands preparing purple jewelry wax models at a workbench",
            imageClassName: "object-[center_58%]",
          },
          {
            title: "Manual Stone Setting",
            copy: "A jeweler works by hand to place and secure stones according to the confirmed design and setting requirements.",
            image: "/images/manual-gemstone-setting.webp",
            alt: "Jeweler manually setting a stone under magnification",
          },
        ],
      },
      stats: [
        { value: "Flexible B2B", label: "Support for samples, launches and repeat orders" },
        { value: "S925 / 14K / 18K", label: "Silver and K-gold jewelry customization by project" },
        { value: "Coordinated Supply", label: "Sourcing, quality control, packaging and delivery planning" },
      ],
      audience: {
        eyebrow: "Built for Growing Jewelry Businesses",
        title: "Who We Support",
        items: [
          "Emerging Jewelry Brands",
          "Boutique Jewelry Stores",
          "Independent Designers",
          "Jewelry Entrepreneurs",
        ],
      },
      coreValues: {
        eyebrow: "Manufacturing & Supply Chain",
        title: "Manufacturing Support from Brief to Shipment",
        copy: "A coordinated workflow connects product specifications, sample approval, production follow-through, quality review, packaging, and shipment planning.",
        items: [
          {
            title: "Custom Jewelry Development",
            copy: "Review product references, material, stones, settings, and branding requirements before the sample scope is confirmed.",
          },
          {
            title: "Production Coordination",
            copy: "Coordinate the approved sample, project specifications, production scope, and project-specific order requirements.",
          },
          {
            title: "Quality, Packaging & Shipping",
            copy: "Align quality checkpoints, private-label packaging, and shipment preparation with the confirmed project.",
          },
        ],
      },
      workflow: {
        eyebrow: "A Coordinated Process",
        title: "How We Work",
        copy: "Six clear stages connect the first project brief with production and shipping coordination.",
        steps: [
          { title: "Share Your Project", copy: "Send your product references or requirements, including material, stone, target quantity, destination market and packaging needs." },
          { title: "Review the Design or Product Direction", copy: "We review your custom design or existing product options and align the key specifications needed for quotation." },
          { title: "Confirm the Quote and Project Scope", copy: "Quotation, MOQ, sample route, expected timing and payment terms are discussed and confirmed for the project." },
          { title: "Develop and Approve the Sample", copy: "The sample follows the confirmed scope so you can review material, setting, finish and packaging direction before production." },
          { title: "Production and Quality Control", copy: "Production follows the approved sample or project brief, with coordinated checks for stones, settings and finish." },
          { title: "Packaging and Shipping Coordination", copy: "Packaging and the international shipping plan are aligned with the project and destination before dispatch." },
        ],
      },
      sampleMoq: {
        eyebrow: "Sampling & Order Planning",
        title: "Samples & Project-Specific MOQ",
        copy: "Sample requirements, cost, expected timing and MOQ are reviewed for each project. Product type, material, stone, setting complexity and packaging all affect the appropriate route. We confirm the sample scope first, then align the production scope after the sample is approved.",
        items: [
          { title: "Project-Specific MOQ", copy: "MOQ is confirmed according to product type, metal or material, stone, process complexity and packaging." },
          { title: "Sample Quotation & Timing", copy: "Sample cost and expected timing are quoted after the design or reference, specifications and destination are reviewed." },
          { title: "Approval Before Production", copy: "Material, setting, finish and packaging direction are reviewed with the sample before the production scope is confirmed." },
          { title: "Availability by Product", copy: "The sample route and quantity options depend on the product; one-piece samples or small production runs are not assumed for every product." },
        ],
        image: null,
      },
      qualityControl: {
        eyebrow: "Project Quality Review",
        title: "Quality Checks Before Shipment",
        copy: "Quality checks are coordinated against the approved sample or confirmed project specifications. The exact review points depend on the product and agreed scope, with findings addressed before packaging and dispatch.",
        items: [
          { title: "Material & Stone Confirmation", copy: "Confirm the stated material and agreed stone type, size and color direction against the approved project details." },
          { title: "Approved Sample Reference", copy: "Use the approved sample, images or specifications as the production reference." },
          { title: "Setting & Finish Inspection", copy: "Review stone security, setting alignment, surface finish and clasps where relevant." },
          { title: "Size & Specification Check", copy: "Compare size, dimensions, length, quantity and logo or engraving details when included in the project." },
          { title: "Packaging Confirmation", copy: "Review the approved box, pouch, card or label configuration and quantities." },
          { title: "Pre-Shipment Review", copy: "Review order quantity, presentation, visible defects and packing readiness against the confirmed scope." },
        ],
        image: null,
      },
      inquiryPrep: {
        eyebrow: "Before You Contact Us",
        title: "Prepare Your Inquiry",
        copy: "A clear first message helps us review the right product route and prepare a more useful discussion. Share what you already know; details that are not yet decided can be marked as open.",
        statusLabels: { required: "Required", conditional: "Required for custom projects", optional: "Optional" },
        fields: [
          { label: "Product type", status: "required" },
          { label: "Target quantity or range", status: "required" },
          { label: "Destination country", status: "required" },
          { label: "Business type", status: "required" },
          { label: "Reference image or design", status: "conditional" },
          { label: "Material", status: "optional" },
          { label: "Stone", status: "optional" },
          { label: "Target market", status: "optional" },
          { label: "Packaging requirements", status: "optional" },
          { label: "Expected timing", status: "optional" },
        ],
        image: null,
      },
      finalCta: {
        eyebrow: "Start a Project",
        title: "Ready to Bring Your Jewelry Collection Forward?",
        copy: "Share your collection direction and project requirements so we can discuss the appropriate next step.",
      },
      sections: {
        productsEyebrow: "Product Routes",
        productsTitle: "Products & Manufacturing Capabilities",
        productsCopy:
          "Use these core categories to prepare a catalog request, sample order or bulk production brief.",
        manufacturingEyebrow: "Manufacturing",
        manufacturingTitle: "OEM / ODM customization without retail cart friction.",
        manufacturingCopy:
          "The workflow is built for buyers who need quotation, MOQ confirmation, sampling and production planning.",
      },
      productCards: [
        {
          title: "Lab Grown Diamond Jewelry",
          copy: "Rings, pendants, earrings and bracelets with IGI / GIA certificate options by order details.",
          image: sharedImages.labDiamond,
          alt: "Lab grown diamond jewelry packaging for wholesale buyers",
        },
        {
          title: "S925 Silver / 14K / 18K Custom Jewelry",
          copy: "Custom silver and K-gold settings for collection development, private-label launches and production programs.",
          image: sharedImages.bracelet,
          alt: "Custom gold tennis bracelet for wholesale jewelry programs",
        },
        {
          title: "Private Label Packaging",
          copy: "Packaging, catalog planning and presentation details can be aligned with your brand channel.",
          image: sharedImages.packaging,
          alt: "Private label jewelry sample packaging",
        },
      ],
      manufacturingCards: [
        {
          title: "MOQ & Bulk Order Planning",
          copy: "Share target quantity, metal, stone size and delivery city to receive a practical wholesale quote.",
        },
        {
          title: "Send Your Design",
          copy: "Reference photos, CAD ideas and product families can be translated into sample development.",
        },
        {
          title: "Worldwide Shipping",
          copy: "Production, quality check, export packaging and shipment timing are discussed before confirmation.",
        },
      ],
      faqs: [
        {
          question: "Do you support wholesale lab grown diamond jewelry orders?",
          answer:
            "Yes. Xingyue Jewelry supports B2B wholesale, sample development and repeat bulk order programs for lab grown diamond jewelry.",
        },
        {
          question: "Can you make OEM / ODM jewelry with private label packaging?",
          answer:
            "Yes. Buyers can discuss reference designs, 14K / 18K gold settings, custom packaging and private label presentation before quotation.",
        },
        {
          question: "Can diamonds be IGI or GIA certified?",
          answer:
            "Certificate options depend on stone size, quality, budget and order details. IGI / GIA options can be discussed during inquiry.",
        },
      ],
    },
    products: {
      seo: {
        title: "B2B Jewelry Products | Lab Grown Diamonds & OEM Jewelry",
        description:
          "Explore B2B jewelry products for wholesale lab grown diamond jewelry, moissanite, 14K / 18K gold customization and OEM / ODM bulk orders.",
      },
      eyebrow: "B2B Product Range",
      title: "B2B Jewelry Products",
      subtitle:
        "Wholesale-ready lab grown diamond jewelry, moissanite styles and custom gold jewelry programs for brands, wholesalers and private label buyers.",
      sectionTitle: "Products prepared for quotation, sampling and bulk production.",
      sectionCopy:
        "This is not a retail cart. Send your target style, MOQ, material and packaging needs to receive a wholesale discussion.",
      cards: [
        {
          id: "lab-grown-diamond-rings",
          name: "Lab Grown Diamond Rings",
          category: "Rings",
          material: "14K / 18K gold, S925 silver and certificate options",
          copy: "Solitaire, halo and bridal-inspired styles for wholesale collections.",
          ...productSummaryMedia["lab-grown-diamond-rings"],
          alt: "Lab grown diamond ring sample for B2B buyers",
        },
        {
          id: "lab-created-colored-gemstone-pendants",
          name: "Lab-Created Colored Gemstone Pendant",
          category: "Necklaces",
          material: "S925 silver or custom K-gold settings",
          copy: "Blue lab-created colored gemstone pendant shown with matching earrings for coordinated B2B collections.",
          ...productSummaryMedia["lab-created-colored-gemstone-pendants"],
          alt: "Blue lab-created colored gemstone pendant and matching earrings",
        },
        {
          id: "moissanite-earrings",
          name: "Moissanite Earrings",
          category: "Earrings",
          material: "S925 silver or custom K gold settings",
          copy: "Repeat-order stud and gift-ready styles for wholesale assortments.",
          ...productSummaryMedia["moissanite-earrings"],
          alt: "Moissanite earrings in sample packaging",
        },
        {
          id: "custom-tennis-bracelets",
          name: "Custom Tennis Bracelets",
          category: "Bracelets",
          material: "S925 silver / 10K / 14K / 18K gold custom order",
          copy: "Stone layout, clasp, length and packaging can be developed for your market.",
          ...productSummaryMedia["custom-tennis-bracelets"],
          alt: "Custom tennis bracelet for private label jewelry",
        },
      ],
      proofTitle: "What buyers usually confirm before ordering.",
      proofCopy:
        "MOQ, certificate scope, stone matching, metal purity, production time and shipping plan are confirmed before bulk order.",
      proofCards: [
        { title: "MOQ", copy: "MOQ is confirmed by material, setting complexity, packaging and order quantity." },
        { title: "Certificates", copy: "IGI / GIA certificate options are discussed by stone size and buyer budget." },
        { title: "Private Label", copy: "Logo, box, card and catalog presentation can be reviewed before production." },
      ],
    },
    collections: {
      "lab-grown-diamond-jewelry": {
        seo: {
          title: "Lab Grown Diamond Jewelry Manufacturing Partner | Xingyue",
          description:
            "Source wholesale lab grown diamond jewelry with OEM / ODM support, 14K / 18K gold customization, IGI / GIA certificate options and private label packaging.",
        },
        eyebrow: "Wholesale Lab Grown Diamond Jewelry",
        title: "Lab Grown Diamond Jewelry Manufacturing Partner",
        subtitle:
          "A B2B production path for brands that need finished lab grown diamond jewelry, private label support and clear bulk order communication.",
        image: sharedImages.labDiamond,
        alt: "Wholesale lab grown diamond jewelry certificate and packaging support",
        options: [
          "Finished rings, pendants, earrings and bracelet programs",
          "14K / 18K gold or S925 silver production by project",
          "IGI / GIA certified lab grown diamond options by order details",
          "Private label packaging and catalog-ready presentation",
        ],
        capabilities: [
          "Wholesale supplier support for sample and bulk order planning",
          "OEM / ODM customization from reference photo or product family",
          "MOQ, production time and worldwide shipping discussed before confirmation",
          "Stone matching, setting, QC and packaging coordination",
        ],
        customization: [
          "Stone size, shape, grade and certificate direction",
          "14K / 18K gold, S925 silver, finish and setting style",
          "Logo packaging, product cards and private label presentation",
        ],
        quality: [
          {
            title: "Certificate options",
            copy: "IGI / GIA options are confirmed by stone size, quality target, timeline and budget.",
          },
          {
            title: "Production confirmation",
            copy: "MOQ, sample route, QC details and shipment plan are confirmed before the order moves to production.",
          },
        ],
        faqs: [
          {
            question: "Can you supply wholesale lab grown diamond jewelry?",
            answer:
              "Yes. Xingyue Jewelry supports finished jewelry programs for brands, wholesalers and private label sellers.",
          },
          {
            question: "Can jewelry be made in 14K or 18K gold?",
            answer:
              "Yes. 14K / 18K gold customization can be quoted by design, stone size, metal weight and quantity.",
          },
          {
            question: "Do you support IGI / GIA certified lab grown diamonds?",
            answer:
              "Yes. IGI / GIA certificate options can be discussed by stone and order requirements.",
          },
        ],
      },
      "custom-jewelry-manufacturing": {
        seo: {
          title: "Custom Jewelry OEM ODM Manufacturing Partner | 14K 18K Gold",
          description:
            "Develop custom jewelry with OEM / ODM manufacturing, 14K / 18K gold options, private label packaging, MOQ planning and worldwide shipping.",
        },
        eyebrow: "Custom Jewelry / OEM ODM",
        title: "Custom Jewelry / OEM ODM Manufacturing",
        subtitle:
          "Send your design, reference photo or product idea and build a wholesale-ready jewelry program with clear sample and bulk order planning.",
        image: sharedImages.workshop,
        alt: "Custom jewelry OEM ODM manufacturing workshop",
        options: [
          "Send Your Design for sample development",
          "OEM / ODM production for rings, earrings, necklaces and bracelets",
          "14K / 18K gold jewelry and S925 silver options",
          "Private label packaging for brand launches and repeat orders",
        ],
        capabilities: [
          "Reference-photo to sample workflow",
          "CAD, stone, metal, finish and packaging discussion",
          "MOQ and bulk order planning before production",
          "Fast production scheduling and worldwide shipping support",
        ],
        customization: [
          "Stone type, size, color and layout",
          "Metal purity, plating tone, setting and clasp",
          "Brand logo, box, pouch, card and catalog presentation",
        ],
        quality: [
          {
            title: "Sample approval",
            copy: "The sample route can define material, setting, finish and packaging before bulk production.",
          },
          {
            title: "Production communication",
            copy: "Buyers can prepare reference images, MOQ, target market and timeline for a clearer quotation.",
          },
        ],
        faqs: [
          {
            question: "Can I send my own jewelry design?",
            answer:
              "Yes. You can send a sketch, reference photo, CAD idea or product family for OEM / ODM discussion.",
          },
          {
            question: "Do you support private label packaging?",
            answer:
              "Yes. Logo packaging, cards and presentation details can be discussed for private label programs.",
          },
          {
            question: "Is custom production suitable for bulk orders?",
            answer:
              "Yes. Custom projects are reviewed for MOQ, sample cost, production time and shipment planning.",
          },
        ],
      },
    },
    about: {
      seo: {
        title: "About Xingyue Jewelry | Own Jewelry Factory in Wuzhou",
        description:
          "Learn how Xingyue Jewelry's own factory in Wuzhou supports lab-grown diamond jewelry and OEM/ODM projects for brands, boutiques, designers and wholesale buyers.",
      },
      eyebrow: "How We Work With Brands",
      title: "About Xingyue Jewelry",
      subtitle:
        "Our own jewelry factory in Wuzhou supports lab-grown diamond jewelry, moissanite, custom settings and private-label OEM/ODM programs.",
      profileEyebrow: "Who We Support",
      profileTitle: "Built for emerging brands, boutique stores and independent designers.",
      profileCopy: [
        "Xingyue Jewelry operates our own jewelry factory in Wuzhou for brands, boutique stores, independent designers and wholesale buyers that need a direct B2B manufacturing relationship rather than a retail shopping cart.",
        "Our factory workflow covers stone and material review, CAD and sample development, finished jewelry production, private-label packaging, quality checks and shipment preparation.",
      ],
      facts: [
        { value: "Emerging Brands", label: "Development support for growing jewelry businesses" },
        { value: "Boutique Jewelry Stores & Design Studios", label: "Flexible planning for stores and independent designers" },
        { value: "B2B", label: "Wholesale, OEM / ODM and private label support" },
      ],
      capabilityTitle: "What we help buyers confirm.",
      capabilityCopy:
        "Each project is quoted by design, material, stone, certificate requirement, MOQ, packaging and delivery plan.",
      capabilities: [
        { title: "Wholesale Supplier", copy: "Repeat production support for lab grown diamond jewelry and moissanite programs." },
        { title: "OEM / ODM Customization", copy: "Reference photo, CAD idea, private label packaging and custom gold settings." },
        { title: "Quality & Shipping", copy: "QC, certificate options, export packaging and worldwide shipping planning." },
      ],
    },
    faq: {
      seo: {
        title: "FAQ | Wholesale Lab Grown Diamond Jewelry & OEM ODM",
        description:
          "FAQ for B2B buyers sourcing wholesale lab grown diamond jewelry, OEM / ODM customization, MOQ, certificates, private label packaging and shipping.",
      },
      eyebrow: "Buyer FAQ",
      title: "FAQ",
      subtitle:
        "Short answers for wholesale buyers preparing a catalog request, sample inquiry or OEM / ODM production brief.",
      groups: [
        {
          title: "Wholesale & MOQ",
          items: [
            {
              question: "What is your MOQ?",
              answer:
                "MOQ depends on material, stone size, setting complexity and packaging. Send your target quantity so we can quote realistically.",
            },
            {
              question: "Do you accept bulk orders?",
              answer:
                "Yes. Xingyue Jewelry supports bulk order planning for lab grown diamond jewelry, moissanite jewelry and custom gold pieces.",
            },
          ],
        },
        {
          title: "Customization",
          items: [
            {
              question: "Can you make OEM / ODM jewelry from my design?",
              answer:
                "Yes. You can send your design, reference photo, CAD idea, stone size, metal and target quantity.",
            },
            {
              question: "Can you provide private label packaging?",
              answer:
                "Yes. Boxes, cards, logo direction and catalog presentation can be discussed before production.",
            },
          ],
        },
        {
          title: "Certificates & Contact",
          items: [
            {
              question: "Can diamonds be IGI / GIA certified?",
              answer:
                "Certificate options depend on stone size, grade, timeline and budget. We confirm this during quotation.",
            },
            {
              question: "How should I contact you?",
              answer:
                "Send an inquiry form, email us or include your WhatsApp so we can discuss quotation details quickly.",
            },
          ],
        },
      ],
    },
    contact: {
      seo: {
        title: "Contact Xingyue Jewelry | Send Wholesale Jewelry Inquiry",
        description:
          "Contact Xingyue Jewelry for wholesale lab grown diamond jewelry, OEM / ODM customization, catalog requests, MOQ, private label packaging and bulk orders.",
      },
      eyebrow: "Contact Us",
      title: "Send a Wholesale Jewelry Inquiry",
      subtitle:
        "Tell us your product type, expected quantity, country, material, customization and packaging needs.",
      checklistTitle: "Prepare a quote-ready message.",
      checklistCopy:
        "The clearer your inquiry, the faster we can discuss MOQ, sampling, production time and shipping.",
      cards: [
        { title: "WhatsApp / Phone", copy: "Leave your WhatsApp or phone number for faster B2B discussion." },
        { title: "Email", copy: "Send product references, target quantity and packaging needs by email." },
        { title: "Inquiry Form", copy: "Use the form to share product interest, quantity, country and customization requirements." },
        { title: "Catalog Request", copy: "Ask for suitable catalog direction based on your market and product focus." },
      ],
      form: {
        introTitle: "Quote-ready inquiry form",
        introCopy:
          "Submit the core project details our team needs before sample discussion: company, email, WhatsApp, country, product interest, quantity and customization requirements.",
        fieldLabels: {
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "WhatsApp / Phone",
          country: "Country",
          productInterest: "Product Interest",
          quantity: "Target Quantity or Range",
          customRequirement: "Custom Requirement",
          message: "Message",
        },
        placeholders: {
          name: "Your name",
          company: "Company or brand name",
          email: "name@example.com",
          phone: "Phone, WhatsApp or WeChat",
          country: "Country or region",
          productInterest: "Rings, tennis bracelets, OEM/ODM, loose stones...",
          quantity: "Your estimated quantity or range",
          customRequirement: "14K / 18K gold, private label, custom packaging, certificate needs...",
          message:
            "Reference style, stone size, metal, certificate, packaging, timeline and any quality requirements...",
        },
        submitting: "Submitting...",
        submit: "Send Inquiry",
        email: "Email Your Inquiry",
        successTitle: "Inquiry submitted",
        successMessage: "Your inquiry has been received. We'll review the project details and respond as soon as possible.",
        referenceLabel: "Reference",
        errorFallback: "Submission failed. Please contact us by WhatsApp or email.",
        validationPrefix: "Please complete",
      },
      note:
        "For the most useful quotation, mention reference photos, stone size, metal choice, certificate expectations, packaging and sample timeline.",
    },
  },
  ar: {
    locale: "ar",
    dir: "rtl",
    navigation: [
      { label: "الرئيسية", href: "/ar" },
      { label: "المنتجات", href: "/ar/products" },
      { label: "المصنع", href: "/ar/factory" },
      { label: "قدرات التصنيع", href: "/ar/manufacturing-capabilities" },
      { label: "مسار التخصيص", href: "/ar/custom-process" },
      { label: "من نحن", href: "/ar/about" },
      { label: "الأسئلة الشائعة", href: "/ar/faq" },
      { label: "اتصل بنا", href: "/ar/contact" },
    ],
    footer: {
      intro:
        "دعم تصنيع وسلسلة توريد المجوهرات للعلامات الناشئة ومتاجر البوتيك والمصممين المستقلين ورواد الأعمال.",
      pages: "الصفحات",
      collections: "مسارات B2B",
      reachUs: "تواصل معنا",
      email: "البريد الإلكتروني",
      inquiry: "استفسار OEM / ODM",
    },
    cta: {
      getWholesalePrice: "احصل على سعر الجملة",
      requestCatalog: "اطلب الكتالوج",
      sendInquiry: "أرسل استفساراً",
      contactWhatsapp: "تواصل معنا عبر واتساب",
      sendDesign: "أرسل تصميمك",
      headerStartProject: "ابدأ مشروعك",
      discussCollection: "اطلب عرض سعر للتصنيع",
      exploreCapabilities: "استكشف دعم التصنيع",
      viewProducts: "عرض المنتجات",
      finalStartProject: "ابدأ مشروع مجوهراتك",
      discussSamplesMoq: "ناقش العينات والحد الأدنى للطلب",
      discussQualityRequirements: "ناقش متطلبات الجودة",
      sendProjectDetails: "أرسل تفاصيل مشروعك",
    },
    home: {
      seo: {
        title: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM | Xingyue",
        description:
          "تعاون مباشرة مع مصنع Xingyue الخاص للمجوهرات في ووتشو لتطوير مجوهرات الألماس المزروع وتصميم CAD والعينات وإنتاج OEM/ODM وفحوص الجودة والتغليف بعلامة خاصة.",
      },
      eyebrow: "من ووتشو إلى العالم",
      title: "مصنع مجوهرات الألماس المزروع وشريك تصنيع OEM/ODM",
      subtitle: "تعاون مباشرة مع مصنعنا الخاص للمجوهرات في ووتشو لتطوير مجوهرات الألماس المزروع وتصميم CAD والعينات وإنتاج OEM/ODM وفحوص الجودة والتغليف والاستعداد للشحن.",
      copy:
        "تصنّع Xingyue Jewelry مجوهرات الألماس المزروع والمجموعات المخصصة للعلامات التجارية والمصممين والمتاجر والمشترين بالجملة، مع خيارات من الأحجار الملونة المصنعة مخبرياً والمويسانيت والفضة S925 وذهب K يتم تأكيدها حسب المشروع.",
      heroImage: {
        src: "/images/factory-workshop-overview.webp",
        alt: "حرفيو مجوهرات يعملون على طاولات الترصيع في ورشة في ووتشو",
      },
      gemstoneColors: {
        eyebrow: "ألوان الأحجار الكريمة المزروعة",
        title: "اتجاهات لونية لإنتاج المجوهرات",
        copy: "استعرض مجموعات لونية تمثيلية، ثم أكد نوع الحجر وقصته وحجمه ومتطلبات المطابقة والكمية المناسبة لمشروعك.",
        linkLabel: "استكشف كتالوج الأحجار الكريمة",
        items: [
          { title: "أزرق", image: "/images/lab-grown-blue-gemstones.webp", alt: "أحجار كريمة مزروعة زرقاء بقصات متنوعة على خلفية بيضاء" },
          { title: "أخضر", image: "/images/lab-grown-green-gemstones.webp", alt: "أحجار كريمة مزروعة خضراء بقصات متنوعة على خلفية بيضاء" },
          { title: "وردي", image: "/images/lab-grown-pink-gemstones.webp", alt: "أحجار كريمة مزروعة وردية بقصات متنوعة على خلفية بيضاء" },
          { title: "بنفسجي", image: "/images/lab-grown-purple-gemstones.webp", alt: "أحجار كريمة مزروعة بنفسجية بقصات متنوعة على خلفية بيضاء" },
          { title: "أبيض / عديم اللون", image: "/images/lab-grown-colorless-gemstones.webp", alt: "أحجار كريمة مزروعة بيضاء وعديمة اللون بقصات متنوعة على خلفية بيضاء" },
          { title: "أصفر / شامبانيا", image: "/images/lab-grown-yellow-gemstones.webp", alt: "أحجار كريمة مزروعة صفراء وشامبانيا بقصات متنوعة على خلفية بيضاء" },
        ],
      },
      manufacturingVisuals: {
        eyebrow: "من داخل مسار التصنيع",
        title: "تنسيق الورشة وحرفة صناعة المجوهرات يدوياً",
        copy: "تعرض صور الورشة المصرح باستخدامها مراحل تمثيلية في تنسيق إنتاج المجوهرات، من أرضية العمل وتحضير نماذج الشمع إلى ترصيع الأحجار يدوياً.",
        items: [
          {
            title: "تنسيق العمل داخل الورشة",
            copy: "تدعم مساحة الإنتاج المشتركة تنسيق أعمال الطاولات وفق نطاق مشروع المجوهرات المؤكد.",
            image: "/images/factory-workshop-overview.webp",
            alt: "حرفيو مجوهرات يعملون على طاولات الترصيع في ورشة في ووتشو",
          },
          {
            title: "تحضير نماذج الشمع",
            copy: "تُحضّر نماذج الشمع وتُراجع كإحدى المراحل السابقة لإنتاج المعدن في القطع المخصصة المناسبة.",
            image: "/images/jewelry-wax-model-preparation.webp",
            alt: "يدان تحضران نماذج شمع بنفسجية للمجوهرات على طاولة عمل",
            imageClassName: "object-[center_58%]",
          },
          {
            title: "ترصيع الأحجار يدوياً",
            copy: "يعمل الصائغ يدوياً على وضع الأحجار وتثبيتها وفق التصميم ومتطلبات الترصيع المؤكدة.",
            image: "/images/manual-gemstone-setting.webp",
            alt: "صائغ يرصع حجراً يدوياً باستخدام أداة تكبير",
          },
        ],
      },
      stats: [
        { value: "دعم B2B مرن", label: "للعينات والإطلاق والطلبات المتكررة" },
        { value: "فضة S925 / ذهب 14K / 18K", label: "تخصيص الفضة وذهب K حسب المشروع" },
        { value: "توريد منسق", label: "تنسيق المصادر والجودة والتغليف والتسليم" },
      ],
      audience: {
        eyebrow: "دعم مخصص لمشاريع المجوهرات المتنامية",
        title: "من ندعم",
        items: [
          "علامات المجوهرات التجارية الناشئة",
          "متاجر المجوهرات الراقية",
          "مصممو المجوهرات المستقلون",
          "رواد الأعمال في قطاع المجوهرات",
        ],
      },
      coreValues: {
        eyebrow: "التصنيع وسلسلة التوريد",
        title: "دعم التصنيع من موجز المشروع إلى الشحن",
        copy: "يربط مسار منسق بين مواصفات المنتج واعتماد العينة ومتابعة الإنتاج ومراجعة الجودة والتغليف وتخطيط الشحن.",
        items: [
          { title: "تطوير المجوهرات المخصصة", copy: "مراجعة مراجع المنتج والمواد والأحجار والترصيعات ومتطلبات العلامة قبل تأكيد نطاق العينة." },
          { title: "تنسيق الإنتاج", copy: "تنسيق العينة المعتمدة ومواصفات المشروع ونطاق الإنتاج ومتطلبات الطلب الخاصة بكل مشروع." },
          { title: "الجودة والتغليف والشحن", copy: "مواءمة نقاط فحص الجودة والتغليف بعلامة خاصة والاستعداد للشحن مع نطاق المشروع المؤكد." },
        ],
      },
      workflow: {
        eyebrow: "عملية منسقة",
        title: "كيف نعمل",
        copy: "ست مراحل واضحة تربط موجز المشروع الأول بتنسيق الإنتاج والشحن.",
        steps: [
          { title: "شارك تفاصيل مشروعك", copy: "أرسل مراجع المنتج أو متطلباته، بما يشمل المادة والحجر والكمية المستهدفة والسوق المقصود واحتياجات التغليف." },
          { title: "مراجعة التصميم أو اختيار المنتج", copy: "نراجع التصميم المخصص أو خيارات المنتجات المتاحة ونحدد المواصفات الأساسية اللازمة للتسعير." },
          { title: "تأكيد عرض السعر ونطاق المشروع", copy: "تتم مناقشة وتأكيد عرض السعر والحد الأدنى للطلب ومسار العينة والمدة المتوقعة وشروط الدفع الخاصة بالمشروع." },
          { title: "تطوير العينة واعتمادها", copy: "تُنفذ العينة وفق النطاق المتفق عليه لمراجعة المادة والترصيع والتشطيب واتجاه التغليف قبل الإنتاج." },
          { title: "الإنتاج وفحص الجودة", copy: "يتم الإنتاج وفق العينة المعتمدة أو موجز المشروع، مع تنسيق فحوص الأحجار والترصيعات والتشطيب." },
          { title: "تنسيق التغليف والشحن", copy: "يتم تنسيق التغليف وخطة الشحن الدولي وفق المشروع والوجهة قبل الإرسال." },
        ],
      },
      sampleMoq: {
        eyebrow: "العينات وتخطيط الطلب",
        title: "العينات والحد الأدنى للطلب حسب المشروع",
        copy: "تُراجع متطلبات العينة وتكلفتها والمدة المتوقعة والحد الأدنى للطلب لكل مشروع على حدة. ويؤثر نوع المنتج والمادة والحجر وتعقيد الترصيع والتغليف في المسار المناسب. نؤكد أولاً نطاق العينة، ثم ننسق نطاق الإنتاج بعد اعتمادها.",
        items: [
          { title: "حد أدنى للطلب حسب المشروع", copy: "يُحدَّد الحد الأدنى للطلب وفق نوع المنتج والمعدن أو المادة والحجر وتعقيد التنفيذ ومتطلبات التغليف." },
          { title: "تسعير العينة ومدتها", copy: "تُحدَّد تكلفة العينة والمدة المتوقعة بعد مراجعة التصميم أو الصورة المرجعية والمواصفات ووجهة الشحن." },
          { title: "اعتماد العينة قبل الإنتاج", copy: "تُراجع المادة والترصيع والتشطيب واتجاه التغليف في العينة قبل تأكيد نطاق الإنتاج." },
          { title: "التوفر يعتمد على المنتج", copy: "يعتمد مسار العينة وخيارات الكمية على المنتج؛ ولا يُفترض توفر عينة من قطعة واحدة أو إنتاج بكميات صغيرة لكل المنتجات." },
        ],
        image: null,
      },
      qualityControl: {
        eyebrow: "مراجعة جودة المشروع",
        title: "فحوص الجودة قبل الشحن",
        copy: "تُنسَّق فحوص الجودة بالرجوع إلى العينة المعتمدة أو مواصفات المشروع المؤكدة. وتختلف نقاط المراجعة حسب المنتج والنطاق المتفق عليه، وتُعالج الملاحظات قبل التغليف والإرسال.",
        items: [
          { title: "تأكيد المادة والحجر", copy: "التحقق من المادة المحددة، ومن نوع الحجر وحجمه ولونه المتفق عليه وفق تفاصيل المشروع المعتمدة." },
          { title: "الرجوع إلى العينة المعتمدة", copy: "استخدام العينة أو الصور أو المواصفات المعتمدة كمرجع للإنتاج." },
          { title: "فحص الترصيع والتشطيب", copy: "مراجعة ثبات الأحجار ومحاذاة الترصيع والتشطيب السطحي والأقفال عند الحاجة." },
          { title: "فحص المقاسات والمواصفات", copy: "مقارنة المقاس والأبعاد والطول والكمية وتفاصيل الشعار أو النقش عندما تكون ضمن المشروع." },
          { title: "تأكيد التغليف", copy: "مراجعة تكوين وكمية العلبة أو الكيس أو البطاقة أو الملصق المعتمد." },
          { title: "المراجعة قبل الشحن", copy: "مراجعة الكمية والمظهر والعيوب الظاهرة وجاهزية التغليف مقارنة بالنطاق المؤكد." },
        ],
        image: null,
      },
      inquiryPrep: {
        eyebrow: "قبل التواصل معنا",
        title: "جهّز استفسارك",
        copy: "يساعدنا الاستفسار الأول الواضح على مراجعة مسار المنتج المناسب والاستعداد لمناقشة أكثر فائدة. شارك ما تعرفه حالياً، ويمكن الإشارة إلى التفاصيل غير المحسومة بأنها قيد التحديد.",
        statusLabels: { required: "مطلوب", conditional: "مطلوب للمشاريع المخصصة", optional: "اختياري" },
        fields: [
          { label: "نوع المنتج", status: "required" },
          { label: "الكمية المستهدفة أو نطاقها", status: "required" },
          { label: "بلد الوجهة", status: "required" },
          { label: "نوع النشاط التجاري", status: "required" },
          { label: "صورة أو تصميم مرجعي", status: "conditional" },
          { label: "المادة", status: "optional" },
          { label: "الحجر", status: "optional" },
          { label: "السوق المستهدف", status: "optional" },
          { label: "متطلبات التغليف", status: "optional" },
          { label: "الموعد المتوقع", status: "optional" },
        ],
        image: null,
      },
      finalCta: {
        eyebrow: "ابدأ مشروعاً",
        title: "هل أنت مستعد للانتقال بمجموعتك إلى المرحلة التالية؟",
        copy: "شارك اتجاه المجموعة ومتطلبات المشروع لمناقشة الخطوة التالية المناسبة.",
      },
      sections: {
        productsEyebrow: "مسارات المنتجات",
        productsTitle: "المنتجات وقدرات التصنيع",
        productsCopy: "استخدم هذه الفئات لتجهيز طلب كتالوج أو عينة أو إنتاج بالجملة.",
        manufacturingEyebrow: "التصنيع",
        manufacturingTitle: "تخصيص OEM / ODM بدون تحويل الموقع إلى متجر تجزئة.",
        manufacturingCopy: "العملية مخصصة للمشترين الذين يحتاجون عرض سعر وMOQ وعينات وخطة إنتاج.",
      },
      productCards: [
        {
          title: "مجوهرات الألماس المزروع",
          copy: "خواتم، قلادات، أقراط وأساور مع خيارات شهادات IGI / GIA حسب تفاصيل الطلب.",
          image: sharedImages.labDiamond,
          alt: "تغليف مجوهرات ألماس مزروع لعملاء الجملة",
        },
        {
          title: "مجوهرات مخصصة من فضة S925 وذهب 14K / 18K",
          copy: "ترصيعات مخصصة من الفضة وذهب K لتطوير المجموعات وإطلاق العلامات الخاصة وبرامج الإنتاج.",
          image: sharedImages.bracelet,
          alt: "سوار تنس ذهبي مخصص لطلبات الجملة",
        },
        {
          title: "تغليف علامة خاصة",
          copy: "يمكن تنسيق العلب والبطاقات والكتالوج مع قناة البيع الخاصة بعلامتك.",
          image: sharedImages.packaging,
          alt: "تغليف عينات مجوهرات بعلامة خاصة",
        },
      ],
      manufacturingCards: [
        { title: "تخطيط MOQ والطلبات الكبيرة", copy: "أرسل الكمية والمعدن وحجم الحجر ومدينة التسليم للحصول على عرض واقعي." },
        { title: "أرسل تصميمك", copy: "يمكن تحويل الصور المرجعية أو أفكار CAD أو عائلات المنتجات إلى عينة تطوير." },
        { title: "شحن عالمي", copy: "نناقش الإنتاج، الفحص، تغليف التصدير ووقت الشحن قبل التأكيد." },
      ],
      faqs: [
        {
          question: "هل تدعمون طلبات مجوهرات الألماس المزروع بالجملة؟",
          answer: "نعم. ندعم الجملة، تطوير العينات وبرامج الطلبات المتكررة لمجوهرات الألماس المزروع.",
        },
        {
          question: "هل يمكن تنفيذ OEM / ODM مع تغليف بعلامة خاصة؟",
          answer: "نعم. يمكن مناقشة التصميمات المرجعية، ذهب 14K / 18K، التغليف والعرض الخاص قبل التسعير.",
        },
        {
          question: "هل يمكن توفير شهادات IGI أو GIA؟",
          answer: "تعتمد الشهادات على حجم الحجر والجودة والميزانية وتفاصيل الطلب، ويمكن تأكيدها أثناء الاستفسار.",
        },
      ],
    },
    products: {
      seo: {
        title: "منتجات مجوهرات B2B | ألماس مزروع و OEM ODM",
        description:
          "استكشف منتجات مجوهرات B2B للألماس المزروع والموسانيت وتخصيص ذهب 14K / 18K وطلبات OEM / ODM بالجملة.",
      },
      eyebrow: "نطاق منتجات B2B",
      title: "منتجات مجوهرات B2B",
      subtitle:
        "مجوهرات ألماس مزروع وموسانيت وبرامج ذهب مخصصة جاهزة للجملة للعلامات التجارية والموزعين.",
      sectionTitle: "منتجات جاهزة للتسعير والعينات والإنتاج بالجملة.",
      sectionCopy: "هذا ليس متجر تجزئة. أرسل التصميم والMOQ والمادة والتغليف المطلوب لبدء نقاش الجملة.",
      cards: [
        { id: "lab-grown-diamond-rings", name: "خواتم ألماس مزروع", category: "خواتم", material: "ذهب 14K / 18K، فضة S925 وخيارات شهادات", copy: "تصاميم سوليتير وهالو ومجموعات مستوحاة من الزفاف.", ...productSummaryMedia["lab-grown-diamond-rings"], alt: "خاتم ألماس مزروع لعميل B2B" },
        { id: "lab-created-colored-gemstone-pendants", name: "قلادة بأحجار ملونة مصنّعة مخبرياً", category: "قلادات", material: "فضة S925 أو ترصيعات ذهب K مخصصة", copy: "قلادة بحجر أزرق مصنّع مخبرياً مع أقراط متناسقة لمجموعات المجوهرات بين الشركات.", ...productSummaryMedia["lab-created-colored-gemstone-pendants"], alt: "قلادة وأقراط متناسقة بأحجار زرقاء مصنّعة مخبرياً" },
        { id: "moissanite-earrings", name: "أقراط موسانيت", category: "أقراط", material: "فضة S925 أو حوامل ذهب K مخصّصة", copy: "تصاميم متكررة الطلب ومناسبة للهدايا ومجموعات الجملة.", ...productSummaryMedia["moissanite-earrings"], alt: "أقراط موسانيت في تغليف عينة" },
        { id: "custom-tennis-bracelets", name: "أساور تنس مخصصة", category: "أساور", material: "فضة S925 أو ذهب 10K / 14K / 18K حسب الطلب", copy: "تطوير ترتيب الأحجار والقفل والطول والتغليف حسب سوقك.", ...productSummaryMedia["custom-tennis-bracelets"], alt: "سوار تنس مخصص لعلامة خاصة" },
      ],
      proofTitle: "ما الذي يؤكده المشترون قبل الطلب؟",
      proofCopy: "نؤكد MOQ، الشهادات، مطابقة الأحجار، نقاء المعدن، وقت الإنتاج وخطة الشحن قبل الطلب الكبير.",
      proofCards: [
        { title: "MOQ", copy: "يتم تحديد MOQ حسب المادة وتعقيد التركيب والتغليف والكمية." },
        { title: "الشهادات", copy: "خيارات IGI / GIA تناقش حسب حجم الحجر وميزانية المشتري." },
        { title: "علامة خاصة", copy: "يمكن مراجعة الشعار والعلبة والبطاقات والكتالوج قبل الإنتاج." },
      ],
    },
    collections: {
      "lab-grown-diamond-jewelry": {
        seo: { title: "شريك تصنيع مجوهرات الألماس المزروع | Xingyue Jewelry", description: "دعم مجوهرات الألماس المزروع بالجملة مع OEM / ODM، ذهب 14K / 18K، خيارات شهادات وتغليف خاص." },
        eyebrow: "مجوهرات ألماس مزروع بالجملة",
        title: "شريك تصنيع مجوهرات الألماس المزروع بالجملة",
        subtitle: "مسار إنتاج B2B للعلامات التي تحتاج مجوهرات مكتملة ودعم علامة خاصة وتواصل واضح للطلبات الكبيرة.",
        image: sharedImages.labDiamond,
        alt: "دعم شهادات وتغليف لمجوهرات الألماس المزروع بالجملة",
        options: ["خواتم وقلادات وأقراط وأساور جاهزة", "ذهب 14K / 18K أو فضة S925 حسب المشروع", "خيارات ألماس مزروع مع شهادات IGI / GIA حسب الطلب", "تغليف علامة خاصة وعرض جاهز للكتالوج"],
        capabilities: ["دعم مورد الجملة لتخطيط العينات والطلبات الكبيرة", "تخصيص OEM / ODM من صورة مرجعية أو عائلة منتجات", "مناقشة MOQ ووقت الإنتاج والشحن العالمي قبل التأكيد", "تنسيق مطابقة الأحجار والتركيب والفحص والتغليف"],
        customization: ["حجم الحجر وشكله ودرجته واتجاه الشهادة", "ذهب 14K / 18K أو فضة S925 والتشطيب والتركيب", "تغليف بشعار وبطاقات وعرض علامة خاصة"],
        quality: [{ title: "خيارات الشهادات", copy: "تعتمد IGI / GIA على حجم الحجر والجودة والوقت والميزانية." }, { title: "تأكيد الإنتاج", copy: "يتم تأكيد MOQ والعينة والفحص والشحن قبل بدء الإنتاج." }],
        faqs: [{ question: "هل يمكنكم توريد مجوهرات ألماس مزروع بالجملة؟", answer: "نعم. ندعم برامج المجوهرات المكتملة للعلامات والموزعين وبائعي العلامات الخاصة." }, { question: "هل يمكن تصنيعها بذهب 14K أو 18K؟", answer: "نعم. يتم التسعير حسب التصميم وحجم الحجر ووزن المعدن والكمية." }, { question: "هل تدعمون شهادات IGI / GIA؟", answer: "نعم. يمكن مناقشة الشهادات حسب الحجر ومتطلبات الطلب." }],
      },
      "custom-jewelry-manufacturing": {
        seo: { title: "شريك تصنيع مجوهرات مخصصة OEM ODM | ذهب 14K 18K", description: "طور مجوهرات مخصصة مع دعم OEM / ODM وخيارات ذهب 14K / 18K وتغليف خاص وتخطيط MOQ والشحن." },
        eyebrow: "مجوهرات مخصصة / OEM ODM",
        title: "تصنيع مجوهرات مخصصة OEM / ODM",
        subtitle: "أرسل تصميمك أو صورة مرجعية أو فكرة منتج لبناء برنامج مجوهرات جاهز للجملة.",
        image: sharedImages.workshop,
        alt: "ورشة تصنيع مجوهرات مخصصة OEM ODM",
        options: ["أرسل تصميمك لتطوير العينة", "إنتاج OEM / ODM للخواتم والأقراط والقلادات والأساور", "خيارات ذهب 14K / 18K وفضة S925", "تغليف علامة خاصة لإطلاق العلامة والطلبات المتكررة"],
        capabilities: ["من صورة مرجعية إلى عينة", "مناقشة CAD والحجر والمعدن والتشطيب والتغليف", "تخطيط MOQ والطلب الكبير قبل الإنتاج", "جدولة إنتاج سريعة ودعم الشحن العالمي"],
        customization: ["نوع الحجر وحجمه ولونه وترتيبه", "نقاء المعدن ولون الطلاء والتركيب والقفل", "الشعار والعلبة والبطاقة وعرض الكتالوج"],
        quality: [{ title: "اعتماد العينة", copy: "يمكن تحديد المادة والتركيب والتشطيب والتغليف قبل الإنتاج الكبير." }, { title: "تواصل الإنتاج", copy: "جهز الصور والMOQ والسوق المستهدف والجدول الزمني للحصول على تسعير أوضح." }],
        faqs: [{ question: "هل يمكنني إرسال تصميمي الخاص؟", answer: "نعم. يمكنك إرسال رسم أو صورة مرجعية أو فكرة CAD أو عائلة منتجات." }, { question: "هل تدعمون تغليف علامة خاصة؟", answer: "نعم. يمكن مناقشة الصناديق والبطاقات وتفاصيل العرض للعلامة الخاصة." }, { question: "هل التخصيص مناسب للطلبات الكبيرة؟", answer: "نعم. نراجع MOQ وتكلفة العينة ووقت الإنتاج وخطة الشحن." }],
      },
    },
    about: {
      seo: { title: "حول Xingyue Jewelry | مصنع المجوهرات الخاص في ووتشو", description: "تعرّف على كيفية دعم مصنع Xingyue الخاص في ووتشو لمجوهرات الألماس المزروع ومشاريع OEM/ODM للعلامات التجارية والمتاجر والمصممين ومشتري الجملة." },
      eyebrow: "كيف نعمل مع العلامات التجارية",
      title: "حول Xingyue Jewelry",
      subtitle: "يدعم مصنعنا الخاص في ووتشو مشاريع مجوهرات الألماس المزروع والموسانيت والترصيعات المخصصة وبرامج OEM/ODM للعلامات الخاصة.",
      profileEyebrow: "من نخدم",
      profileTitle: "نخدم العلامات التجارية الناشئة ومتاجر المجوهرات الراقية والمصممين المستقلين.",
      profileCopy: ["تدير Xingyue Jewelry مصنعها الخاص للمجوهرات في ووتشو لخدمة العلامات الناشئة ومتاجر البوتيك والمصممين المستقلين ومشتري الجملة الذين يحتاجون علاقة تصنيع مباشرة بين الشركات.", "يشمل عمل المصنع مراجعة الأحجار والمواد وCAD وتطوير العينات وإنتاج المجوهرات والتغليف الخاص وفحوص الجودة وتجهيز الشحن."],
      facts: [{ value: "علامات ناشئة", label: "دعم تطوير مشاريع المجوهرات المتنامية" }, { value: "متاجر المجوهرات الراقية واستوديوهات التصميم", label: "تخطيط مرن للمتاجر والمصممين المستقلين" }, { value: "B2B", label: "جملة، OEM / ODM، علامة خاصة" }],
      capabilityTitle: "ما الذي نساعد المشترين على تأكيده.",
      capabilityCopy: "كل مشروع يتم تسعيره حسب التصميم والمادة والحجر والشهادة وMOQ والتغليف وخطة التسليم.",
      capabilities: [{ title: "مورد جملة", copy: "دعم الإنتاج المتكرر لمجوهرات الألماس المزروع والموسانيت." }, { title: "تخصيص OEM / ODM", copy: "صور مرجعية، أفكار CAD، تغليف خاص وترصيعات ذهب مخصّصة." }, { title: "الجودة والشحن", copy: "فحص، خيارات شهادات، تغليف تصدير وخطة شحن عالمي." }],
    },
    faq: {
      seo: { title: "الأسئلة الشائعة | مجوهرات ألماس مزروع بالجملة و OEM ODM", description: "أسئلة B2B حول مجوهرات الألماس المزروع، OEM / ODM، MOQ، الشهادات، التغليف الخاص والشحن." },
      eyebrow: "أسئلة المشترين",
      title: "الأسئلة الشائعة",
      subtitle: "إجابات قصيرة لمشتري الجملة قبل طلب الكتالوج أو العينة أو إنتاج OEM / ODM.",
      groups: [
        { title: "الجملة و MOQ", items: [{ question: "ما هو MOQ؟", answer: "يعتمد MOQ على المادة وحجم الحجر وتعقيد التركيب والتغليف. أرسل الكمية المستهدفة للتسعير." }, { question: "هل تقبلون الطلبات الكبيرة؟", answer: "نعم. ندعم الطلبات الكبيرة لمجوهرات الألماس المزروع والموسانيت والذهب المخصص." }] },
        { title: "التخصيص", items: [{ question: "هل يمكن تصنيع OEM / ODM من تصميمي؟", answer: "نعم. أرسل تصميمك أو صورة مرجعية أو فكرة CAD مع الحجم والمعدن والكمية." }, { question: "هل توفرون تغليف علامة خاصة؟", answer: "نعم. يمكن مناقشة العلب والبطاقات والشعار والعرض قبل الإنتاج." }] },
        { title: "الشهادات والتواصل", items: [{ question: "هل يمكن الحصول على شهادات IGI / GIA؟", answer: "تعتمد الشهادات على حجم الحجر والدرجة والوقت والميزانية ويتم تأكيدها في التسعير." }, { question: "كيف أتواصل معكم؟", answer: "أرسل نموذج الاستفسار أو البريد الإلكتروني أو رقم WhatsApp لمناقشة التفاصيل بسرعة." }] },
      ],
    },
    contact: {
      seo: { title: "اتصل بـ Xingyue Jewelry | استفسار مجوهرات بالجملة", description: "تواصل مع Xingyue Jewelry لمجوهرات الألماس المزروع، OEM / ODM، الكتالوج، MOQ، التغليف الخاص والطلبات الكبيرة." },
      eyebrow: "اتصل بنا",
      title: "أرسل استفسار مجوهرات بالجملة",
      subtitle: "أخبرنا بنوع المنتج والكمية والدولة والمادة والتخصيص والتغليف المطلوب.",
      checklistTitle: "جهز رسالة مناسبة للتسعير.",
      checklistCopy: "كلما كان الاستفسار أوضح، أسرعنا في مناقشة MOQ والعينة ووقت الإنتاج والشحن.",
      cards: [{ title: "واتساب / هاتف", copy: "اترك رقم WhatsApp أو الهاتف لتواصل B2B أسرع." }, { title: "البريد الإلكتروني", copy: "أرسل المراجع والكمية والتغليف المطلوب عبر البريد." }, { title: "نموذج الاستفسار", copy: "استخدم النموذج لتحديد المنتج والكمية والدولة ومتطلبات التخصيص." }, { title: "طلب كتالوج", copy: "اطلب اتجاه كتالوج مناسب حسب سوقك وفئة المنتج." }],
      form: {
        introTitle: "نموذج استفسار جاهز للتسعير",
        introCopy: "أرسل بيانات المشروع الأساسية: الشركة والتواصل والدولة والمنتج والكمية ومتطلبات التخصيص.",
        fieldLabels: { name: "الاسم", company: "اسم الشركة", email: "البريد الإلكتروني", phone: "واتساب / الهاتف", country: "الدولة", productInterest: "المنتج المطلوب", quantity: "الكمية المستهدفة أو نطاقها", customRequirement: "متطلبات التخصيص", message: "الرسالة" },
        placeholders: { name: "اسمك", company: "اسم الشركة أو العلامة", email: "name@example.com", phone: "رقم واتساب أو الهاتف", country: "الدولة أو المنطقة", productInterest: "خواتم، أساور تنس، OEM/ODM، أحجار سائبة...", quantity: "الكمية أو النطاق التقريبي", customRequirement: "ذهب 14K / 18K، علامة خاصة، تغليف مخصص، شهادات...", message: "النمط المرجعي، حجم الحجر، المعدن، الشهادة، التغليف والجدول الزمني..." },
        submitting: "جارٍ الإرسال...",
        submit: "أرسل استفساراً",
        email: "أرسل عبر البريد",
        successTitle: "تم إرسال الاستفسار",
        successMessage: "تم استلام استفسارك. سنراجع تفاصيل المشروع ونرد في أقرب وقت ممكن.",
        referenceLabel: "الرقم المرجعي",
        errorFallback: "تعذر إرسال الاستفسار. يرجى مراسلتنا عبر البريد الإلكتروني.",
        validationPrefix: "يرجى إكمال",
      },
      note: "للحصول على تسعير مفيد، اذكر الصور المرجعية وحجم الحجر والمعدن والشهادات والتغليف وموعد العينة.",
    },
  },
  es: {
    locale: "es",
    dir: "ltr",
    navigation: [
      { label: "Inicio", href: "/es" },
      { label: "Productos", href: "/es/products" },
      { label: "Fábrica", href: "/es/factory" },
      { label: "Capacidades", href: "/es/manufacturing-capabilities" },
      { label: "Proceso personalizado", href: "/es/custom-process" },
      { label: "Sobre nosotros", href: "/es/about" },
      { label: "FAQ", href: "/es/faq" },
      { label: "Contacto", href: "/es/contact" },
    ],
    footer: {
      intro:
        "Apoyo de fabricación y cadena de suministro para marcas emergentes, joyerías boutique, diseñadores independientes y emprendedores.",
      pages: "Páginas",
      collections: "Rutas B2B",
      reachUs: "Contacto",
      email: "Correo electrónico",
      inquiry: "Consulta OEM / ODM",
    },
    cta: {
      getWholesalePrice: "Solicitar precio mayorista",
      requestCatalog: "Pedir catálogo",
      sendInquiry: "Enviar consulta",
      contactWhatsapp: "Contactar por WhatsApp",
      sendDesign: "Enviar tu diseño",
      headerStartProject: "Inicia tu proyecto",
      discussCollection: "Solicitar una cotización de fabricación",
      exploreCapabilities: "Explorar apoyo de fabricación",
      viewProducts: "Ver productos",
      finalStartProject: "Inicia tu proyecto de joyería",
      discussSamplesMoq: "Consultar muestras y MOQ",
      discussQualityRequirements: "Hablemos de tus requisitos de calidad",
      sendProjectDetails: "Envía los detalles de tu proyecto",
    },
    home: {
      seo: {
        title: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM | Xingyue",
        description:
          "Trabaja con la fábrica propia de Xingyue en Wuzhou para desarrollar joyería con diamantes de laboratorio, CAD, muestras, producción OEM/ODM, control de calidad y empaque de marca privada.",
      },
      eyebrow: "De Wuzhou al mundo",
      title: "Fabricante de joyería con diamantes de laboratorio y fábrica OEM/ODM",
      subtitle: "Trabaja directamente con nuestra propia fábrica de joyería en Wuzhou para desarrollar joyería con diamantes de laboratorio, CAD, muestras, producción OEM/ODM, controles de calidad, empaque y preparación del envío.",
      copy:
        "Xingyue Jewelry fabrica joyería con diamantes de laboratorio y colecciones personalizadas para marcas, diseñadores, boutiques y compradores mayoristas, con gemas de color creadas en laboratorio, moissanita, plata S925 y opciones de oro K confirmadas por proyecto.",
      heroImage: {
        src: "/images/factory-workshop-overview.webp",
        alt: "Artesanos de joyería trabajando en bancos de engaste en un taller de Wuzhou",
      },
      gemstoneColors: {
        eyebrow: "Colores de gemas de laboratorio",
        title: "Direcciones de color para la producción de joyería.",
        copy: "Revisa familias de color representativas y después confirma para tu proyecto el tipo de gema, la talla, el tamaño, los requisitos de uniformidad y la cantidad.",
        linkLabel: "Explorar el catálogo de gemas",
        items: [
          { title: "Azul", image: "/images/lab-grown-blue-gemstones.webp", alt: "Gemas de color azules de laboratorio en tallas variadas sobre fondo blanco" },
          { title: "Verde", image: "/images/lab-grown-green-gemstones.webp", alt: "Gemas de color verdes de laboratorio en tallas variadas sobre fondo blanco" },
          { title: "Rosa", image: "/images/lab-grown-pink-gemstones.webp", alt: "Gemas de color rosas de laboratorio en tallas variadas sobre fondo blanco" },
          { title: "Morado", image: "/images/lab-grown-purple-gemstones.webp", alt: "Gemas de color moradas de laboratorio en tallas variadas sobre fondo blanco" },
          { title: "Blanco / Incoloro", image: "/images/lab-grown-colorless-gemstones.webp", alt: "Gemas blancas e incoloras de laboratorio en tallas variadas sobre fondo blanco" },
          { title: "Amarillo / Champán", image: "/images/lab-grown-yellow-gemstones.webp", alt: "Gemas amarillas y color champán de laboratorio en tallas variadas sobre fondo blanco" },
        ],
      },
      manufacturingVisuals: {
        eyebrow: "Dentro del flujo de fabricación",
        title: "Coordinación de taller y trabajo artesanal en joyería.",
        copy: "Estas imágenes autorizadas del taller muestran etapas representativas de la producción coordinada, desde el área de trabajo y la preparación de modelos de cera hasta el engaste manual.",
        items: [
          {
            title: "Coordinación del Taller",
            copy: "Un área de producción compartida facilita el trabajo coordinado en banco según el alcance confirmado del proyecto.",
            image: "/images/factory-workshop-overview.webp",
            alt: "Artesanos de joyería trabajando en bancos de engaste en un taller de Wuzhou",
          },
          {
            title: "Preparación de Modelos de Cera",
            copy: "Los modelos de cera se preparan y revisan como una etapa previa a la producción en metal cuando corresponde al diseño.",
            image: "/images/jewelry-wax-model-preparation.webp",
            alt: "Manos preparando modelos de cera morados para joyería en un banco de trabajo",
            imageClassName: "object-[center_58%]",
          },
          {
            title: "Engaste Manual de Gemas",
            copy: "Un artesano coloca y asegura las gemas a mano según el diseño y los requisitos de engaste confirmados.",
            image: "/images/manual-gemstone-setting.webp",
            alt: "Artesano engastando una gema manualmente con una herramienta de aumento",
          },
        ],
      },
      stats: [
        { value: "B2B flexible", label: "Apoyo para muestras, lanzamientos y pedidos recurrentes" },
        { value: "Plata S925 / oro 14K / 18K", label: "Personalización en plata y oro K por proyecto" },
        { value: "Suministro coordinado", label: "Compras, calidad, empaque y entrega" },
      ],
      audience: {
        eyebrow: "Pensado para negocios de joyería en crecimiento",
        title: "A quién ayudamos",
        items: [
          "Marcas de joyería emergentes",
          "Joyerías boutique",
          "Diseñadores independientes",
          "Emprendedores del sector joyero",
        ],
      },
      coreValues: {
        eyebrow: "Fabricación y cadena de suministro",
        title: "Apoyo de fabricación desde el brief hasta el envío",
        copy: "Un flujo coordinado conecta las especificaciones, la aprobación de muestras, el seguimiento de producción, la revisión de calidad, el empaque y la planificación del envío.",
        items: [
          { title: "Desarrollo de joyería personalizada", copy: "Revisa referencias, materiales, piedras, monturas y requisitos de marca antes de confirmar el alcance de la muestra." },
          { title: "Coordinación de producción", copy: "Coordina la muestra aprobada, las especificaciones, el alcance de producción y los requisitos del pedido según el proyecto." },
          { title: "Calidad, empaque y envío", copy: "Alinea puntos de control de calidad, empaque de marca privada y preparación del envío con el proyecto confirmado." },
        ],
      },
      workflow: {
        eyebrow: "Un proceso coordinado",
        title: "Cómo trabajamos",
        copy: "Seis etapas claras conectan el brief inicial con la coordinación de producción y envío.",
        steps: [
          { title: "Comparte tu proyecto", copy: "Envíanos referencias o requisitos del producto, incluidos material, piedra, cantidad prevista, mercado de destino y necesidades de empaque." },
          { title: "Revisamos el diseño o la selección de producto", copy: "Revisamos tu diseño personalizado o las opciones existentes y alineamos las especificaciones necesarias para cotizar." },
          { title: "Confirmamos la cotización y el alcance", copy: "Se revisan y confirman la cotización, el MOQ, la ruta de muestra, el plazo previsto y las condiciones de pago del proyecto." },
          { title: "Desarrollamos y aprobamos la muestra", copy: "La muestra sigue el alcance confirmado para revisar material, montura, acabado y dirección de empaque antes de producir." },
          { title: "Producción y control de calidad", copy: "La producción sigue la muestra aprobada o el brief del proyecto, con controles coordinados de piedras, monturas y acabado." },
          { title: "Coordinación de empaque y envío", copy: "El empaque y el plan de envío internacional se coordinan según el proyecto y el destino antes del despacho." },
        ],
      },
      sampleMoq: {
        eyebrow: "Muestras y planificación del pedido",
        title: "Muestras y MOQ según el proyecto",
        copy: "Los requisitos, el costo y el plazo previsto de la muestra, así como el MOQ, se revisan para cada proyecto. El tipo de producto, el material, la piedra, la complejidad de la montura y el empaque determinan la ruta adecuada. Primero confirmamos el alcance de la muestra y, después de aprobarla, coordinamos el alcance de producción.",
        items: [
          { title: "MOQ según el proyecto", copy: "Se confirma según el tipo de producto, el metal o material, la piedra, la complejidad del proceso y el empaque." },
          { title: "Cotización y plazo de la muestra", copy: "El costo y el plazo previsto se cotizan después de revisar el diseño o referencia, las especificaciones y el destino." },
          { title: "Aprobación antes de producir", copy: "La muestra permite revisar material, montura, acabado y dirección de empaque antes de confirmar el alcance de producción." },
          { title: "Disponibilidad según el producto", copy: "La ruta de muestra y las opciones de cantidad dependen del producto; no se presupone que todos admitan una muestra de una unidad o producción en lotes pequeños." },
        ],
        image: null,
      },
      qualityControl: {
        eyebrow: "Revisión de calidad del proyecto",
        title: "Controles de calidad antes del envío",
        copy: "Los controles se coordinan con la muestra aprobada o las especificaciones confirmadas del proyecto. Los puntos de revisión dependen del producto y del alcance acordado, y cualquier observación se atiende antes del empaque y despacho.",
        items: [
          { title: "Confirmación de material y piedra", copy: "Comprobar el material declarado y el tipo, tamaño y color de piedra acordados frente a los detalles aprobados." },
          { title: "Referencia de muestra aprobada", copy: "Usar la muestra, las imágenes o las especificaciones aprobadas como referencia de producción." },
          { title: "Inspección de montura y acabado", copy: "Revisar la seguridad y alineación de las piedras, el acabado superficial y los cierres cuando corresponda." },
          { title: "Verificación de medidas y especificaciones", copy: "Comparar talla, dimensiones, longitud, cantidad y detalles de logo o grabado cuando formen parte del proyecto." },
          { title: "Confirmación de empaque", copy: "Revisar la configuración y cantidad aprobadas de caja, bolsa, tarjeta o etiqueta." },
          { title: "Revisión previa al envío", copy: "Revisar cantidad, presentación, defectos visibles y preparación del empaque frente al alcance confirmado." },
        ],
        image: null,
      },
      inquiryPrep: {
        eyebrow: "Antes de contactarnos",
        title: "Prepara tu consulta",
        copy: "Una primera consulta clara nos ayuda a revisar la ruta de producto adecuada y preparar una conversación más útil. Comparte lo que ya sabes; los detalles aún no decididos pueden indicarse como pendientes.",
        statusLabels: { required: "Obligatorio", conditional: "Obligatorio para proyectos personalizados", optional: "Opcional" },
        fields: [
          { label: "Tipo de producto", status: "required" },
          { label: "Cantidad prevista o rango", status: "required" },
          { label: "País de destino", status: "required" },
          { label: "Tipo de negocio", status: "required" },
          { label: "Imagen o diseño de referencia", status: "conditional" },
          { label: "Material", status: "optional" },
          { label: "Piedra", status: "optional" },
          { label: "Mercado objetivo", status: "optional" },
          { label: "Requisitos de empaque", status: "optional" },
          { label: "Plazo deseado", status: "optional" },
        ],
        image: null,
      },
      finalCta: {
        eyebrow: "Inicia un proyecto",
        title: "¿Listo para avanzar con tu colección de joyería?",
        copy: "Comparte la dirección de tu colección y los requisitos del proyecto para conversar sobre el siguiente paso adecuado.",
      },
      sections: {
        productsEyebrow: "Rutas de producto",
        productsTitle: "Productos y capacidades de fabricación",
        productsCopy: "Usa estas categorías para pedir catálogo, muestras o producción a granel.",
        manufacturingEyebrow: "Fabricación",
        manufacturingTitle: "Personalización OEM / ODM sin convertir el sitio en tienda minorista.",
        manufacturingCopy: "El flujo está pensado para cotización, MOQ, muestras y planificación de producción.",
      },
      productCards: [
        { title: "Joyería con diamantes de laboratorio", copy: "Anillos, colgantes, pendientes y pulseras con opciones IGI / GIA según el pedido.", image: sharedImages.labDiamond, alt: "Empaque para joyería con diamantes de laboratorio" },
        { title: "Joyería personalizada en plata S925 y oro 14K / 18K", copy: "Monturas personalizadas en plata y oro K para colecciones, lanzamientos de marca privada y programas de producción.", image: sharedImages.bracelet, alt: "Pulsera de tenis personalizada en plata u oro K" },
        { title: "Empaque de marca privada", copy: "Cajas, tarjetas y presentación de catálogo alineadas con tu canal de venta.", image: sharedImages.packaging, alt: "Empaque de muestras de joyería de marca privada" },
      ],
      manufacturingCards: [
        { title: "MOQ y pedidos a granel", copy: "Comparte cantidad, metal, tamaño de piedra y ciudad de entrega para una cotización realista." },
        { title: "Enviar tu diseño", copy: "Fotos de referencia, ideas CAD y familias de producto pueden convertirse en muestras." },
        { title: "Envío mundial", copy: "Producción, control de calidad, empaque de exportación y tiempos se revisan antes de confirmar." },
      ],
      faqs: [
        { question: "¿Trabajan joyería con diamantes de laboratorio al por mayor?", answer: "Sí. Apoyamos desarrollo de muestras y pedidos recurrentes para compradores B2B." },
        { question: "¿Pueden hacer OEM / ODM con empaque de marca privada?", answer: "Sí. Podemos discutir diseños, oro 14K / 18K, empaque y presentación antes de cotizar." },
        { question: "¿Los diamantes pueden tener certificado IGI o GIA?", answer: "Las opciones dependen de tamaño, calidad, presupuesto y detalles del pedido." },
      ],
    },
    products: {
      seo: { title: "Productos B2B de joyería | Diamantes lab grown y OEM ODM", description: "Explora productos B2B de joyería con diamantes de laboratorio, moissanita, oro 14K / 18K y pedidos OEM / ODM al por mayor." },
      eyebrow: "Rango de productos B2B",
      title: "Productos B2B de joyería",
      subtitle: "Joyería con diamantes de laboratorio, moissanita y oro personalizado para marcas, mayoristas y compradores de marca privada.",
      sectionTitle: "Productos preparados para cotización, muestras y producción a granel.",
      sectionCopy: "No es un carrito minorista. Envíanos estilo, MOQ, material y empaque para iniciar la cotización.",
      cards: [
        { id: "lab-grown-diamond-rings", name: "Anillos con diamantes de laboratorio", category: "Anillos", material: "Oro 14K / 18K, plata S925 y opciones de certificado", copy: "Solitarios, halos y estilos inspirados en bridal para colecciones mayoristas.", ...productSummaryMedia["lab-grown-diamond-rings"], alt: "Anillo con diamante de laboratorio para compradores B2B" },
        { id: "lab-created-colored-gemstone-pendants", name: "Colgante con gema de color creada en laboratorio", category: "Collares", material: "Plata S925 o monturas de oro K personalizadas", copy: "Colgante con gema azul creada en laboratorio y pendientes coordinados para colecciones B2B.", ...productSummaryMedia["lab-created-colored-gemstone-pendants"], alt: "Colgante y pendientes coordinados con gemas azules creadas en laboratorio" },
        { id: "moissanite-earrings", name: "Pendientes de moissanita", category: "Pendientes", material: "Plata S925 o monturas de oro K personalizadas", copy: "Estilos de pedido recurrente para surtidos mayoristas y regalos.", ...productSummaryMedia["moissanite-earrings"], alt: "Pendientes de moissanita en empaque de muestra" },
        { id: "custom-tennis-bracelets", name: "Pulseras de tenis personalizadas", category: "Pulseras", material: "Plata S925 u oro 10K / 14K / 18K bajo pedido", copy: "Diseño de piedras, cierre, largo y empaque según tu mercado.", ...productSummaryMedia["custom-tennis-bracelets"], alt: "Pulsera de tenis personalizada para marca privada" },
      ],
      proofTitle: "Qué suelen confirmar los compradores antes del pedido.",
      proofCopy: "MOQ, certificados, selección de piedras, pureza del metal, tiempo de producción y envío se confirman antes del pedido a granel.",
      proofCards: [
        { title: "MOQ", copy: "El MOQ se confirma según material, complejidad, empaque y cantidad." },
        { title: "Certificados", copy: "Las opciones IGI / GIA se revisan según tamaño de piedra y presupuesto." },
        { title: "Marca privada", copy: "Logo, caja, tarjeta y presentación de catálogo se revisan antes de producir." },
      ],
    },
    collections: {
      "lab-grown-diamond-jewelry": {
        seo: { title: "Socio de fabricación de joyería con diamantes de laboratorio", description: "Apoyo mayorista para joyería con diamantes de laboratorio, OEM / ODM, oro 14K / 18K, opciones de certificado y empaque privado." },
        eyebrow: "Joyería lab grown al por mayor",
        title: "Socio de fabricación de joyería con diamantes de laboratorio",
        subtitle: "Ruta B2B para marcas que necesitan joyería terminada, soporte de marca privada y comunicación clara para pedidos a granel.",
        image: sharedImages.labDiamond,
        alt: "Soporte de certificados y empaque para joyería lab grown",
        options: ["Programas de anillos, colgantes, pendientes y pulseras", "Producción en oro 14K / 18K o plata S925", "Opciones de diamantes de laboratorio certificados IGI / GIA", "Empaque de marca privada y presentación lista para catálogo"],
        capabilities: ["Proveedor mayorista para muestras y pedidos a granel", "Personalización OEM / ODM desde foto o familia de producto", "MOQ, tiempo de producción y envío mundial antes de confirmar", "Coordinación de piedras, montura, QC y empaque"],
        customization: ["Tamaño, forma, grado de piedra y dirección de certificado", "Oro 14K / 18K, plata S925, acabado y montura", "Empaque con logo, tarjetas y presentación privada"],
        quality: [{ title: "Opciones de certificado", copy: "IGI / GIA se confirma según tamaño, calidad, plazo y presupuesto." }, { title: "Confirmación de producción", copy: "MOQ, muestra, QC y envío se confirman antes de producir." }],
        faqs: [{ question: "¿Pueden suministrar joyería lab grown al por mayor?", answer: "Sí. Apoyamos programas de joyería terminada para marcas, mayoristas y vendedores de marca privada." }, { question: "¿Pueden fabricar en oro 14K o 18K?", answer: "Sí. Se cotiza según diseño, tamaño de piedra, peso de metal y cantidad." }, { question: "¿Trabajan con IGI / GIA?", answer: "Sí. Las opciones IGI / GIA se revisan según piedra y requisitos del pedido." }],
      },
      "custom-jewelry-manufacturing": {
        seo: { title: "Socio OEM ODM de joyería personalizada | Oro 14K 18K", description: "Desarrolla joyería personalizada con apoyo OEM / ODM, oro 14K / 18K, empaque privado y planificación de MOQ y envío." },
        eyebrow: "Joyería personalizada / OEM ODM",
        title: "Fabricación de joyería personalizada OEM / ODM",
        subtitle: "Envía tu diseño, foto de referencia o idea de producto para crear un programa mayorista listo para producir.",
        image: sharedImages.workshop,
        alt: "Taller de fabricación de joyería OEM ODM",
        options: ["Enviar tu diseño para desarrollo de muestra", "Producción OEM / ODM para anillos, pendientes, collares y pulseras", "Opciones en oro 14K / 18K y plata S925", "Empaque de marca privada para lanzamientos y pedidos recurrentes"],
        capabilities: ["Flujo de foto de referencia a muestra", "Discusión de CAD, piedra, metal, acabado y empaque", "Planificación de MOQ y pedido a granel antes de producir", "Producción rápida y soporte de envío mundial"],
        customization: ["Tipo, tamaño, color y layout de piedras", "Pureza del metal, color de baño, montura y cierre", "Logo, caja, pouch, tarjeta y catálogo"],
        quality: [{ title: "Aprobación de muestra", copy: "La muestra define material, montura, acabado y empaque antes del pedido a granel." }, { title: "Comunicación de producción", copy: "Prepara referencias, MOQ, mercado objetivo y plazo para una cotización clara." }],
        faqs: [{ question: "¿Puedo enviar mi propio diseño?", answer: "Sí. Puedes enviar boceto, foto, idea CAD o familia de productos." }, { question: "¿Hacen empaque de marca privada?", answer: "Sí. Cajas, tarjetas y presentación se pueden discutir para marca privada." }, { question: "¿La producción personalizada sirve para pedidos a granel?", answer: "Sí. Revisamos MOQ, costo de muestra, tiempo de producción y envío." }],
      },
    },
    about: {
      seo: { title: "Sobre Xingyue Jewelry | Fábrica propia de joyería en Wuzhou", description: "Conoce cómo la fábrica propia de joyería de Xingyue en Wuzhou apoya proyectos con diamantes de laboratorio y OEM/ODM para marcas, boutiques, diseñadores y compradores mayoristas." },
      eyebrow: "Cómo trabajamos con las marcas",
      title: "Sobre Xingyue Jewelry",
      subtitle: "Nuestra fábrica propia en Wuzhou apoya joyería con diamantes de laboratorio, moissanita, monturas personalizadas y programas OEM/ODM de marca privada.",
      profileEyebrow: "A quién ayudamos",
      profileTitle: "Diseñada para marcas emergentes, joyerías boutique y diseñadores independientes.",
      profileCopy: ["Xingyue Jewelry opera una fábrica propia de joyería en Wuzhou para marcas emergentes, boutiques, diseñadores independientes y compradores mayoristas que necesitan una relación directa de fabricación B2B.", "El trabajo de fábrica incluye revisión de piedras y materiales, CAD y muestras, producción de joyería, empaque de marca privada, controles de calidad y preparación del envío."],
      facts: [{ value: "Marcas emergentes", label: "Apoyo para negocios de joyería en crecimiento" }, { value: "Joyerías boutique y estudios de diseño", label: "Planificación flexible para tiendas y diseñadores" }, { value: "B2B", label: "Mayorista, OEM / ODM y marca privada" }],
      capabilityTitle: "Lo que ayudamos a confirmar.",
      capabilityCopy: "Cada proyecto se cotiza por diseño, material, piedra, certificado, MOQ, empaque y entrega.",
      capabilities: [{ title: "Proveedor mayorista", copy: "Producción recurrente para joyería lab grown y moissanita." }, { title: "Personalización OEM / ODM", copy: "Fotos de referencia, CAD, empaque privado y monturas en oro." }, { title: "Calidad y envío", copy: "QC, certificados, empaque de exportación y envío mundial." }],
    },
    faq: {
      seo: { title: "FAQ | Joyería lab grown al por mayor y OEM ODM", description: "Preguntas para compradores B2B sobre joyería lab grown, OEM / ODM, MOQ, certificados, empaque privado y envío." },
      eyebrow: "FAQ de compradores",
      title: "FAQ",
      subtitle: "Respuestas breves para preparar solicitud de catálogo, muestra o producción OEM / ODM.",
      groups: [
        { title: "Mayorista y MOQ", items: [{ question: "¿Cuál es el MOQ?", answer: "Depende de material, piedra, complejidad y empaque. Envíanos la cantidad objetivo para cotizar." }, { question: "¿Aceptan pedidos a granel?", answer: "Sí. Apoyamos pedidos a granel de joyería lab grown, moissanita y oro personalizado." }] },
        { title: "Personalización", items: [{ question: "¿Pueden hacer OEM / ODM desde mi diseño?", answer: "Sí. Envía diseño, foto, CAD, tamaño de piedra, metal y cantidad." }, { question: "¿Ofrecen empaque de marca privada?", answer: "Sí. Cajas, tarjetas, logo y presentación se pueden revisar antes de producir." }] },
        { title: "Certificados y contacto", items: [{ question: "¿Pueden trabajar con IGI / GIA?", answer: "Depende de tamaño, grado, plazo y presupuesto. Se confirma en cotización." }, { question: "¿Cómo contacto con ustedes?", answer: "Envía el formulario, email o WhatsApp para discutir la cotización más rápido." }] },
      ],
    },
    contact: {
      seo: { title: "Contactar Xingyue Jewelry | Consulta de joyería mayorista", description: "Contacta a Xingyue Jewelry para joyería lab grown, OEM / ODM, catálogo, MOQ, empaque privado y pedidos a granel." },
      eyebrow: "Contacto",
      title: "Enviar consulta de joyería mayorista",
      subtitle: "Cuéntanos producto, cantidad, país, material, personalización y empaque.",
      checklistTitle: "Prepara un mensaje listo para cotizar.",
      checklistCopy: "Una consulta clara acelera la discusión de MOQ, muestra, producción y envío.",
      cards: [{ title: "WhatsApp / Teléfono", copy: "Deja tu WhatsApp o teléfono para una conversación B2B rápida." }, { title: "Correo electrónico", copy: "Envía referencias, cantidad y empaque por correo." }, { title: "Formulario", copy: "Indica producto, cantidad, país y requisitos de personalización." }, { title: "Catálogo", copy: "Pide un catálogo adecuado para tu mercado y enfoque de producto." }],
      form: {
        introTitle: "Formulario listo para cotización",
        introCopy: "Envía los datos principales antes de discutir muestras: empresa, contacto, país, producto, cantidad y personalización.",
        fieldLabels: { name: "Nombre", company: "Empresa", email: "Correo electrónico", phone: "WhatsApp / Teléfono", country: "País", productInterest: "Producto de interés", quantity: "Cantidad prevista o rango", customRequirement: "Requisitos de personalización", message: "Mensaje" },
        placeholders: { name: "Tu nombre", company: "Nombre de empresa o marca", email: "name@example.com", phone: "Teléfono, WhatsApp o WeChat", country: "País o región", productInterest: "Anillos, pulseras tenis, OEM/ODM, piedras sueltas...", quantity: "Tu cantidad o rango estimado", customRequirement: "Oro 14K / 18K, marca privada, empaque, certificados...", message: "Estilo de referencia, piedra, metal, certificado, empaque y plazo..." },
        submitting: "Enviando...",
        submit: "Enviar consulta",
        email: "Enviar por email",
        successTitle: "Consulta enviada",
        successMessage: "Hemos recibido tu consulta. Revisaremos los detalles del proyecto y responderemos lo antes posible.",
        referenceLabel: "Referencia",
        errorFallback: "No se pudo enviar la consulta. Escríbenos por email.",
        validationPrefix: "Por favor completa",
      },
      note: "Para una cotización útil, menciona fotos de referencia, tamaño de piedra, metal, certificados, empaque y plazo de muestra.",
    },
  },
};

for (const locale of Object.keys(startBrandContentByLocale) as SupportedLocale[]) {
  i18nContent[locale].startBrand = startBrandContentByLocale[locale];
  i18nContent[locale].factoryPages = factoryPagesContentByLocale[locale];
  i18nContent[locale].legalPages = legalPagesContentByLocale[locale];
}

export function getI18nContent(locale: SupportedLocale) {
  return i18nContent[locale];
}

export function getLocalizedCollectionContent(locale: SupportedLocale, slug: string) {
  return i18nContent[locale].collections[slug];
}
