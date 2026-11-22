import limonGenerated from "@/data/catalog/limon.generated.json";
import moissaniteGenerated from "@/data/catalog/moissanite.generated.json";
import { contactConfig } from "@/lib/contact-config";

const defaultEmailHref = `mailto:${contactConfig.email}?subject=${encodeURIComponent("Wholesale Jewelry Inquiry")}`;

export const commercialTerms = {
  stockMinimumOrderUsd: 800,
  stockMixAndMatch: true,
  customMinimumPieces: 30,
  customIncludes: ["logo", "packaging"],
} as const;

export type ProductSeries =
  | "loose-stones"
  | "925-silver"
  | "18k-gold"
  | "14k-gold"
  | "other"
  | "sample";

export type ProductStockStatus = "in-stock" | "low-stock" | "made-to-order";

export type ProductVariant = {
  label: string;
  note?: string;
};

export type Product = {
  slug: string;
  collectionSlug: string;
  name: string;
  category: string;
  material: string;
  stone: string;
  setting: string;
  wholesale: string;
  priceNote: string;
  image: string;
  alt: string;
  gallery: Array<{ src: string; alt: string }>;
  description: string;
  highlights: string[];
  b2bSellingPoints: Array<{ title: string; copy: string; image: string; alt: string }>;
  specs: string[][];
  sku?: string;
  series?: ProductSeries;
  stockStatus?: ProductStockStatus;
  orderType?: "stock" | "custom";
  variants?: ProductVariant[];
  interest?: string;
  moqNote?: string;
};

export const brand = {
  name: "Zarivelle",
  domain: "zarivelle.com",
  email: contactConfig.email,
  emailHref: defaultEmailHref,
  emailInquiryHref: defaultEmailHref,
  whatsapp: contactConfig.whatsapp,
  whatsappHref: contactConfig.whatsappHref,
  tagline: "Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry",
};

export { navigation } from "@/lib/navigation";

export const collectionCategories = [
  {
    title: "Bulk Loose Stone Supply",
    copy: "Moissanite, lab-grown diamonds, zirconia and colored gemstones for repeat wholesale orders.",
    image: "/images/b2b-bulk-loose-stones.jpg",
    alt: "Bulk loose stone supply for B2B jewelry buyers",
    details: ["Mixed cut inventory", "Sample and bulk order support", "Stable repeat supply"],
  },
  {
    title: "Moissanite Jewelry",
    copy: "Rings, earrings, pendants, tennis bracelets and gift-ready styles with strong fire.",
    image: "/images/xingyue-tennis-bracelet.jpg",
    alt: "Moissanite tennis bracelet product sample",
    details: ["S925 silver settings", "K gold custom option", "Wholesale sample styles"],
  },
  {
    title: "Lab-Grown Diamond Jewelry",
    copy: "Modern fine jewelry with certificate options and clean styling for overseas boutiques.",
    image: "/images/b2b-certificate-packaging.jpg",
    alt: "Certificate and packaging support for lab-grown diamond jewelry",
    details: ["IGI option by order", "Private label packaging", "Premium retail presentation"],
  },
  {
    title: "Lab-Grown Colored Gemstones",
    copy: "Ruby, sapphire, Paraiba-style, pink and fancy color stones for custom jewelry production.",
    image: "/images/b2b-color-options.jpg",
    alt: "Lab-grown colored gemstone color options",
    details: ["Color range selection", "Matched stone sets", "Custom size discussion"],
  },
  {
    title: "Cuban Chains",
    copy: "Iced Cuban chain styles for bold wholesale collections and private-label programs.",
    image: "/images/xingyue-cuban-chain.jpg",
    alt: "Iced Cuban chain bracelet on dark background",
    details: ["Statement chain styles", "Stone setting options", "OEM production support"],
  },
  {
    title: "Tennis Chains",
    copy: "Tennis necklaces and bracelets in classic white, blue and custom color layouts.",
    image: "/images/b2b-quality-testing-blue-bracelet.jpg",
    alt: "B2B jewelry quality testing on a blue tennis bracelet",
    details: ["Bracelets and necklaces", "Quality testing", "Custom length and color"],
  },
];

