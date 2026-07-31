"use client";

import { useEffect, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type ResourceViewTrackerProps = {
  slug: string;
  title: string;
  locale: string;
  path: string;
};

const RETRY_DELAY_MS = 100;
const MAX_RETRY_ATTEMPTS = 3;

type ResourceView = ResourceViewTrackerProps & {
  owners: Set<TrackerOwner>;
  sent: boolean;
  retryAttempts: number;
  retryTimer: ReturnType<typeof setTimeout> | null;
};

type TrackerOwner = {
  path: string;
  mounted: boolean;
  cleanupVersion: number;
};

const activeResourceViews = new Map<string, ResourceView>();

function clearRetry(view: ResourceView) {
  if (view.retryTimer === null) return;

  clearTimeout(view.retryTimer);
  view.retryTimer = null;
}

function releaseOwner(view: ResourceView, owner: TrackerOwner) {
  view.owners.delete(owner);
  if (view.owners.size > 0) return;

  clearRetry(view);
  if (activeResourceViews.get(view.path) === view) {
    activeResourceViews.delete(view.path);
  }
}

function recordResourceView(view: ResourceView) {
  if (view.sent || view.owners.size === 0) return;

  if (
    trackAnalyticsEvent("resource_view", {
      article_slug: view.slug,
      article_title: view.title,
      locale: view.locale,
      page_path: view.path,
    })
  ) {
    view.sent = true;
    clearRetry(view);
    return;
  }

  if (view.retryAttempts >= MAX_RETRY_ATTEMPTS || view.retryTimer !== null) return;

  view.retryAttempts += 1;
  view.retryTimer = setTimeout(() => {
    view.retryTimer = null;
    recordResourceView(view);
  }, RETRY_DELAY_MS);
}

export function ResourceViewTracker({
  slug,
  title,
  locale,
  path,
}: ResourceViewTrackerProps) {
  const ownerRef = useRef<TrackerOwner | null>(null);

  useEffect(() => {
    let owner = ownerRef.current;
    if (!owner || owner.path !== path) {
      owner = { path, mounted: true, cleanupVersion: 0 };
      ownerRef.current = owner;
    } else {
      owner.mounted = true;
      owner.cleanupVersion += 1;
    }

    let view = activeResourceViews.get(path);
    if (!view) {
      view = {
        slug,
        title,
        locale,
        path,
        owners: new Set(),
        sent: false,
        retryAttempts: 0,
        retryTimer: null,
      };
      activeResourceViews.set(path, view);
    }

    view.owners.add(owner);
    recordResourceView(view);

    return () => {
      owner.mounted = false;
      const cleanupVersion = ++owner.cleanupVersion;

      queueMicrotask(() => {
        if (owner.mounted || owner.cleanupVersion !== cleanupVersion) return;

        releaseOwner(view, owner);
      });
    };
  }, [locale, path, slug, title]);

  return null;
}
