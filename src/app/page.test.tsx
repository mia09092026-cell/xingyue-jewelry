import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const matchText = (value: string) =>
  new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

describe("XINGYUE homepage", () => {
  it("leads with custom 925 sterling silver OEM/ODM positioning", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: "Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom Jewelry Manufacturing from Wuzhou")).toBeInTheDocument();
    const hero = container.querySelector('[data-home-section="hero"]');
    expect(hero).not.toBeNull();
    expect(
      within(hero as HTMLElement).getByRole("link", {
        name: /Discuss Your Custom Jewelry Project/i,
      }),
    ).toHaveAttribute(
      "href",
      "/contact?locale=en&source=homepage-hero&contactMethod=form&interest=other",
    );
    expect(
      screen.getByRole("link", { name: /Explore Materials & Capabilities/i }),
    ).toHaveAttribute("href", "#manufacturing-support");
    expect(
      screen.getByRole("heading", { name: "Manufacturing Support from Brief to Shipment" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Who We Support" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Products & Manufacturing Capabilities" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How We Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /FAQ/i })).toBeInTheDocument();

    const expectedProductLinks = [
      ["Custom 925 Sterling Silver Jewelry", "/collections/custom-jewelry-manufacturing"],
      [
        "Lab-Created Colored Gemstone Jewelry",
        "/collections/lab-grown-colored-gemstones",
      ],
      ["Custom Moissanite Jewelry", "/collections/moissanite-wholesale"],
      ["Lab-Grown Diamond Jewelry", "/collections/lab-grown-diamond-jewelry"],
      [
        "Custom 925 Sterling Silver & K-Gold Jewelry",
        "/collections/custom-jewelry-manufacturing",
      ],
    ] as const;

    const productSection = screen.getByTestId("products-capabilities");
    const productLinks = expectedProductLinks.map(([title, href]) => {
      const link = within(productSection).getByRole("link", {
        name: matchText(title),
      });
      expect(link).toHaveAttribute("href", href);
      return link;
    });
    expect(productLinks.map((link) => link.getAttribute("href"))).toEqual(
      expectedProductLinks.map(([, href]) => href),
    );

    for (const stat of ["925 Silver / 14K / 18K", "Project-Specific Sampling & MOQ", "OEM/ODM Coordination"]) {
      expect(screen.getAllByText(matchText(stat)).length).toBeGreaterThan(0);
    }

    for (const capability of [
      "Custom Jewelry Development",
      "Production Coordination",
      "Quality, Packaging & Shipping",
    ]) {
      expect(screen.getAllByText(matchText(capability)).length).toBeGreaterThan(0);
    }

    expect(container.textContent).not.toMatch(
      /owned factory|our factory|factory-direct|in-house factory/i,
    );

    expect(screen.getAllByText(/Lab-Grown Diamond Jewelry/i).length).toBeGreaterThan(0);
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
      screen.getByText("Do you manufacture custom 925 sterling silver jewelry?"),
    ).toBeInTheDocument();
    expect(faqJsonLd?.mainEntity).toHaveLength(6);
  });
});
