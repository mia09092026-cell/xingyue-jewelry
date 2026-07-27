# Resources Markdown Content System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an English-first local Markdown Resources system with validated content, responsive list and detail pages, safe Markdown rendering, SEO/schema output, navigation links, sitemap entries, and dynamic llms.txt.

**Architecture:** Markdown files under `content/resources/<locale>` are parsed by one server-side loader using `gray-matter`. React pages consume typed published articles and render bodies with `react-markdown` without raw HTML support. Sitemap and a dynamic `/llms.txt` route read the same loader so drafts are consistently excluded.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library, gray-matter, react-markdown.

## Global Constraints

- Do not use MDX.
- Do not parse or execute raw HTML or React components from article content.
- Do not create `/es/resources` or `/ar/resources`.
- Do not emit Spanish or Arabic Resources hreflang values.
- All three language navigation variants link to English `/resources`.
- Resources pages remain English and LTR.
- Invalid Markdown must fail with the file path, field name, and specific reason.
- Cover images must resolve to an existing file under `public`.
- Drafts must not enter pages, static params, sitemap, related articles, or llms.txt.
- Do not invent factory ownership, certifications, capacity, years, customers, or performance claims.
- Do not modify the Contact form, API, Google Sheets mapping, environment variables, or unrelated functionality.
- Do not stage, commit, push, create a PR, merge, or deploy.

---

### Task 1: Add Markdown dependencies and content validation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/lib/resources.test.ts`
- Create: `src/lib/resources.ts`
- Create: `content/resources/en/moissanite-vs-cubic-zirconia.md`
- Create: `content/resources/en/choose-925-sterling-silver-jewelry-manufacturer.md`

**Interfaces:**
- Produces: `RESOURCE_CATEGORIES`, `ResourceCategory`, `ResourceArticle`, `getAllResourceArticles`, `getPublishedResourceArticles`, `getPublishedResourceArticle`, `getRelatedResourceArticles`, and `getResourceStaticParams`.

- [ ] **Step 1: Install exact dependency versions**

Run:

```powershell
npm install gray-matter react-markdown
```

Record the resolved versions from `package-lock.json`.

- [ ] **Step 2: Write failing loader and validation tests**

Tests must create temporary content/public roots and assert:

```ts
expect(() => loadResourceArticle(filePath, options)).toThrow(
  expect.objectContaining({
    message: expect.stringContaining(filePath),
  }),
);
```

Cover missing fields, invalid category, invalid date, slug mismatch, locale mismatch, empty body, path traversal, missing cover file, drafts, sorting, and related articles.

- [ ] **Step 3: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/lib/resources.test.ts
```

Expected: failure because the resource loader does not exist.

- [ ] **Step 4: Implement the typed loader**

Use `node:fs`, `node:path`, and `gray-matter`. Aggregate all validation issues and throw:

```ts
throw new ResourceContentError(filePath, issues);
```

The message format must identify the file followed by one line per field issue.

- [ ] **Step 5: Add the two approved Markdown articles**

Use the two approved titles, existing internal cover images, cautious B2B sourcing language, and `draft: false`.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run:

```powershell
npx vitest run src/lib/resources.test.ts
```

Expected: all resource loader tests pass.

---

### Task 2: Add list and detail route contracts

**Files:**
- Create: `src/app/resources/resources-pages.test.tsx`
- Create: `src/components/resource-card.tsx`
- Create: `src/components/resource-markdown.tsx`
- Create: `src/app/resources/page.tsx`
- Create: `src/app/resources/[slug]/page.tsx`

**Interfaces:**
- Consumes: resource loader exports from Task 1.
- Produces: `/resources` and `/resources/[slug]`.

- [ ] **Step 1: Write failing page tests**

Assert:

- the Resources heading and English-only notice
- published cards only
- category filter behavior
- card title, description, date, category, tags, and cover image
- article heading, dates, author, breadcrumb, body, related articles, and Contact CTA
- static params include published slugs only
- draft and unknown slugs resolve through `notFound`

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/app/resources/resources-pages.test.tsx
```

Expected: failure because the pages and components do not exist.

- [ ] **Step 3: Implement responsive article cards and list page**

Use a 4:3 Next.js Image container, semantic `<article>`, `<time>`, category filter links, and visible keyboard focus states.

- [ ] **Step 4: Implement safe Markdown rendering**

Custom anchor behavior:

```ts
type SafeLink = {
  href: string;
  external: boolean;
};

export function resolveSafeResourceLink(href?: string): SafeLink | null;
```

Do not pass `rehype-raw`. Render unsafe URLs as non-clickable text.

- [ ] **Step 5: Implement the article route**

Use `generateStaticParams`, `notFound`, related articles, breadcrumb navigation, and a localized Contact query using an approved stable source code.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run:

```powershell
npx vitest run src/app/resources/resources-pages.test.tsx
```

Expected: all Resources page tests pass.

