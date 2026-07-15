import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const matchText = (value: string) =>
  new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

describe("XINGYUE homepage", () => {
  it("renders the approved Phase 4A conversion sections", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /Bring Your Jewelry Collection from Idea to Production/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/For Emerging Jewelry Brands & Boutique Stores/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Who We Support" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Three Ways We Support Your Project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Products & Capabilities" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How We Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Discuss Your Collection/i).length).toBeGreaterThan(0);

    for (const product of ["Lab Grown Diamond Jewelry", "14K / 18K Gold Jewelry", "Private Label Packaging"]) {
      expect(screen.getAllByText(matchText(product)).length).toBeGreaterThan(0);
    }

    for (const capability of [
      "Collection Development from Concept to Production",
      "Flexible Sampling & MOQ Coordination",
      "Quality Control, Packaging & Shipping Coordination",
    ]) {
      expect(screen.getAllByText(matchText(capability)).length).toBeGreaterThan(0);
    }

    expect(container.textContent).not.toMatch(/\bfactory\b|\bmanufacturer\b/i);

    expect(screen.getAllByText(/Lab Grown Diamond Jewelry/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Email: sales@xingyuejewelry.com" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry",
    );
    expect(container.textContent).not.toMatch(
      /Moissanite Diamond Wholesale|first homepage version|can be added later|Sample Products/i,
    );
  });

  it("renders visible FAQ content and matching FAQPage JSON-LD", () => {
    const { container } = render(<Home />);
    const faqJsonLd = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    )
      .map((script) => JSON.parse(script.textContent || "{}"))
      .find((schema) => schema["@type"] === "FAQPage");

    expect(
      screen.getByText("Do you support wholesale lab grown diamond jewelry orders?"),
    ).toBeInTheDocument();
    expect(faqJsonLd?.mainEntity).toHaveLength(3);
  });
});
