# XINGYUE Jewelry Website

Next.js 16 (App Router) marketing site for Xingyue Jewelry: custom 925 sterling
silver, moissanite and lab-grown gemstone manufacturing.

## Requirements

- Node.js 20.9+ (CI uses Node 22)
- npm 10+

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

Run these before every merge:

```bash
npm run lint
npm test
npm run build
```

## Deployment

- Hosted on Vercel; production branch is `main`.
- Required environment variables are documented in `.env.local.example`
  (Google Sheets inquiry storage + optional test token).
- `NEXT_PUBLIC_SITE_URL` controls canonical URLs and sitemap output.

## Performance guardrails

- **Do not call `headers()`, `cookies()` or `draftMode()` in `src/app/layout.tsx`.**
  The root layout must stay static so every content page is prerendered and
  served from the CDN. The `<html lang/dir>` attributes are set by an inline
  `beforeInteractive` script plus `HtmlLangSync` for client-side navigation.
- Keep `next/image` images sized with an explicit `sizes` prop. The header logo
  must stay close to its rendered size (64–72 px); a large intrinsic width makes
  Next request 1920/3840 px variants and adds hundreds of KB per page.
- Photo assets should be WebP/AVIF. `next.config.ts` limits the largest device
  candidate to 2048 px to avoid 4K downloads.
- `/resources` is intentionally dynamic because it reads `searchParams`; all
  other content pages should remain static or SSG.

## Project layout

```text
src/app          routes, metadata, API handlers
src/components   shared header/footer/page sections
src/content      localized copy
src/lib          data, SEO, Google Sheets, i18n helpers
public           static assets served from the CDN
docs             design and implementation notes
```
