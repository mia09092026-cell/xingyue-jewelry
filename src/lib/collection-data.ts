export type CollectionLandingPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  alt: string;
  options: string[];
  capabilities: string[];
  customization: string[];
  qualityNotes: Array<{ title: string; copy: string }>;
  educationLinks: Array<{ title: string; copy: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedProductSlugs: string[];
};

export const collectionLandingPages: readonly CollectionLandingPage[] = [
  {
    slug: "moissanite-wholesale",
    title: "Wholesale Moissanite Jewelry & Loose Stones",
    eyebrow: "Wholesale Moissanite Jewelry",
    description:
      "Wholesale Moissanite Jewelry programs for buyers who need loose stones, finished jewelry, and dependable B2B styling support for repeat collections, private-label launches, and custom setting work.",
    metaTitle: "Wholesale Moissanite Jewelry & Loose Stones",
    metaDescription:
      "Source Wholesale Moissanite Jewelry, Loose Moissanite Wholesale programs, and finished B2B styles with practical customization support.",
    image: "/images/b2b-bulk-loose-stones.jpg",
    alt: "Wholesale moissanite jewelry and loose stones for B2B buyers",
    options: [
      "Loose Moissanite Wholesale for in-house setting teams",
      "Finished wholesale jewelry for brand-ready assortments",
      "Private-label development for ring, earring, and pendant programs",
      "Mixed collection planning across everyday and giftable styles",
    ],
    capabilities: [
      "Stone size, cut, and color coordination for wholesale programs",
      "Setting, plating, and metal guidance for finished jewelry orders",
      "Packaging alignment for retail presentation and shipping efficiency",
      "Product matching across rings, earrings, and pendant collections",
    ],
    customization: [
      "Stone cut, size, and color direction",
      "Loose stone, S925 silver, or custom K gold project scope",
      "Setting, plating, and packaging direction",
    ],
    qualityNotes: [
      {
        title: "Order-specific material confirmation",
        copy: "Stone specifications, metal, finish, and packaging are confirmed for the individual project before production.",
      },
      {
        title: "Certificate and quality-check scope",
        copy: "Certificate availability and requested quality checks depend on the stone and order details and are confirmed during quotation.",
      },
    ],
    educationLinks: [
      {
        title: "Moissanite buyer guide",
        copy: "Review moissanite properties, material choices, and certificate considerations before planning an assortment.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "Can I order loose moissanite before finished jewelry?",
        answer:
          "Yes. This collection is organized for buyers who want loose stones and finished jewelry in one coordinated wholesale program.",
      },
      {
        question: "What does this collection cover?",
        answer:
          "It covers wholesale moissanite jewelry and loose stone programs for buyers who need either finished pieces or stones prepared for their own production workflow.",
      },
      {
        question: "Can buyers combine loose stones and finished jewelry?",
        answer:
          "Yes. The collection is structured for B2B buyers who want to pair loose stones with completed jewelry styles in one coordinated assortment.",
      },
      {
        question: "What can be customized?",
        answer:
          "Common customization areas include stone size, cut, setting style, plating tone, metal choice, and packaging direction.",
      },
    ],
    relatedProductSlugs: ["moissanite-solitaire-ring", "s925-moissanite-stud-earrings"],
  },
  {
    slug: "lab-grown-diamond-jewelry",
    title: "Lab-Grown Diamond Jewelry Manufacturing",
    eyebrow: "Lab-Grown Diamond Jewelry Manufacturer",
    description:
      "Lab-Grown Diamond Jewelry Manufacturing for brands that want clean product planning, elegant finished pieces, and a clear B2B workflow built around modern retail presentation and repeatable development.",
    metaTitle: "Lab-Grown Diamond Jewelry Manufacturer",
    metaDescription:
      "Work with a Lab-Grown Diamond Jewelry Manufacturer for finished jewelry programs, private-label styling, and structured B2B production support.",
    image: "/images/b2b-certificate-packaging.jpg",
    alt: "Lab-grown diamond jewelry manufacturing with certificate-style packaging support",
    options: [
      "Pendant-forward retail assortments for polished merchandising",
      "Matching ring and necklace development for collection depth",
      "Private-label production for brand-specific packaging needs",
      "Wholesale sampling for buyers comparing multiple style families",
    ],
    capabilities: [
      "Finished jewelry development with consistent B2B presentation",
      "Metal and finish coordination for boutique and online retail channels",
      "Style matching across solitaires, halos, and coordinated sets",
      "Packaging planning that supports branded unpacking experiences",
    ],
    customization: [
      "Ring, pendant, earring, and coordinated set direction",
      "Center-stone size, setting style, and metal choice",
      "Finish and private-label presentation planning",
    ],
    qualityNotes: [
      {
        title: "Certificate availability by project",
        copy: "Certificate options vary by stone type, size, budget, and order details and are confirmed before production.",
      },
      {
        title: "Sample and approval planning",
        copy: "The quotation can define the sample, finish, presentation, and requested inspection points for the project.",
      },
    ],
    educationLinks: [
      {
        title: "Lab-grown diamond education",
        copy: "Learn how lab-grown diamonds compare with moissanite and which material details buyers should confirm.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "What makes this collection different from loose stone supply?",
        answer:
          "This page focuses on finished lab-grown diamond jewelry for buyers who want completed pieces rather than only loose materials.",
      },
      {
        question: "Is this suitable for private-label programs?",
        answer:
          "Yes. The collection is designed for brands that need a structured production partner for custom presentation and retail-facing jewelry.",
      },
      {
        question: "Which product families fit this collection best?",
        answer:
          "It works well for rings, pendants, and coordinated jewelry sets that need a refined, modern fine-jewelry appearance.",
      },
    ],
    relatedProductSlugs: ["lab-grown-diamond-halo-pendant", "moissanite-solitaire-ring"],
  },
  {
    slug: "lab-grown-colored-gemstones",
    title: "Lab-Grown Colored Gemstones Wholesale",
    eyebrow: "Colored Gemstone Wholesale",
    description:
      "Lab-Grown Colored Gemstones Wholesale for B2B buyers who need color-driven collections, coordinated stone selection, and dependable support for jewelry programs that depend on visual variety and design flexibility.",
    metaTitle: "Lab-Grown Colored Gemstones Wholesale",
    metaDescription:
      "Build B2B jewelry collections with Lab-Grown Colored Gemstones Wholesale options, color matching support, and flexible custom assortment planning.",
    image: "/images/b2b-color-options.jpg",
    alt: "Lab-grown colored gemstone wholesale color options for jewelry buyers",
    options: [
      "Single-color collections for focused merchandising",
      "Mixed color assortments for seasonal and editorial drops",
      "Stone-matching programs for coordinated jewelry lines",
      "Custom color development for branded product stories",
    ],
    capabilities: [
      "Color coordination across matching and mixed palettes",
      "Stone selection support for rings, pendants, and chain accents",
      "Design alignment for fashion, gift, and premium wholesale channels",
      "Packaging and presentation guidance for color-led collections",
    ],
    customization: [
      "Single-color, mixed-color, or matched-stone direction",
      "Stone size and layout planning for the intended jewelry style",
      "Setting metal, finish, and packaging direction",
    ],
    qualityNotes: [
      {
        title: "Color expectations before production",
        copy: "Target color, acceptable variation, and matching requirements are reviewed against the buyer's reference during project planning.",
      },
      {
        title: "Order-specific documentation",
        copy: "Testing or certificate availability is discussed by material, stone size, quantity, and market requirement before the order is confirmed.",
      },
    ],
    educationLinks: [
      {
        title: "Lab-grown stone education",
        copy: "Review the site's buyer guides for lab-grown materials, certificates, and metal confirmation questions.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "What is the main use case for this collection?",
        answer:
          "It is built for brands that want lab-grown colored gemstones as the visual center of their jewelry assortment or custom design program.",
      },
      {
        question: "Can colors be mixed within one program?",
        answer:
          "Yes. The collection supports both single-color direction and mixed palettes for buyers who want more variety in one lineup.",
      },
      {
        question: "What types of jewelry work well here?",
        answer:
          "Rings, pendants, and chain-accent styles are the most natural fit because they showcase color clearly in retail presentation.",
      },
    ],
    relatedProductSlugs: ["custom-k-gold-tennis-bracelet"],
  },
  {
    slug: "cuban-chains",
    title: "Wholesale Cuban Chain Manufacturing",
    eyebrow: "Cuban Chain Manufacturing",
    description:
      "Wholesale Cuban Chain Manufacturing for brands that need bold, recognizable chain silhouettes, custom jewelry planning, and a production partner that can handle fashion-forward layouts for everyday and statement collections.",
    metaTitle: "Wholesale Cuban Chain Manufacturing",
    metaDescription:
      "Source Wholesale Cuban Chain Manufacturing support for bold chain collections, private-label styling, and coordinated B2B jewelry development.",
    image: "/images/xingyue-cuban-chain.jpg",
    alt: "Wholesale Cuban chain manufacturing for bold B2B jewelry collections",
    options: [
      "Classic Cuban chain styling for core wholesale lines",
      "Statement chain builds for premium fashion assortments",
      "Private-label chain development with branded presentation",
      "Layered collection planning for men's and unisex jewelry markets",
    ],
    capabilities: [
      "Link styling and proportion guidance for Cuban chain designs",
      "Metal, finish, and clasp coordination for wholesale programs",
      "Collection planning for bracelet, necklace, and layered looks",
      "Production support for bold fashion and premium streetwear directions",
    ],
    customization: [
      "Link profile, width, and overall proportion",
      "Bracelet or necklace length, clasp, metal, and finish",
      "Stone layout and private-label presentation direction",
    ],
    qualityNotes: [
      {
        title: "Structure and finish confirmation",
        copy: "Link profile, clasp, finish, and requested stone layout are defined in the project specification before production.",
      },
      {
        title: "Project-specific quality checks",
        copy: "Inspection priorities and any testing or documentation needs are agreed during quotation rather than assumed for every chain.",
      },
    ],
    educationLinks: [
      {
        title: "Jewelry materials and certificate guide",
        copy: "Use the buyer knowledge center to prepare metal, stone, and documentation questions for a chain inquiry.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "What defines this collection?",
        answer:
          "It focuses on Cuban chain styles for B2B buyers who want recognizable link profiles and a clear fashion statement in their assortment.",
      },
      {
        question: "Can chain styles be adapted for different markets?",
        answer:
          "Yes. The chain profile, finishing direction, and overall presentation can be aligned with the buyer's target channel.",
      },
      {
        question: "Which related products fit this page?",
        answer:
          "Tennis and custom K gold bracelet programs pair naturally with Cuban chains because they belong to the same wholesale chain category.",
      },
    ],
    relatedProductSlugs: ["custom-k-gold-tennis-bracelet"],
  },
  {
    slug: "tennis-chains",
    title: "Tennis Chain Manufacturing for Bracelets & Necklaces",
    eyebrow: "Tennis Chain Manufacturing",
    description:
      "Tennis Chain Manufacturing for bracelets and necklaces that need polished sparkle, balanced proportions, and B2B flexibility for wholesale assortments, private-label launches, and matching set development.",
    metaTitle: "Tennis Chain Manufacturer | Bracelets & Necklaces",
    metaDescription:
      "Plan custom tennis chain and bracelet programs with structured wholesale support, style coordination, and B2B jewelry manufacturing guidance.",
    image: "/images/xingyue-tennis-necklace.jpg",
    alt: "Tennis chain manufacturing for bracelets and necklaces in B2B jewelry",
    options: [
      "Necklace programs for clean retail display",
      "Bracelet programs for matching set merchandising",
      "Layered chain styling for fashion-led wholesale assortments",
      "Private-label line development with coordinated presentation",
    ],
    capabilities: [
      "Chain proportion guidance for necklace and bracelet formats",
      "Stone layout coordination for balanced sparkle and consistent appearance",
      "Finish and clasp planning for wholesale-ready product development",
      "Set matching across related chain and bracelet collections",
    ],
    customization: [
      "Necklace or bracelet length and stone layout",
      "Clasp, metal, finish, and color direction",
      "Matching-set and private-label presentation planning",
    ],
    qualityNotes: [
      {
        title: "Layout and clasp confirmation",
        copy: "Length, stone layout, clasp, metal, and finish are confirmed in the project specification before production.",
      },
      {
        title: "Quality and documentation scope",
        copy: "Requested checks and certificate or testing needs are reviewed against the stone and order details during quotation.",
      },
    ],
    educationLinks: [
      {
        title: "Stone and material buyer guide",
        copy: "Compare stone types and review the metal and certificate questions that shape a tennis chain inquiry.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "Is this collection only for necklaces?",
        answer:
          "No. It is intended for both tennis chains and tennis bracelets so buyers can build coordinated programs across multiple product forms.",
      },
      {
        question: "Can this page support matching sets?",
        answer:
          "Yes. The collection is suitable for brands that want matching chain and bracelet stories inside one wholesale assortment.",
      },
      {
        question: "What kind of buyers use tennis chain programs?",
        answer:
          "It works well for wholesalers, jewelry brands, and private-label sellers who want a refined line with a clean, consistent visual rhythm.",
      },
    ],
    relatedProductSlugs: ["custom-k-gold-tennis-bracelet"],
  },
  {
    slug: "custom-jewelry-manufacturing",
    title: "Custom S925 & K Gold Jewelry Manufacturing",
    eyebrow: "Custom Jewelry Manufacturing",
    description:
      "Custom S925 & K Gold Jewelry Manufacturing for B2B buyers who need flexible material choices, coordinated styling, and a production workflow that can support rings, chains, earrings, pendants, and mixed wholesale programs.",
    metaTitle: "Custom S925 & K Gold Jewelry Manufacturing",
    metaDescription:
      "Develop custom S925 and K gold jewelry with B2B manufacturing support, flexible styling, and coordinated wholesale collection planning.",
    image: "/images/b2b-manual-setting-workshop.webp",
    alt: "Custom S925 and K gold jewelry manufacturing in a manual setting workshop",
    options: [
      "S925 silver programs for accessible wholesale collections",
      "K gold custom builds for premium branded assortments",
      "Mixed material development across coordinated product families",
      "Private-label support for fully branded jewelry lines",
    ],
    capabilities: [
      "Material planning across S925, gold-tone, and K gold directions",
      "Product development support for rings, chains, earrings, and pendants",
      "Design translation from reference ideas into production-ready pieces",
      "Packaging and collection alignment for B2B presentation needs",
    ],
    customization: [
      "Reference-image and product-family development",
      "S925 silver or project-specific K gold direction",
      "Stone, finish, setting, and packaging planning",
    ],
    qualityNotes: [
      {
        title: "Specification before production",
        copy: "Materials, dimensions, setting details, finish, and packaging are documented for the individual project before production begins.",
      },
      {
        title: "Claims confirmed per order",
        copy: "MOQ, lead time, certificate availability, metal purity, and requested quality checks are only stated after the project is reviewed.",
      },
    ],
    educationLinks: [
      {
        title: "Materials and certificates guide",
        copy: "Prepare a custom project by reviewing the buyer notes for stone identity, metal, and certificate options.",
        href: "/education",
      },
    ],
    faqs: [
      {
        question: "What is the scope of this collection?",
        answer:
          "It covers custom jewelry development for buyers who want one production partner to handle multiple materials and product families.",
      },
      {
        question: "Can this work alongside other collection pages?",
        answer:
          "Yes. It is designed to complement the dedicated wholesale and chain collections rather than replace them.",
      },
      {
        question: "What is a typical use case for this page?",
        answer:
          "Brands use it when they need flexible custom jewelry manufacturing across different styles, materials, and merchandising strategies.",
      },
    ],
    relatedProductSlugs: ["moissanite-solitaire-ring", "custom-k-gold-tennis-bracelet"],
  },
];

export function getCollectionLandingPage(slug: string) {
  return collectionLandingPages.find((page) => page.slug === slug);
}
