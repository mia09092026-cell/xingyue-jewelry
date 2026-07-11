# AGENTS.md — Xingyue Jewelry project rules

Before starting any task:
1. Read AGENTS.md.
2. Read docs/CODEX_HANDOFF.md.
3. Do not modify secrets or Vercel environment variables.
4. Do not commit sensitive files.
5. Preserve Google Sheets inquiry form, WhatsApp, email, multilingual routes, sitemap and hreflang.
6. Run lint, build and tests before finishing.
7. Summarize changed files, test results and Preview / Production links.

## Project snapshot

- Project name: Xingyue Jewelry / Star & Moon Jewelry.
- Website type: B2B lab-grown jewelry and lab-grown gemstones independent inquiry site.
- Framework: Next.js App Router with TypeScript, React, Tailwind CSS, Vitest and Testing Library.
- Deployment: Vercel.
- GitHub repository: `mia09092026-cell/xingyue-jewelry`.
- Production domain: `https://xingyuejewelry.com`.
- Positioning: B2B inquiry website, not a retail shopping cart.
- Target customers: overseas jewelry wholesalers, brands, custom jewelry buyers, private-label buyers and OEM/ODM customers.

## Non-negotiable safety rules

- Do not commit `.env`, `.env.local`, `.env.production`, Google JSON keys, service account JSON, private keys, passwords or customer inquiry data.
- Do not print, paste or document real Google private keys, full Service Account JSON, full environment variable values or customer submissions.
- Do not modify or delete Vercel environment variables unless the user explicitly asks for that exact backend configuration task.
- Do not delete WhatsApp, enterprise email, Google Sheets inquiry form, multilingual routes, sitemap or hreflang.
- Do not download random third-party product images or use images with unclear copyright.
- Do not copy GEMSTONESAFE.com images, code, copywriting, product data, logo or brand elements. It may only be used as a functional-structure reference when the user requests it.
- Keep the website premium, clean and B2B-oriented. Do not turn it into Taobao-style retail or a low-price marketplace.

## Important contact information

- WhatsApp: `+8613324888759`
- WhatsApp link: `https://wa.me/8613324888759`
- Enterprise email: `sales@xingyuejewelry.com`
- Default email inquiry link: `mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry`

## Google Sheets inquiry form

- Form submit API: `/api/contact`
- Health check API: `/api/contact/health`
- Google Sheet tab name: `Inquiries`
- Google Sheets backend headers are Chinese for easier internal follow-up.
- The production configuration uses V2 environment variables first:
  - `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
  - `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- It still uses these original variables:
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SHEET_NAME`
- `GOOGLE_SHEETS_SHEET_NAME` defaults to `Inquiries` in code when missing.
- The health check must never expose secrets. It should only return safe booleans, source labels such as `V2` or `legacy`, and safe error categories.

## Environment variable rules

Required Vercel variables, without values:

- `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_SHEET_NAME`

Notes:

- `GOOGLE_SHEETS_PRIVATE_KEY` must come from the Service Account JSON `private_key` field.
- `GOOGLE_SHEETS_CLIENT_EMAIL_V2` must be a Service Account email, usually ending with `iam.gserviceaccount.com`.
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2` must be the ID between `/d/` and `/edit` in the Google Sheet URL.
- `GOOGLE_SHEETS_SHEET_NAME` is normally `Inquiries`.
- After changing Vercel environment variables, Production must be redeployed.

## Current completed features

- English main website.
- Arabic `/ar` pages with `lang="ar"` and RTL layout support.
- Spanish `/es` pages with `lang="es"`.
- SEO metadata, canonical URLs, hreflang alternates and sitemap.
- WhatsApp and enterprise email links.
- Google Sheets inquiry form with safe health check.
- `/lab-grown-gemstones` English B2B catalog preview.
- Lab-Grown Gemstones by Color structure.
- B2B reference price ranges and disclaimer.
- Payment Options display section only; no live payment gateway.
- Header navigation includes `Lab-Grown Gemstones`.
- Footer page links include `Lab-Grown Gemstones` through the shared navigation list.

## Design and content direction

- Premium, clean, European/American B2B style.
- Inquiry-first experience: product cards should lead to the inquiry form, WhatsApp or email.
- Prices are reference wholesale ranges only, never final promises.
- Do not build a complex cart or real checkout unless the user confirms.
- Payment options can mention PayPal invoice, credit card payment link, bank transfer / T/T, Wise transfer, sample order payment, deposit before production and balance before shipping.

## Common commands

Run these before committing or handing work back:

```bash
npm run lint
npm run build
npm test
```

## Branch and deployment workflow

1. Start new work from `main` unless the user explicitly names another base branch.
2. Create a new `codex/...` branch.
3. Modify only the files required for the task.
4. Preserve unrelated uncommitted or untracked user work.
5. Run lint, build and tests.
6. Push the branch and provide a Vercel Preview URL.
7. Wait for the user to confirm before merging to `main`, unless the user explicitly asks for direct Production deployment.
8. After merging to `main`, wait for Vercel Production Ready and check the important production links.

## Important production links

- `https://xingyuejewelry.com`
- `https://xingyuejewelry.com/contact`
- `https://xingyuejewelry.com/api/contact/health`
- `https://xingyuejewelry.com/lab-grown-gemstones`
- `https://xingyuejewelry.com/sitemap.xml`
- `https://xingyuejewelry.com/ar`
- `https://xingyuejewelry.com/es`

## Ongoing TODO

- Check whether `/lab-grown-gemstones` images should be replaced with more original Xingyue product photography.
- Add more real lab-grown gemstone images.
- Add Arabic and Spanish versions of `/lab-grown-gemstones`.
- Keep checking that Add to Inquiry pre-fills product interest correctly across new catalog entries.
- Add independent color-category pages.
- Add more lab-grown gemstone product data.
- Keep monitoring Google Sheets inquiry writes.
- Improve SEO internal links and navigation entry points.
- Check mobile display after each visual change.
