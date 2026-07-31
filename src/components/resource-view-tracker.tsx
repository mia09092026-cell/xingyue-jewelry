"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type ResourceViewTrackerProps = {
  slug: string;
  title: string;
  locale: string;
  path: string;
};

const trackedPagePaths = new Set<string>();

export function ResourceViewTracker({
  slug,
  title,
  locale,
  path,
}: ResourceViewTrackerProps) {
  useEffect(() => {
    if (trackedPagePaths.has(path)) return;

    trackedPagePaths.add(path);
    trackAnalyticsEvent("resource_view", {
      article_slug: slug,
      article_title: title,
      locale,
      page_path: path,
    });

    return () => {
      queueMicrotask(() => trackedPagePaths.delete(path));
    };
  }, [locale, path, slug, title]);

  return null;
}
