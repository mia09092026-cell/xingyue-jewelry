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
