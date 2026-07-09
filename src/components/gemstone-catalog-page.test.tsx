import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GemstoneCatalogPage } from "./gemstone-catalog-page";

describe("GemstoneCatalogPage", () => {
  it("renders a premium English B2B catalog with reference pricing and payment guidance", () => {
    const { container } = render(<GemstoneCatalogPage locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "Lab-Grown Gemstones Wholesale by Color",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "View Stones" })).toHaveLength(7);
    expect(screen.getByRole("heading", { name: "Reference wholesale price guidance" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Payment options for confirmed orders" })).toBeInTheDocument();
    expect(screen.getByText("PayPal invoice")).toBeInTheDocument();
    expect(screen.getByText("Bank transfer / T/T")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Buy Now|Add to Cart/i);
  });

  it("routes stone actions into the existing inquiry, WhatsApp, and email channels", () => {
    render(<GemstoneCatalogPage locale="en" />);

    const stoneHeading = screen.getByRole("heading", { name: "Lab-Grown Ruby Pear Cut" });
    const stoneCard = stoneHeading.closest("article");
    expect(stoneCard).not.toBeNull();
    const scopedCard = within(stoneCard as HTMLElement);

    expect(scopedCard.getByRole("link", { name: "Get Wholesale Price" })).toHaveAttribute(
      "href",
      "/contact?source=%2Flab-grown-gemstones&interest=Lab-Grown+Ruby+Pear+Cut",
    );
    expect(scopedCard.getByRole("link", { name: "Add to Inquiry" })).toHaveAttribute(
      "href",
      "/contact?source=%2Flab-grown-gemstones&interest=Lab-Grown+Ruby+Pear+Cut",
    );
    expect(scopedCard.getByRole("link", { name: "Contact on WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/8613324888759",
    );
    expect(screen.getByRole("link", { name: "Email Inquiry" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Lab-Grown%20Gemstone%20Inquiry",
    );
  });

  it("renders Arabic RTL and localized inquiry links", () => {
    const { container } = render(<GemstoneCatalogPage locale="ar" />);

    expect(container.querySelector("main")).toHaveAttribute("dir", "rtl");
    expect(
      screen.getByRole("heading", {
        name: "أحجار كريمة مخبرية بالجملة حسب اللون",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "اطلب سعر الجملة" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "أضف إلى الاستفسار" })[0],
    ).toHaveAttribute(
      "href",
      "/ar/contact?source=%2Far%2Flab-grown-gemstones&interest=Lab-Grown+Ruby+Pear+Cut",
    );
  });

  it("renders the Spanish catalog and localized CTAs", () => {
    render(<GemstoneCatalogPage locale="es" />);

    expect(
      screen.getByRole("heading", {
        name: "Gemas de laboratorio al por mayor por color",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Solicitar precio mayorista" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Añadir a la consulta" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Opciones de pago para pedidos confirmados")).toBeInTheDocument();
  });
});
