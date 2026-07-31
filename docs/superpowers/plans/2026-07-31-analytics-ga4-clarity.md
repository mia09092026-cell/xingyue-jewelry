# GA4 and Microsoft Clarity Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add production-gated GA4, Microsoft Clarity, and typed PII-safe
conversion events to the Xingyue Jewelry App Router site.

**Architecture:** Mount both analytics services once from the root layout,
centralize environment and event behavior in small typed helpers, use one
delegated link listener, and add direct form/resource calls only where actual
success or page metadata is known. GA4 Enhanced Measurement owns page views.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Vitest,
Testing Library, `@next/third-parties@16.2.9`, `next/script`.

## Global Constraints

- Branch: `feat/analytics-ga4-clarity`, based on current `origin/main`.
- GA4 ID comes only from `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Clarity ID comes only from `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- Production domain is `xingyuejewelry.com`.
- Preview and Development are disabled unless
  `NEXT_PUBLIC_ANALYTICS_QA_ENABLED=true`.
- Never send PII or form field values.
- Never send a manual `page_view`.
- Do not add Search Console verification code.
- Do not add a Cookie Banner or claim legal compliance.
- Do not change Blog/Resources article content, design, marketing copy, contact
  fields, multilingual/RTL behavior, SEO, or protected integrations.
- Do not merge `main` or deploy Production.

---

### Task 1: Runtime analytics configuration

**Files:**
- Create: `src/lib/analytics-config.test.ts`
- Create: `src/lib/analytics-config.ts`

**Interfaces:**
- Produces:
  `resolveAnalyticsRuntime(input: AnalyticsRuntimeInput): AnalyticsRuntime`.
- `AnalyticsRuntime` contains `enabled`, `gaMeasurementId`, and
  `clarityProjectId`.

- [ ] **Step 1: Write failing tests**

Cover production-domain enablement, Preview/Development default disablement,
the explicit QA override, missing IDs, and invalid IDs.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/lib/analytics-config.test.ts`

Expected: FAIL because `analytics-config.ts` does not exist.

- [ ] **Step 3: Implement the pure resolver**

Accept explicit environment and hostname inputs. Validate GA IDs with
`/^G-[A-Z0-9]+$/` and Clarity IDs with `/^[a-z0-9]+$/`. Return disabled
services instead of throwing.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- src/lib/analytics-config.test.ts`

Expected: all configuration tests pass.

### Task 2: Typed event helper and consent adapter

**Files:**
- Create: `src/lib/analytics.test.ts`
- Create: `src/lib/analytics.ts`

**Interfaces:**
- Produces:
  `trackAnalyticsEvent<K extends AnalyticsEventName>(name: K, params:
  AnalyticsEventMap[K]): boolean`.
- Produces: `updateAnalyticsConsent(granted: boolean): void`.
- Produces: `classifyFormError(code?: string): AnalyticsFormErrorType`.

- [ ] **Step 1: Write failing tests**

Assert approved event payloads are pushed as `{ event, ...params }`, unavailable
analytics fails safely, form codes become coarse categories, and consent
updates contain no user data.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/lib/analytics.test.ts`

Expected: FAIL because the helper does not exist.

- [ ] **Step 3: Implement minimal typed helpers**

Use a strict event map and browser guards. Never accept a generic payload or
unknown keys. Queue Google consent updates and Clarity consent updates only
when their APIs exist.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- src/lib/analytics.test.ts`

Expected: all helper tests pass.

### Task 3: Single root script integration

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/components/analytics-scripts.test.tsx`
- Create: `src/components/analytics-scripts.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `resolveAnalyticsRuntime`.
- Produces: `AnalyticsScripts` mounted once by the root layout.

- [ ] **Step 1: Install the version-aligned dependency**

Run: `npm install --save-exact @next/third-parties@16.2.9`

- [ ] **Step 2: Write failing tests**

Assert disabled runtimes render no scripts; enabled runtimes render one GA
integration and one Clarity loader; the root layout includes one
`AnalyticsScripts`.

- [ ] **Step 3: Verify RED**

Run: `npm test -- src/components/analytics-scripts.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 4: Implement non-blocking scripts**

Use `GoogleAnalytics` for GA4 and `next/script` with `afterInteractive` for
Clarity. Do not manually send page views or add another gtag loader.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- src/components/analytics-scripts.test.tsx`

