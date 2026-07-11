# CLAUDE.md — Xingyue Jewelry project rules for Claude Code

Claude Code should follow the same maintenance rules as Codex. Before making changes, read this file and `docs/CODEX_HANDOFF.md`.

## Start every task with these rules

1. Do not modify secrets or Vercel environment variables.
2. Do not commit sensitive files.
3. Preserve Google Sheets inquiry form, WhatsApp, email, multilingual routes, sitemap and hreflang.
4. Work on a new branch unless the user explicitly asks to work on `main`.
5. Run `npm run lint`, `npm run build` and `npm test` before finishing.
6. Summarize changed files, test results and Preview / Production links.

## Project snapshot

- Project name: Xingyue Jewelry / Star & Moon Jewelry.
- Website type: B2B lab-grown jewelry and lab-grown gemstones independent inquiry site.
- Framework: Next.js App Router with TypeScript, React, Tailwind CSS, Vitest and Testing Library.
- Deployment: Vercel.
- GitHub repository: `mia09092026-cell/xingyue-jewelry`.
- Production domain: `https://xingyuejewelry.com`.
- Positioning: B2B inquiry website, not a retail shopping cart.
- Target customers: overseas jewelry wholesalers, brands, custom jewelry buyers, private-label buyers and OEM/ODM customers.

## Safety rules

- Never commit `.env`, `.env.local`, `.env.production`, Google JSON keys, service account JSON, private keys, passwords or customer inquiry data.
- Never print real Google private keys, full Service Account JSON, full environment variable values or customer submissions.
- Never delete WhatsApp, enterprise email, Google Sheets inquiry form, multilingual routes, sitemap or hreflang.
- Do not download random third-party product images or use copyright-unclear images.
- Do not copy GEMSTONESAFE.com images, code, copy, product data, logo or brand elements.

## Contact information

- WhatsApp: `+8613324888759`
- WhatsApp link: `https://wa.me/8613324888759`
- Enterprise email: `sales@xingyuejewelry.com`
- Default email inquiry link: `mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry`

## Google Sheets inquiry form

- Submit API: `/api/contact`
- Health API: `/api/contact/health`
- Google Sheet tab: `Inquiries`
- Backend sheet headers are Chinese.
- Preferred V2 env vars:
  - `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
  - `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- Existing env vars still used:
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SHEET_NAME`

Do not store or reveal the actual values of these variables.

## Design direction

- Keep the site premium, clean and B2B-oriented.
- Do not make it look like a low-price retail marketplace.
- Product cards should lead to inquiry, WhatsApp or email.
- Prices are reference wholesale ranges only.
- Payment options are informational unless the user explicitly approves a live payment integration.

## Current completed features

- English main website.
- Arabic `/ar` pages and RTL support.
- Spanish `/es` pages.
- SEO metadata, canonical URLs, hreflang and sitemap.
- Google Sheets inquiry form and `/api/contact/health`.
- `/lab-grown-gemstones` English B2B catalog preview with color categories, product cards, reference prices and payment options.
- Header and footer navigation include `Lab-Grown Gemstones`.

## Required checks before handoff

```bash
npm run lint
npm run build
npm test
```

If any command fails, fix the failure or clearly report the blocking error.
