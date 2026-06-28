import { Send } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7ddc8] bg-[#fbfaf7]/92 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center text-[#17202a]">
            <BrandLogo />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[#17202a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
          >
            Inquiry
            <Send aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <nav
          aria-label="Main navigation"
          className="mt-4 flex gap-3 overflow-x-auto pb-1 text-sm text-[#596575] sm:justify-end"
        >
          {navigation.map((item) => (
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
