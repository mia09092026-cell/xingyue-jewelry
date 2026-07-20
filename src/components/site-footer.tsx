import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { brand, navigation } from "@/lib/site-data";
import { collectionLandingPages } from "@/lib/collection-data";
import { buildWhatsAppInquiryUrl, emailInquiryHref } from "@/lib/contact-links";
import type { SupportedLocale } from "@/lib/i18n";

type FooterLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  collectionItems?: FooterLink[];
  locale?: SupportedLocale;
  emailHref?: string;
  emailLabel?: string;
  intro?: string;
  inquiryLabel?: string;
  logoAlt?: string;
  navigationItems?: FooterLink[];
  startBrandItem?: FooterLink;
  targetAudienceItems?: FooterLink[];
  sectionLabels?: {
    pages: string;
    collections: string;
    reachUs: string;
  };
};

const defaultTargetAudienceLabels: Record<SupportedLocale, { emerging: string; boutique: string }> = {
  en: {
    emerging: "For Emerging Jewelry Brands",
    boutique: "For Boutique Jewelry Stores",
  },
  es: {
    emerging: "Para marcas de joyería emergentes",
    boutique: "Para tiendas boutique de joyería",
  },
  ar: {
    emerging: "للعلامات التجارية الناشئة في المجوهرات",
    boutique: "لمتاجر المجوهرات البوتيك",
  },
};

const defaultCollectionItems = collectionLandingPages.map((page) => ({
  label: page.eyebrow,
  href: `/collections/${page.slug}`,
}));

export function SiteFooter({
  collectionItems = defaultCollectionItems,
  locale = "en",
  emailHref = emailInquiryHref(locale, undefined, { source: "footer" }),
  emailLabel = "Email",
  intro = "Jewelry manufacturing and supply chain support for emerging brands, boutique stores and independent designers.",
  inquiryLabel = "OEM / ODM Inquiry",
  logoAlt = "Star & Moon Jewelry logo",
  navigationItems = navigation.slice(0, 4),
  startBrandItem,
  targetAudienceItems,
  sectionLabels = {
    pages: "Pages",
    collections: "Collections",
    reachUs: "Reach Us",
  },
}: SiteFooterProps = {}) {
  const resolvedTargetAudienceItems = targetAudienceItems ?? [
    {
      label: defaultTargetAudienceLabels[locale].emerging,
      href: locale === "en" ? "/for-emerging-jewelry-brands" : `/${locale}/for-emerging-jewelry-brands`,
    },
    {
      label: defaultTargetAudienceLabels[locale].boutique,
      href: locale === "en" ? "/for-boutique-jewelry-stores" : `/${locale}/for-boutique-jewelry-stores`,
    },
  ];

  return (
    <footer className="bg-[#121923] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <BrandLogo alt={logoAlt} variant="footer" />
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
            {startBrandItem ? (
              <li>
                <Link href={startBrandItem.href} className="transition hover:text-white">
                  {startBrandItem.label}
                </Link>
              </li>
            ) : null}
            {resolvedTargetAudienceItems.map((item) => (
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
              <a href={emailHref} className="transition hover:text-white">
                {emailLabel}: <bdi dir="ltr">{brand.email}</bdi>
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppInquiryUrl({ locale, source: "footer", context: "general" })}
                className="transition hover:text-white"
              >
                <bdi dir="ltr">{brand.whatsapp}</bdi>
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
