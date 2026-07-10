# Lab-Grown Gemstones Multilingual Preparation

This is a preparation checklist only. The first post-launch polish keeps the live gemstone catalog English-only.

## Suggested routes

- Arabic: `/ar/lab-grown-gemstones`
- Spanish: `/es/lab-grown-gemstones`

## Reusable components

- `src/components/gemstone-catalog-page.tsx`
- `src/components/gemstone-stone-card.tsx`
- `src/data/gemstones.ts`
- Existing `SiteHeader`, `SiteFooter`, `SectionHeading`, `contactInquiryHref`, WhatsApp and email link utilities

## English source content to translate later

### Metadata

- Title: `Lab-Grown Gemstones Wholesale by Color | Xingyue Jewelry`
- Description: `Wholesale lab-grown ruby, sapphire, emerald, spinel, moissanite and colored gemstones by color, size and shape. OEM/ODM jewelry manufacturing and custom stone sourcing.`

### Main page copy

- `B2B Loose Stone Sourcing`
- `Lab-Grown Gemstones Wholesale by Color`
- `A quote-ready sourcing catalog for jewelry brands, wholesalers and OEM / ODM buyers.`
- `Browse color families, calibrated sizes, mixed cuts and project-based stone sourcing. Final supply is confirmed against your size, quality, quantity and production brief.`
- `Source by Color`
- `Build a stone direction around your market.`
- `Start with a color family, then confirm stone type, cut, millimeter size, matching tolerance and order quantity.`
- `Stone Categories`
- `Wholesale gemstone programs for repeat production.`
- `Choose a material direction for samples, calibrated batches, matched pairs or custom jewelry manufacturing.`
- `Quote-Ready Stone Cards`
- `Popular specifications for buyer discussion.`
- `These cards are sourcing examples, not fixed retail inventory. Send the stone name with your target size, quantity and quality requirement.`
- `Reference Pricing`
- `Reference wholesale price guidance`
- `Use these bands for early budget planning. A formal quotation follows specification review and availability confirmation.`
- `Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.`
- `Wholesale & Custom Support`
- `From loose stones to finished jewelry production.`
- `Xingyue supports the technical details overseas buyers need before approving samples and bulk production.`
- `B2B Order Support`
- `Payment options for confirmed orders`
- `For confirmed wholesale or sample orders, we can provide PayPal invoice, secure credit card payment link, bank transfer, or Wise transfer. Large custom orders usually require a deposit before production and balance before shipment.`
- `Prepare Your Stone Brief`
- `Tell us the color, cut, size and quantity you need.`
- `Add a stone to the inquiry form or send your reference design. We will review availability, MOQ, calibration, quality and production options.`

### CTA labels

- `Get Wholesale Price`
- `Add to Inquiry`
- `Contact on WhatsApp`
- `Email Inquiry`
- `Send Inquiry`
- `Request Stone Catalog`
- `View Stones`

### Field labels

- `Color`
- `Shape`
- `Size range`
- `Quality`
- `MOQ`
- `Reference price`
- `Availability`
- `Available colors`

### Payment options

- `PayPal invoice`
- `Credit card payment link`
- `Bank transfer / T/T`
- `Wise transfer`
- `Sample order payment`
- `Deposit before production`
- `Balance before shipping`

## Implementation notes for later

- Arabic should use the existing `dir="rtl"` mechanism and localized navigation.
- Spanish should use the existing `/es` route structure.
- Keep product data technical fields in `src/data/gemstones.ts`; translate display copy in `src/content/gemstone-catalog.ts`.
- Add `/ar/lab-grown-gemstones` and `/es/lab-grown-gemstones` only when translations are reviewed.
- After adding localized pages, update sitemap alternates to include `en`, `ar`, `es`, and `x-default`.
