# Xingyue 925 Core Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the English, Spanish, and Arabic homepage around custom 925 sterling silver jewelry and OEM/ODM, while keeping lab-created colored gemstones, moissanite, lab-grown diamonds, and K-gold as ordered supporting capabilities.

**Architecture:** Keep the existing shared `LocalizedHome` page and typed locale content. Add localized destinations to homepage product-card data, render those cards as discoverable links, update only homepage-facing copy/navigation/FAQ, and align metadata, Organization/Service structured data, and `llms.txt` with the approved business hierarchy. The Contact form and `/api/contact` remain unchanged.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library

## Global Constraints

- Do not modify Contact form code, `/api/contact`, Google Sheets, WhatsApp, or email flows.
- Do not add or remove public routes, images, dependencies, environment variables, redirects, or rewrites.
- Do not claim fixed MOQ, fixed sample pricing, fixed lead time, capacity, certification, owned factories, or owned laboratories.
- Keep Arabic RTL behavior and localized routes intact.
- Use exact-path staging only; never use `git add .`, `git add -A`, or `git add --all`.
- Do not push, create a PR, merge, or deploy without a separate user instruction.

---

## Task 1: Lock the Approved Homepage Positioning and Product Navigation with RED Tests

**Files:**

- Modify: `src/app/page.test.tsx`
- Modify: `src/content/i18n/positioning.test.ts`
- Modify: `src/components/site-chrome.test.tsx`

- [ ] **Step 1: Replace the old diamond-first homepage assertion**

Update the English homepage test to require:

```tsx
expect(
  screen.getByRole("heading", {
    name: "Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner",
  }),
).toBeInTheDocument();

expect(
  screen.getByRole("link", { name: "Discuss Your Custom Jewelry Project" }),
).toHaveAttribute(
  "href",
  "/contact?locale=en&source=homepage-hero&contactMethod=form&interest=other",
);
```

Assert the five product-card links in this exact order:

```tsx
const productLinks = [
  ["Custom 925 Sterling Silver Jewelry", "/collections/custom-jewelry-manufacturing"],
  ["Lab-Created Colored Gemstone Jewelry", "/collections/lab-grown-colored-gemstones"],
  ["Custom Moissanite Jewelry", "/collections/moissanite-wholesale"],
  ["Lab-Grown Diamond Jewelry", "/collections/lab-grown-diamond-jewelry"],
  ["Custom K-Gold Jewelry", "/collections/custom-jewelry-manufacturing"],
] as const;
```

- [ ] **Step 2: Add locale-content contracts**

In `positioning.test.ts`, assert the approved H1, CTA labels, three supporting stats, five product-card titles/routes, and six FAQ items for `en`, `es`, and `ar`. Assert Arabic still has `dir: "rtl"` and includes `الحد الأدنى للطلب حسب المشروع`.

- [ ] **Step 3: Add navigation priority contracts**

In `site-chrome.test.tsx`, assert each locale navigation contains, in order after Home:

```text
Products
Gemstones
Moissanite Wholesale
OEM/ODM
```

with localized routes and labels.

- [ ] **Step 4: Run targeted tests and record RED**

Run:

```powershell
npx.cmd vitest run src/app/page.test.tsx src/content/i18n/positioning.test.ts src/components/site-chrome.test.tsx
```

Expected: failures for the old H1, CTA, old three-card product set, old wholesale navigation target, and old three-item FAQ.

---

## Task 2: Implement Trilingual Homepage Copy, Product Links, Navigation, and FAQ

**Files:**

- Modify: `src/content/i18n/index.ts`
- Modify: `src/components/localized-pages.tsx`

- [ ] **Step 1: Extend typed product-card data**

Change the homepage product-card type from a generic card to a card with a required localized destination:

```ts
type HomeProductCard = Card & { href: string };
```

Use it for `home.productCards`.

- [ ] **Step 2: Update the English locale**

Apply the approved English eyebrow, H1, subtitle, CTA labels, three supporting stats, product-section copy, five ordered product cards, and six FAQ items from the approved design specification.

Keep product destinations:

```ts
[
  "/collections/custom-jewelry-manufacturing",
  "/collections/lab-grown-colored-gemstones",
  "/collections/moissanite-wholesale",
  "/collections/lab-grown-diamond-jewelry",
  "/collections/custom-jewelry-manufacturing",
]
```

Use existing approved images only.

- [ ] **Step 3: Update Spanish and Arabic locales**

Apply natural localized versions of the same content hierarchy, card order, routes, CTA semantics, and six FAQ topics. Keep Arabic technical acronyms readable and use `الحد الأدنى للطلب حسب المشروع` in the sampling/MOQ FAQ.

