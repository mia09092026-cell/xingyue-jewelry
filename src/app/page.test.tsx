import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const matchText = (value: string) =>
  new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

describe("XINGYUE homepage", () => {
  it("leads with the approved own-factory lab-grown diamond jewelry focus", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /Lab-Grown Diamond Jewelry Manufacturer & OEM\/ODM Factory/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/From Wuzhou to the World/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Manufacturing Support from Brief to Shipment" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Who We Support" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Products & Manufacturing Capabilities" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How We Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Request a Manufacturing Quote/i).length).toBeGreaterThan(0);

    for (const product of ["Lab Grown Diamond Jewelry", "S925 Silver / 14K / 18K Custom Jewelry", "Private Label Packaging"]) {
      expect(screen.getAllByText(matchText(product)).length).toBeGreaterThan(0);
    }

    for (const capability of [
      "Custom Jewelry Development",
      "Production Coordination",
      "Quality, Packaging & Shipping",
    ]) {
      expect(screen.getAllByText(matchText(capability)).length).toBeGreaterThan(0);
    }

    expect(container.textContent).toMatch(/\bour own jewelry factory\b/i);
    expect(container.textContent).not.toMatch(
      /\d+\s*(employees|workers|square meters|sqm|pieces per month)|guaranteed lead time/i,
    );

    expect(screen.getAllByText(/Lab Grown Diamond Jewelry/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Email: sales@xingyuejewelry.com" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry&locale=en&source=footer&interest=other&contactMethod=email",
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
