import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { getI18nContent } from "@/content/i18n";

describe("site chrome brand identity", () => {
  it("uses the Star & Moon brand logo in the header home link", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: /Star & Moon Jewelry logo/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: /Star & Moon Jewelry logo/i })).toHaveAttribute(
      "src",
      expect.stringContaining("logo-star-moon.png"),
    );
  });

  it("uses the Star & Moon brand logo in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("img", { name: /Star & Moon Jewelry logo/i })).toBeInTheDocument();
  });

  it("shows the direct WhatsApp contact link in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "+8613324888759" })).toHaveAttribute(
      "href",
      "https://wa.me/8613324888759",
    );
  });

  it("shows the sales email contact link in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Email: sales@xingyuejewelry.com" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry",
    );
  });

  it("links the gemstone catalog from English navigation only for the first preview stage", () => {
    const { unmount } = render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Lab-Grown Gemstones" }),
    ).toHaveAttribute("href", "/lab-grown-gemstones");
    unmount();

    expect(getI18nContent("ar").navigation).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ href: "/ar/lab-grown-gemstones" })]),
    );
    expect(getI18nContent("es").navigation).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ href: "/es/lab-grown-gemstones" })]),
    );
  });
});