---

### Task 3: Add SEO metadata and structured data

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/structured-data.ts`
- Modify: `src/lib/structured-data.test.ts`
- Modify: `src/app/resources/resources-pages.test.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/resources/[slug]/page.tsx`

**Interfaces:**
- Produces: `createArticleMetadata` and `articleSchema`.

- [ ] **Step 1: Write failing metadata and schema tests**

Assert:

- Resources canonical is exactly `https://xingyuejewelry.com/resources`
- no `es`, `ar`, or `x-default` Resources alternates
- article canonical uses `/resources/<slug>`
- Open Graph type is `article`
- dates, author, tags, and internal cover image are present
- Article JSON-LD and Breadcrumb JSON-LD match visible content

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npx vitest run src/lib/structured-data.test.ts src/app/resources/resources-pages.test.tsx
```

- [ ] **Step 3: Implement article metadata and schema helpers**

Keep the existing website metadata helper unchanged for current pages. Add a separate article helper with no translation alternates.

- [ ] **Step 4: Wire metadata and JSON-LD into both routes**

Use the same parsed `ResourceArticle` data for visible values and schemas.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run the same focused command and expect all tests to pass.

---

### Task 4: Add navigation and language behavior

**Files:**
- Modify: `src/lib/site-data.ts`
- Modify: `src/content/i18n/index.ts`
- Modify: `src/components/site-chrome.test.tsx`
- Modify: `src/app/resources/resources-pages.test.tsx`

**Interfaces:**
- Produces navigation links to the English Resources route from all locales.

- [ ] **Step 1: Write failing navigation tests**

Assert exact labels and href:

```ts
[
  ["Resources", "/resources"],
  ["Recursos (English)", "/resources"],
  ["الموارد (بالإنجليزية)", "/resources"],
]
```

Assert `/resources` resolves to English/LTR and no localized Resources routes are generated.

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
npx vitest run src/components/site-chrome.test.tsx src/app/resources/resources-pages.test.tsx
```

- [ ] **Step 3: Update English and localized navigation**

Add the resource link without changing Contact, Products, audience routes, locale switching, or mobile menu behavior.

- [ ] **Step 4: Run tests and verify GREEN**

Run the same focused command.

---

### Task 5: Add sitemap and dynamic llms.txt

**Files:**
- Delete: `public/llms.txt`
- Create: `src/lib/llms.ts`
- Create: `src/lib/llms.test.ts`
- Create: `src/app/llms.txt/route.ts`
- Create: `src/app/llms-route.test.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- Produces: `buildLlmsText()` and `GET /llms.txt`.

- [ ] **Step 1: Write failing sitemap and llms tests**

Assert:

- `/resources` is in sitemap
- both published article URLs are in sitemap
- drafts are absent
- llms response content type is `text/plain; charset=utf-8`
- Resources and published article URLs are present
- draft URLs are absent
- calling the builder and route does not write files

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
npx vitest run src/app/seo.test.ts src/lib/llms.test.ts src/app/llms-route.test.ts
```

- [ ] **Step 3: Implement dynamic llms text generation**

Preserve the current site summary and append article titles, descriptions, and canonical URLs from `getPublishedResourceArticles("en")`.

- [ ] **Step 4: Add the route and remove the static public file**

Return:

```ts
new Response(buildLlmsText(), {
  headers: { "Content-Type": "text/plain; charset=utf-8" },
});
```

- [ ] **Step 5: Add published Resources entries to sitemap**

Import the shared loader. Do not generate localized Resource entries or hreflang.

- [ ] **Step 6: Run focused tests and verify GREEN**

Run the same focused command.

---

### Task 6: Regression, accessibility, and visual verification

**Files:**
- Modify only tests required to record valid Resources regression behavior.
- Save screenshots outside the repository under `C:\Users\ene\AppData\Local\Temp\xingyue-resources-screenshots\`.

- [ ] **Step 1: Run full static verification**

Run:

```powershell
npm run lint
npx tsc --noEmit
npm test
npm run build
git diff --check
```

- [ ] **Step 2: Confirm route output**

Check:

- `/resources`
- both `/resources/[slug]` routes
- `/llms.txt`
- `/sitemap.xml`
- `/`
- `/es`
- `/ar`
- `/contact`
- `/api/contact`

- [ ] **Step 3: Capture desktop and mobile screenshots**

Use `1440×900` and `390×844` for:

- English header navigation
- Spanish header navigation
- Arabic header navigation
- Resources list
- each article detail page

- [ ] **Step 4: Verify UI behavior**

Confirm:

- English LTR Resources layout
- no horizontal overflow
- visible focus states
- category filters work
- cover images load
- raw HTML is not executed
- no console errors or warnings
- mobile navigation contains the correct Resources label

- [ ] **Step 5: Confirm repository state**

Run:

```powershell
git status --short
git diff --name-status
git diff --stat
```

Do not stage or commit any file.
