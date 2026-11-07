import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { buildLlmsText } from "@/lib/llms";
import {
  getAllResourceArticles,
  getPublishedResourceArticle,
  getPublishedResourceArticles,
  getResourceStaticParams,
} from "@/lib/resources";

describe("wholesale first-order article publication", () => {
  it("publishes the approved English article through public routes and discovery without inventing translations", () => {
    const slug = "first-wholesale-sterling-silver-jewelry-order";
    const url =
      "https://xingyuejewelry.com/resources/first-wholesale-sterling-silver-jewelry-order";
    const article = getAllResourceArticles("en").find(
      (candidate) => candidate.slug === slug,
    );

    expect(article).toBeDefined();
    expect(article?.draft).toBe(false);
    expect(getPublishedResourceArticle(slug, "en")?.slug).toBe(slug);
    expect(getPublishedResourceArticles("en").map(({ slug }) => slug)).toContain(slug);
    expect(getResourceStaticParams()).toContainEqual({ slug });
    expect(sitemap().map(({ url }) => url)).toContain(url);
    expect(buildLlmsText()).toContain(url);
    expect(buildLlmsText()).toContain(article?.title);
    expect(getAllResourceArticles("es")).toHaveLength(0);
    expect(getAllResourceArticles("ar")).toHaveLength(0);
  });
});
