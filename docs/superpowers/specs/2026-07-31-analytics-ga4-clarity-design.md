# GA4 and Microsoft Clarity Analytics Design

## Scope

Add the first production analytics layer for Xingyue Jewelry without changing
page design, marketing copy, inquiry fields, multilingual behavior, SEO
metadata, JSON-LD, sitemap, robots, `llms.txt`, Resources content, or the
existing Google Sheets, WhatsApp, and email flows.

The integration covers:

- Google Analytics 4 measurement ID supplied through
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Microsoft Clarity project ID supplied through
  `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- A production-domain gate with an explicit Preview/Development QA override.
- Typed, PII-safe custom events for contact and content interactions.
- Explicit Clarity masking for the complete inquiry form.
- A consent adapter boundary for a later consent-management phase.

Search Console is already verified through Cloudflare DNS. No Search Console
verification markup or files are added.

## Existing Architecture

The site uses the Next.js 16.2.9 App Router. The global integration point is
`src/app/layout.tsx`. Contact submissions are handled by the client component
`src/components/contact-inquiry-form.tsx` and confirmed by
`POST /api/contact`. WhatsApp and email URLs are created by
`src/lib/contact-links.ts`. Resource articles are rendered by
`src/app/resources/[slug]/page.tsx`.

The repository currently has no GA4, GTM, Clarity, analytics SDK, CSP,
cookie-consent mechanism, telephone links, or PDF download links.

## Selected Architecture

### Runtime and environment gate

`src/lib/analytics-config.ts` owns the pure environment decision. Analytics
loads when both of these conditions are satisfied:

1. The relevant public ID is present and valid.
2. The deployment is Vercel Production and the browser hostname is exactly
   `xingyuejewelry.com`, or
   `NEXT_PUBLIC_ANALYTICS_QA_ENABLED=true` explicitly enables QA on Preview or
   Development.

Preview and Development remain disabled by default. The QA flag is never set
in committed code.

### Script loading

`@next/third-parties@16.2.9` supplies the official `GoogleAnalytics`
component, mounted once from the root layout. GA4 Enhanced Measurement handles
initial and History API page views. The application does not send a manual
`page_view`.

Clarity is mounted once from the same analytics component with
`next/script` and `afterInteractive`. Its official asynchronous loader uses
the validated environment project ID. Neither service blocks first paint.

### Unified event API

`src/lib/analytics.ts` defines an event-to-parameter map and one safe
`trackAnalyticsEvent` function. Callers can only send approved event names and
parameter keys. The helper silently returns when the browser, analytics gate,
data layer, or tracking script is unavailable. Event payloads never contain
form values.

Approved events:

- `whatsapp_click`: `page_path`, `link_location`, `locale`, optional
  `product_or_context`.
- `generate_lead`: `form_name`, `page_path`, `locale`, optional
  `inquiry_type`.
- `form_error`: `form_name`, `error_type`, `page_path`.
- `email_click`: `page_path`, `link_location`.
- `phone_click`: `page_path`, `link_location`.
- `file_download`: `file_name`, `file_type`, `page_path`.
- `resource_view`: `article_slug`, `article_title`, `locale`, `page_path`.

### Link tracking

A single root-level client listener uses event delegation to inspect clicked
anchors. It recognizes WhatsApp, `mailto:`, `tel:`, and PDF/download links.
Existing query parameters such as `source`, `locale`, and `interest` provide
safe attribution without editing every business component. One DOM click
produces at most one analytics event and never interferes with navigation.

The current repository has no `tel:` or PDF links. Support is included and
tested so future qualifying links work without duplicate component handlers.

### Contact form tracking and masking

The inquiry form calls `generate_lead` only after the API response has both an
HTTP success status and `{ ok: true }`. API and network failures call
`form_error` with a coarse error category derived from the response code.
Names, companies, email addresses, phone numbers, countries, references, and
messages never enter analytics payloads.

The complete `<form>` receives `data-clarity-mask="true"`, protecting inputs,
labels, validation messages, and any echoed content as a defense in depth
measure in addition to Clarity's default input masking.

### Resource tracking

A focused client component receives server-provided article metadata and sends
one `resource_view` per article page mount. A per-page guard prevents React
Strict Mode or remount behavior from duplicating the event. This event is
separate from, and does not replace or duplicate, GA4 automatic page views.

## Consent and privacy boundary

The repository has no Consent Banner, CMP, Privacy Policy route, or stored
analytics preference. This phase does not add an unapproved banner or rewrite
legal text. It exposes a consent-update adapter so a future CMP can update
Google and Clarity consent state without changing event callers.

Production analytics can technically load before a user-facing consent choice
exists. This is an explicit GDPR/UK GDPR compliance gap and must be reported.
The site must not be described as fully compliant. Phase two should select a
CMP or approved custom banner, update the privacy notice, enable Clarity
Consent Mode in its dashboard, and verify consent signals in Google Tag
Assistant and Clarity.

## CSP

No CSP exists in repository configuration, proxy code, or headers. This phase
does not introduce a new site-wide CSP because doing so would be a separate
security rollout with regression risk. Preview response headers and the browser
console must be inspected for an externally injected CSP. If one exists,
specific Google and Clarity origins will be added without broad wildcards.

## Testing and verification

Tests cover environment gates, approved event payloads, safe failure, click
classification, duplicate prevention, post-success lead tracking, sanitized
form errors, form masking, resource views, and the single root integration.

Final verification includes dependency installation, lint, all tests,
production build, script-duplication search, PII-oriented source and request
inspection, contact-flow regression checks, Git diff and untracked-file review,
and Preview browser checks on desktop and mobile.

The branch may be pushed and a review-only Pull Request prepared. It must not
be merged and Production must not be deployed without explicit approval.
