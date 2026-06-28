import type { MetadataRoute } from "next";
import { collectionLandingPages } from "@/lib/collection-data";
import { absoluteUrl } from "@/lib/seo";
import { products } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/collections", "/education", "/about", "/contact"];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...collectionLandingPages.map(({ slug }) => ({
      url: absoluteUrl(`/collections/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map(({ slug }) => ({
      url: absoluteUrl(`/products/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
