# Codex handoff — Xingyue Jewelry

Last updated: 2026-07-11.

This document is the first file future Codex sessions should read after `AGENTS.md`. It records the current production-facing state, key implementation areas and maintenance cautions.

## Project identity

- Project name: Xingyue Jewelry / Star & Moon Jewelry.
- Domain: `https://xingyuejewelry.com`.
- Repository: `mia09092026-cell/xingyue-jewelry`.
- Platform: Next.js on Vercel.
- Business model: B2B inquiry website for lab-grown jewelry and lab-grown gemstones.
- Not a retail store: avoid carts, consumer discount language and low-price marketplace design unless the user explicitly changes the business direction.
- Main customers: overseas wholesalers, brands, private-label buyers and OEM/ODM custom jewelry buyers.

## Production links to know

- Home: `https://xingyuejewelry.com`
- Contact: `https://xingyuejewelry.com/contact`
- Google Sheets health: `https://xingyuejewelry.com/api/contact/health`
- Lab-grown gemstones catalog: `https://xingyuejewelry.com/lab-grown-gemstones`
- Sitemap: `https://xingyuejewelry.com/sitemap.xml`
- Arabic home: `https://xingyuejewelry.com/ar`
- Spanish home: `https://xingyuejewelry.com/es`

## Important contact details

- WhatsApp: `+8613324888759`
- WhatsApp link: `https://wa.me/8613324888759`
- Enterprise email: `sales@xingyuejewelry.com`
- Standard inquiry email link: `mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry`
- Lab-grown gemstones email link: `mailto:sales@xingyuejewelry.com?subject=Wholesale%20Lab-Grown%20Gemstone%20Inquiry`

## Completed site features

- English main website.
- Arabic `/ar` localized pages with RTL layout.
- Spanish `/es` localized pages.
- SEO metadata, canonical URLs, hreflang alternates and sitemap entries.
- Product, collection, about, FAQ, wholesale/OEM-ODM and contact flows.
- WhatsApp and enterprise email contact links.
- Google Sheets inquiry form at `/api/contact`.
- Safe Google Sheets health check at `/api/contact/health`.
- `/lab-grown-gemstones` English catalog preview.
- Lab-Grown Gemstones by Color page structure:
  - Hero area.
  - Color category cards.
  - Gemstone type cards.
  - Popular stone product cards.
  - B2B reference price ranges.
  - MOQ, wholesale, custom cutting and OEM/ODM notes.
  - Payment Options display section.
  - Inquiry, WhatsApp and email CTAs.
- Header navigation includes `Lab-Grown Gemstones`.
- Footer page links include `Lab-Grown Gemstones` through the shared `navigation` list.

Note: a dedicated homepage lightweight module for `Lab-Grown Gemstones by Color` should be verified in the current branch before claiming it exists. On `main` at this handoff, the homepage already links to gemstone-related collection content, but the standalone homepage promo module is still a follow-up item unless a later branch merged it.

## Key implementation areas

- Global site contact and navigation data: `src/lib/site-data.ts`
- General site config: `src/lib/site-config.ts`
- Multilingual content and nav: `src/content/i18n/index.ts`
- i18n helpers and localized routes: `src/lib/i18n.ts`
- Homepage: `src/app/page.tsx`
- English contact page: `src/app/contact/page.tsx`
- Localized pages: `src/app/[locale]/...` and `src/components/localized-pages.tsx`
- Contact form component: `src/components/contact-inquiry-form.tsx`
- Contact payload model: `src/lib/contact-inquiry.ts`
- Google Sheets integration and health logic: `src/lib/google-sheets.ts`
- Contact submit API: `src/app/api/contact/route.ts`
- Contact health API: `src/app/api/contact/health/route.ts`
- Sitemap: `src/app/sitemap.ts`
- Lab-grown gemstones page: `src/app/lab-grown-gemstones/page.tsx`
- Lab-grown gemstones page component: `src/components/gemstone-catalog-page.tsx`
- Lab-grown gemstone stone cards: `src/components/gemstone-stone-card.tsx`
- Lab-grown gemstone data: `src/data/gemstones.ts`
- Lab-grown gemstone English copy: `src/content/gemstone-catalog.ts`
- Image usage map: `IMAGE_MAP.md`

