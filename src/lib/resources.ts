import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const RESOURCE_CATEGORIES = [
  "925 Sterling Silver",
  "Moissanite",
  "Lab-Created Gemstones",
  "OEM & ODM",
  "Buyer Guides",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
export type ResourceLocale = "en" | "es" | "ar";

export type ResourceArticle = {
  title: string;
  slug: string;
  description: string;
  category: ResourceCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  coverImage: string;
  locale: ResourceLocale;
  draft: boolean;
  body: string;
  filePath: string;
};

export type ResourceLoadOptions = {
  contentRoot?: string;
  publicRoot?: string;
};

type ValidationIssue = {
  field: string;
  reason: string;
};

const SUPPORTED_LOCALES = ["en", "es", "ar"] as const;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function defaultOptions(): Required<ResourceLoadOptions> {
  return {
    contentRoot: path.join(process.cwd(), "content", "resources"),
    publicRoot: path.join(process.cwd(), "public"),
  };
}

function resolveOptions(
  options: ResourceLoadOptions = {},
): Required<ResourceLoadOptions> {
  return {
    ...defaultOptions(),
    ...options,
  };
}

export class ResourceContentError extends Error {
  readonly filePath: string;
  readonly issues: ValidationIssue[];

  constructor(filePath: string, issues: ValidationIssue[]) {
    super(
      [
        `Invalid resource article: ${filePath}`,
        ...issues.map(({ field, reason }) => `- ${field}: ${reason}`),
      ].join("\n"),
    );
    this.name = "ResourceContentError";
    this.filePath = filePath;
    this.issues = issues;
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isResourceCategory(value: unknown): value is ResourceCategory {
  return (
    typeof value === "string" &&
    RESOURCE_CATEGORIES.includes(value as ResourceCategory)
  );
}

function isResourceLocale(value: unknown): value is ResourceLocale {
  return (
    typeof value === "string" &&
    SUPPORTED_LOCALES.includes(value as ResourceLocale)
  );
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validateCoverImage(
  value: unknown,
  publicRoot: string,
  issues: ValidationIssue[],
) {
  if (
    !isNonEmptyString(value) ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    issues.push({
      field: "coverImage",
      reason: "must be a root-relative path under public",
    });
    return;
  }

  const pathSegments = value.replaceAll("\\", "/").split("/");
  if (pathSegments.includes("..") || pathSegments.includes(".")) {
    issues.push({
      field: "coverImage",
      reason: "must not contain path traversal segments",
    });
    return;
  }

  const relativePath = value.slice(1).replaceAll("/", path.sep);
  const resolvedPublicRoot = path.resolve(publicRoot);
  const resolvedImagePath = path.resolve(resolvedPublicRoot, relativePath);
  const publicPrefix = `${resolvedPublicRoot}${path.sep}`;

  if (
    resolvedImagePath !== resolvedPublicRoot &&
    !resolvedImagePath.startsWith(publicPrefix)
  ) {
    issues.push({
      field: "coverImage",
      reason: "must resolve inside public",
    });
    return;
  }

  if (
    !existsSync(resolvedImagePath) ||
    !statSync(resolvedImagePath).isFile()
  ) {
    issues.push({
      field: "coverImage",
      reason: `file does not exist under public: ${value}`,
    });
  }
}

export function loadResourceArticle(
  filePath: string,
  options: ResourceLoadOptions = {},
): ResourceArticle {
  const { publicRoot } = resolveOptions(options);
  const source = readFileSync(filePath, "utf8");
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(source);
  } catch (error) {
    const reason =
      error instanceof Error && error.message
        ? error.message
        : "unknown YAML parser error";
    throw new ResourceContentError(filePath, [
      {
        field: "frontmatter",
        reason: `could not parse YAML: ${reason}`,
      },
    ]);
  }
  const { data, content } = parsed;
  const issues: ValidationIssue[] = [];
  const filenameSlug = path.basename(filePath, path.extname(filePath));
  const localeDirectory = path.basename(path.dirname(filePath));

  if (!isNonEmptyString(data.title)) {
    issues.push({ field: "title", reason: "must be a non-empty string" });
  }

  if (!isNonEmptyString(data.slug) || !SLUG_PATTERN.test(data.slug)) {
    issues.push({
      field: "slug",
      reason: "must use lowercase letters, digits, and single hyphens",
    });
  } else if (data.slug !== filenameSlug) {
    issues.push({
      field: "slug",
      reason: `must match the Markdown filename "${filenameSlug}"`,
    });
  }

  if (!isNonEmptyString(data.description)) {
    issues.push({ field: "description", reason: "is required" });
  }

  if (!isResourceCategory(data.category)) {
    issues.push({
      field: "category",
      reason: `must be one of ${RESOURCE_CATEGORIES.join(", ")}`,
    });
  }

  if (
    !Array.isArray(data.tags) ||
    data.tags.length === 0 ||
    data.tags.some((tag: unknown) => !isNonEmptyString(tag))
  ) {
    issues.push({
      field: "tags",
      reason: "must be an array of non-empty strings",
    });
  }

  if (!isValidDate(data.publishedAt)) {
    issues.push({
      field: "publishedAt",
      reason: "must be a valid date in YYYY-MM-DD format",
    });
  }

  if (!isValidDate(data.updatedAt)) {
    issues.push({
      field: "updatedAt",
      reason: "must be a valid date in YYYY-MM-DD format",
    });
  } else if (
    isValidDate(data.publishedAt) &&
    data.updatedAt < data.publishedAt
  ) {
    issues.push({
      field: "updatedAt",
      reason: "cannot be earlier than publishedAt",
    });
  }

  if (!isNonEmptyString(data.author)) {
    issues.push({ field: "author", reason: "must be a non-empty string" });
  }

  validateCoverImage(data.coverImage, publicRoot, issues);

  if (!isResourceLocale(data.locale)) {
    issues.push({
      field: "locale",
      reason: `must be one of ${SUPPORTED_LOCALES.join(", ")}`,
    });
  } else if (data.locale !== localeDirectory) {
    issues.push({
      field: "locale",
      reason: `must match the containing locale directory "${localeDirectory}"`,
    });
  }

  if (typeof data.draft !== "boolean") {
    issues.push({ field: "draft", reason: "must be a boolean" });
  }

  const body = content.trim();
  if (!body) {
    issues.push({ field: "body", reason: "must not be empty" });
  }

  if (issues.length > 0) {
    throw new ResourceContentError(filePath, issues);
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    description: data.description as string,
    category: data.category as ResourceCategory,
    tags: data.tags as string[],
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt as string,
    author: data.author as string,
    coverImage: data.coverImage as string,
    locale: data.locale as ResourceLocale,
    draft: data.draft as boolean,
    body,
    filePath,
  };
}

export function getAllResourceArticles(
  locale: ResourceLocale = "en",
  options: ResourceLoadOptions = {},
): ResourceArticle[] {
  const resolvedOptions = resolveOptions(options);
  const localeDirectory = path.join(resolvedOptions.contentRoot, locale);

  if (!existsSync(localeDirectory)) {
    return [];
  }

  return readdirSync(localeDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) =>
      loadResourceArticle(path.join(localeDirectory, entry.name), resolvedOptions),
    );
}

function compareArticles(a: ResourceArticle, b: ResourceArticle) {
  const dateOrder = b.publishedAt.localeCompare(a.publishedAt);
  return dateOrder || a.slug.localeCompare(b.slug);
}

export function getPublishedResourceArticles(
  locale: ResourceLocale = "en",
  options: ResourceLoadOptions = {},
): ResourceArticle[] {
  return getAllResourceArticles(locale, options)
    .filter((article) => !article.draft)
    .sort(compareArticles);
}

export function getPublishedResourceArticle(
  slug: string,
  locale: ResourceLocale = "en",
  options: ResourceLoadOptions = {},
): ResourceArticle | null {
  return (
    getPublishedResourceArticles(locale, options).find(
      (article) => article.slug === slug,
    ) ?? null
  );
}

export function getRelatedResourceArticles(
  article: ResourceArticle,
  limit = 3,
  options: ResourceLoadOptions = {},
): ResourceArticle[] {
  return getPublishedResourceArticles(article.locale, options)
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => {
      const aCategoryRank = a.category === article.category ? 0 : 1;
      const bCategoryRank = b.category === article.category ? 0 : 1;
      return aCategoryRank - bCategoryRank || compareArticles(a, b);
    })
    .slice(0, limit);
}

export function getResourceStaticParams(
  options: ResourceLoadOptions = {},
): Array<{ slug: string }> {
  return getPublishedResourceArticles("en", options).map(({ slug }) => ({
    slug,
  }));
}
