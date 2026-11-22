import type { Product } from "@/lib/site-data";

export type ProductHub = {
  title: string;
  href: string;
};

/**
 * Category hubs that are live and should receive links from matching
 * product pages. Add new hubs here only after the destination page exists.
 */
export function getProductHub(product: Product): ProductHub | null {
  if (product.series !== "925-silver") {
    return null;
  }

  if (product.category === "Rings") {
    return { title: "925 Silver Rings", href: "/wholesale/925-silver-rings" };
  }

  if (product.category === "Necklaces") {
    return {
      title: "Moissanite Necklaces",
      href: "/wholesale/moissanite-necklaces",
    };
  }

  if (product.category === "Earrings") {
    return {
      title: "Moissanite Earrings",
      href: "/wholesale/moissanite-earrings",
    };
  }

  if (product.category === "Bracelets") {
    return {
      title: "Moissanite Bracelets",
      href: "/wholesale/moissanite-bracelets",
    };
  }

  return null;
}
