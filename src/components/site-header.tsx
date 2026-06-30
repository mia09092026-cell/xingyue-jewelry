import { Send } from "lucide-react";
import Link from "next/link";
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
  navigationItems?: NavigationItem[];
};

export function SiteHeader({
  currentLocale = "en",
  homeHref = "/",
  inquiryHref = "/contact",
  inquiryLabel = "Inquiry",
  languagePath,
  navigationItems = navigation,
}: SiteHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7ddc8] bg-[#fbfaf7]/92 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={homeHref} className="flex items-center text-[#17202a]">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            {languagePath ? (
              <LanguageSwitcher currentLocale={currentLocale} path={languagePath} />
            ) : null}
            <Link
              href={inquiryHref}
              className="inline-flex items-center gap-2 rounded-md bg-[#17202a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              {inquiryLabel}
              <Send aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <nav
          aria-label="Main navigation"
          className="mt-4 flex gap-3 overflow-x-auto pb-1 text-sm text-[#596575] sm:justify-end"
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
      </div>
    </header>
  );
}
