import type { MetadataRoute } from "next";
import { collectionLandingPages } from "@/lib/collection-data";
import {
  getLanguageAlternates,
  isLocalizedCollectionSlug,
  localizedPath,
  localizedPublicPages,
  supportedLocales,
  type LocalizedPublicPage,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedResourceArticles } from "@/lib/resources";
import { products } from "@/lib/site-data";

function localizedPriority(path: LocalizedPublicPage) {
  if (path === "/") {
    return 1;
  }

  if (path.startsWith("/collections/")) {
    return 0.8;
  }

  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/education"];
  const resourceArticles = getPublishedResourceArticles("en");
  const localizedEntries = localizedPublicPages.flatMap((path) =>
    supportedLocales.map((locale) => ({
      url: absoluteUrl(localizedPath(path, locale)),
      changeFrequency: "monthly" as const,
      priority: localizedPriority(path),
      alternates: {
        languages: getLanguageAlternates(path),
      },
    })),
  );

  return [
    ...localizedEntries,
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/resources"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...resourceArticles.map((article) => ({
      url: absoluteUrl(`/resources/${article.slug}`),
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...collectionLandingPages.filter(({ slug }) => !isLocalizedCollectionSlug(slug)).map(({ slug }) => ({
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