export const b2bInquiryProofs = [
  {
    title: "Quality Testing",
    copy: "Diamond selector checks and visual inspection help confirm stone performance before shipment.",
    image: "/images/b2b-finished-jewelry-qc.jpg",
    alt: "B2B jewelry quality testing before shipment",
  },
  {
    title: "Certificate Options",
    copy: "Certificate and report support can be discussed by stone type, size, budget and order quantity.",
    image: "/images/b2b-stone-testing-certificate.jpg",
    alt: "Stone testing and certificate support for wholesale jewelry",
  },
  {
    title: "OEM / ODM Production",
    copy: "A coordinated workflow supports photo-to-sample development, repeat orders and private-label needs.",
    image: "/images/b2b-factory-workshop.jpg",
    alt: "Jewelry production workshop for OEM and ODM projects",
  },
  {
    title: "Sample & Packaging Support",
    copy: "Sample presentation and packaging options help overseas buyers prepare retail-ready collections.",
    image: "/images/b2b-sample-packaging.jpg",
    alt: "Sample packaging support for jewelry wholesale",
  },
];

export const products: Product[] = [
  {
    slug: "moissanite-solitaire-ring",
    collectionSlug: "moissanite-wholesale",
    name: "Moonlight Moissanite Solitaire Ring",
    category: "Rings",
    material: "S925 Silver / 10K 14K 18K Gold Custom",
    stone: "Moissanite or lab-grown diamond, 0.5ct - 5ct available",
    setting: "Four-prong or six-prong setting",
    wholesale: "MOQ friendly, sample order supported",
    priceNote: "Wholesale quote by stone size, metal, setting and quantity.",
    image: "/images/xingyue-ring-sample.jpg",
    alt: "Moissanite solitaire ring sample",
    gallery: [
      {
        src: "/images/b2b-heart-cut-loose-stone.jpg",
        alt: "Heart cut loose stone for custom jewelry",
      },
      {
        src: "/images/b2b-princess-cut-loose-stone.jpg",
        alt: "Princess cut loose stone for custom settings",
      },
      {
        src: "/images/b2b-certificate-packaging.jpg",
        alt: "certificate and packaging support for solitaire ring orders",
      },
    ],
    description:
      "A clean solitaire ring sample for overseas wholesale buyers, made for daily fine jewelry collections and custom private-label orders.",
    highlights: [
      "Moissanite wholesale sample style",
      "Available in S925 silver or custom K gold setting",
      "Stone size, cut, plating and packaging can be customized",
      "Suitable for engagement-inspired, promise and gift collections",
    ],
    b2bSellingPoints: [
      {
        title: "Bulk Loose Stone Supply",
        copy: "Choose from round, heart, princess, emerald, pear and other cut options before production.",
        image: "/images/b2b-bulk-loose-stones.jpg",
        alt: "Bulk loose stones for ring production",
      },
      {
        title: "Quality Testing Before Shipment",
        copy: "Selected stones and finished settings can be checked before packing, helping buyers reduce after-sales risk.",
        image: "/images/b2b-quality-testing-blue-bracelet.jpg",
        alt: "B2B jewelry quality testing before shipment",
      },
      {
        title: "Sample & Packaging Support",
        copy: "Sample orders, presentation boxes and private-label packing can be discussed for retail-ready launches.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "certificate and packaging support for wholesale jewelry",
      },
    ],
    specs: [
      ["Stone", "Moissanite / Lab-grown Diamond option"],
      ["Metal", "S925 silver, 10K, 14K or 18K gold"],
      ["Finish", "Rhodium, white gold tone, yellow gold tone or rose gold tone"],
      ["Service", "OEM / ODM jewelry customization"],
    ],
  },
  {
    slug: "lab-grown-diamond-halo-pendant",
    collectionSlug: "lab-grown-diamond-jewelry",
    name: "Lab-Grown Diamond Halo Pendant",
    category: "Necklaces",
    material: "S925 Silver / K Gold Custom",
    stone: "Lab-grown diamond or moissanite center stone",
    setting: "Halo pendant with fine prong work",
    wholesale: "Bulk production for jewelry brands",
    priceNote: "Quote depends on certificate, size and metal.",
    image: "/images/xingyue-heart-tennis-chain.jpg",
    alt: "Lab-grown diamond pendant and chain sample",
    gallery: [
      {
        src: "/images/b2b-certificate-packaging.jpg",
        alt: "certificate and packaging support for pendant orders",
      },
      {
        src: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "finished jewelry quality testing before shipment",
      },
      {
        src: "/images/b2b-sample-packaging.jpg",
        alt: "sample packaging support for pendant orders",
      },
    ],
    description:
      "A refined pendant for boutique jewelry collections, balancing certificate options, bright sparkle and premium gift positioning.",
    highlights: [
      "Lab-grown diamond jewelry for overseas boutiques",
      "IGI, GIA or NGTC certificate options by order details",
      "Gift packaging and private label support",
      "Flexible chain length and plating color",
    ],
    b2bSellingPoints: [
      {
        title: "Certificate Options",
        copy: "Certificate support can be matched to buyer budget, center stone size and market positioning.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "certificate and packaging support for lab-grown diamond jewelry",
      },
      {
        title: "Quality Testing Before Shipment",
        copy: "Finished jewelry can be checked for setting, stone appearance and presentation before delivery.",
        image: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "B2B jewelry quality testing before shipment",
      },
      {
        title: "Sample & Packaging Support",
        copy: "Pendant samples can be packed for boutique review, gifting programs or private-label launches.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "sample packaging support for jewelry wholesale",
      },
    ],
    specs: [
      ["Stone", "Lab-grown diamond / moissanite"],
      ["Metal", "S925 silver or K gold custom"],
      ["Use", "Gift, daily luxury, fine jewelry collection"],
      ["Service", "Wholesale, OEM and packaging customization"],
    ],
  },
  {
    slug: "s925-moissanite-stud-earrings",
    collectionSlug: "moissanite-wholesale",
    name: "S925 Moissanite Stud Earrings",
    category: "Earrings",
    material: "S925 Silver",
    stone: "Round brilliant moissanite pair",
    setting: "Basket setting with secure posts",
    wholesale: "Fast repeat order style",
    priceNote: "Best for entry-level wholesale collections.",
    image: "/images/b2b-sample-packaging.jpg",
    alt: "S925 moissanite stud earrings in a sample box",
    gallery: [
      {
        src: "/images/b2b-sample-packaging.jpg",
        alt: "sample packaging support for earring orders",
      },
      {
        src: "/images/b2b-color-stone-inventory.jpg",
        alt: "colored stone inventory for earring customization",
      },
      {
        src: "/images/b2b-manual-setting-workshop.webp",
        alt: "manual setting workshop for jewelry production",
      },
    ],
    description:
      "A compact, high-sparkle earring style for repeat wholesale orders, daily wear collections and promotional gift sets.",
    highlights: [
      "Classic daily jewelry item with strong sparkle",
      "S925 silver material mark available",
      "Multiple stone sizes for wholesale assortment",
      "Lightweight design for overseas shipping",
    ],
    b2bSellingPoints: [
      {
        title: "Sample & Packaging Support",
        copy: "Stud earring samples can be prepared with simple presentation boxes and buyer-ready cards.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "sample packaging support for earrings",
      },
      {
        title: "Bulk Loose Stone Supply",
        copy: "Stone sizes can be matched in batches for repeat earring programs.",
        image: "/images/b2b-bulk-loose-stones.jpg",
        alt: "bulk loose stones for earring production",
      },
      {
        title: "OEM / ODM Production",
        copy: "Settings, posts, plating and packaging can be adjusted for different overseas channels.",
        image: "/images/b2b-manual-setting-workshop.webp",
        alt: "manual jewelry setting workshop for OEM production",
      },
    ],
    specs: [
      ["Stone", "Moissanite pair"],
      ["Metal", "S925 silver"],
      ["Size", "3mm - 8mm common range"],
      ["Service", "Bulk order and card packaging"],
    ],
  },
  {
    slug: "custom-k-gold-tennis-bracelet",
    collectionSlug: "tennis-chains",
    name: "Custom K Gold Tennis Bracelet",
    category: "Bracelets",
    material: "10K / 14K / 18K Gold Custom",
    stone: "Moissanite, lab-grown diamond or colored gemstone line",
    setting: "Secure line bracelet setting",
    wholesale: "Custom order consultation required",
    priceNote: "Quote by metal weight, stone count and length.",
    image: "/images/xingyue-tennis-bracelet.jpg",
    alt: "Custom tennis bracelet sample",
    gallery: [
      {
        src: "/images/b2b-quality-testing-blue-bracelet.jpg",
        alt: "B2B jewelry quality testing on a tennis bracelet",
      },
      {
        src: "/images/b2b-color-options.jpg",
        alt: "colored gemstone options for tennis bracelet production",
      },
      {
        src: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "finished jewelry quality testing before shipment",
      },
    ],
    description:
      "A higher-ticket custom option for brands that need fine jewelry pieces with stronger material value and a premium client feel.",
    highlights: [
      "Custom K gold setting for premium collections",
      "Stone count and bracelet length can be adjusted",
      "Suitable for anniversary, bridal and high-value gifting",
      "Quality control before shipment",
    ],
    b2bSellingPoints: [
      {
        title: "Quality Testing Before Shipment",
        copy: "Line bracelets can be checked for stone appearance, clasp condition and final presentation.",
        image: "/images/b2b-quality-testing-blue-bracelet.jpg",
        alt: "B2B jewelry quality testing before shipment",
      },
      {
        title: "Color & Stone Customization",
        copy: "White, blue, green, pink and mixed color layouts can be discussed for custom market needs.",
        image: "/images/b2b-color-options.jpg",
        alt: "colored gemstone options for tennis chain customization",
      },
      {
        title: "OEM / ODM Production",
        copy: "Bracelet length, stone count, metal, clasp and packing can be developed for private-label buyers.",
        image: "/images/b2b-factory-workshop.jpg",
        alt: "jewelry production workshop for OEM and ODM projects",
      },
    ],
    specs: [
      ["Stone", "Moissanite / lab-grown diamond / colored gemstone"],
      ["Metal", "10K, 14K or 18K gold"],
      ["Length", "Custom by market preference"],
      ["Service", "Made-to-order wholesale production"],
    ],
  },
  {
    slug: "lm0029-white-lab-grown-diamond-loose-stones",
    collectionSlug: "",
    sku: "LM0029",
    series: "loose-stones",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "lab-grown-diamond-jewelry",
    name: "Lab-Grown White Diamond Loose Stones",
    category: "Loose Stones",
    material: "Lab-grown diamond",
    stone: "Lab-grown white diamond, assorted shapes and sizes",
    setting: "Loose stone — setting not included",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by shape, size and quantity.",
    image: "/images/products/lm0029-white-lab-grown-diamond-loose-stones/01.webp",
    alt: "Lab-grown white diamond loose stones in assorted shapes",
    gallery: [],
    description:
      "Lab-grown white diamond loose stones for jewelers and brands sourcing calibrated or near-calibrated stones. Shapes and sizes are confirmed against current stock before quotation.",
    highlights: [
      "Round, oval, pear and emerald cuts shown in the reference photo",
      "Sold as loose stones — setting not included",
      "Sizes confirmed against current stock before quotation",
      "Suitable for sample sets, repairs and small production runs",
    ],
    b2bSellingPoints: [
      {
        title: "Stone Matching",
        copy: "Stones can be matched by shape, size and color direction before packing.",
        image: "/images/b2b-bulk-loose-stones.jpg",
        alt: "Bulk loose stones for matching",
      },
      {
        title: "Checked Before Packing",
        copy: "Selected stones are checked under the loupe before they leave the workshop.",
        image: "/images/b2b-stone-testing-certificate.jpg",
        alt: "Stone testing before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0029 with the shapes, sizes and quantity you need for a cleaner quotation.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Sample packaging for loose stones",
      },
    ],
    specs: [
      ["SKU", "LM0029"],
      ["Stone", "Lab-grown white diamond"],
      ["Forms", "Assorted shapes — confirm before order"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Round" },
      { label: "Oval" },
      { label: "Pear" },
      { label: "Emerald" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0030-pink-lab-grown-diamond-loose-stones",
    collectionSlug: "",
    sku: "LM0030",
    series: "loose-stones",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "lab-grown-diamond-jewelry",
    name: "Lab-Grown Pink Diamond Loose Stones",
    category: "Loose Stones",
    material: "Lab-grown diamond",
    stone: "Lab-grown pink diamond, assorted shapes and sizes",
    setting: "Loose stone — setting not included",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by shape, size, color and quantity.",
    image: "/images/products/lm0030-pink-lab-grown-diamond-loose-stones/01.webp",
    alt: "Lab-grown pink diamond loose stones in assorted shapes",
    gallery: [],
    description:
      "Lab-grown pink diamond loose stones for colored-stone programs, sample sets and repair work. Exact color, shape and size are confirmed against current stock before quotation.",
    highlights: [
      "Pink lab-grown diamonds shown in assorted shapes",
      "Color and size matched to your brief where stock allows",
      "Sold as loose stones — setting not included",
      "Useful for accent stones, sample sets and small runs",
    ],
    b2bSellingPoints: [
      {
        title: "Color Matching",
        copy: "Pink stones can be matched by tone and size direction before packing.",
        image: "/images/b2b-color-stone-inventory.jpg",
        alt: "Colored stone inventory for matching",
      },
      {
        title: "Checked Before Packing",
        copy: "Stones are checked for visible inclusions and shape consistency before dispatch.",
        image: "/images/b2b-stone-testing-certificate.jpg",
        alt: "Stone testing before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0030 with the shapes, sizes and quantity you need.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Sample packaging for loose stones",
      },
    ],
    specs: [
      ["SKU", "LM0030"],
      ["Stone", "Lab-grown pink diamond"],
      ["Forms", "Assorted shapes — confirm before order"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Round" },
      { label: "Oval" },
      { label: "Pear" },
      { label: "Square" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0031-yellow-lab-grown-diamond-loose-stones",
    collectionSlug: "",
    sku: "LM0031",
    series: "loose-stones",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "lab-grown-diamond-jewelry",
    name: "Lab-Grown Yellow Diamond Loose Stones",
    category: "Loose Stones",
    material: "Lab-grown diamond",
    stone: "Lab-grown yellow diamond, assorted shapes and sizes",
    setting: "Loose stone — setting not included",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by shape, size, color and quantity.",
    image: "/images/products/lm0031-yellow-lab-grown-diamond-loose-stones/01.webp",
    alt: "Lab-grown yellow diamond loose stones in assorted shapes",
    gallery: [],
    description:
      "Lab-grown yellow diamond loose stones for warm-color collections, accent sets and repair work. Shape, size and tone are confirmed against current stock before quotation.",
    highlights: [
      "Yellow lab-grown diamonds shown in assorted shapes",
      "Warm color direction for accent and center stones",
      "Sold as loose stones — setting not included",
      "Sizes confirmed against current stock",
    ],
    b2bSellingPoints: [
      {
        title: "Color Matching",
        copy: "Yellow stones can be matched by tone and size direction before packing.",
        image: "/images/b2b-color-options.jpg",
        alt: "Colored stone options for matching",
      },
      {
        title: "Checked Before Packing",
        copy: "Stones are checked for shape and visible consistency before dispatch.",
        image: "/images/b2b-stone-testing-certificate.jpg",
        alt: "Stone testing before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0031 with the shapes, sizes and quantity you need.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Sample packaging for loose stones",
      },
    ],
    specs: [
      ["SKU", "LM0031"],
      ["Stone", "Lab-grown yellow diamond"],
      ["Forms", "Assorted shapes — confirm before order"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Round" },
      { label: "Oval" },
      { label: "Pear" },
      { label: "Square" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0032-blue-lab-grown-diamond-loose-stones",
    collectionSlug: "",
    sku: "LM0032",
    series: "loose-stones",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "lab-grown-diamond-jewelry",
    name: "Lab-Grown Blue Diamond Loose Stones",
    category: "Loose Stones",
    material: "Lab-grown diamond",
    stone: "Lab-grown blue diamond, assorted shapes and sizes",
    setting: "Loose stone — setting not included",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by shape, size, color and quantity.",
    image: "/images/products/lm0032-blue-lab-grown-diamond-loose-stones/01.webp",
    alt: "Lab-grown blue diamond loose stones in assorted shapes",
    gallery: [],
    description:
      "Lab-grown blue diamond loose stones for cool-tone collections, accent sets and repair work. Exact color, shape and size are confirmed against current stock before quotation.",
    highlights: [
      "Blue lab-grown diamonds shown in assorted shapes",
      "Cool color direction for accent and center stones",
      "Sold as loose stones — setting not included",
      "Sizes confirmed against current stock",
    ],
    b2bSellingPoints: [
      {
        title: "Color Matching",
        copy: "Blue stones can be matched by tone and size direction before packing.",
        image: "/images/b2b-color-options.jpg",
        alt: "Colored stone options for matching",
      },
      {
        title: "Checked Before Packing",
        copy: "Stones are checked for shape and visible consistency before dispatch.",
        image: "/images/b2b-stone-testing-certificate.jpg",
        alt: "Stone testing before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0032 with the shapes, sizes and quantity you need.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Sample packaging for loose stones",
      },
    ],
    specs: [
      ["SKU", "LM0032"],
      ["Stone", "Lab-grown blue diamond"],
      ["Forms", "Assorted shapes — confirm before order"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Round" },
      { label: "Oval" },
      { label: "Pear" },
      { label: "Square" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0093-round-lab-grown-diamond-loose-stone",
    collectionSlug: "",
    sku: "LM0093",
    series: "loose-stones",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "lab-grown-diamond-jewelry",
    name: "Round Lab-Grown Diamond Loose Stone",
    category: "Loose Stones",
    material: "Lab-grown diamond",
    stone: "Round brilliant lab-grown diamond",
    setting: "Loose stone — setting not included",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by carat, color and quantity.",
    image: "/images/products/lm0093-round-lab-grown-diamond-loose-stone/01.webp",
    alt: "Round brilliant lab-grown diamond held in tweezers",
    gallery: [
      {
        src: "/images/products/lm0093-round-lab-grown-diamond-loose-stone/02.webp",
        alt: "Round lab-grown diamond in a gemstone box",
      },
      {
        src: "/images/products/lm0093-round-lab-grown-diamond-loose-stone/03.webp",
        alt: "Round lab-grown diamond inspected by hand",
      },
      {
        src: "/images/products/lm0093-round-lab-grown-diamond-loose-stone/04.webp",
        alt: "Round lab-grown diamond close detail",
      },
    ],
    description:
      "A round brilliant lab-grown diamond shown loose and ready for setting. Carat weight, color and clarity options are confirmed against current stock before quotation.",
    highlights: [
      "Round brilliant cut for classic solitaire and accent use",
      "Loose stone — setting not included",
      "Carat, color and clarity confirmed before quotation",
      "Suitable for sample sets and small production runs",
    ],
    b2bSellingPoints: [
      {
        title: "Stone Matching",
        copy: "Stones can be matched by size, color and clarity direction before packing.",
        image: "/images/b2b-bulk-loose-stones.jpg",
        alt: "Bulk loose stones for matching",
      },
      {
        title: "Checked Under Loupe",
        copy: "The selected stone is checked before packing and can be photographed for approval.",
        image: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "Jewelry quality check before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0093 with the carat range and quantity you need.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "Certificate and packaging support",
      },
    ],
    specs: [
      ["SKU", "LM0093"],
      ["Stone", "Round brilliant lab-grown diamond"],
      ["Form", "Loose stone — setting not included"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Round brilliant", note: "Carat options confirmed before order" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0023-925-silver-lab-grown-gemstone-ring",
    collectionSlug: "lab-grown-colored-gemstones",
    sku: "LM0023",
    series: "925-silver",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "colored-gemstone-jewelry",
    name: "925 Silver Lab-Grown Gemstone Ring",
    category: "Rings",
    material: "925 Sterling Silver",
    stone: "Lab-grown colored gemstone with lab-grown diamond accents",
    setting: "Open-band prong setting with side accents",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by color, ring size and quantity.",
    image: "/images/products/lm0023-925-silver-lab-grown-gemstone-ring/01.webp",
    alt: "925 silver ring with a green lab-grown gemstone",
    gallery: [
      {
        src: "/images/products/lm0023-925-silver-lab-grown-gemstone-ring/02.webp",
        alt: "925 silver gemstone ring in a purple stone option",
      },
      {
        src: "/images/products/lm0023-925-silver-lab-grown-gemstone-ring/03.webp",
        alt: "925 silver gemstone ring in a red stone option",
      },
      {
        src: "/images/products/lm0023-925-silver-lab-grown-gemstone-ring/04.webp",
        alt: "925 silver gemstone ring in a blue stone option",
      },
    ],
    description:
      "A 925 sterling silver ring with a lab-grown colored center stone and small diamond accents. Color options are confirmed against current stock before quotation.",
    highlights: [
      "925 sterling silver setting",
      "Lab-grown colored center stone with diamond accents",
      "Green, purple, red and blue options shown",
      "Ring sizes and stone sizes confirmed before order",
    ],
    b2bSellingPoints: [
      {
        title: "Ready Stock, Mixed Orders",
        copy: "Combine this ring with other in-stock 925 silver styles to reach the USD 800 order minimum.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Ready-stock jewelry packaging",
      },
      {
        title: "Checked Before Packing",
        copy: "Stone setting, prongs and finish are checked before the ring is packed.",
        image: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "Jewelry quality check before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0023 with the colors, ring sizes and quantity you need.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "Packaging and certificate support",
      },
    ],
    specs: [
      ["SKU", "LM0023"],
      ["Material", "925 Sterling Silver"],
      ["Stone", "Lab-grown colored gemstone with diamond accents"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Green" },
      { label: "Purple" },
      { label: "Red" },
      { label: "Blue" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0024-925-silver-lab-grown-gemstone-halo-ring",
    collectionSlug: "lab-grown-colored-gemstones",
    sku: "LM0024",
    series: "925-silver",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "colored-gemstone-jewelry",
    name: "925 Silver Lab-Grown Gemstone Halo Ring",
    category: "Rings",
    material: "925 Sterling Silver",
    stone: "Lab-grown colored gemstone with a diamond halo",
    setting: "Halo setting with pavé shoulders",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by color, ring size and quantity.",
    image: "/images/products/lm0024-925-silver-lab-grown-gemstone-halo-ring/01.webp",
    alt: "925 silver halo ring with a blue lab-grown gemstone",
    gallery: [
      {
        src: "/images/products/lm0024-925-silver-lab-grown-gemstone-halo-ring/02.webp",
        alt: "925 silver halo ring in a purple stone option",
      },
      {
        src: "/images/products/lm0024-925-silver-lab-grown-gemstone-halo-ring/03.webp",
        alt: "925 silver halo ring in a red stone option",
      },
      {
        src: "/images/products/lm0024-925-silver-lab-grown-gemstone-halo-ring/04.webp",
        alt: "925 silver halo ring in a yellow stone option",
      },
    ],
    description:
      "A 925 sterling silver halo ring with a lab-grown colored center stone and pavé-set shoulders. Multiple color options are shown in the gallery; current availability is confirmed before quotation.",
    highlights: [
      "925 sterling silver halo setting",
      "Lab-grown colored center stone with pavé shoulders",
      "Multiple color options shown in the gallery",
      "Ring sizes and stone sizes confirmed before order",
    ],
    b2bSellingPoints: [
      {
        title: "Ready Stock, Mixed Orders",
        copy: "Combine this halo ring with other in-stock 925 silver styles to reach the USD 800 order minimum.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Ready-stock jewelry packaging",
      },
      {
        title: "Checked Before Packing",
        copy: "Halo stones, prongs and finish are checked before the ring is packed.",
        image: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "Jewelry quality check before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0024 with the colors, ring sizes and quantity you need.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "Packaging and certificate support",
      },
    ],
    specs: [
      ["SKU", "LM0024"],
      ["Material", "925 Sterling Silver"],
      ["Stone", "Lab-grown colored gemstone with diamond halo"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "Color options shown in gallery", note: "Availability confirmed before order" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  {
    slug: "lm0002-925-silver-moissanite-square-stud-earrings",
    collectionSlug: "moissanite-wholesale",
    sku: "LM0002",
    series: "925-silver",
    stockStatus: "in-stock",
    orderType: "stock",
    interest: "moissanite-jewelry",
    name: "925 Silver Moissanite Square Stud Earrings",
    category: "Earrings",
    material: "925 Sterling Silver",
    stone: "Square moissanite with a pavé halo",
    setting: "Square halo stud setting with secure posts",
    wholesale: "Ready stock — mixed-style orders welcome",
    priceNote: "Wholesale quote by stone size and quantity.",
    image: "/images/products/lm0002-925-silver-moissanite-square-stud-earrings/01.webp",
    alt: "925 silver square moissanite stud earrings",
    gallery: [
      {
        src: "/images/products/lm0002-925-silver-moissanite-square-stud-earrings/02.webp",
        alt: "Square moissanite stud earrings in white stone",
      },
      {
        src: "/images/products/lm0002-925-silver-moissanite-square-stud-earrings/03.webp",
        alt: "Square moissanite stud earrings in a green stone option",
      },
      {
        src: "/images/products/lm0002-925-silver-moissanite-square-stud-earrings/04.webp",
        alt: "Square moissanite stud earrings detail",
      },
    ],
    description:
      "A pair of 925 sterling silver square stud earrings set with moissanite and a pavé halo. White and green options are shown; current availability is confirmed before quotation.",
    highlights: [
      "925 sterling silver stud setting",
      "Square moissanite center with a pavé halo",
      "White and green options shown",
      "Stone size and quantity confirmed before order",
    ],
    b2bSellingPoints: [
      {
        title: "Ready Stock, Mixed Orders",
        copy: "Combine these studs with other in-stock 925 silver styles to reach the USD 800 order minimum.",
        image: "/images/b2b-sample-packaging.jpg",
        alt: "Ready-stock jewelry packaging",
      },
      {
        title: "Checked Before Packing",
        copy: "Stone setting, posts and finish are checked before the pair is packed.",
        image: "/images/b2b-finished-jewelry-qc.jpg",
        alt: "Jewelry quality check before packing",
      },
      {
        title: "Quote With Your SKU",
        copy: "Send SKU LM0002 with the color, stone size and quantity you need.",
        image: "/images/b2b-certificate-packaging.jpg",
        alt: "Packaging and certificate support",
      },
    ],
    specs: [
      ["SKU", "LM0002"],
      ["Material", "925 Sterling Silver"],
      ["Stone", "Square moissanite with pavé halo"],
      ["Order", "Ready-stock orders from USD 800 total, mixed styles allowed"],
    ],
    variants: [
      { label: "White moissanite" },
      { label: "Green stone option" },
    ],
    moqNote:
      "Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging.",
  },
  ...(limonGenerated as unknown as Product[]),
  ...(moissaniteGenerated as unknown as Product[]),
];

export const educationTopics = [
  {
    title: "What is Moissanite?",
    cnTitle: "",
    copy: "Moissanite is a brilliant jewelry stone known for strong fire, daily durability and excellent value. It is popular for wholesale rings, earrings and gift jewelry.",
  },
  {
    title: "What is a Lab-Grown Diamond?",
    cnTitle: "",
    copy: "A lab-grown diamond has the same carbon crystal structure as mined diamond. It is valued by overseas customers for traceability, beauty and price transparency.",
  },
  {
    title: "Moissanite vs Lab-Grown Diamond",
    cnTitle: "",
    copy: "Moissanite is best for high sparkle and value. Lab-grown diamond is best when customers want real diamond identity and certificate-backed fine jewelry.",
  },
  {
    title: "Certificate & Material Notes",
    cnTitle: "",
    copy: "IGI, GIA and NGTC certificate options depend on stone type, size and order details. S925 silver and K gold materials should be confirmed before production.",
  },
];

export const processSteps = [
  "Send product style, reference image, stone size, metal and quantity",
  "Receive quotation and sample suggestion",
  "Confirm stone, setting, certificate and packaging",
  "Production, quality check and international shipment",
];
