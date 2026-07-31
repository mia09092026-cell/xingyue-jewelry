"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

const contextAttributes = [
  "data-home-section",
  "data-target-section",
  "data-start-section",
] as const;

function pageLocale(pathname: string): string {
  const locale = pathname.split("/")[1];
  return locale === "es" || locale === "ar" ? locale : "en";
}

function linkLocation(anchor: HTMLAnchorElement, url: URL): string {
  const source = url.searchParams.get("source");
  if (source) return source;

  const attributedElement = anchor.closest<HTMLElement>(
    "[data-analytics-link-location]",
  );
  const attributedLocation = attributedElement?.dataset.analyticsLinkLocation;
  if (attributedLocation) return attributedLocation;

  const contextElement = anchor.closest<HTMLElement>(
    contextAttributes.map((attribute) => `[${attribute}]`).join(","),
  );
  if (contextElement) {
    for (const attribute of contextAttributes) {
      const context = contextElement.getAttribute(attribute);
      if (context) return context;
    }
  }

  return "unknown";
}

function fileName(url: URL, download: string): string {
  const pathnameName = url.pathname.split("/").pop() || "download";
  const name = download || pathnameName;

  try {
    return decodeURIComponent(name);
  } catch {
    return name;
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
        const locale = url.searchParams.get("locale") || pageLocale(pagePath);
        const interest = url.searchParams.get("interest");

        trackAnalyticsEvent("whatsapp_click", {
          page_path: pagePath,
          link_location: location,
          locale,
          ...(interest ? { product_or_context: interest } : {}),
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
      if (pathnameIsPdf || anchor.hasAttribute("download")) {
        const name = fileName(url, anchor.download);
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