- [ ] **Step 4: Update shared navigation**

Change only navigation labels and destinations needed for the approved hierarchy:

```text
Products -> localized /products
Gemstones -> localized /lab-grown-gemstones
Moissanite Wholesale -> localized /collections/moissanite-wholesale
OEM/ODM -> localized /collections/custom-jewelry-manufacturing
```

Preserve About, FAQ, Contact, audience menus, and mobile behavior.

- [ ] **Step 5: Render product cards as localized internal links**

In `LocalizedHome`, render each product card inside or as a Next.js `Link` using `card.href`. Keep the current image, title, and copy layout, and add a visible localized `View Products` cue without creating duplicate accessible names.

- [ ] **Step 6: Run targeted tests and record GREEN**

Run:

```powershell
npx.cmd vitest run src/app/page.test.tsx src/content/i18n/positioning.test.ts src/components/site-chrome.test.tsx
```

Expected: all targeted tests pass.

---

## Task 3: Lock and Implement Homepage SEO/GEO Hierarchy

**Files:**

- Modify: `src/app/homepage-seo-geo.test.tsx`
- Modify: `src/lib/structured-data.test.ts`
- Modify: `src/lib/site-config.ts`
- Modify: `src/lib/structured-data.ts`
- Modify: `src/app/layout.tsx`
- Modify: `public/llms.txt`

- [ ] **Step 1: Write SEO/GEO RED tests**

Update `homepage-seo-geo.test.tsx` to require:

```text
EN: Custom 925 Sterling Silver Jewelry Manufacturer | Xingyue
ES: Fabricante de joyería personalizada en plata 925 | Xingyue
AR: مصنّع مجوهرات فضة 925 حسب الطلب | Xingyue
```

Require the localized approved descriptions, existing canonical/hreflang/OG image, six FAQ entities, and Service names matching the visible localized H1.

Update Organization tests to require ordered `knowsAbout` entries beginning with:

```ts
[
  "Custom 925 sterling silver jewelry",
  "Lab-created colored gemstone jewelry",
  "Custom moissanite jewelry",
  "Lab-grown diamond jewelry",
  "Custom K-gold jewelry",
]
```

Require `llms.txt` to state the 925-first position and keep the existing sitemap/localized URLs.

- [ ] **Step 2: Run SEO/GEO tests and record RED**

Run:

```powershell
npx.cmd vitest run src/app/homepage-seo-geo.test.tsx src/lib/structured-data.test.ts src/app/seo.test.ts
```

Expected: failures for old homepage titles/descriptions, diamond-first Organization data, old FAQ count, and old `llms.txt` positioning.

- [ ] **Step 3: Update shared metadata and Schema**

Update `siteConfig.description`, the root layout default title, localized Organization descriptions, and ordered `knowsAbout` values. Keep the existing Organization type, URL, logo, email, and unsupported-claim safeguards.

- [ ] **Step 4: Update `public/llms.txt`**

State that Xingyue is a custom 925 sterling silver jewelry manufacturer and OEM/ODM partner. Describe the supporting material order and preserve the existing canonical URLs and business-boundary notes.

- [ ] **Step 5: Run SEO/GEO tests and record GREEN**

Run:

```powershell
npx.cmd vitest run src/app/homepage-seo-geo.test.tsx src/lib/structured-data.test.ts src/app/seo.test.ts
```

Expected: all targeted tests pass.

---

## Task 4: Protect Contact/API Scope and Run Complete Verification

**Files:**

- Verify only: `src/app/api/contact/**`
- Verify only: Contact form and inquiry modules
- Verify: all changed files

- [ ] **Step 1: Confirm forbidden areas are unchanged**

Run:

```powershell
git diff --name-status origin/main...HEAD
git diff --name-status
```

Confirm no Contact form, `/api/contact`, Sheets, WhatsApp, email, package, lockfile, environment, or image file is modified.

- [ ] **Step 2: Run full static and test verification**

Run:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd test
npm.cmd run build
git diff --check
```

- [ ] **Step 3: Run localized browser checks**

Start the local site and inspect `/`, `/es`, and `/ar` at 390×844, 768×1024, and 1440×900. Confirm:

- one H1 per page;
- CTA links and locale are correct;
- five product links are in the approved order;
- six visible FAQ items match FAQ JSON-LD;
- Arabic is RTL;
- no overflow, broken images, untranslated keys, console errors, or warnings;
- Contact page remains usable without submitting any inquiry.

- [ ] **Step 4: Review the final diff**

Run:

```powershell
git diff --stat
git diff --check
git status --short
```

Report changed files, RED/GREEN evidence, full verification results, visual findings, and any remaining risks. Do not stage or commit production changes unless the user separately asks for a commit.
