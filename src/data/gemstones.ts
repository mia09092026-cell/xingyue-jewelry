export type GemstoneColorGroup = {
  slug: string;
  name: string;
  representativeStones: string[];
  image: string;
  imagePosition?: string;
  alt: string;
  accent: string;
};

export type GemstoneTypeCategory = {
  slug: string;
  name: string;
  description: string;
  availableColors: string;
  moq: string;
  fromPrice: string;
  image: string | null;
  imagePosition?: string;
  alt: string | null;
};

export type GemstoneCatalogItem = {
  slug: string;
  name: string;
  color: string;
  gemstoneType: string;
  shape: string;
  sizeRange: string;
  quality: string;
  moq: string;
  referencePrice: string;
  availability: string;
  image: string | null;
  imagePosition?: string;
  alt: string | null;
  description: string;
  tags: string[];
};

export type GemstoneColorGroupTranslation = Pick<
  GemstoneColorGroup,
  "name" | "representativeStones" | "alt"
>;

export type GemstoneTypeCategoryTranslation = Pick<
  GemstoneTypeCategory,
  "name" | "description" | "availableColors" | "moq" | "fromPrice" | "alt"
>;

export type GemstoneCatalogItemTranslation = Pick<
  GemstoneCatalogItem,
  | "name"
  | "color"
  | "gemstoneType"
  | "shape"
  | "sizeRange"
  | "quality"
  | "moq"
  | "referencePrice"
  | "availability"
  | "alt"
  | "description"
  | "tags"
>;

export type GemstoneCatalogTranslationSet = {
  colorGroups: Record<string, GemstoneColorGroupTranslation>;
  typeCategories: Record<string, GemstoneTypeCategoryTranslation>;
  catalogItems: Record<string, GemstoneCatalogItemTranslation>;
};

export const gemstonePriceDisclaimer =
  "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.";

export const gemstoneColorGroups: GemstoneColorGroup[] = [
  {
    slug: "red",
    name: "Red",
    representativeStones: ["Lab-Grown Ruby", "Red Spinel", "Red Moissanite"],
    image: "/images/b2b-lab-grown-ruby.jpg",
    alt: "Red pear cut lab-grown ruby for wholesale sourcing",
    accent: "#8f2435",
  },
  {
    slug: "blue",
    name: "Blue",
    representativeStones: ["Lab-Grown Sapphire", "Blue Spinel", "Blue Moissanite"],
    image: "/images/gemstone-colors/blue-gemstones.webp",
    imagePosition: "50% 52%",
    alt: "Blue lab-grown gemstones in mixed cuts on a white background",
    accent: "#244b86",
  },
  {
    slug: "green",
    name: "Green",
    representativeStones: ["Lab-Grown Emerald", "Green Sapphire", "Green Moissanite"],
    image: "/images/gemstone-colors/green-gemstones.webp",
    imagePosition: "50% 54%",
    alt: "Green lab-grown gemstones in mixed shapes on a white background",
    accent: "#32634f",
  },
  {
    slug: "pink",
    name: "Pink",
    representativeStones: ["Pink Sapphire", "Pink Spinel", "Pink Lab-Grown Diamond"],
    image: "/images/gemstone-colors/pink-gemstones.webp",
    imagePosition: "54% 50%",
    alt: "Pink lab-grown gemstones in oval and cushion cuts on a white background",
    accent: "#b85f79",
  },
  {
    slug: "purple",
    name: "Purple",
    representativeStones: ["Alexandrite", "Purple Sapphire", "Amethyst-Style Lab-Grown Stones"],
    image: "/images/gemstone-colors/purple-gemstones.webp",
    imagePosition: "50% 46%",
    alt: "Purple cushion-cut lab-grown gemstone on a white background",
    accent: "#655181",
  },
  {
    slug: "yellow-champagne",
    name: "Yellow / Champagne",
    representativeStones: [
      "Yellow Sapphire",
      "Champagne Lab-Grown Diamond",
      "Yellow Moissanite",
    ],
    image: "/images/gemstone-colors/yellow-champagne-gemstones.webp",
    imagePosition: "50% 58%",
    alt: "Yellow and champagne lab-grown gemstones in radiant cuts on a white background",
    accent: "#a87a2f",
  },
  {
    slug: "white-colorless",
    name: "White / Colorless",
    representativeStones: ["Lab-Grown Diamond", "Moissanite", "Cubic Zirconia"],
    image: "/images/gemstone-colors/white-colorless-gemstones.webp",
    imagePosition: "50% 44%",
    alt: "Colorless lab-grown gemstones in mixed cushion cuts on a white background",
    accent: "#78838f",
  },
];

