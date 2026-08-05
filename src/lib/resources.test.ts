import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  getAllResourceArticles,
  getPublishedResourceArticle,
  getPublishedResourceArticles,
  getRelatedResourceArticles,
  getResourceStaticParams,
  loadResourceArticle,
  ResourceContentError,
  type ResourceLoadOptions,
} from "@/lib/resources";

const temporaryRoots: string[] = [];

function createFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "xingyue-resources-"));
  temporaryRoots.push(root);

  const contentRoot = path.join(root, "content", "resources");
  const publicRoot = path.join(root, "public");
  const localeDirectory = path.join(contentRoot, "en");
  mkdirSync(localeDirectory, { recursive: true });
  mkdirSync(path.join(publicRoot, "images"), { recursive: true });
  writeFileSync(path.join(publicRoot, "images", "cover.jpg"), "fixture");

  const options: ResourceLoadOptions = {
    contentRoot,
    publicRoot,
  };

  return { contentRoot, localeDirectory, options, publicRoot };
}

function validMarkdown(overrides: Record<string, unknown> = {}, body = "Article body.") {
  const frontmatter = {
    title: "A practical buyer guide",
    slug: "buyer-guide",
    description: "A clear description for jewelry buyers.",
    category: "Buyer Guides",
    tags: ["sourcing", "jewelry"],
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-21",
    author: "Xingyue Jewelry",
    coverImage: "/images/cover.jpg",
    locale: "en",
    draft: false,
    ...overrides,
  };

  const yamlValue = (value: unknown) => {
    if (Array.isArray(value)) {
      return `\n${value.map((item) => `  - ${JSON.stringify(item)}`).join("\n")}`;
    }
    return JSON.stringify(value);
  };

  const lines = Object.entries(frontmatter).map(
    ([key, value]) => `${key}: ${yamlValue(value)}`,
  );
  return `---\n${lines.join("\n")}\n---\n\n${body}\n`;
}

