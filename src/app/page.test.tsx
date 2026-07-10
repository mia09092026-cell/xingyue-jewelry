import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const matchText = (value: string) =>
  new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

describe("XINGYUE homepage", () => {
  it("renders the required luxury jewelry home page sections", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /Moissanite & Lab-Grown Diamond Jewelry Manufacturer/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Ethical Brilliance, Modern Luxury/i)).toBeInTheDocument();

    for (const category of ["Rings", "Necklaces", "Earrings", "Bracelets"]) {
      expect(screen.getAllByText(new RegExp(category, "i")).length).toBeGreaterThan(0);
    }

    for (const categoryImage of [
      "Rings jewelry category sample",
      "Necklaces jewelry category sample",
      "Earrings jewelry category sample",
      "Bracelets jewelry category sample",
    ]) {
      expect(screen.getByAltText(categoryImage)).toBeInTheDocument();
    }

    for (const advantage of [
      "Real Diamond",
      "Ethical Choice",
      "Better Value",
      "Certified Quality",
    ]) {
      expect(screen.getAllByText(new RegExp(advantage, "i")).length).toBeGreaterThan(0);
    }

    expect(screen.getByRole("heading", { name: /Featured Products/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /About XINGYUE/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Request a Quote/i).length).toBeGreaterThan(0);

    for (const product of [
      "Moissanite",
      "Lab-Grown Diamonds",
      "Lab-Grown Colored Gemstones",
      "Zirconia",
      "Cuban Chains",
      "Tennis Chains",
    ]) {
      expect(screen.getAllByText(matchText(product)).length).toBeGreaterThan(0);
    }

    for (const capability of [
      "Photo-to-Sample Customization",
      "OEM / ODM Jewelry Production",
      "15+ Years",
      "1000+ sqm Laboratory",
      "One-Stop Origin Factory",
    ]) {
      expect(screen.getAllByText(matchText(capability)).length).toBeGreaterThan(0);
    }

    expect(screen.getAllByText(/Wholesale Moissanite Jewelry/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "Lab-Grown Gemstones by Color" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Explore lab-grown ruby, sapphire, emerald, spinel, moissanite and colored gemstones for wholesale jewelry manufacturing.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Gemstones" })).toHaveAttribute(
      "href",
      "/lab-grown-gemstones",
    );
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

    expect(screen.getByText("Can you produce jewelry from reference photos?")).toBeInTheDocument();
    expect(faqJsonLd?.mainEntity).toHaveLength(3);
  });
});
