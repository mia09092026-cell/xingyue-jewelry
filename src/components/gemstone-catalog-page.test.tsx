import { fireEvent, render, screen, within } from "@testing-library/react";
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
    expect(
      screen.getByRole("heading", { name: "Reference wholesale price guidance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Payment options for confirmed orders" }),
    ).toBeInTheDocument();
    expect(screen.getByText("PayPal invoice")).toBeInTheDocument();
    expect(screen.getByText("Bank transfer / T/T")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getAllByRole("group", { name: "Language switcher" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Español" })[0]).toHaveAttribute(
      "href",
      "/es/lab-grown-gemstones",
    );
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
      "/contact?locale=en&source=products&contactMethod=form&interest=loose-stones",
    );
    expect(scopedCard.getByRole("link", { name: "Add to Inquiry" })).toHaveAttribute(
      "href",
      "/contact?locale=en&source=products&contactMethod=form&interest=loose-stones",
    );
    expect(scopedCard.getByRole("link", { name: "Contact on WhatsApp" }).getAttribute("href"))
      .toContain("https://wa.me/8613324888759?");
    expect(scopedCard.getByRole("link", { name: "Contact on WhatsApp" }).getAttribute("href"))
      .toContain("source=products");
    expect(screen.getByRole("link", { name: "Email Inquiry" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Lab-Grown%20Gemstone%20Inquiry&locale=en&source=products&interest=loose-stones&contactMethod=email",
    );
  });

  it("renders Arabic gemstone catalog copy with RTL layout and localized inquiry routing", () => {
    const { container } = render(<GemstoneCatalogPage locale="ar" />);

    expect(container.querySelector("main")).toHaveAttribute("dir", "rtl");
    expect(
      screen.getByRole("heading", {
        name: "أحجار كريمة مُنتَجة في المختبر بالجملة حسب اللون",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "عرض الأحجار" })).toHaveLength(7);
    expect(
      screen.getByRole("heading", { name: "خيارات الدفع للطلبات المؤكدة" }),
    ).toBeInTheDocument();
    expect(screen.getByText("فاتورة PayPal")).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: "ياقوت أحمر مُنتَج في المختبر" }),
    ).not.toHaveLength(0);
    expect(
      screen.getByText(
        "أحجار حمراء غنية لتفاصيل تصاميم الزفاف والخواتم البارزة وبرامج الأحجام المتطابقة المتكررة.",
      ),
    ).toBeInTheDocument();
    expect(container.textContent).not.toContain(
      "Rich red stones for bridal accents, statement rings and repeat calibrated programs.",
    );
    expect(
      screen
        .getAllByRole("link", { name: "إرسال استفسار" })
        .map((link) => link.getAttribute("href")),
    ).toContain(
      "/ar/contact?locale=ar&source=products&contactMethod=form&interest=loose-stones",
    );
  });

  it("renders Spanish gemstone catalog copy with localized inquiry routing", () => {
    const { container } = render(<GemstoneCatalogPage locale="es" />);

    expect(
      screen.getByRole("heading", {
        name: "Gemas de laboratorio al por mayor por color",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Ver gemas" })).toHaveLength(7);
    expect(
      screen.getByRole("heading", { name: "Opciones de pago para pedidos confirmados" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Transferencia bancaria / T/T")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Rubí de laboratorio" })).not.toHaveLength(0);
    expect(
      screen.getByText(
        "Piedras rojas intensas para detalles nupciales, anillos protagonistas y programas recurrentes de medidas calibradas.",
      ),
    ).toBeInTheDocument();
    expect(container.textContent).not.toContain(
      "Rich red stones for bridal accents, statement rings and repeat calibrated programs.",
    );
    expect(
      screen
        .getAllByRole("link", { name: "Enviar consulta" })
        .map((link) => link.getAttribute("href")),
    ).toContain(
      "/es/contact?locale=es&source=products&contactMethod=form&interest=loose-stones",
    );
  });

  it("renders dedicated color imagery with its configured focal position", () => {
    render(<GemstoneCatalogPage locale="en" />);

    expect(
      screen.getByAltText("Blue lab-grown gemstones in mixed cuts on a white background"),
    ).toHaveStyle({ objectPosition: "50% 52%" });
    expect(
      screen.getByAltText("Green lab-grown gemstones in mixed shapes on a white background"),
    ).toHaveStyle({ objectPosition: "50% 54%" });
  });

  it("renders special-color gemstones as complete text-only cards without media placeholders", () => {
    render(<GemstoneCatalogPage locale="en" />);

    for (const headingName of [
      "Lab-Grown Spinel",
      "Lab-Grown Alexandrite",
      "Colored Moissanite",
    ]) {
      const heading = screen.getAllByRole("heading", { name: headingName })[0];
      const card = heading.closest("article");

      expect(card).not.toBeNull();
      expect(card).toHaveAttribute("data-image-state", "none");
      expect(within(card as HTMLElement).queryByRole("img")).not.toBeInTheDocument();
      expect(card?.querySelector("[data-gemstone-media]")).not.toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(/MOQ/i)).toBeInTheDocument();
    }

    const catalogHeading = screen.getByRole("heading", {
      name: "Colored Moissanite Mixed Cuts",
    });
    const catalogCard = catalogHeading.closest("article");

    expect(catalogCard).not.toBeNull();
    expect(catalogCard).toHaveAttribute("data-image-state", "none");
    expect(within(catalogCard as HTMLElement).queryByRole("img")).not.toBeInTheDocument();
    expect(catalogCard?.querySelector("[data-gemstone-media]")).not.toBeInTheDocument();
    expect(
      within(catalogCard as HTMLElement).getByText("US$3–18 / ct reference range"),
    ).toBeInTheDocument();
    expect(
      within(catalogCard as HTMLElement).getByRole("link", { name: "Get Wholesale Price" }),
    ).toBeInTheDocument();
  });
});
