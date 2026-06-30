import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { brand, navigation } from "@/lib/site-data";
import { collectionLandingPages } from "@/lib/collection-data";

type FooterLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  collectionItems?: FooterLink[];
  intro?: string;
  inquiryLabel?: string;
  navigationItems?: FooterLink[];
  sectionLabels?: {
    pages: string;
    collections: string;
    reachUs: string;
  };
};

const defaultCollectionItems = collectionLandingPages.map((page) => ({
  label: page.eyebrow,
  href: `/collections/${page.slug}`,
}));

export function SiteFooter({
  collectionItems = defaultCollectionItems,
  intro = "Moissanite wholesale, lab-grown diamonds, colored gemstones and custom fine jewelry manufacturing for overseas clients.",
  inquiryLabel = "OEM / ODM Inquiry",
  navigationItems = navigation.slice(0, 4),
  sectionLabels = {
    pages: "Pages",
    collections: "Collections",
    reachUs: "Reach Us",
  },
}: SiteFooterProps = {}) {
  return (
    <footer className="bg-[#121923] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <BrandLogo variant="footer" />
          </div>
          <p className="max-w-sm leading-7 text-white/68">
            {intro}
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">{sectionLabels.pages}</h3>
          <ul className="space-y-3 text-sm text-white/68">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">{sectionLabels.collections}</h3>
          <ul className="space-y-3 text-sm text-white/68">
            {collectionItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm text-[#e6cf96]">{sectionLabels.reachUs}</h3>
          <ul className="space-y-3 text-sm text-white/68">
            <li>{brand.domain}</li>
            <li>
              <a href={brand.emailHref} className="transition hover:text-white">
                Email: {brand.email}
              </a>
            </li>
            <li>
              <a href={brand.whatsappHref} className="transition hover:text-white">
                {brand.whatsapp}
              </a>
            </li>
            <li>{inquiryLabel}</li>
            <li>(c) 2026 {brand.name}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