export const gemstoneTypeCategories: GemstoneTypeCategory[] = [
  {
    slug: "lab-grown-ruby",
    name: "Lab-Grown Ruby",
    description:
      "Rich red stones for bridal accents, statement rings and repeat calibrated programs.",
    availableColors: "Pigeon-red style, vivid red, deep red and pink-red",
    moq: "From 20 ct mixed lot or matched-set discussion",
    fromPrice: "From US$8–35 / ct depending on size, color and quality",
    image: "/images/b2b-lab-grown-ruby.jpg",
    alt: "Lab-grown ruby pear cut loose stone",
  },
  {
    slug: "lab-grown-sapphire",
    name: "Lab-Grown Sapphire",
    description:
      "Reliable color and size options for rings, earrings, pendants and tennis layouts.",
    availableColors: "Royal blue, cornflower style, pink, yellow, green and white",
    moq: "From 20 ct mixed lot or calibrated batch",
    fromPrice: "From US$5–28 / ct depending on size, color and quality",
    image: "/images/gemstone-colors/blue-gemstones.webp",
    imagePosition: "50% 50%",
    alt: "Blue lab-grown sapphires in mixed cuts on a white background",
  },
  {
    slug: "lab-grown-emerald",
    name: "Lab-Grown Emerald",
    description:
      "Green stones with cut and clarity options for premium custom jewelry collections.",
    availableColors: "Medium green, vivid green and deep green",
    moq: "From 10 ct, subject to cut and clarity",
    fromPrice: "From US$10–45 / ct depending on size, clarity and cut",
    image: "/images/gemstone-colors/green-gemstones.webp",
    imagePosition: "50% 50%",
    alt: "Green lab-grown emeralds in mixed cuts on a white background",
  },
  {
    slug: "lab-grown-spinel",
    name: "Lab-Grown Spinel",
    description:
      "Broad color flexibility for matched layouts, fashion jewelry and custom designs.",
    availableColors: "Red, blue, pink, purple, green and colorless",
    moq: "From 30 ct mixed or single-color lot",
    fromPrice: "Quote by color, size and cut",
    image: null,
    alt: null,
  },
  {
    slug: "lab-grown-alexandrite",
    name: "Lab-Grown Alexandrite",
    description:
      "Color-change material for distinctive capsules and premium statement pieces.",
    availableColors: "Blue-green to purple-red color-change range",
    moq: "From 10 ct, subject to size and color-change effect",
    fromPrice: "Quote by color change, size and clarity",
    image: null,
    alt: null,
  },
  {
    slug: "colored-moissanite",
    name: "Colored Moissanite",
    description:
      "High-fire colored stones for rings, earrings, pendants and coordinated jewelry sets.",
    availableColors: "Blue, green, yellow, champagne, pink, grey and black",
    moq: "From 20 ct or matched pair program",
    fromPrice: "From US$3–18 / ct depending on color and size",
    image: null,
    alt: null,
  },
  {
    slug: "lab-grown-colored-diamonds",
    name: "Lab-Grown Colored Diamonds",
    description:
      "Fancy-color lab-grown diamond sourcing with certificate options by project.",
    availableColors: "Pink, blue, yellow, champagne and selected fancy colors",
    moq: "Single certified stone or matched-lot discussion",
    fromPrice: "Quote by size, color, clarity and certificate",
    image: "/images/xingyue-colored-gemstones.jpg",
    alt: "Fancy color lab-grown diamond assortment",
  },
  {
    slug: "cubic-zirconia",
    name: "Cubic Zirconia",
    description:
      "Cost-efficient calibrated stones for sampling, fashion lines and volume production.",
    availableColors: "Colorless and broad custom color range",
    moq: "From 100 ct or production quantity discussion",
    fromPrice: "From US$0.5–5 / ct depending on cut and quantity",
    image: "/images/b2b-bulk-loose-stones.jpg",
    alt: "Bulk colorless calibrated cubic zirconia stones",
  },
  {
    slug: "loose-stones-custom-jewelry",
    name: "Loose Stones for Custom Jewelry",
    description:
      "Shape, size and color sourcing aligned to CAD, reference images and setting plans.",
    availableColors: "Colorless, red, blue, green, pink, purple and yellow",
    moq: "Sample stone or project-based sourcing",
    fromPrice: "Quote by stone brief and design",
    image: "/images/xingyue-loose-stones.jpg",
    alt: "Loose stones for custom jewelry design and manufacturing",
  },
  {
    slug: "calibrated-gemstones-wholesale",
    name: "Calibrated Stones for Wholesale",
    description:
      "Repeatable millimeter sizes, matched colors and production-ready stone batches.",
    availableColors: "Single color, matched pairs and mixed color assortments",
    moq: "From 50 ct or style production requirement",
    fromPrice: "Quote by calibration, tolerance and quantity",
    image: "/images/b2b-color-stone-inventory.jpg",
    alt: "Calibrated colored stones arranged for wholesale orders",
  },
];

