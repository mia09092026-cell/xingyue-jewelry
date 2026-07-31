import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResourcesPage, {
  metadata as resourcesMetadata,
} from "@/app/resources/page";
import ResourceArticlePage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/resources/[slug]/page";
import {
  ResourceMarkdown,
  resolveSafeResourceLink,
} from "@/components/resource-markdown";

const { notFoundMock, resourceViewTrackerProps } = vi.hoisted(() => ({
  notFoundMock: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  resourceViewTrackerProps: [] as Array<Record<string, string>>,
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

vi.mock("@/components/resource-view-tracker", () => ({
  ResourceViewTracker: (props: Record<string, string>) => {
    resourceViewTrackerProps.push(props);
    return null;
  },
}));

describe("Resources list page", () => {
  it("uses the English production canonical without nonexistent translation alternates", () => {
    expect(resourcesMetadata.alternates).toEqual({
      canonical: "https://xingyuejewelry.com/resources",
    });
    expect(resourcesMetadata.openGraph).toMatchObject({
      type: "website",
      url: "https://xingyuejewelry.com/resources",
    });
  });

  it("renders an English LTR list with the language notice and published article cards", async () => {
    const result = await ResourcesPage({
      searchParams: Promise.resolve({}),
    });
    const { container } = render(result);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("lang", "en");
    expect(main).toHaveAttribute("dir", "ltr");
    expect(
      screen.getByRole("heading", { level: 1, name: "Resources for Jewelry Buyers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This resource is currently available in English only."),
    ).toBeInTheDocument();

    const articles = container.querySelectorAll("article");
    expect(articles).toHaveLength(2);
    expect(
      screen.getByRole("link", {
        name: /Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know/,
      }),
    ).toHaveAttribute(
      "href",
      "/resources/moissanite-vs-cubic-zirconia",
    );
    expect(
      screen.getByRole("link", {
        name: /How to Choose a 925 Sterling Silver Jewelry Manufacturer/,
      }),
    ).toHaveAttribute(
      "href",
      "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    );
    expect(screen.getByText("July 27, 2026")).toBeInTheDocument();
    expect(screen.getAllByText("Moissanite")).toHaveLength(2);
    expect(screen.getAllByText("925 Sterling Silver")).toHaveLength(2);
    expect(screen.getByText("buyer guide")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Loose moissanite stones for a jewelry buyer comparison guide",
      }),
    ).toBeInTheDocument();
    expect(
      container.querySelector('a[href^="/es/resources"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('a[href^="/ar/resources"]'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("group", { name: "Language switcher" }),
    ).not.toBeInTheDocument();
  });

  it("filters cards by an approved category and keeps category links accessible", async () => {
    const result = await ResourcesPage({
      searchParams: Promise.resolve({ category: "Moissanite" }),
    });
    const { container } = render(result);

    expect(container.querySelectorAll("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("How to Choose a 925 Sterling Silver Jewelry Manufacturer"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All resources" })).toHaveAttribute(
      "href",
      "/resources",
    );
    expect(screen.getByRole("link", { name: "OEM & ODM" })).toHaveAttribute(
      "href",
      "/resources?category=OEM+%26+ODM",
    );
  });
});

describe("Resource article page", () => {
  it("builds unique article metadata with an English canonical and Article Open Graph fields", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: "choose-925-sterling-silver-jewelry-manufacturer",
      }),
    });

    expect(metadata.alternates).toEqual({
      canonical:
        "https://xingyuejewelry.com/resources/choose-925-sterling-silver-jewelry-manufacturer",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://xingyuejewelry.com/resources/choose-925-sterling-silver-jewelry-manufacturer",
      publishedTime: "2026-07-26",
      modifiedTime: "2026-07-27",
      authors: ["Xingyue Jewelry"],
      tags: ["925 sterling silver", "OEM and ODM", "jewelry sourcing"],
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://xingyuejewelry.com/images/b2b-manual-setting-workshop.webp",
      },
    ]);
  });

  it("renders visible article metadata, body, related article, breadcrumb, and inquiry CTA", async () => {
    resourceViewTrackerProps.length = 0;
    const result = await ResourceArticlePage({
      params: Promise.resolve({ slug: "moissanite-vs-cubic-zirconia" }),
    });
    const { container } = render(result);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
      }),
    ).toBeInTheDocument();
    const articleTimes = container.querySelectorAll(
      'time[datetime="2026-07-27"]',
    );
    expect(articleTimes).toHaveLength(2);
    expect(articleTimes[0]?.parentElement).toHaveTextContent(
      "Published July 27, 2026",
    );
    expect(articleTimes[1]?.parentElement).toHaveTextContent(
      "Updated July 27, 2026",
    );
    expect(screen.getByText("By Xingyue Jewelry")).toBeInTheDocument();
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Resources" })).toHaveAttribute(
      "href",
      "/resources",
    );
    expect(
      breadcrumb.querySelector('[aria-current="page"]'),
    ).toHaveTextContent(
      "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Start with the collection position" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("heading", {
          level: 2,
          name: "How to Choose a 925 Sterling Silver Jewelry Manufacturer",
        })
        .closest("a"),
    ).toHaveAttribute(
      "href",
      "/resources/choose-925-sterling-silver-jewelry-manufacturer",
    );
    expect(
      screen.getByRole("link", { name: "Discuss Your Jewelry Project" }),
    ).toHaveAttribute(
      "href",
      "/contact?locale=en&source=general&contactMethod=form",
    );
    expect(resourceViewTrackerProps).toEqual([
      {
        slug: "moissanite-vs-cubic-zirconia",
        title: "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
        locale: "en",
        path: "/resources/moissanite-vs-cubic-zirconia",
      },
    ]);

    const schemas = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
      (script) => JSON.parse(script.textContent ?? "{}") as Record<string, unknown>,
    );
    expect(schemas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "BreadcrumbList",
          itemListElement: expect.arrayContaining([
            expect.objectContaining({
              name: "Resources",
              item: "https://xingyuejewelry.com/resources",
            }),
          ]),
        }),
        expect.objectContaining({
          "@type": "Article",
          headline:
            "Moissanite vs Cubic Zirconia: What Jewelry Buyers Should Know",
          datePublished: "2026-07-27",
          dateModified: "2026-07-27",
          mainEntityOfPage:
            "https://xingyuejewelry.com/resources/moissanite-vs-cubic-zirconia",
        }),
      ]),
    );
  });

  it("generates static params for published English articles only", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "moissanite-vs-cubic-zirconia" },
      { slug: "choose-925-sterling-silver-jewelry-manufacturer" },
    ]);
  });

  it("resolves unknown slugs through notFound", async () => {
    await expect(
      ResourceArticlePage({
        params: Promise.resolve({ slug: "missing-resource" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalled();
  });
});

describe("safe Markdown links", () => {
  it.each([
    ["/products", { href: "/products", external: false }],
    ["#details", { href: "#details", external: false }],
    [
      "https://xingyuejewelry.com/contact",
      { href: "https://xingyuejewelry.com/contact", external: false },
    ],
    [
      "https://www.gia.edu/gem-encyclopedia",
      { href: "https://www.gia.edu/gem-encyclopedia", external: true },
    ],
  ])("classifies %s safely", (href, expected) => {
    expect(resolveSafeResourceLink(href)).toEqual(expected);
  });

  it.each([
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "//unsafe.example/path",
    "/\\unsafe.example/path",
    "\\\\unsafe.example\\path",
  ])("rejects the dangerous or ambiguous URL %s", (href) => {
    expect(resolveSafeResourceLink(href)).toBeNull();
  });

  it("opens external links safely while internal links stay in the same window", () => {
    render(
      <ResourceMarkdown
        body={
          "[Internal](/products)\n\n[External](https://example.com/guide)\n\n[Unsafe](javascript:alert(1))"
        }
      />,
    );

    expect(screen.getByRole("link", { name: "Internal" })).not.toHaveAttribute(
      "target",
    );
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getByRole("link", { name: "External" })).not.toHaveAttribute(
      "node",
    );
    expect(screen.queryByRole("link", { name: "Unsafe" })).not.toBeInTheDocument();
    expect(screen.getByText("Unsafe")).toBeInTheDocument();
  });

  it("does not execute or render raw HTML elements from Markdown", () => {
    const { container } = render(
      <ResourceMarkdown
        body={'<script>alert("unsafe")</script>\n\n<div data-unsafe="true">Raw HTML</div>'}
      />,
    );

    expect(container.querySelector("script")).not.toBeInTheDocument();
    expect(container.querySelector("[data-unsafe='true']")).not.toBeInTheDocument();
  });
});
