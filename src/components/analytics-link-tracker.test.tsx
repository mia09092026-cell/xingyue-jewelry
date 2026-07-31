import { Children, isValidElement, type ReactNode } from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AnalyticsLinkTracker } from "./analytics-link-tracker";
import { AnalyticsScripts } from "./analytics-scripts";

function click(element: Element): boolean {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  let preventedByTracker = false;

  document.addEventListener(
    "click",
    (dispatchedEvent) => {
      preventedByTracker = dispatchedEvent.defaultPrevented;
      dispatchedEvent.preventDefault();
    },
    { once: true },
  );
  element.dispatchEvent(event);
  return preventedByTracker;
}

function countElementsOfType(node: ReactNode, type: unknown): number {
  return Children.toArray(node).reduce<number>((count, child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return count;

    return (
      count +
      (child.type === type ? 1 : 0) +
      countElementsOfType(child.props.children, type)
    );
  }, 0);
}

describe("AnalyticsLinkTracker", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.history.replaceState(null, "", "/es/products?message=private");
  });

  it("tracks one safe WhatsApp event from a nested click and prefers URL attribution", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <a
          href="https://wa.me/8613324888759?text=Private%20message&locale=es&source=product-card&interest=lab-grown-diamond-jewelry"
          data-analytics-link-location="ignored-fallback"
        >
          <span>WhatsApp</span>
        </a>
      </>,
    );

    const preventedByTracker = click(container.querySelector("span")!);

    expect(preventedByTracker).toBe(false);
    expect(window.dataLayer).toEqual([
      {
        event: "whatsapp_click",
        page_path: "/es/products",
        link_location: "product-card",
        locale: "es",
        product_or_context: "lab-grown-diamond-jewelry",
      },
    ]);
  });

  it("tracks email without exposing the address, subject, or body", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <section data-home-section="final-cta">
          <a href="mailto:private@example.com?subject=Secret&body=Private%20body">
            Email
          </a>
        </section>
      </>,
    );

    click(container.querySelector("a")!);

    expect(window.dataLayer).toEqual([
      {
        event: "email_click",
        page_path: "/es/products",
        link_location: "final-cta",
      },
    ]);
  });

  it("tracks phone without exposing the phone number", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <a href="tel:+8613324888759" data-analytics-link-location="mobile-header">
          Call
        </a>
      </>,
    );

    click(container.querySelector("a")!);

    expect(window.dataLayer).toEqual([
      {
        event: "phone_click",
        page_path: "/es/products",
        link_location: "mobile-header",
      },
    ]);
  });

  it("tracks PDF links from the URL pathname without query data", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <a href="/downloads/Xingyue-Lookbook.PDF?token=private">Lookbook</a>
      </>,
    );

    click(container.querySelector("a")!);

    expect(window.dataLayer).toEqual([
      {
        event: "file_download",
        file_name: "Xingyue-Lookbook.PDF",
        file_type: "pdf",
        page_path: "/es/products",
      },
    ]);
  });

  it("tracks anchors with the download attribute", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <a href="/downloads/catalog.csv" download="wholesale-catalog.csv">
          Catalog
        </a>
      </>,
    );

    click(container.querySelector("a")!);

    expect(window.dataLayer).toEqual([
      {
        event: "file_download",
        file_name: "wholesale-catalog.csv",
        file_type: "csv",
        page_path: "/es/products",
      },
    ]);
  });

  it("ignores unrelated links", () => {
    const { container } = render(
      <>
        <AnalyticsLinkTracker />
        <a href="https://example.com/about">About</a>
      </>,
    );

    click(container.querySelector("a")!);

    expect(window.dataLayer).toEqual([]);
  });

  it("is mounted exactly once by enabled root analytics", () => {
    const analytics = AnalyticsScripts({
      environment: "production",
      hostname: "xingyuejewelry.com",
      gaMeasurementId: "G-ABC123",
      clarityProjectId: "abc123",
    });

    expect(countElementsOfType(analytics, AnalyticsLinkTracker)).toBe(1);
  });
});
