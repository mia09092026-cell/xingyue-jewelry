# Lab-Grown Gemstones Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a localized, premium B2B lab-grown gemstone catalog that routes every commercial action into the existing inquiry workflow.

**Architecture:** Typed gemstone data is separated from localized interface copy. A reusable page component renders English, Arabic, and Spanish App Router pages, while existing SEO, contact-prefill, WhatsApp, email, header, and footer utilities remain the integration points.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library.

## Global Constraints

- Do not copy GEMSTONESAFE code, images, copy, prices, product records, branding, or visual design.
- Do not add checkout, payment gateway, Shopify, or a retail cart.
- Prices are non-binding B2B reference ranges.
- Preserve Google Sheets inquiry handling, WhatsApp, sales email, multilingual routing, RTL, SEO, sitemap, and hreflang.
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

- [ ] Write tests requiring seven color groups, ten type groups, complete card fields, reference-price language, valid local image paths, and unique slugs.
- [ ] Run `npm test -- --run src/data/gemstones.test.ts` and verify failure because the module is missing.
- [ ] Implement the typed arrays with the supplied B2B reference ranges and inquiry-focused copy.
- [ ] Add `IMAGE_MAP.md` mapping current assets and missing dedicated future photography.
- [ ] Re-run the data test and verify it passes.

### Task 2: Localized catalog copy and reusable components

**Files:**
- Create: `src/content/gemstone-catalog.ts`
- Create: `src/components/gemstone-stone-card.tsx`
- Create: `src/components/gemstone-catalog-page.tsx`
- Create: `src/components/gemstone-catalog-page.test.tsx`

**Interfaces:**
- Consumes typed catalog arrays and `SupportedLocale`.
- Produces `GemstoneCatalogPage({ locale })`.

- [ ] Write rendering tests for the English title, Arabic RTL, Spanish CTA, six buying fields, reference-price disclaimer, payment options, WhatsApp, email, and inquiry-prefill URLs.
- [ ] Run the component test and verify it fails because the components are missing.
- [ ] Implement localized copy and the high-end B2B page composition.
- [ ] Implement card actions using `contactInquiryHref`, `brand.whatsappHref`, and the gemstone email inquiry URL.
- [ ] Re-run the component test and verify it passes.

### Task 3: App Router pages and SEO

**Files:**
- Create: `src/app/lab-grown-gemstones/page.tsx`
- Create: `src/app/[locale]/lab-grown-gemstones/page.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/seo.test.ts`
- Modify: `src/app/site-pages.test.tsx`

**Interfaces:**
- English path: `/lab-grown-gemstones`
- Arabic path: `/ar/lab-grown-gemstones`
- Spanish path: `/es/lab-grown-gemstones`

- [ ] Add failing route and SEO tests for page rendering, localized paths, canonical URLs, hreflang, Open Graph image, and sitemap entries.
- [ ] Run the targeted tests and verify they fail because routes and sitemap registration are missing.
- [ ] Add the English and localized route modules using `createPageMetadata`, `getLanguageAlternates`, and `localizedPath`.
- [ ] Register `/lab-grown-gemstones` in localized public paths so sitemap entries include all three locales.
- [ ] Re-run targeted tests and verify they pass.

### Task 4: Navigation discovery

**Files:**
- Modify: `src/lib/site-data.ts`
- Modify: `src/content/i18n/index.ts`
- Modify: `src/components/site-chrome.test.tsx`

**Interfaces:**
- Adds a Gemstones navigation item linking to the locale-correct catalog.

- [ ] Add failing tests for English, Arabic, and Spanish navigation links.
- [ ] Run the navigation test and verify the missing-link failure.
- [ ] Add concise localized navigation labels without restructuring the current header.
- [ ] Re-run the navigation test and verify it passes.

### Task 5: Full verification and Preview

**Files:**
- Verify all changed and added files only.

- [ ] Run `npm run lint`; expected exit code 0.
- [ ] Run `npm run build`; expected exit code 0 with all three routes listed.
- [ ] Run `npm test`; expected zero failures.
- [ ] Start local preview and inspect desktop, mobile, Arabic RTL, CTA links, image loading, and no horizontal overflow.
- [ ] Confirm git diff contains no external website assets, environment variables, keys, or inquiry data.
- [ ] Commit to `codex/lab-grown-gemstones-catalog`, push the branch, and record the Vercel Preview URL without merging `main`.
