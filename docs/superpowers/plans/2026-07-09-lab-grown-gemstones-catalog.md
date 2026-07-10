# Lab-Grown Gemstones Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a first-stage English, premium B2B lab-grown gemstone catalog that routes every commercial action into the existing inquiry workflow.

**Architecture:** Typed gemstone data is separated from English interface copy. A reusable page component renders the App Router page at `/lab-grown-gemstones`, while existing SEO, contact-prefill, WhatsApp, email, header, and footer utilities remain the integration points.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library.

## Global Constraints

- Do not copy GEMSTONESAFE code, images, copy, prices, product records, branding, or visual design.
- Do not add checkout, payment gateway, Shopify, or a retail cart.
- Prices are non-binding B2B reference ranges.
- Preserve Google Sheets inquiry handling, WhatsApp, sales email, existing multilingual routes, RTL, SEO, sitemap, and hreflang.
- Do not publish `/ar/lab-grown-gemstones` or `/es/lab-grown-gemstones` in this first stage.
- Do not commit environment files, credentials, private keys, or customer inquiry data.

---

### Task 1: Typed catalog data and image map

**Files:**
- Create: `src/data/gemstones.ts`
- Create: `src/data/gemstones.test.ts`
- Create: `IMAGE_MAP.md`
- Track: `public/images/b2b-lab-grown-ruby.jpg`
- Track: `public/images/b2b-lab-grown-sapphire.jpg`

**Interfaces:**
- Produces `GemstoneCatalogItem`, `GemstoneColorGroup`, `GemstoneTypeCategory`, `gemstoneCatalogItems`, `gemstoneColorGroups`, and `gemstoneTypeCategories`.

- [x] Write tests requiring seven color groups, ten type groups, complete card fields, reference-price language, valid local image paths, and unique slugs.
- [x] Implement the typed arrays with the supplied B2B reference ranges and inquiry-focused copy.
- [x] Add `IMAGE_MAP.md` mapping current assets and missing dedicated future photography.

### Task 2: English catalog copy and reusable components

**Files:**
- Create: `src/content/gemstone-catalog.ts`
- Create: `src/components/gemstone-stone-card.tsx`
- Create: `src/components/gemstone-catalog-page.tsx`
- Create: `src/components/gemstone-catalog-page.test.tsx`

**Interfaces:**
- Consumes typed catalog arrays and `SupportedLocale`.
- Produces `GemstoneCatalogPage({ locale })`.

- [x] Write rendering tests for the English title, six buying fields, reference-price disclaimer, payment options, WhatsApp, email, and inquiry-prefill URLs.
- [x] Implement English copy and the high-end B2B page composition.
- [x] Implement card actions using `contactInquiryHref`, `brand.whatsappHref`, and the gemstone email inquiry URL.

### Task 3: App Router page and SEO

**Files:**
- Create: `src/app/lab-grown-gemstones/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- English path: `/lab-grown-gemstones`
- Hreflang alternates: `en` and `x-default`

- [x] Add route and SEO tests for page rendering, canonical URL, English/x-default alternates, Open Graph image, and sitemap entry.
- [x] Add the English route module using `createPageMetadata`.
- [x] Register `/lab-grown-gemstones` as an English-only sitemap entry.

### Task 4: Navigation discovery

**Files:**
- Modify: `src/lib/site-data.ts`
- Modify: `src/content/i18n/index.ts`
- Modify: `src/components/site-chrome.test.tsx`

**Interfaces:**
- Adds an English Gemstones navigation item linking to `/lab-grown-gemstones`.

- [x] Add tests for the English navigation link.
- [x] Keep Arabic and Spanish navigation unchanged for this first-stage preview.

### Task 5: Full verification and Preview

**Files:**
- Verify all changed and added files only.

- [ ] Run `npm run lint`; expected exit code 0.
- [ ] Run `npm run build`; expected exit code 0 with `/lab-grown-gemstones` listed.
- [ ] Run `npm test`; expected zero failures.
- [ ] Confirm git diff contains no external website assets, environment variables, keys, or inquiry data.
- [ ] Commit to `codex/lab-grown-gemstones-catalog`, push the branch, and record the Vercel Preview URL without merging `main`.
