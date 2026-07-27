import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { getI18nContent } from "@/content/i18n";

describe("site chrome brand identity", () => {
  it("uses the approved XINGYUE brand logo in the header home link", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: /XINGYUE Jewelry logo/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: /XINGYUE Jewelry logo/i })).toHaveAttribute(
      "src",
      expect.stringContaining("xingyue-jewelry-logo.png"),
    );
  });

  it("uses the approved XINGYUE brand logo in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("img", { name: /XINGYUE Jewelry logo/i })).toBeInTheDocument();
  });

  it("shows the direct WhatsApp contact link in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "+8613324888759" }).getAttribute("href"))
      .toContain("https://wa.me/8613324888759?");
  });

  it("shows the sales email contact link in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Email: sales@xingyuejewelry.com" })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry&locale=en&source=footer&interest=other&contactMethod=email",
    );
  });

  it("links the factory authority pages from English, Arabic, and Spanish navigation", () => {
    const { unmount } = render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Factory" }),
    ).toHaveAttribute("href", "/factory");
    unmount();

    expect(getI18nContent("ar").navigation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: "/ar/factory",
          label: "المصنع",
        }),
      ]),
    );
    expect(getI18nContent("es").navigation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: "/es/factory",
          label: "Fábrica",
        }),
      ]),
    );
  });

  it("uses the localized products landing page in every header and footer", () => {
    const header = render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    header.unmount();

    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(getI18nContent("es").navigation).toContainEqual({
      label: "Productos",
      href: "/es/products",
    });
    expect(getI18nContent("ar").navigation).toContainEqual({
      label: "المنتجات",
      href: "/ar/products",
    });
  });

  it("shows full language names with an obvious current-language state", () => {
    render(<SiteHeader currentLocale="es" languagePath="/about" />);

    const toggle = screen.getByRole("button", { name: /menú de navegación/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);

    const switchers = screen.getAllByRole("group", { name: "Selector de idioma" });
    expect(switchers).toHaveLength(2);

    for (const switcher of switchers) {
      expect(within(switcher).getByRole("link", { name: "English" })).toHaveAttribute(
        "href",
        "/about",
      );
      expect(within(switcher).getByRole("link", { name: "Español" })).toHaveAttribute(
        "href",
        "/es/about",
      );
      expect(within(switcher).getByRole("link", { name: "العربية" })).toHaveAttribute(
        "href",
        "/ar/about",
      );
      expect(within(switcher).getByRole("link", { name: "Español" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    }
  });

  it.each([
    ["en", "Main navigation", "Products"],
    ["es", "Navegación principal", "Productos"],
    ["ar", "التنقل الرئيسي", "المنتجات"],
  ] as const)(
    "keeps the %s navigation accessible through the mobile menu below 1024px",
    (locale, navigationLabel, productsLabel) => {
      const content = getI18nContent(locale);
      render(
        <SiteHeader
          currentLocale={locale}
          languagePath="/products"
          navigationLabel={navigationLabel}
          navigationItems={content.navigation}
        />,
      );

      const desktopNavigation = screen.getByTestId("desktop-navigation");
      const toggle = screen.getByRole("button", { expanded: false });

      expect(desktopNavigation).toHaveClass("hidden", "lg:flex");
      expect(toggle).toHaveClass("lg:hidden");
      expect(toggle).toHaveAttribute("aria-controls", "site-mobile-navigation");

      fireEvent.click(toggle);

      const mobileNavigation = screen.getByTestId("mobile-navigation");
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(mobileNavigation).not.toHaveAttribute("hidden");
      expect(within(mobileNavigation).getByRole("link", { name: productsLabel })).toHaveAttribute(
        "href",
        locale === "en" ? "/products" : `/${locale}/products`,
      );

      fireEvent.keyDown(document, { key: "Escape" });
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(mobileNavigation).toHaveAttribute("hidden");
    },
  );

  it("closes the mobile menu after a navigation choice", () => {
    render(<SiteHeader languagePath="/products" />);

    const toggle = screen.getByRole("button", { expanded: false });
    fireEvent.click(toggle);

    const mobileNavigation = screen.getByTestId("mobile-navigation");
    fireEvent.click(within(mobileNavigation).getByRole("link", { name: "Products" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileNavigation).toHaveAttribute("hidden");
  });

  it.each([
    {
      locale: "en",
      menu: "Who We Support",
      links: [
        ["Start Your Jewelry Brand", "/start-a-jewelry-brand"],
        ["Emerging Jewelry Brands", "/for-emerging-jewelry-brands"],
        ["Boutique Jewelry Stores", "/for-boutique-jewelry-stores"],
      ],
    },
    {
      locale: "es",
      menu: "A quién ayudamos",
      links: [
        ["Inicia tu marca de joyería", "/es/start-a-jewelry-brand"],
        ["Marcas de joyería emergentes", "/es/for-emerging-jewelry-brands"],
        ["Joyerías boutique", "/es/for-boutique-jewelry-stores"],
      ],
    },
    {
      locale: "ar",
      menu: "من ندعم",
      links: [
        ["ابدأ علامتك التجارية للمجوهرات", "/ar/start-a-jewelry-brand"],
        ["علامات المجوهرات الناشئة", "/ar/for-emerging-jewelry-brands"],
        ["متاجر المجوهرات البوتيك", "/ar/for-boutique-jewelry-stores"],
      ],
    },
  ] as const)(
    "makes existing audience pages discoverable in the $locale desktop and mobile navigation",
    ({ locale, menu, links }) => {
      const content = getI18nContent(locale);
      render(
        <SiteHeader
          currentLocale={locale}
          navigationItems={content.navigation}
          navigationLabel={`${menu} navigation`}
        />,
      );

      expect(screen.getAllByText(menu).length).toBeGreaterThanOrEqual(2);
      for (const [label, href] of links) {
        const matchingLinks = screen.getAllByRole("link", { name: label, hidden: true });
        expect(matchingLinks).toHaveLength(2);
        expect(matchingLinks.every((link) => link.getAttribute("href") === href)).toBe(true);
      }
    },
  );
});
