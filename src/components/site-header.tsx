"use client";

import { Menu, Send, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { SupportedLocale } from "@/lib/i18n";
import { navigation } from "@/lib/site-data";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  currentLocale?: SupportedLocale;
  homeHref?: string;
  inquiryHref?: string;
  inquiryLabel?: string;
  languagePath?: string;
  logoAlt?: string;
  navigationLabel?: string;
  navigationItems?: NavigationItem[];
};

const mobileMenuLabels: Record<
  SupportedLocale,
  { close: string; open: string }
> = {
  en: { close: "Close navigation menu", open: "Open navigation menu" },
  es: { close: "Cerrar menú de navegación", open: "Abrir menú de navegación" },
  ar: { close: "إغلاق قائمة التنقل", open: "فتح قائمة التنقل" },
};

export function SiteHeader({
  currentLocale = "en",
  homeHref = "/",
  inquiryHref = "/contact",
  inquiryLabel = "Inquiry",
  languagePath,
  logoAlt = "Star & Moon Jewelry logo",
  navigationLabel = "Main navigation",
  navigationItems = navigation,
}: SiteHeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLabel = isMenuOpen
    ? mobileMenuLabels[currentLocale].close
    : mobileMenuLabels[currentLocale].open;

  useEffect(() => {
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7ddc8] bg-[#fbfaf7]/92 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={homeHref} className="flex items-center text-[#17202a]">
            <BrandLogo alt={logoAlt} />
          </Link>
          <div className="flex items-center gap-2">
            {languagePath ? (
              <LanguageSwitcher
                currentLocale={currentLocale}
                path={languagePath}
                className="hidden lg:flex"
              />
            ) : null}
            <Link
              href={inquiryHref}
              className="inline-flex items-center gap-2 rounded-md bg-[#17202a] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#2a3542] sm:px-4"
            >
              {inquiryLabel}
              <Send aria-hidden="true" className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-controls="site-mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={menuLabel}
              title={menuLabel}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#e3dbcb] bg-white text-[#17202a] transition hover:bg-[#f4efe3] lg:hidden"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <nav
          aria-label={navigationLabel}
          data-testid="desktop-navigation"
          className="mt-4 hidden flex-wrap justify-end gap-1 text-sm text-[#596575] lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 transition hover:bg-white hover:text-[#17202a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          id="site-mobile-navigation"
          data-testid="mobile-navigation"
          hidden={!isMenuOpen}
          dir={currentLocale === "ar" ? "rtl" : "ltr"}
          className="mt-3 border-t border-[#e7ddc8] pt-3 lg:hidden"
        >
          <nav
            aria-label={`${navigationLabel} - mobile`}
            className="grid gap-1 text-sm text-[#596575]"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-3 py-2.5 transition hover:bg-white hover:text-[#17202a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {languagePath ? (
            <LanguageSwitcher
              currentLocale={currentLocale}
              path={languagePath}
              className="mt-3 w-full justify-center overflow-x-auto"
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