Expected: all script tests pass.

### Task 4: Delegated contact and download events

**Files:**
- Create: `src/components/analytics-link-tracker.test.tsx`
- Create: `src/components/analytics-link-tracker.tsx`
- Modify: `src/components/analytics-scripts.tsx`

**Interfaces:**
- Consumes: `trackAnalyticsEvent`.
- Produces: one document-level click listener for WhatsApp, email, phone, and
  file-download events.

- [ ] **Step 1: Write failing tests**

Exercise `wa.me`, `mailto:`, `tel:`, and `.pdf`/`download` anchors. Verify exact
safe parameters, ignored unrelated links, and one event per click.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/analytics-link-tracker.test.tsx`

Expected: FAIL because the tracker does not exist.

- [ ] **Step 3: Implement event delegation**

Resolve the closest anchor, classify its destination, derive attribution from
existing query parameters and pathname, and never prevent navigation.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- src/components/analytics-link-tracker.test.tsx`

Expected: all delegated-link tests pass.

### Task 5: Inquiry outcome events and Clarity masking

**Files:**
- Modify: `src/components/contact-inquiry-form.tsx`
- Modify: `src/app/phase-6-inquiry-form-fixes.test.tsx`

**Interfaces:**
- Consumes: `trackAnalyticsEvent` and `classifyFormError`.
- Produces: masked form markup and post-response lead/error events.

- [ ] **Step 1: Add failing regression tests**

Assert `generate_lead` fires only for confirmed API success, `form_error`
contains only `form_name`, `error_type`, and `page_path`, network errors use
`network`, and the complete form has `data-clarity-mask="true"`.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/app/phase-6-inquiry-form-fixes.test.tsx`

Expected: new analytics and masking assertions fail.

- [ ] **Step 3: Add minimal form instrumentation**

Track after the success guard, classify failures without forwarding payload
messages or form data, and add the mask attribute to the existing `<form>`.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- src/app/phase-6-inquiry-form-fixes.test.tsx`

Expected: all form tests pass.

### Task 6: Resource article views

**Files:**
- Create: `src/components/resource-view-tracker.test.tsx`
- Create: `src/components/resource-view-tracker.tsx`
- Modify: `src/app/resources/[slug]/page.tsx`
- Modify: `src/app/resources/resources-pages.test.tsx`

**Interfaces:**
- Consumes: `trackAnalyticsEvent`.
- Produces: one `resource_view` per article page mount with server-supplied
  slug, title, locale, and path.

- [ ] **Step 1: Write failing tests**

Assert the exact event payload and duplicate guard, and verify the server page
passes the existing article metadata without changing content.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx`

Expected: new tracker assertions fail.

- [ ] **Step 3: Implement the focused client tracker**

Use an effect and module/page guard. Render no visual element.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx`

Expected: all resource tests pass.

### Task 7: Environment documentation and complete verification

**Files:**
- Create: `.env.example`
- Modify: `.env.local.example`

**Interfaces:**
- Documents:
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
  `NEXT_PUBLIC_CLARITY_PROJECT_ID`, and
  `NEXT_PUBLIC_ANALYTICS_QA_ENABLED`.

- [ ] **Step 1: Add safe examples**

Use placeholders in `.env.example`; retain the supplied public IDs only in
deployment instructions, not hard-coded business components. Explain that QA
is false/absent by default.

- [ ] **Step 2: Run focused and full verification**

Run:

```text
npm run lint
npm test
npm run build
```

Then inspect Git diff/status, duplicate Google/GTM/Clarity signals, forbidden
PII keys in event calls, accidental environment/credential files, and existing
contact-link tests.

- [ ] **Step 3: Commit exact files**

Stage only the design, plan, analytics implementation, tests, dependency
metadata, and environment examples. Review staged name-status and stat before
committing with a clear feature message.

- [ ] **Step 4: Push and prepare review**

Push `feat/analytics-ga4-clarity`, create or prepare a review-only Pull
Request, wait for Vercel Preview, and verify scripts/events/PII on desktop and
mobile. Do not merge or deploy Production.
