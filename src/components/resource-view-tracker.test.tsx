import { StrictMode } from "react";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceViewTracker } from "./resource-view-tracker";

describe("ResourceViewTracker", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.history.replaceState(null, "", "/resources/moissanite-vs-cubic-zirconia?private=value");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("tracks the supplied English resource metadata with the canonical page path", () => {
    render(
      <ResourceViewTracker
        slug="moissanite-vs-cubic-zirconia"
        title="Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know"
        locale="en"
        path="/resources/moissanite-vs-cubic-zirconia"
      />,
    );

    expect(window.dataLayer).toEqual([
      {
        event: "resource_view",
        article_slug: "moissanite-vs-cubic-zirconia",
        article_title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
        locale: "en",
        page_path: "/resources/moissanite-vs-cubic-zirconia",
      },
    ]);
  });

  it("renders no DOM", () => {
    const { container } = render(
      <ResourceViewTracker
        slug="moissanite-vs-cubic-zirconia"
        title="Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know"
        locale="en"
        path="/resources/moissanite-vs-cubic-zirconia"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("retries a temporarily unavailable dataLayer before recording the view", async () => {
    vi.useFakeTimers();
    window.dataLayer = undefined;

    render(
      <ResourceViewTracker
        slug="moissanite-vs-cubic-zirconia"
        title="Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know"
        locale="en"
        path="/resources/moissanite-vs-cubic-zirconia"
      />,
    );

    window.dataLayer = [];
    await vi.advanceTimersByTimeAsync(100);

    expect(window.dataLayer).toEqual([
      {
        event: "resource_view",
        article_slug: "moissanite-vs-cubic-zirconia",
        article_title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
        locale: "en",
        page_path: "/resources/moissanite-vs-cubic-zirconia",
      },
    ]);
  });

  it("deduplicates React Strict Mode lifecycle effects", () => {
    const firstView = {
      slug: "choose-925-sterling-silver-jewelry-manufacturer",
      title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      locale: "en",
      path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    } as const;
    render(
      <StrictMode>
        <ResourceViewTracker {...firstView} />
      </StrictMode>,
    );

    expect(window.dataLayer).toEqual([
      {
        event: "resource_view",
        article_slug: "choose-925-sterling-silver-jewelry-manufacturer",
        article_title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
        locale: "en",
        page_path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
      },
    ]);
  });

  it("records the same article again after a real unmount", async () => {
    const view = {
      slug: "choose-925-sterling-silver-jewelry-manufacturer",
      title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      locale: "en",
      path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    } as const;
    const firstMount = render(<ResourceViewTracker {...view} />);

    firstMount.unmount();
    await Promise.resolve();
    render(<ResourceViewTracker {...view} />);

    expect(window.dataLayer).toHaveLength(2);
  });

  it("keeps an active same-page owner guarded through a stale cleanup and records A-to-B-to-A", async () => {
    const articleA = {
      slug: "moissanite-vs-cubic-zirconia",
      title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
      locale: "en",
      path: "/resources/moissanite-vs-cubic-zirconia",
    } as const;
    const articleB = {
      slug: "choose-925-sterling-silver-jewelry-manufacturer",
      title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      locale: "en",
      path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    } as const;
    const firstA = render(<ResourceViewTracker {...articleA} />);

    firstA.unmount();
    const secondA = render(<ResourceViewTracker {...articleA} />);
    await Promise.resolve();
    const thirdA = render(<ResourceViewTracker {...articleA} />);

    secondA.unmount();
    thirdA.unmount();
    await Promise.resolve();
    const b = render(<ResourceViewTracker {...articleB} />);
    b.unmount();
    await Promise.resolve();
    render(<ResourceViewTracker {...articleA} />);

    expect(window.dataLayer).toEqual([
      expect.objectContaining({ article_slug: articleA.slug }),
      expect.objectContaining({ article_slug: articleB.slug }),
      expect.objectContaining({ article_slug: articleA.slug }),
    ]);
  });
});
