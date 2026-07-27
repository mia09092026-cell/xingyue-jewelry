# Resources Markdown Content System Design

## Goal

Add a simple English-first Resources system to the Xingyue Jewelry Next.js website so B2B jewelry buyers can read useful sourcing content and future maintainers can publish articles by adding local Markdown files.

## Scope

The first release provides:

- `/resources`
- `/resources/[slug]`
- local Markdown files with validated frontmatter
- five fixed B2B resource categories
- category filtering
- two published example articles
- article SEO metadata, canonical URLs, Open Graph, Article JSON-LD, and Breadcrumb JSON-LD
- related articles and a manufacturing inquiry CTA
- Resources links in English, Spanish, and Arabic navigation
- automatic sitemap entries for published articles
- a dynamically generated `/llms.txt`

The first release does not provide:

- MDX
- executable React components in article content
- raw HTML rendering
- a CMS or admin login
- Spanish or Arabic article routes
- article comments, search, pagination, accounts, analytics, or database storage

## Content Architecture

Articles live under:

```text
content/resources/
└── en/
    ├── moissanite-vs-cubic-zirconia.md
    └── choose-925-sterling-silver-jewelry-manufacturer.md
```

Each Markdown file contains YAML frontmatter:

```yaml
---
title: "Article title"
slug: "article-slug"
description: "Search and card description"
category: "Buyer Guides"
tags:
  - "tag"
publishedAt: "2026-07-27"
updatedAt: "2026-07-27"
author: "Xingyue Jewelry"
coverImage: "/images/example.jpg"
locale: "en"
draft: false
---
```

The Markdown body follows the frontmatter. The body supports ordinary Markdown only. `react-markdown` renders the content without `rehype-raw`, so embedded HTML is not interpreted and MDX or React code cannot execute.

## Data Model

`ResourceArticle` includes:

- `title`
- `slug`
- `description`
- `category`
- `tags`
- `publishedAt`
- `updatedAt`
- `author`
- `coverImage`
- `locale`
- `draft`
- `body`
- `filePath`

The fixed categories are:

- `925 Sterling Silver`
- `Moissanite`
- `Lab-Created Gemstones`
- `OEM & ODM`
- `Buyer Guides`

The locale structure supports `en`, `es`, and `ar`, but only `content/resources/en` and English routes are created in this phase.

## Validation

Every Markdown file is parsed, including drafts. Invalid files are never silently skipped.

Validation errors must include:

- the full or project-relative file path
- every missing or invalid field
- the reason each field is invalid

Validation rules:

- all required fields must exist
- the slug must use lowercase ASCII letters, digits, and single hyphens
- the slug must match the Markdown filename
- the category must be one of the five fixed categories
- tags must be an array of non-empty strings
- dates must use `YYYY-MM-DD` and represent valid dates
- `updatedAt` cannot precede `publishedAt`
- `locale` must be a supported locale and match the containing locale directory
- `draft` must be a boolean
- body content must not be empty
- `coverImage` must be a root-relative path under `public`
- `coverImage` must not contain traversal segments
- the resolved cover image must exist and be a file

Any invalid article causes tests or `next build` to fail with a `ResourceContentError`.

## Content Loading

`src/lib/resources.ts` is the single server-side content API.

It provides:

- `getAllResourceArticles(locale)`
- `getPublishedResourceArticles(locale)`
- `getPublishedResourceArticle(slug, locale)`
- `getResourceCategories()`
- `getRelatedResourceArticles(article, limit)`
- `getResourceStaticParams()`

Published lists are sorted by `publishedAt` descending, then by slug for stable output. Drafts are excluded from lists, detail lookup, static params, sitemap, related articles, and llms.txt.

## Resources List Page

`/resources` is an English LTR page with:

- an English-only language notice
- a page hero
- category filter links
- a responsive article card grid
- article cover image, category, title, description, published date, and tags
- an empty-state message for a valid category without articles

The canonical URL is always:

`https://xingyuejewelry.com/resources`

No Spanish or Arabic hreflang values are emitted.

Category filters use a `category` query parameter. The canonical remains the unfiltered Resources URL.

## Resource Article Page

`/resources/[slug]` includes:

