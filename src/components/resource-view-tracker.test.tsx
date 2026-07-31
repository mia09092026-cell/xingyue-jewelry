import { StrictMode } from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceViewTracker } from "./resource-view-tracker";

describe("ResourceViewTracker", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.history.replaceState(null, "", "/resources/moissanite-vs-cubic-zirconia?private=value");
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

  it("deduplicates Strict Mode remounts but records a later article path", () => {
    const firstView = {
      slug: "choose-925-sterling-silver-jewelry-manufacturer",
      title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
      locale: "en",
      path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    } as const;
    const secondView = {
      slug: "moissanite-vs-cubic-zirconia",
      title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
      locale: "en",
      path: "/resources/moissanite-vs-cubic-zirconia",
    } as const;
    const firstMount = render(
      <StrictMode>
        <ResourceViewTracker {...firstView} />
      </StrictMode>,
    );

    firstMount.unmount();
    render(<ResourceViewTracker {...firstView} />);
    render(<ResourceViewTracker {...secondView} />);

    expect(window.dataLayer).toEqual([
      {
        event: "resource_view",
        article_slug: "choose-925-sterling-silver-jewelry-manufacturer",
        article_title: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
        locale: "en",
        page_path: "/resources/choose-925-sterling-silver-jewelry-manufacturer",
      },
      {
        event: "resource_view",
        article_slug: "moissanite-vs-cubic-zirconia",
        article_title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
        locale: "en",
        page_path: "/resources/moissanite-vs-cubic-zirconia",
      },
    ]);
  });
});
