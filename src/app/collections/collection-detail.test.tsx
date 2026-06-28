import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CollectionsPage from "./page";
import Home from "../page";
import { collectionLandingPages, getCollectionLandingPage } from "../../lib/collection-data";

describe("collection landing pages", () => {
  it("exposes exactly six static collection routes including moissanite wholesale", async () => {
    const mod = await import("./[slug]/page");

    expect(mod.generateStaticParams()).toHaveLength(6);
    expect(mod.generateStaticParams()).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug: "moissanite-wholesale" })]),
    );
  });

  it("renders the moissanite wholesale collection landing page", async () => {
    const mod = await import("./[slug]/page");
    const page = await mod.default({
      params: Promise.resolve({ slug: "moissanite-wholesale" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", { name: "Wholesale Moissanite Jewelry & Loose Stones" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can I order loose moissanite before finished jewelry?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Customization Options" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Quality & Project Confirmation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Quality & Project Confirmation" }),
    ).toHaveClass("text-white");
    expect(screen.getByRole("heading", { name: "Related Education" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Moissanite buyer guide/i })).toHaveAttribute(
      "href",
      "/education",
    );
    expect(screen.getAllByRole("link", { name: /View Product/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Request a Quote" })[0]).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("generates tennis chain metadata from the collection entry", async () => {
    const mod = await import("./[slug]/page");
    const metadata = await mod.generateMetadata({
      params: Promise.resolve({ slug: "tennis-chains" }),
    });
    const entry = getCollectionLandingPage("tennis-chains");

    expect(metadata.title).toBe(entry?.metaTitle);
    expect(metadata.description).toBe(entry?.metaDescription);
  });

  it("links the homepage to the updated collection landing pages", () => {
    const { container } = render(<Home />);

    for (const page of collectionLandingPages) {
      expect(
        container.querySelector(`a[href="/collections/${page.slug}"]`),
      ).toBeInstanceOf(HTMLAnchorElement);
    }
  });

  it("links the collections index to every collection landing page", () => {
    const { container } = render(<CollectionsPage />);

    for (const page of collectionLandingPages) {
      expect(
        container.querySelector(`a[href="/collections/${page.slug}"]`),
      ).toBeInstanceOf(HTMLAnchorElement);
    }
  });
});
