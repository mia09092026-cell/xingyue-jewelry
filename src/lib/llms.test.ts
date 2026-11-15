import { describe, expect, it } from "vitest";
import { buildLlmsText } from "@/lib/llms";
import type { ResourceArticle } from "@/lib/resources";

function article(
  slug: string,
  overrides: Partial<ResourceArticle> = {},
): ResourceArticle {
  return {
    title: `Guide ${slug}`,
    slug,
    description: `Description for ${slug}.`,
    category: "Buyer Guides",
    tags: ["buyer guide"],
    publishedAt: "2026-07-27",
    updatedAt: "2026-07-27",
    author: "Zarivelle Jewelry",
    coverImage: "/images/xingyue-loose-moissanite.jpg",
    locale: "en",
    draft: false,
    body: "Article body.",
    filePath: `content/resources/en/${slug}.md`,
    ...overrides,
  };
}

describe("dynamic llms text", () => {
  it("preserves the site summary and adds only published English resources", () => {
    const text = buildLlmsText([
      article("published-guide"),
      article("draft-guide", { draft: true }),
      article("spanish-guide", { locale: "es" }),
    ]);

    expect(text).toContain(
      "> Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry",
    );
    expect(text).toContain(
      "- Resources: https://zarivelle.com/resources",
    );
    expect(text).toContain(
      "- Guide published-guide: https://zarivelle.com/resources/published-guide",
    );
    expect(text).toContain("Description for published-guide.");
    expect(text).not.toContain("draft-guide");
    expect(text).not.toContain("spanish-guide");
  });
});
