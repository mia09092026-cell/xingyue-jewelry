import { describe, expect, it } from "vitest";
import {
  breadcrumbSchema,
  itemListSchema,
  organizationSchema,
  productSchema,
} from "./structured-data";
import { products } from "./site-data";

describe("structured data", () => {
  it("describes the organization without unsupported claims", () => {
    const schema = organizationSchema();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.url).toBe("https://xingyuejewelry.com");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("address");
  });

  it("builds absolute breadcrumbs and item-list links", () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Collections", path: "/collections" },
    ]);
    const list = itemListSchema([{ name: "Moissanite", path: "/collections/moissanite-wholesale" }]);

    expect(breadcrumbs.itemListElement[1].item).toBe(
      "https://xingyuejewelry.com/collections",
    );
    expect(list.itemListElement[0].url).toBe(
      "https://xingyuejewelry.com/collections/moissanite-wholesale",
    );
  });

  it("does not invent offers, prices, reviews, or stock", () => {
    const schema = productSchema(products[0]);

    expect(schema).not.toHaveProperty("offers");
    expect(schema).not.toHaveProperty("review");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("inventoryLevel");
  });
});
