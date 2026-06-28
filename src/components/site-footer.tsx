import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { brand, navigation } from "@/lib/site-data";
import { collectionLandingPages } from "@/lib/collection-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#121923] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <BrandLogo variant="footer" />
          </div>
          <p className="max-w-sm leading-7 text-white/68">
            Moissanite wholesale, lab-grown diamonds, colored gemstones and custom
            fine jewelry manufacturing for overseas clients.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">Pages</h3>
          <ul className="space-y-3 text-sm text-white/68">
            {navigation.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">Collections</h3>
          <ul className="space-y-3 text-sm text-white/68">
            {collectionLandingPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/collections/${page.slug}`}
                  className="transition hover:text-white"
                >
                  {page.eyebrow}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">Reach Us</h3>
          <ul className="space-y-3 text-sm text-white/68">
            <li>{brand.domain}</li>
            <li>{brand.email}</li>
            <li>OEM / ODM Inquiry</li>
            <li>(c) 2026 {brand.name}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