## Google Sheets inquiry form status

- Submit API: `/api/contact`
- Health API: `/api/contact/health`
- Google Sheet file name currently used by the user: `Xingyue Jewelry Inquiries`
- Google Sheet tab name: `Inquiries`
- Backend sheet headers are Chinese.
- The API should automatically keep the Chinese header row when needed.
- Production reads V2 variables first:
  - `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
  - `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- It still uses:
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SHEET_NAME`
- `GOOGLE_SHEETS_SHEET_NAME` defaults to `Inquiries`.
- Health output should safely report booleans, source labels and error categories. It must not expose private keys, full client emails, full spreadsheet IDs or customer inquiry content.

Safe health concepts already supported by the code include:

- `usingClientEmailSource`
- `usingSpreadsheetIdSource`
- `canConnectGoogle`
- `canOpenSpreadsheet`
- `canFindSheetTab`
- `canWriteTestRow`
- `writable`
- `errorCategory`

## Environment variables

Document variable names only. Never write values into docs or commits.

- `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_SHEET_NAME`

Rules:

- `GOOGLE_SHEETS_PRIVATE_KEY` must be copied from the Service Account JSON `private_key` field.
- `GOOGLE_SHEETS_CLIENT_EMAIL_V2` must be a Google Service Account email.
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2` must be the ID between `/d/` and `/edit` in the Google Sheet URL.
- `GOOGLE_SHEETS_SHEET_NAME` is normally `Inquiries`.
- Redeploy Vercel Production after any environment variable change.

## Security guardrails

- Do not commit `.env`, `.env.local`, `.env.production`, Google JSON keys, private keys or customer inquiry data.
- Do not submit `data/inquiries-dev.csv` to GitHub.
- Do not alter Vercel environment variables unless the user explicitly asks for that backend configuration task.
- Do not remove WhatsApp or email fallbacks, even if the form is being debugged.
- Do not break Arabic RTL, Spanish pages, sitemap or hreflang.
- Do not copy GEMSTONESAFE.com images, code, copy, product data or brand elements.
- Use only local project images or user-provided original assets.

## Visual and content direction

- Premium, minimal, calm B2B jewelry supplier style.
- Avoid Taobao-style retail, urgency discount blocks, flash sale messaging or cheap marketplace visuals.
- Keep product cards quote-oriented.
- Reference prices are allowed only as wholesale ranges with a clear disclaimer.
- Main conversion goal: inquiry form, WhatsApp or email.
- Payment Options are informational only:
  - PayPal invoice.
  - Credit card payment link.
  - Bank transfer / T/T.
  - Wise transfer.
  - Sample order payment.
  - Deposit before production.
  - Balance before shipping.
- Do not add real payment gateway checkout unless the user confirms.

## Standard workflow

1. Read `AGENTS.md`.
2. Read this handoff file.
3. Check `git status --short --branch`.
4. Branch from `main` unless the user specifies another base.
5. Preserve unrelated untracked or modified files.
6. Make the smallest scoped change.
7. Run:

```bash
npm run lint
npm run build
npm test
```

8. Push the branch and provide the Vercel Preview URL.
9. Do not merge `main` or deploy Production unless the user explicitly asks.

## Ongoing TODO

- Check `/lab-grown-gemstones` images and replace reused images with more original Xingyue product photography where useful.
- Add more real lab-grown gemstone images.
- Add `/ar/lab-grown-gemstones`.
- Add `/es/lab-grown-gemstones`.
- Keep checking Add to Inquiry product-name prefill across new catalog cards and other entry points.
- Add independent color-category pages.
- Add more lab-grown gemstone product data.
- Continue monitoring Google Sheets writable status.
- Improve SEO internal links and homepage entry points.
- Check mobile display after every visual page change.

## Recent branch context

- `main` includes the English `/lab-grown-gemstones` catalog preview.
- `codex/lab-grown-gemstones-catalog` was the original feature branch for the gemstones catalog.
- `codex/post-launch-gemstones-polish` was prepared for post-launch navigation/homepage/sitemap polishing. Verify whether it has been merged before relying on its changes.
- This documentation work should live on `codex/project-context-docs` until the user confirms merge.
