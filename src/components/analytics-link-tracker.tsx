"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  normalizeInterest,
  normalizeLocale,
  normalizeSource,
} from "@/lib/contact-links";

const contextAttributes = [
  "data-home-section",
  "data-target-section",
  "data-start-section",
] as const;

const MAX_TRACKED_FILE_NAME_LENGTH = 128;
const SAFE_TRACKED_FILE_NAME = /^[A-Za-z0-9._-]+$/;

function pageLocale(pathname: string): string {
  const locale = pathname.split("/")[1];
  return locale === "es" || locale === "ar" ? locale : "en";
}

function linkLocation(anchor: HTMLAnchorElement, url: URL): string {
  const source = url.searchParams.get("source");
  if (source !== null) return normalizeSource(source);

  const attributedElement = anchor.closest<HTMLElement>(
    "[data-analytics-link-location]",
  );
  const attributedLocation = attributedElement?.dataset.analyticsLinkLocation;
  if (attributedLocation) return normalizeSource(attributedLocation);

  const contextElement = anchor.closest<HTMLElement>(
    contextAttributes.map((attribute) => `[${attribute}]`).join(","),
  );
  if (contextElement) {
    for (const attribute of contextAttributes) {
      const context = contextElement.getAttribute(attribute);
      if (context) return normalizeSource(context);
    }
  }

  return normalizeSource();
}

function fileName(url: URL, download: string): string | undefined {
  const pathnameName = url.pathname.split("/").pop() || "download";
  const name = download || pathnameName;

  try {
    const decodedName = decodeURIComponent(name);
    if (
      decodedName.length === 0 ||
      decodedName.length > MAX_TRACKED_FILE_NAME_LENGTH ||
      !SAFE_TRACKED_FILE_NAME.test(decodedName)
    ) {
      return undefined;
    }

    return decodedName;
  } catch {
    return undefined;
  }
}

function fileType(name: string): string {
  const extension = name.match(/\.([^.]+)$/)?.[1];
  return extension?.toLowerCase() || "unknown";
}

export function AnalyticsLinkTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      const pagePath = window.location.pathname;
      const location = linkLocation(anchor, url);

      if (url.protocol === "https:" && /^(?:www\.)?wa\.me$/i.test(url.hostname)) {
        const locale = normalizeLocale(
          url.searchParams.get("locale") ?? pageLocale(pagePath),
        );
        const interest = url.searchParams.get("interest");

        trackAnalyticsEvent("whatsapp_click", {
          page_path: pagePath,
          link_location: location,
          locale,
          ...(interest !== null
            ? { product_or_context: normalizeInterest(interest) }
            : {}),
        });
        return;
      }

      if (url.protocol === "mailto:") {
        trackAnalyticsEvent("email_click", {
          page_path: pagePath,
          link_location: location,
        });
        return;
      }

      if (url.protocol === "tel:") {
        trackAnalyticsEvent("phone_click", {
          page_path: pagePath,
          link_location: location,
        });
        return;
      }

      const pathnameIsPdf = /\.pdf$/i.test(url.pathname);
      if (
        url.origin === window.location.origin &&
        (pathnameIsPdf || anchor.hasAttribute("download"))
      ) {
        const name = fileName(url, anchor.download);
        if (!name) return;

        trackAnalyticsEvent("file_download", {
          file_name: name,
          file_type: fileType(name),
          page_path: pagePath,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
