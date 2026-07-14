import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Gem,
  Mail,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { GemstoneStoneCard } from "@/components/gemstone-stone-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getGemstoneCatalogContent } from "@/content/gemstone-catalog";
import { getI18nContent } from "@/content/i18n";
import { getLocalizedGemstoneCatalog } from "@/data/gemstones";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { brand } from "@/lib/site-data";

type GemstoneCatalogPageProps = {
  locale: SupportedLocale;
};

export const gemstoneEmailInquiryHref = emailInquiryHref(
  "en",
  "Wholesale Lab-Grown Gemstone Inquiry",
);

const navigationLabels: Record<SupportedLocale, string> = {
  en: "Main navigation",
  es: "Navegación principal",
  ar: "التنقل الرئيسي",
};

const catalogImageCopy: Record<SupportedLocale, { emailSubject: string; heroAlt: string; logoAlt: string }> = {
  en: {
    emailSubject: "Wholesale Lab-Grown Gemstone Inquiry",
    heroAlt: "Fancy color lab-grown gemstones for wholesale sourcing",
    logoAlt: "XINGYUE Jewelry logo",
  },
  es: {
    emailSubject: "Consulta mayorista de gemas de laboratorio XINGYUE",
    heroAlt: "Gemas de laboratorio de colores para abastecimiento mayorista",
    logoAlt: "Logotipo de XINGYUE Jewelry",
  },
  ar: {
    emailSubject: "استفسار أحجار كريمة مُنتَجة في المختبر بالجملة من XINGYUE",
    heroAlt: "أحجار كريمة مُنتَجة في المختبر بألوان متنوعة للتوريد بالجملة",
    logoAlt: "شعار XINGYUE للمجوهرات",
  },
};

const priceGuideSlugs = [
  "lab-grown-ruby",
  "lab-grown-sapphire",
  "lab-grown-emerald",
  "colored-moissanite",
  "cubic-zirconia",
  "lab-grown-colored-diamonds",
];

