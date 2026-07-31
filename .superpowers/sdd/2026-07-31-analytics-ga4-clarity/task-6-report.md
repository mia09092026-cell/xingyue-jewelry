# Task 6: Resource article views

## RED

Added exact-payload, Strict Mode/remount deduplication, later-path tracking, and server metadata-prop tests. Ran:

```text
npm.cmd test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx
```

Result: failed as expected before implementation: the new tracker module was unresolved, and the server-page metadata assertion received no tracker props.

## GREEN

Added a client-only `ResourceViewTracker` that sends `resource_view` through the existing runtime allowlist and renders `null`. It uses a temporary module path guard: the Strict Mode cleanup and re-effect share the guard, while a microtask clears it after the lifecycle turn so a later real navigation can record the page again. The server article page supplies only existing `article.slug`, `article.title`, English locale, and its existing `articlePath`.

Ran:

```text
npm.cmd test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx
npm.cmd exec eslint -- src/components/resource-view-tracker.tsx src/components/resource-view-tracker.test.tsx src/app/resources/[slug]/page.tsx src/app/resources/resources-pages.test.tsx
```

Result: resource tests passed (2 files, 23 tests); focused ESLint passed. `git diff --check` passed.

## Files

- `src/components/resource-view-tracker.tsx`
- `src/components/resource-view-tracker.test.tsx`
- `src/app/resources/[slug]/page.tsx`
- `src/app/resources/resources-pages.test.tsx`
- `.superpowers/sdd/2026-07-31-analytics-ga4-clarity/task-6-report.md`

## Review focus

- The tracker has no visual DOM and does not send a manual `page_view`.
- Article content, heading, SEO metadata, JSON-LD, layout, and styling remain unchanged.
- The cleanup guard is intentionally transient: it stops immediate Strict Mode/remount duplication without permanently suppressing a later genuine revisit.

## Commit

`feat: track resource article views`

## Fix round 1

### RED

Extended `src/components/resource-view-tracker.test.tsx` with behavior tests for a temporarily unavailable `dataLayer`, a single Strict Mode lifecycle event, a real unmount followed by a later revisit, no visual DOM, and a stale-cleanup/same-page-owner race followed by A-to-B-to-A navigation.

Ran:

```text
npm.cmd test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx
```

Result: failed as expected (2 tracker tests): no event appeared after `dataLayer` became available, and a stale cleanup removed the active same-path guard so a duplicate A event was sent.

### GREEN

Replaced the bare path set with a path entry containing a `Set` of per-instance owners, sent state, and a single bounded retry timer. An event is marked sent only when `trackAnalyticsEvent` returns `true`; otherwise it retries at most three times at 100 ms while an owner remains mounted. Cleanup carries the owning instance and version token; its microtask cannot release an owner reactivated by Strict Mode, and it cannot delete an entry while another owner remains active. After a real unmount settles, the empty entry is removed so a later visit can send again.

Ran:

```text
npm.cmd test -- src/components/resource-view-tracker.test.tsx src/app/resources/resources-pages.test.tsx
npm.cmd exec eslint -- src/components/resource-view-tracker.tsx src/components/resource-view-tracker.test.tsx src/app/resources/[slug]/page.tsx src/app/resources/resources-pages.test.tsx
```

Result: 2 test files, 27 tests passed; focused ESLint and `git diff --check` passed.

### Fix round 1 review focus

- Retry is intentionally bounded (three delayed attempts) and is cancelled when the last owner releases.
- The tracker still renders `null`, sends no manual `page_view`, and leaves article content, SEO, JSON-LD, layout, and styles untouched.