function writeArticle(
  localeDirectory: string,
  slug: string,
  overrides: Record<string, unknown> = {},
  body?: string,
) {
  const filePath = path.join(localeDirectory, `${slug}.md`);
  writeFileSync(
    filePath,
    validMarkdown({ slug, ...overrides }, body),
    "utf8",
  );
  return filePath;
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("resource Markdown validation", () => {
  it("parses a valid article into the approved typed fields", () => {
    const { localeDirectory, options } = createFixture();
    const filePath = writeArticle(localeDirectory, "buyer-guide");

    const article = loadResourceArticle(filePath, options);

    expect(article).toMatchObject({
      title: "A practical buyer guide",
      slug: "buyer-guide",
      description: "A clear description for jewelry buyers.",
      category: "Buyer Guides",
      tags: ["sourcing", "jewelry"],
      publishedAt: "2026-07-20",
      updatedAt: "2026-07-21",
      author: "Xingyue Jewelry",
      coverImage: "/images/cover.jpg",
      locale: "en",
      draft: false,
      body: "Article body.",
      filePath,
    });
  });

  it("reports the file path plus every missing or invalid field", () => {
    const { localeDirectory, options } = createFixture();
    const filePath = path.join(localeDirectory, "broken.md");
    writeFileSync(
      filePath,
      `---
title: ""
slug: "Wrong Slug"
category: "Unapproved"
tags: "not-an-array"
publishedAt: "2026-02-30"
updatedAt: "2026/03/01"
author: ""
coverImage: "https://example.com/cover.jpg"
locale: "fr"
draft: "false"
---
`,
      "utf8",
    );

    expect(() => loadResourceArticle(filePath, options)).toThrow(
      ResourceContentError,
    );

    try {
      loadResourceArticle(filePath, options);
    } catch (error) {
      expect(error).toBeInstanceOf(ResourceContentError);
      const message = (error as Error).message;
      expect(message).toContain(filePath);
      expect(message).toContain("title: must be a non-empty string");
      expect(message).toContain("slug: must use lowercase letters, digits, and single hyphens");
      expect(message).toContain("description: is required");
      expect(message).toContain("category: must be one of");
      expect(message).toContain("tags: must be an array of non-empty strings");
      expect(message).toContain("publishedAt: must be a valid date in YYYY-MM-DD format");
      expect(message).toContain("updatedAt: must be a valid date in YYYY-MM-DD format");
      expect(message).toContain("author: must be a non-empty string");
      expect(message).toContain("coverImage: must be a root-relative path under public");
      expect(message).toContain("locale: must be one of en, es, ar");
      expect(message).toContain("draft: must be a boolean");
      expect(message).toContain("body: must not be empty");
    }
  });

  it("wraps malformed YAML with the file path and a frontmatter reason", () => {
    const { localeDirectory, options } = createFixture();
    const filePath = path.join(localeDirectory, "broken-yaml.md");
    writeFileSync(
      filePath,
      `---
title: "Broken YAML"
tags: [unterminated
---

Body.
`,
      "utf8",
    );

    try {
      loadResourceArticle(filePath, options);
      throw new Error("Expected malformed frontmatter to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(ResourceContentError);
      expect((error as Error).message).toContain(filePath);
      expect((error as Error).message).toContain(
        "frontmatter: could not parse YAML",
      );
      expect((error as Error).message).toContain(
        "unexpected end of the stream",
      );
    }
  });

  it.each([
    {
      name: "a slug that does not match its filename",
      override: { slug: "different-slug" },
      filename: "buyer-guide",
      expected: "slug: must match the Markdown filename \"buyer-guide\"",
    },
    {
      name: "a locale that does not match its directory",
      override: { locale: "es" },
      filename: "buyer-guide",
      expected: "locale: must match the containing locale directory \"en\"",
    },
    {
      name: "an update date before the publication date",
      override: { updatedAt: "2026-07-19" },
      filename: "buyer-guide",
      expected: "updatedAt: cannot be earlier than publishedAt",
    },
  ])("rejects $name", ({ override, filename, expected }) => {
    const { localeDirectory, options } = createFixture();
    const filePath = path.join(localeDirectory, `${filename}.md`);
    writeFileSync(filePath, validMarkdown(override), "utf8");

    expect(() => loadResourceArticle(filePath, options)).toThrow(expected);
  });

  it("rejects a cover path that escapes public", () => {
    const { localeDirectory, options } = createFixture();
    const filePath = writeArticle(localeDirectory, "buyer-guide", {
      coverImage: "/images/../../private.jpg",
    });

    expect(() => loadResourceArticle(filePath, options)).toThrow(
      "coverImage: must not contain path traversal segments",
    );
  });

  it("fails with the article path and missing cover path when the image is absent", () => {
    const { localeDirectory, options } = createFixture();
    const filePath = writeArticle(localeDirectory, "buyer-guide", {
      coverImage: "/images/missing.jpg",
    });

    expect(() => loadResourceArticle(filePath, options)).toThrow(
      expect.objectContaining({
        message: expect.stringContaining(filePath),
      }),
    );
    expect(() => loadResourceArticle(filePath, options)).toThrow(
      "coverImage: file does not exist under public: /images/missing.jpg",
    );
  });
});

describe("published resource queries", () => {
  it("publishes the custom 925 silver sourcing guide with validated SEO structure", () => {
    const slug =
      "source-custom-925-sterling-silver-moissanite-lab-grown-diamond-jewelry";
    const article = getAllResourceArticles("en").find(
      (candidate) => candidate.slug === slug,
    );

    expect(article).toMatchObject({
      title:
        "How to Source Custom 925 Sterling Silver Jewelry with Moissanite or Lab-Grown Diamonds",
      description:
        "Learn how to source custom 925 sterling silver jewelry from moissanite and lab-grown diamond jewelry manufacturers, from specifications to quality control.",
      coverImage: "/images/xingyue-ring-sample.jpg",
      draft: false,
    });
    expect(article?.body).not.toMatch(/^# /m);
    expect(article?.body).toContain("## Quick answer");
    expect(article?.body).toContain("## Frequently asked questions");
    expect(article?.body).toContain(
      "](/resources/choose-925-sterling-silver-jewelry-manufacturer)",
    );
    expect(article?.body).toContain(
      "](/resources/how-to-develop-custom-moissanite-sterling-silver-jewelry)",
    );
    expect(article?.body).toContain(
      "](/resources/moissanite-vs-cubic-zirconia)",
    );
    expect(article?.body).toContain(
      "![Specification checklist comparing the fields buyers should confirm for moissanite and lab-grown diamonds](/images/moissanite-lab-grown-diamond-specification-checklist.svg)",
    );
    expect(article?.body).toContain(
      "![Dimension confirmation diagram showing ring width, thickness, stone size, setting height, and ring size review fields](/images/jewelry-cad-dimension-confirmation-checklist.svg)",
    );
    expect(article?.body).toContain(
      "[Start Your Custom Jewelry Project](/contact)",
    );
    expect(getPublishedResourceArticle(slug, "en")?.slug).toBe(slug);
    expect(getResourceStaticParams()).toContainEqual({ slug });
  });

  it("excludes drafts and sorts newest first with slug as the tie-breaker", () => {
    const { localeDirectory, options } = createFixture();
    writeArticle(localeDirectory, "older", {
      publishedAt: "2026-07-01",
      updatedAt: "2026-07-01",
    });
    writeArticle(localeDirectory, "z-latest", {
      publishedAt: "2026-07-25",
      updatedAt: "2026-07-25",
    });
    writeArticle(localeDirectory, "a-latest", {
      publishedAt: "2026-07-25",
      updatedAt: "2026-07-25",
    });
    writeArticle(localeDirectory, "draft-guide", {
      draft: true,
      publishedAt: "2026-07-27",
      updatedAt: "2026-07-27",
    });

    expect(
      getPublishedResourceArticles("en", options).map(({ slug }) => slug),
    ).toEqual(["a-latest", "z-latest", "older"]);
    expect(getPublishedResourceArticle("draft-guide", "en", options)).toBeNull();
    expect(getPublishedResourceArticle("a-latest", "en", options)?.title).toBe(
      "A practical buyer guide",
    );
    expect(getResourceStaticParams(options)).toEqual([
      { slug: "a-latest" },
      { slug: "z-latest" },
      { slug: "older" },
    ]);
  });

  it("returns related published articles by category before other categories", () => {
    const { localeDirectory, options } = createFixture();
    const currentPath = writeArticle(localeDirectory, "current", {
      category: "Moissanite",
      publishedAt: "2026-07-20",
      updatedAt: "2026-07-20",
    });
    writeArticle(localeDirectory, "same-category", {
      category: "Moissanite",
      publishedAt: "2026-07-19",
      updatedAt: "2026-07-19",
    });
    writeArticle(localeDirectory, "other-category", {
      category: "925 Sterling Silver",
      publishedAt: "2026-07-21",
      updatedAt: "2026-07-21",
    });
    writeArticle(localeDirectory, "hidden-draft", {
      category: "Moissanite",
      draft: true,
      publishedAt: "2026-07-22",
      updatedAt: "2026-07-22",
    });

    const current = loadResourceArticle(currentPath, options);
    expect(
      getRelatedResourceArticles(current, 2, options).map(({ slug }) => slug),
    ).toEqual(["same-category", "other-category"]);
  });
});