export const gemstoneCatalogItems: GemstoneCatalogItem[] = [
  {
    slug: "ruby-pear-custom",
    name: "Lab-Grown Ruby Pear Cut",
    color: "Vivid red",
    gemstoneType: "Lab-Grown Ruby",
    shape: "Pear",
    sizeRange: "4 × 3 mm to 14 × 10 mm",
    quality: "Commercial to premium jewelry grade",
    moq: "20 ct or matched project lot",
    referencePrice: "US$8–35 / ct reference range",
    availability: "Sample sizes and production lots by confirmation",
    image: "/images/b2b-lab-grown-ruby.jpg",
    alt: "Vivid red pear cut lab-grown ruby",
    description:
      "A refined red center or accent stone option for rings, earrings and custom jewelry capsules.",
    tags: ["red", "ruby", "pear", "custom jewelry"],
  },
  {
    slug: "sapphire-cushion-calibrated",
    name: "Lab-Grown Sapphire Cushion Cut",
    color: "Royal blue",
    gemstoneType: "Lab-Grown Sapphire",
    shape: "Cushion",
    sizeRange: "3 × 3 mm to 12 × 10 mm",
    quality: "Even-color jewelry grade",
    moq: "20 ct or calibrated batch",
    referencePrice: "US$5–28 / ct reference range",
    availability: "Common sizes available; custom calibration by order",
    image: "/images/gemstone-colors/blue-gemstones.webp",
    imagePosition: "50% 58%",
    alt: "Blue lab-grown sapphires including a cushion cut on a white background",
    description:
      "A classic blue option for repeat ring, pendant and matched earring programs.",
    tags: ["blue", "sapphire", "cushion", "calibrated"],
  },
  {
    slug: "emerald-green-emerald-cut",
    name: "Lab-Grown Emerald Emerald Cut",
    color: "Medium to vivid green",
    gemstoneType: "Lab-Grown Emerald",
    shape: "Emerald / octagon",
    sizeRange: "5 × 3 mm to 12 × 10 mm",
    quality: "Selected clarity and color by brief",
    moq: "10 ct or custom project lot",
    referencePrice: "US$10–45 / ct reference range",
    availability: "Cut-to-order and selected stock discussion",
    image: "/images/gemstone-colors/green-gemstones.webp",
    imagePosition: "50% 58%",
    alt: "Green lab-grown emerald selection including emerald cuts on a white background",
    description:
      "Green center stones for premium custom rings, pendants and coordinated fine jewelry.",
    tags: ["green", "emerald", "emerald cut", "premium"],
  },
  {
    slug: "colored-moissanite-mixed-cuts",
    name: "Colored Moissanite Mixed Cuts",
    color: "Blue, green, yellow, champagne and selected colors",
    gemstoneType: "Colored Moissanite",
    shape: "Round, oval, pear, cushion and radiant",
    sizeRange: "2 mm to 12 mm",
    quality: "High-fire jewelry grade",
    moq: "20 ct or matched pair discussion",
    referencePrice: "US$3–18 / ct reference range",
    availability: "Color card and size list on request",
    image: null,
    alt: null,
    description:
      "Flexible fancy-color sourcing for fashion collections and custom stone layouts.",
    tags: ["moissanite", "colored stones", "mixed cuts", "wholesale"],
  },
  {
    slug: "white-cz-calibrated-baguette",
    name: "White CZ Calibrated Baguettes",
    color: "White / colorless",
    gemstoneType: "Cubic Zirconia",
    shape: "Tapered baguette and straight baguette",
    sizeRange: "2 × 1 mm to 10 × 5 mm",
    quality: "Production-grade calibrated lots",
    moq: "100 ct or style production quantity",
    referencePrice: "US$0.5–5 / ct reference range",
    availability: "Common calibrated sizes for repeat production",
    image: "/images/b2b-bulk-loose-stones.jpg",
    alt: "Bulk calibrated white cubic zirconia baguette stones",
    description:
      "A production-focused option for halos, side stones, line jewelry and sample development.",
    tags: ["colorless", "cubic zirconia", "baguette", "bulk"],
  },
  {
    slug: "fancy-color-lab-diamond-assortment",
    name: "Fancy Color Lab-Grown Diamond Assortment",
    color: "Pink, blue, yellow and champagne",
    gemstoneType: "Lab-Grown Colored Diamond",
    shape: "Radiant, cushion, oval and pear",
    sizeRange: "0.10 ct to 5 ct by sourcing request",
    quality: "Certificate and grade options by project",
    moq: "Single certified stone or matched lot",
    referencePrice: "Quote by size, color, clarity and certificate",
    availability: "Sourced against approved buyer specification",
    image: "/images/xingyue-colored-gemstones.jpg",
    alt: "Fancy color lab-grown diamond assortment",
    description:
      "Project-based sourcing for statement centers, matched pairs and premium private-label jewelry.",
    tags: ["colored diamond", "certified", "fancy color", "private label"],
  },
];

function applyTranslations<T extends { slug: string }, U extends object>(
  items: T[],
  translations: Record<string, U>,
  locale: Exclude<SupportedLocale, "en">,
) {
  return items.map((item) => {
    const translation = translations[item.slug];

    if (!translation) {
      throw new Error(`Missing ${locale} gemstone catalog translation for ${item.slug}`);
    }

    return { ...item, ...translation };
  });
}

export function getLocalizedGemstoneCatalog(locale: SupportedLocale) {
  if (locale === "en") {
    return {
      colorGroups: gemstoneColorGroups,
      typeCategories: gemstoneTypeCategories,
      catalogItems: gemstoneCatalogItems,
    };
  }

  const translations = gemstoneCatalogTranslations[locale];

  return {
    colorGroups: applyTranslations(gemstoneColorGroups, translations.colorGroups, locale),
    typeCategories: applyTranslations(
      gemstoneTypeCategories,
      translations.typeCategories,
      locale,
    ),
    catalogItems: applyTranslations(gemstoneCatalogItems, translations.catalogItems, locale),
  };
}
import { gemstoneCatalogTranslations } from "./gemstone-translations";
import type { SupportedLocale } from "@/lib/i18n";