- breadcrumb navigation
- category, title, description, published date, updated date, and author
- cover image
- safe Markdown rendering
- related articles
- manufacturing inquiry CTA
- Article JSON-LD
- Breadcrumb JSON-LD

Unknown and draft slugs return 404.

## Link Safety

Markdown links are rendered through a custom anchor component:

- `http:` and `https:` links are allowed
- links to another origin open in a new window
- external links receive `target="_blank"` and `rel="noopener noreferrer"`
- root-relative paths and fragments remain same-window internal links
- absolute links to `xingyuejewelry.com` remain same-window links
- dangerous schemes such as `javascript:`, `data:`, `vbscript:`, and `file:` are not rendered as clickable links

Raw HTML is not enabled.

## SEO and Structured Data

The Resources list receives normal website metadata with an English canonical and Open Graph image.

Each published article receives:

- a unique title and description
- an English canonical URL
- `openGraph.type = "article"`
- published and modified dates
- author, tags, and cover image
- Article JSON-LD
- Breadcrumb JSON-LD

Article structured data only describes visible Markdown metadata and existing Xingyue organization facts. It does not add ratings, reviews, certifications, factory ownership, capacity, employee counts, operating years, or customer claims.

## Navigation and Language Behavior

Navigation labels:

- English: `Resources`
- Spanish: `Recursos (English)`
- Arabic: `الموارد (بالإنجليزية)`

All links lead directly to `/resources`.

The Resources pages remain English with LTR layout. No `/es/resources` or `/ar/resources` routes are created. No translation hreflang values are emitted.

The English-only notice reads:

`This resource is currently available in English only.`

## Sitemap

`src/app/sitemap.ts` reads `getPublishedResourceArticles("en")` and adds:

- `/resources`
- every published `/resources/[slug]`

Drafts are excluded automatically.

## llms.txt

The static `public/llms.txt` file is replaced by a dynamic App Router Route Handler at `src/app/llms.txt/route.ts`.

`src/lib/llms.ts` builds the response from:

- the existing stable site summary
- the Resources index URL
- every published English article URL and description

The route returns `text/plain; charset=utf-8`. It never writes a file during build, so build and test commands cannot dirty the Git worktree.

## Example Articles

1. `Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know`
2. `How to Choose a 925 Sterling Silver Jewelry Manufacturer`

The articles use cautious sourcing language and do not invent factory facts, certifications, customer examples, capacity, years, guaranteed lead times, or commercial outcomes.

Existing verified project images are reused:

- `/images/xingyue-loose-moissanite.jpg`
- `/images/b2b-manual-setting-workshop.webp`

## Testing

Tests cover:

- valid Markdown parsing
- detailed missing and invalid field errors
- missing cover image failure
- filename and slug mismatch
- draft exclusion
- stable sorting
- category filtering
- list and detail page rendering
- 404 behavior
- safe external and internal links
- dangerous protocol suppression
- no raw HTML execution
- metadata and canonical URLs
- Article and Breadcrumb JSON-LD
- related article selection
- three-language navigation labels and English destination
- English LTR Resources behavior
- sitemap publication filtering
- dynamic llms.txt publication filtering
- homepage, Contact, API, and multilingual regression behavior

## Visual Design

The design follows the current cream, navy, serif, and gold Xingyue system.

- Desktop list: three-column cards where space allows
- Tablet list: two-column cards
- Mobile list: one-column cards
- Article body: narrow readable measure with clear heading rhythm
- Category filters: wrapping pill links with visible focus states
- Cards: fixed 4:3 media ratio to avoid layout shift
- Non-hero images use lazy loading

## Operational Workflow

To publish a future English article:

1. Copy an existing Markdown article in `content/resources/en`.
2. Rename the file to the desired slug.
3. Update all frontmatter values.
4. Set `coverImage` to an existing file under `public`.
5. Write the Markdown body.
6. Keep `draft: true` while reviewing.
7. Change to `draft: false` when ready.
8. Run lint, TypeScript, tests, and build.
9. Review `/resources` and the article route.
10. Commit and deploy through the normal reviewed workflow.

Sitemap and llms.txt entries appear automatically for valid published files.
