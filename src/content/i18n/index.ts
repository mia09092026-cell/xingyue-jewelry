import type { SupportedLocale } from "@/lib/i18n";
import type { ContactInquiryField } from "@/lib/contact-inquiry";

type NavItem = { label: string; href: string };
type SeoCopy = { title: string; description: string };
type Card = { title: string; copy: string; image?: string; alt?: string };
type FaqItem = { question: string; answer: string };
export type ProductSummaryId =
  | "lab-grown-diamond-rings"
  | "lab-grown-diamond-pendants"
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
  fieldLabels: Partial<Record<ContactInquiryField, string>>;
  placeholders: Partial<Record<ContactInquiryField, string>>;
  submitting: string;
  submit: string;
  email: string;
  successTitle: string;
  successMessage: string;
  referenceLabel: string;
  errorFallback: string;
  validationPrefix: string;
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
  };
  home: {
    seo: SeoCopy;
    eyebrow: string;
    title: string;
    subtitle: string;
    copy: string;
    stats: Array<{ value: string; label: string }>;
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
  "lab-grown-diamond-pendants": { image: null },
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
      { label: "Lab-Grown Gemstones", href: "/lab-grown-gemstones" },
      { label: "Wholesale", href: "/collections/lab-grown-diamond-jewelry" },
      { label: "OEM / ODM", href: "/collections/custom-jewelry-manufacturing" },
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
    },
    home: {
      seo: {
        title: "Jewelry Manufacturing & Supply Chain Partner | Xingyue Jewelry",
        description:
          "Xingyue Jewelry supports emerging brands, boutique stores and independent designers with custom jewelry development, OEM / ODM and supply chain coordination.",
      },
      eyebrow: "Jewelry Manufacturing Partner for Emerging Brands",
      title: "Jewelry Manufacturing & Supply Chain Partner",
      subtitle: "Custom development, production support and private-label coordination for growing jewelry businesses.",
      copy:
        "Xingyue Jewelry helps startups, boutique jewelry stores, independent designers and entrepreneurs coordinate lab grown jewelry, moissanite, custom settings, packaging and repeat-order planning.",
      stats: [
        { value: "Flexible B2B", label: "Support for samples, launches and repeat orders" },
        { value: "14K / 18K", label: "Gold jewelry customization by project" },
        { value: "Coordinated Supply", label: "Sourcing, quality control, packaging and delivery planning" },
      ],
      sections: {
        productsEyebrow: "Products",
        productsTitle: "B2B product range for repeat wholesale programs.",
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
          title: "14K / 18K Gold Jewelry",
          copy: "Custom gold settings for premium collections, private label launches and bulk order programs.",
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
          id: "lab-grown-diamond-pendants",
          name: "Lab Grown Diamond Pendants",
          category: "Necklaces",
          material: "IGI / GIA certificate options by project",
          copy: "Pendant and chain programs for boutiques, online brands and gift collections.",
          ...productSummaryMedia["lab-grown-diamond-pendants"],
          alt: null,
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
          material: "10K / 14K / 18K gold custom order",
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
        title: "About Xingyue Jewelry | Manufacturing & Supply Chain Partner",
        description:
          "Learn how Xingyue Jewelry supports emerging brands, boutique stores and independent designers with manufacturing and supply chain coordination.",
      },
      eyebrow: "How We Work With Brands",
      title: "About Xingyue Jewelry",
      subtitle:
        "A jewelry manufacturing and supply chain partner for lab grown jewelry, moissanite, custom gold settings and private-label programs.",
      profileEyebrow: "Who We Support",
      profileTitle: "Built for emerging brands, boutique stores and independent designers.",
      profileCopy: [
        "Xingyue Jewelry supports jewelry startups, boutique stores, independent designers and entrepreneurs that need a practical manufacturing partner rather than a retail shopping cart.",
        "Our work covers loose stone coordination, finished jewelry production, sample development, private label packaging, quality checks and worldwide shipping discussion.",
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
          quantity: "Quantity",
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
          quantity: "Sample, 100 pieces, 500 pieces...",
          customRequirement: "14K / 18K gold, private label, custom packaging, certificate needs...",
          message:
            "Reference style, stone size, metal, certificate, packaging, timeline and any quality requirements...",
        },
        submitting: "Submitting...",
        submit: "Send Inquiry",
        email: "Email Your Inquiry",
        successTitle: "Inquiry submitted",
        successMessage: "Thank you. We have received your inquiry and will contact you within 24 hours.",
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
      { label: "أحجار كريمة مزروعة", href: "/ar/lab-grown-gemstones" },
      { label: "الجملة", href: "/ar/collections/lab-grown-diamond-jewelry" },
      { label: "OEM / ODM", href: "/ar/collections/custom-jewelry-manufacturing" },
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
    },
    home: {
      seo: {
        title: "شريك تصنيع وسلسلة توريد المجوهرات | Xingyue Jewelry",
        description:
          "تدعم Xingyue Jewelry العلامات الناشئة ومتاجر البوتيك والمصممين المستقلين عبر تطوير المجوهرات وخدمات OEM / ODM وتنسيق سلسلة التوريد.",
      },
      eyebrow: "شريك تصنيع المجوهرات للعلامات التجارية الناشئة",
      title: "شريك تصنيع وسلسلة توريد المجوهرات",
      subtitle: "تطوير مخصص ودعم إنتاج وتنسيق علامة خاصة للمشاريع والعلامات المتنامية.",
      copy:
        "نساعد العلامات التجارية الناشئة ومتاجر المجوهرات الراقية والمصممين المستقلين ورواد الأعمال على تنسيق مجوهرات مرصعة بألماس وأحجار كريمة مُنتَجة في المختبر، إلى جانب الموسانيت والترصيعات المخصصة والتغليف والطلبات المتكررة.",
      stats: [
        { value: "دعم B2B مرن", label: "للعينات والإطلاق والطلبات المتكررة" },
        { value: "14K / 18K", label: "تخصيص ذهب حسب المشروع" },
        { value: "توريد منسق", label: "تنسيق المصادر والجودة والتغليف والتسليم" },
      ],
      sections: {
        productsEyebrow: "المنتجات",
        productsTitle: "نطاق منتجات B2B لبرامج الجملة المتكررة.",
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
          title: "مجوهرات ذهب 14K / 18K",
          copy: "حوامل ذهب مخصّصة للمجموعات الفاخرة وإطلاق العلامات الخاصة والطلبات الكبيرة.",
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
        { id: "lab-grown-diamond-pendants", name: "قلادات ألماس مزروع", category: "قلادات", material: "خيارات شهادات IGI / GIA حسب المشروع", copy: "برامج قلادات وسلاسل للبوتيكات والعلامات الإلكترونية والهدايا.", ...productSummaryMedia["lab-grown-diamond-pendants"], alt: null },
        { id: "moissanite-earrings", name: "أقراط موسانيت", category: "أقراط", material: "فضة S925 أو حوامل ذهب K مخصّصة", copy: "تصاميم متكررة الطلب ومناسبة للهدايا ومجموعات الجملة.", ...productSummaryMedia["moissanite-earrings"], alt: "أقراط موسانيت في تغليف عينة" },
        { id: "custom-tennis-bracelets", name: "أساور تنس مخصصة", category: "أساور", material: "طلب مخصص بذهب 10K / 14K / 18K", copy: "تطوير ترتيب الأحجار والقفل والطول والتغليف حسب سوقك.", ...productSummaryMedia["custom-tennis-bracelets"], alt: "سوار تنس مخصص لعلامة خاصة" },
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
      seo: { title: "حول Xingyue Jewelry | شريك تصنيع وسلسلة توريد", description: "تعرف على دعم Xingyue Jewelry للعلامات الناشئة ومتاجر البوتيك والمصممين المستقلين عبر التصنيع وخدمات OEM / ODM." },
      eyebrow: "كيف نعمل مع العلامات التجارية",
      title: "حول Xingyue Jewelry",
      subtitle: "شريك تصنيع وسلسلة توريد لمجوهرات الألماس المزروع والموسانيت وتخصيص الذهب وبرامج العلامة الخاصة.",
      profileEyebrow: "من نخدم",
      profileTitle: "نخدم العلامات التجارية الناشئة ومتاجر المجوهرات الراقية والمصممين المستقلين.",
      profileCopy: ["تدعم Xingyue Jewelry شركات المجوهرات الناشئة ومتاجر البوتيك والمصممين المستقلين ورواد الأعمال الذين يحتاجون شريك تصنيع عملي وليس متجر تجزئة.", "يغطي عملنا تنسيق الأحجار، إنتاج المجوهرات، تطوير العينات، التغليف الخاص، الفحص ومناقشة الشحن العالمي."],
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
        fieldLabels: { name: "الاسم", company: "اسم الشركة", email: "البريد الإلكتروني", phone: "واتساب / الهاتف", country: "الدولة", productInterest: "المنتج المطلوب", quantity: "الكمية", customRequirement: "متطلبات التخصيص", message: "الرسالة" },
        placeholders: { name: "اسمك", company: "اسم الشركة أو العلامة", email: "name@example.com", phone: "رقم واتساب أو الهاتف", country: "الدولة أو المنطقة", productInterest: "خواتم، أساور تنس، OEM/ODM، أحجار سائبة...", quantity: "عينة، 100 قطعة، 500 قطعة...", customRequirement: "ذهب 14K / 18K، علامة خاصة، تغليف مخصص، شهادات...", message: "النمط المرجعي، حجم الحجر، المعدن، الشهادة، التغليف والجدول الزمني..." },
        submitting: "جارٍ الإرسال...",
        submit: "أرسل استفساراً",
        email: "أرسل عبر البريد",
        successTitle: "تم إرسال الاستفسار",
        successMessage: "تم إرسال الاستفسار.",
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
      { label: "Gemas de laboratorio", href: "/es/lab-grown-gemstones" },
      { label: "Mayorista", href: "/es/collections/lab-grown-diamond-jewelry" },
      { label: "OEM / ODM", href: "/es/collections/custom-jewelry-manufacturing" },
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
    },
    home: {
      seo: {
        title: "Socio de fabricación y cadena de suministro | Xingyue Jewelry",
        description:
          "Xingyue Jewelry apoya marcas emergentes, joyerías boutique y diseñadores independientes con desarrollo, OEM / ODM y coordinación de suministro.",
      },
      eyebrow: "Socio de fabricación de joyería para marcas emergentes",
      title: "Socio de fabricación y cadena de suministro de joyería",
      subtitle: "Desarrollo personalizado, apoyo de producción y coordinación de marca privada para negocios de joyería en crecimiento.",
      copy:
        "Ayudamos a marcas emergentes, joyerías boutique, diseñadores independientes y emprendedores a coordinar joyería lab grown, moissanita, monturas personalizadas, empaque y pedidos recurrentes.",
      stats: [
        { value: "B2B flexible", label: "Apoyo para muestras, lanzamientos y pedidos recurrentes" },
        { value: "14K / 18K", label: "Personalización en oro por proyecto" },
        { value: "Suministro coordinado", label: "Compras, calidad, empaque y entrega" },
      ],
      sections: {
        productsEyebrow: "Productos",
        productsTitle: "Rango B2B para programas mayoristas recurrentes.",
        productsCopy: "Usa estas categorías para pedir catálogo, muestras o producción a granel.",
        manufacturingEyebrow: "Fabricación",
        manufacturingTitle: "Personalización OEM / ODM sin convertir el sitio en tienda minorista.",
        manufacturingCopy: "El flujo está pensado para cotización, MOQ, muestras y planificación de producción.",
      },
      productCards: [
        { title: "Joyería con diamantes de laboratorio", copy: "Anillos, colgantes, pendientes y pulseras con opciones IGI / GIA según el pedido.", image: sharedImages.labDiamond, alt: "Empaque para joyería con diamantes de laboratorio" },
        { title: "Joyería en oro 14K / 18K", copy: "Monturas de oro personalizadas para colecciones premium, marca privada y pedidos a granel.", image: sharedImages.bracelet, alt: "Pulsera de tenis en oro personalizada" },
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
        { id: "lab-grown-diamond-pendants", name: "Colgantes con diamantes de laboratorio", category: "Collares", material: "Opciones IGI / GIA según el proyecto", copy: "Programas de colgantes y cadenas para boutiques, marcas online y regalos.", ...productSummaryMedia["lab-grown-diamond-pendants"], alt: null },
        { id: "moissanite-earrings", name: "Pendientes de moissanita", category: "Pendientes", material: "Plata S925 o monturas de oro K personalizadas", copy: "Estilos de pedido recurrente para surtidos mayoristas y regalos.", ...productSummaryMedia["moissanite-earrings"], alt: "Pendientes de moissanita en empaque de muestra" },
        { id: "custom-tennis-bracelets", name: "Pulseras de tenis personalizadas", category: "Pulseras", material: "Oro 10K / 14K / 18K bajo pedido", copy: "Diseño de piedras, cierre, largo y empaque según tu mercado.", ...productSummaryMedia["custom-tennis-bracelets"], alt: "Pulsera de tenis personalizada para marca privada" },
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
      seo: { title: "Sobre Xingyue Jewelry | Socio de fabricación y suministro", description: "Conoce cómo Xingyue Jewelry apoya marcas emergentes, joyerías boutique y diseñadores independientes con fabricación y OEM / ODM." },
      eyebrow: "Cómo trabajamos con las marcas",
      title: "Sobre Xingyue Jewelry",
      subtitle: "Socio de fabricación y cadena de suministro para joyería lab grown, moissanita, oro personalizado y programas de marca privada.",
      profileEyebrow: "A quién ayudamos",
      profileTitle: "Diseñada para marcas emergentes, joyerías boutique y diseñadores independientes.",
      profileCopy: ["Xingyue Jewelry apoya startups de joyería, tiendas boutique, diseñadores independientes y emprendedores que necesitan un socio de fabricación, no un carrito minorista.", "Nuestro trabajo cubre selección de piedras, producción, muestras, empaque privado, control de calidad y planificación de envío."],
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
        fieldLabels: { name: "Nombre", company: "Empresa", email: "Correo electrónico", phone: "WhatsApp / Teléfono", country: "País", productInterest: "Producto de interés", quantity: "Cantidad", customRequirement: "Requisitos de personalización", message: "Mensaje" },
        placeholders: { name: "Tu nombre", company: "Nombre de empresa o marca", email: "name@example.com", phone: "Teléfono, WhatsApp o WeChat", country: "País o región", productInterest: "Anillos, pulseras tenis, OEM/ODM, piedras sueltas...", quantity: "Muestra, 100 piezas, 500 piezas...", customRequirement: "Oro 14K / 18K, marca privada, empaque, certificados...", message: "Estilo de referencia, piedra, metal, certificado, empaque y plazo..." },
        submitting: "Enviando...",
        submit: "Enviar consulta",
        email: "Enviar por email",
        successTitle: "Consulta enviada",
        successMessage: "Consulta enviada.",
        referenceLabel: "Referencia",
        errorFallback: "No se pudo enviar la consulta. Escríbenos por email.",
        validationPrefix: "Por favor completa",
      },
      note: "Para una cotización útil, menciona fotos de referencia, tamaño de piedra, metal, certificados, empaque y plazo de muestra.",
    },
  },
};

export function getI18nContent(locale: SupportedLocale) {
  return i18nContent[locale];
}

export function getLocalizedCollectionContent(locale: SupportedLocale, slug: string) {
  return i18nContent[locale].collections[slug];
}