export function GemstoneCatalogPage({ locale }: GemstoneCatalogPageProps) {
  const copy = getGemstoneCatalogContent(locale);
  const siteCopy = getI18nContent(locale);
  const { catalogItems, colorGroups, typeCategories } = getLocalizedGemstoneCatalog(locale);
  const sourcePath = localizedPath("/lab-grown-gemstones", locale);
  const generalInquiryHref = contactInquiryHref({
    locale,
    sourcePath,
    interest: copy.title,
  });
  const localizedGemstoneEmailHref = emailInquiryHref(
    locale,
    catalogImageCopy[locale].emailSubject,
  );
  const navigationItems = [
    ...siteCopy.navigation.filter((item) => item.href !== sourcePath),
    { label: copy.navLabel, href: sourcePath },
  ];
  const collectionItems = [
    { label: copy.navLabel, href: sourcePath },
    ...Object.entries(siteCopy.collections).map(([slug, collection]) => ({
      label: collection.eyebrow,
      href: localizedPath(`/collections/${slug}`, locale),
    })),
  ];
  const priceGuide = typeCategories.filter((category) =>
    priceGuideSlugs.includes(category.slug),
  );

  return (
    <main dir={siteCopy.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader
        currentLocale={locale}
        homeHref={localizedPath("/", locale)}
        inquiryHref={generalInquiryHref}
        inquiryLabel={copy.cta.sendInquiry}
        languagePath="/lab-grown-gemstones"
        logoAlt={catalogImageCopy[locale].logoAlt}
        navigationLabel={navigationLabels[locale]}
        navigationItems={navigationItems}
      />

      <section className="relative isolate min-h-[76svh] overflow-hidden bg-[#111923] px-5 py-24 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/xingyue-colored-gemstones.jpg"
          alt={catalogImageCopy[locale].heroAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0e151f]/98 via-[#0e151f]/90 to-[#0e151f]/52 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#f8f6ef] to-transparent" />
        <div className="relative mx-auto flex min-h-[56svh] max-w-7xl items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#e6cf96]">
              {copy.eyebrow}
            </p>
            <h1 className="text-balance font-serif text-5xl leading-[1.06] sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-light leading-8 text-white/82">
              {copy.subtitle}
            </p>
            <p className="mt-5 max-w-2xl leading-8 text-white/66">{copy.heroNote}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={generalInquiryHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                {copy.cta.getWholesalePrice}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <a
                href={brand.whatsappHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                {copy.cta.whatsapp}
                <MessageSquareText aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.colors.eyebrow}
            title={copy.colors.title}
            copy={copy.colors.copy}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {colorGroups.map((group, index) => (
              <article
                key={group.slug}
                className={`group relative min-h-[360px] overflow-hidden rounded-md bg-[#17202a] shadow-[0_18px_50px_rgba(23,32,42,0.12)] ${
                  index === 4 ? "xl:col-start-2" : ""
                }`}
              >
                <Image
                  src={group.image}
                  alt={group.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: group.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101720]/96 via-[#101720]/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div
                    className="mb-4 h-px w-12"
                    style={{ backgroundColor: group.accent }}
                  />
                  <h2 className="font-serif text-3xl">
                    {group.name}
                  </h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#e6cf96]">
                    {copy.colors.representative}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    {group.representativeStones.join(" · ")}
                  </p>
                  <Link
                    href="#stone-catalog"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    {copy.colors.view}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition group-hover:translate-x-1 rtl:rotate-180"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.types.eyebrow}
            title={copy.types.title}
            copy={copy.types.copy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {typeCategories.map((category, index) => {
              const hasImage = Boolean(category.image && category.alt);

              return (
                <article
                  key={category.slug}
                  data-image-state={hasImage ? "available" : "none"}
                  className={`overflow-hidden rounded-md border border-[#ded4c0] bg-white/90 shadow-sm ${
                    index === 9 ? "xl:col-start-2" : ""
                  }`}
                >
                  <div className={hasImage ? "grid sm:grid-cols-[0.4fr_0.6fr]" : "h-full"}>
                    {category.image && category.alt ? (
                      <div
                        data-gemstone-media
                        className="relative min-h-56 bg-[#eee8dc] sm:min-h-full"
                      >
                        <Image
                          src={category.image}
                          alt={category.alt}
                          fill
                          sizes="(min-width: 1280px) 15vw, (min-width: 768px) 20vw, 100vw"
                          className="object-cover"
                          style={{ objectPosition: category.imagePosition }}
                        />
                      </div>
                    ) : null}
                    <div
                      className={
                        hasImage
                          ? "p-5"
                          : "flex h-full flex-col border-t-4 border-[#a98945] p-5 sm:p-6"
                      }
                    >
                    <Gem aria-hidden="true" className="mb-4 h-5 w-5 text-[#a98945]" />
                    <h2 className="font-serif text-2xl leading-tight">{category.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#596575]">{category.description}</p>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8a734b]">
                          {copy.types.colors}
                        </dt>
                        <dd className="mt-1 leading-6 text-[#344150]">{category.availableColors}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8a734b]">
                          {copy.types.moq}
                        </dt>
                        <dd className="mt-1 leading-6 text-[#344150]">{category.moq}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8a734b]">
                          {copy.types.fromPrice}
                        </dt>
                        <dd className="mt-1 font-semibold leading-6 text-[#17202a]">
                          {category.fromPrice}
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href={contactInquiryHref({
                        locale,
                        sourcePath,
                        interest: category.name,
                      })}
                      className={`inline-flex items-center gap-2 text-sm font-semibold text-[#17202a] ${
                        hasImage ? "mt-5" : "mt-auto pt-5"
                      }`}
                    >
                      {copy.cta.getWholesalePrice}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="stone-catalog" className="scroll-mt-28 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.catalog.eyebrow}
            title={copy.catalog.title}
            copy={copy.catalog.copy}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {catalogItems.map((item) => (
              <GemstoneStoneCard key={item.slug} copy={copy} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.pricing.eyebrow}
            title={copy.pricing.title}
            copy={copy.pricing.copy}
            tone="dark"
          />
          <div className="overflow-hidden rounded-md border border-white/12">
            {priceGuide.map((category, index) => (
              <div
                key={category.slug}
                className={`grid gap-2 px-5 py-5 md:grid-cols-[0.38fr_0.62fr] md:items-center md:px-7 ${
                  index > 0 ? "border-t border-white/12" : ""
                }`}
              >
                <h3 className="font-serif text-xl text-white">{category.name}</h3>
                <p className="text-sm leading-6 text-white/72">
                  {category.fromPrice}
                  <span className="text-white/45"> · {category.description}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3 rounded-md border border-[#e6cf96]/28 bg-[#e6cf96]/8 p-5">
            <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#e6cf96]" />
            <p className="text-sm leading-7 text-white/76">{copy.pricing.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.capabilities.eyebrow}
            title={copy.capabilities.title}
            copy={copy.capabilities.copy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.capabilities.items.map((item, index) => {
              const icons = [BadgeCheck, PackageCheck, Sparkles, Gem, ShieldCheck, Banknote];
              const Icon = icons[index % icons.length];

              return (
                <article
                  key={item.title}
                  className="rounded-md border border-[#ded4c0] bg-white/88 p-6 shadow-sm"
                >
                  <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                  <h2 className="font-serif text-2xl">{item.title}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f1ecdf] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow={copy.payment.eyebrow}
            title={copy.payment.title}
            copy={copy.payment.copy}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.payment.options.map((option) => (
              <div
                key={option}
                className="flex items-center gap-3 rounded-md border border-[#d8cfbc] bg-white/75 p-4"
              >
                <BadgeCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-[#a98945]" />
                <p className="text-sm font-medium text-[#344150]">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#17202a] p-8 text-white shadow-[0_24px_70px_rgba(23,32,42,0.15)] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e6cf96]">
                {copy.closing.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
                {copy.closing.title}
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/70">{copy.closing.copy}</p>
            </div>
            <div className="grid gap-3">
              <Link
                href={generalInquiryHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                {copy.cta.sendInquiry}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <a
                href={localizedGemstoneEmailHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                {copy.cta.email}
                <Mail aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        collectionItems={collectionItems}
        emailHref={emailInquiryHref(locale)}
        emailLabel={siteCopy.footer.email}
        intro={siteCopy.footer.intro}
        inquiryLabel={siteCopy.footer.inquiry}
        logoAlt={catalogImageCopy[locale].logoAlt}
        navigationItems={navigationItems.slice(0, 5)}
        sectionLabels={{
          pages: siteCopy.footer.pages,
          collections: siteCopy.footer.collections,
          reachUs: siteCopy.footer.reachUs,
        }}
      />
    </main>
  );
}
