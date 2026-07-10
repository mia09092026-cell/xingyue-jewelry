# Lab-Grown Gemstones Catalog Design

## Goal

Add a premium first-stage English B2B lab-grown gemstone catalog to Xingyue Jewelry without turning the site into a retail marketplace. The catalog helps overseas buyers browse by color and stone type, understand reference wholesale ranges, and submit a quote-ready inquiry.

## Experience

The page follows Xingyue Jewelry's existing warm ivory, charcoal, gold-accented visual system. It uses editorial spacing, large gemstone photography, restrained reference pricing, and procurement details such as MOQ, calibration, quality, availability, and OEM/ODM support. There is no checkout, retail cart, countdown, discount badge, or low-price merchandising.

The page sections are:

1. B2B hero and inquiry actions.
2. Seven color sourcing paths.
3. Ten gemstone type categories.
4. Quote-ready stone cards with technical buying fields.
5. Reference wholesale price guidance and disclaimer.
6. MOQ, calibration, custom cutting, matching, certification, and jewelry production support.
7. B2B payment options without a payment gateway.
8. Inquiry, WhatsApp, and email closing actions.

## Architecture

- `src/data/gemstones.ts` owns typed, non-retail catalog data.
- `src/content/gemstone-catalog.ts` owns the English interface and SEO copy for this first preview stage.
- `src/components/gemstone-stone-card.tsx` renders one B2B stone card.
- `src/components/gemstone-catalog-page.tsx` composes the full English catalog page.
- `src/app/lab-grown-gemstones/page.tsx` provides metadata, canonical URL, Open Graph image, and English/x-default alternates.
- Existing `contactInquiryHref()` pre-fills Product Interest through the `interest` query parameter.
- Existing WhatsApp and sales email links remain unchanged.

## Images

Use only project-owned or already supplied local assets. The supplied ruby and sapphire images are tracked because the new page directly references them. Existing colored stone, loose stone, and moissanite images cover other sections. Missing dedicated images are documented in `IMAGE_MAP.md`; no external images are downloaded.

## Localization and SEO

This first stage only publishes `/lab-grown-gemstones` in English. It does not add `/ar/lab-grown-gemstones` or `/es/lab-grown-gemstones`. The sitemap includes the English URL, and page metadata includes `en` plus `x-default` alternates. Existing multilingual site routes remain unchanged.

## Verification

Tests cover data integrity, CTA prefill links, contact methods, English rendering, metadata, sitemap entries, and image references. Final verification runs `npm run lint`, `npm run build`, and `npm test`.
