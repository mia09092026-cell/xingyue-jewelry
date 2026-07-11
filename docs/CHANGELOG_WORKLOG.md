# Changelog and worklog

This is a maintenance-oriented worklog for future Codex / Claude Code sessions. It records important changes and deployment context without storing secrets.

## 2026-07-11 — Project context and handoff documentation

- Added long-term project rules in `AGENTS.md`.
- Added Claude Code rules in `CLAUDE.md`.
- Added this worklog.
- Added `docs/CODEX_HANDOFF.md` for future implementation sessions.
- Added `docs/PROJECT_CONTEXT_ZH.md` for the site owner.
- No business functionality changed.
- No Vercel environment variables changed.
- No secrets or customer inquiry data added.

## 2026-07-10 to 2026-07-11 — Lab-Grown Gemstones catalog

- Added the English `/lab-grown-gemstones` B2B catalog preview.
- Added gemstone catalog data and components.
- Added Lab-Grown Gemstones by Color structure.
- Added gemstone type cards and quote-ready stone cards.
- Added B2B reference price ranges with disclaimer.
- Added Payment Options display section without live payment checkout.
- Connected catalog CTAs to inquiry, WhatsApp and email routes.
- Added SEO metadata and sitemap handling for `/lab-grown-gemstones`.
- Added Header/Footer navigation entry through the shared `navigation` list.

## 2026-07-10 — Google Sheets inquiry form hardening

- Kept `/api/contact` as the form submission API.
- Added and improved `/api/contact/health`.
- Added live write health probe concepts:
  - `canConnectGoogle`
  - `canOpenSpreadsheet`
  - `canFindSheetTab`
  - `canWriteTestRow`
  - `writable`
  - `errorCategory`
- Added safer Google Sheets error categories such as invalid private key, permission denied, spreadsheet not found, sheet tab not found and Google API error.
- Added V2 environment variable preference:
  - `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
  - `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- Continued using:
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SHEET_NAME`
- Preserved WhatsApp and enterprise email fallbacks.

## 2026-07 — Multilingual B2B site foundation

- Added English main site content.
- Added Arabic `/ar` pages.
- Added Spanish `/es` pages.
- Added Arabic RTL support.
- Added localized metadata, canonical URLs and hreflang handling.
- Added sitemap entries for localized public pages.
- Kept English default routes unchanged.

## 2026-07 — Enterprise contact details

- Standardized WhatsApp as `https://wa.me/8613324888759`.
- Standardized enterprise email as `sales@xingyuejewelry.com`.
- Standardized default mailto link as `mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry`.
- Preserved email and WhatsApp across footer, contact and inquiry CTAs.

## Ongoing notes

- Do not merge feature branches into `main` unless the user explicitly confirms.
- Do not deploy Production unless the user explicitly asks.
- Keep all Google credentials and customer inquiry data out of Git.
- Verify production health at `https://xingyuejewelry.com/api/contact/health` after contact-form or Google Sheets changes.
- Use `IMAGE_MAP.md` when changing product imagery.
