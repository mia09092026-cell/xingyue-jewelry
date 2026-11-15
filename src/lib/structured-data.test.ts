import { describe, expect, it } from "vitest";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  itemListSchema,
  organizationSchema,
  productSchema,
} from "./structured-data";
import { products } from "./site-data";

describe("structured data", () => {
  it("describes the organization without unsupported claims", () => {
    const schema = organizationSchema();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.url).toBe("https://zarivelle.com");
    expect(schema.logo).toBe("https://zarivelle.com/zarivelle-logo.svg");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("address");
  });

  it("localizes the organization description for Spanish and Arabic pages", () => {
    expect(organizationSchema("es").description).toContain(
      "joyería terminada en plata 925",
    );
    expect(organizationSchema("ar").description).toContain(
      "مجوهرات جاهزة من الفضة 925",
    );
  });

  it("orders the organization expertise around the approved 925-first hierarchy", () => {
    expect(organizationSchema("en").knowsAbout).toEqual([
      "Wholesale finished 925 silver jewelry",
      "Moissanite wholesale jewelry",
      "Lab-grown colored gemstone jewelry",
      "Lab-grown diamond jewelry",
      "Finished jewelry wholesale",
      "OEM/ODM jewelry manufacturing",
      "Jewelry quality control",
      "Private-label packaging",
      "Wuzhou jewelry supply",
    ]);
  });

  it("builds absolute breadcrumbs and item-list links", () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Collections", path: "/collections" },
    ]);
    const list = itemListSchema([{ name: "Moissanite", path: "/collections/moissanite-wholesale" }]);

    expect(breadcrumbs.itemListElement[1].item).toBe(
      "https://zarivelle.com/collections",
    );
    expect(list.itemListElement[0].url).toBe(
      "https://zarivelle.com/collections/moissanite-wholesale",
    );
  });

  it("does not invent offers, prices, reviews, or stock", () => {
    const schema = productSchema(products[0]);

    expect(schema).not.toHaveProperty("offers");
    expect(schema).not.toHaveProperty("review");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("inventoryLevel");
  });

  it("builds FAQPage structured data from visible buyer questions", () => {
    const schema = faqPageSchema([
      {
        question: "Can you produce jewelry from reference photos?",
        answer: "Yes. We support photo-to-sample customization for buyer projects.",
      },
    ]);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity[0].acceptedAnswer.text).toContain(
      "photo-to-sample customization",
    );
  });

  it("builds Article structured data from visible resource metadata without unsupported claims", () => {
    const schema = articleSchema({
      author: "Zarivelle Jewelry",
      dateModified: "2026-07-27",
      datePublished: "2026-07-26",
      description: "A practical sterling silver sourcing guide.",
      headline: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      image: "/images/b2b-manual-setting-workshop.webp",
      path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    });

    expect(schema).toMatchObject({
      "@type": "Article",
      headline: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      datePublished: "2026-07-26",
      dateModified: "2026-07-27",
      mainEntityOfPage:
        "https://zarivelle.com/resources/choose-925-sterling-silver-jewelry-manufacturer",
      image:
        "https://zarivelle.com/images/b2b-manual-setting-workshop.webp",
      author: {
        "@type": "Organization",
        name: "Zarivelle Jewelry",
      },
    });
    expect(schema).not.toHaveProperty("review");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("offers");
  });
});
