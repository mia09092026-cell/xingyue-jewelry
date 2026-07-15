import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Gem,
  HelpCircle,
  Mail,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { HowWeWork } from "@/components/how-we-work";
import { PageHero } from "@/components/page-hero";
import { PrepareInquirySection } from "@/components/prepare-inquiry-section";
import { ProductSummaryCard } from "@/components/product-summary-card";
import { QualityControlSection } from "@/components/quality-control-section";
import { SampleMoqSection } from "@/components/sample-moq-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getI18nContent,
  getLocalizedCollectionContent,
} from "@/content/i18n";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { brand } from "@/lib/site-data";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";

type LocalizedPageProps = {
  locale: SupportedLocale;
};

type LocalizedCollectionProps = LocalizedPageProps & {
  slug: string;
};

const navigationLabels: Record<SupportedLocale, string> = {
  en: "Main navigation",
  es: "Navegación principal",
  ar: "التنقل الرئيسي",
};

const logoAlts: Record<SupportedLocale, string> = {
  en: "XINGYUE Jewelry logo",
  es: "Logotipo de XINGYUE Jewelry",
  ar: "شعار XINGYUE للمجوهرات",
};

const pageImageAlts: Record<SupportedLocale, { workshop: string; contact: string }> = {
  en: {
    workshop: "Jewelry production workshop supporting OEM and ODM projects",
    contact: "Jewelry sample with certificate and packaging",
  },
  es: {
    workshop: "Taller de producción de joyería para proyectos OEM y ODM",
    contact: "Muestra de joyería con certificado y empaque",
  },
  ar: {
    workshop: "ورشة إنتاج مجوهرات لدعم مشاريع OEM و ODM",
    contact: "عينة مجوهرات مع شهادة وتغليف",
  },
};

function localizedShellProps(locale: SupportedLocale, path: string) {
  const content = getI18nContent(locale);

  return {
    currentLocale: locale,
    homeHref: localizedPath("/", locale),
    inquiryHref: localizedPath("/contact", locale),
    inquiryLabel: content.cta.headerStartProject,
    languagePath: path,
    logoAlt: logoAlts[locale],
    navigationLabel: navigationLabels[locale],
    navigationItems: content.navigation,
  };
}

function LocalizedFooter({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);
  const collectionItems = Object.entries(content.collections).map(([slug, collection]) => ({
    label: collection.eyebrow,
    href: localizedPath(`/collections/${slug}`, locale),
  }));

  return (
    <SiteFooter
      collectionItems={collectionItems}
      emailHref={emailInquiryHref(locale)}
      emailLabel={content.footer.email}
      intro={content.footer.intro}
      inquiryLabel={content.footer.inquiry}
      logoAlt={logoAlts[locale]}
      navigationItems={content.navigation.slice(0, 4)}
      sectionLabels={{
        pages: content.footer.pages,
        collections: content.footer.collections,
        reachUs: content.footer.reachUs,
      }}
    />
  );
}

function CtaRow({
  catalogHref,
  contactHref,
  interest,
  locale,
  sourcePath,
}: {
  catalogHref?: string;
  contactHref?: string;
  locale: SupportedLocale;
  sourcePath?: string;
  interest?: string;
}) {
  const content = getI18nContent(locale);
  const inquiryHref =
    contactHref ??
    contactInquiryHref({
      locale,
      sourcePath: sourcePath ?? localizedPath("/", locale),
      interest,
    });
  const secondaryHref = catalogHref ?? localizedPath("/products", locale);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href={inquiryHref}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
      >
        {content.cta.getWholesalePrice}
        <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
      </Link>
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
      >
        {content.cta.requestCatalog}
        <Mail aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CollectionCta({ locale, slug }: LocalizedCollectionProps) {
  const content = getI18nContent(locale);
  const collection = getLocalizedCollectionContent(locale, slug);
  const isCustom = slug === "custom-jewelry-manufacturing";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href={contactInquiryHref({
          locale,
          sourcePath: localizedPath(`/collections/${slug}`, locale),
          interest: collection?.eyebrow ?? slug,
        })}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
      >
        {isCustom ? content.cta.sendDesign : content.cta.getWholesalePrice}
        <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
      </Link>
      <Link
        href={brand.whatsappHref}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
      >
        {content.cta.contactWhatsapp}
        <MessageSquareText aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function LocalizedHome({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);
  const homePath = localizedPath("/", locale);
  const inquiryHref = contactInquiryHref({
    locale,
    sourcePath: homePath,
    interest: content.home.title,
  });
  const sampleMoqHref = contactInquiryHref({
    locale,
    sourcePath: homePath,
    interest: content.home.sampleMoq.title,
  });
  const qualityControlHref = contactInquiryHref({
    locale,
    sourcePath: homePath,
    interest: content.home.qualityControl.title,
  });
  const inquiryPrepHref = contactInquiryHref({
    locale,
    sourcePath: homePath,
    interest: content.home.inquiryPrep.title,
  });
  const coreValueIcons = [Gem, Sparkles, ShieldCheck] as const;

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/")} />

      <section
        data-home-section="hero"
        className="relative min-h-[calc(100svh-8.75rem)] overflow-hidden bg-[#f8f6ef] px-5 py-12 sm:px-8 sm:py-14 lg:py-16"
      >
        <Image
          src="/images/xingyue-loose-moissanite.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf7]/96 via-[#fbfaf7]/84 to-[#fbfaf7]/20 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8f6ef] to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-15.75rem)] max-w-7xl items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a36] sm:text-sm">
              {content.home.eyebrow}
            </p>
            <h1 className="text-balance font-serif text-4xl leading-[1.08] text-[#17202a] sm:text-5xl lg:text-6xl">
              {content.home.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#4c5968] sm:text-lg sm:leading-8">
              {content.home.subtitle}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={inquiryHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
              >
                {content.cta.discussCollection}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href="#products-capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/78 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                {content.cta.exploreCapabilities}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section data-home-section="who-we-support" className="px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.home.audience.eyebrow}
            title={content.home.audience.title}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.home.audience.items.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-[#e3dbcb] bg-white/72 px-5 py-4">
                <Gem aria-hidden="true" className="h-5 w-5 shrink-0 text-[#a98945]" />
                <p className="font-semibold leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section="core-values" className="bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.home.coreValues.eyebrow}
            title={content.home.coreValues.title}
            copy={content.home.coreValues.copy}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.home.coreValues.items.map((card, index) => {
              const Icon = coreValueIcons[index] ?? Sparkles;
              return (
              <article key={card.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                <h3 className="font-serif text-2xl leading-snug">{card.title}</h3>
                <p className="mt-5 leading-7 text-[#596575]">{card.copy}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="products-capabilities"
        data-home-section="products-capabilities"
        data-testid="products-capabilities"
        className="scroll-mt-36 px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.home.sections.productsEyebrow}
            title={content.home.sections.productsTitle}
            copy={content.home.sections.productsCopy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.home.productCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm">
                {card.image ? (
                  <div className="relative aspect-[4/3] bg-[#f4efe3]">
                    <Image src={card.image} alt={card.alt ?? card.title} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#17202a]">{card.title}</h3>
                  <p className="mt-4 leading-7 text-[#596575]">{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href={localizedPath("/products", locale)} className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white">
            {content.cta.viewProducts}
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      <HowWeWork
        eyebrow={content.home.workflow.eyebrow}
        title={content.home.workflow.title}
        copy={content.home.workflow.copy}
        steps={content.home.workflow.steps}
        ctaHref={inquiryHref}
        ctaLabel={content.cta.discussCollection}
      />

      <SampleMoqSection
        eyebrow={content.home.sampleMoq.eyebrow}
        title={content.home.sampleMoq.title}
        copy={content.home.sampleMoq.copy}
        items={content.home.sampleMoq.items}
        image={content.home.sampleMoq.image}
        ctaHref={sampleMoqHref}
        ctaLabel={content.cta.discussSamplesMoq}
      />

      <QualityControlSection
        eyebrow={content.home.qualityControl.eyebrow}
        title={content.home.qualityControl.title}
        copy={content.home.qualityControl.copy}
        items={content.home.qualityControl.items}
        image={content.home.qualityControl.image}
        ctaHref={qualityControlHref}
        ctaLabel={content.cta.discussQualityRequirements}
      />

      <PrepareInquirySection
        eyebrow={content.home.inquiryPrep.eyebrow}
        title={content.home.inquiryPrep.title}
        copy={content.home.inquiryPrep.copy}
        statusLabels={content.home.inquiryPrep.statusLabels}
        fields={content.home.inquiryPrep.fields}
        image={content.home.inquiryPrep.image}
        ctaHref={inquiryPrepHref}
        ctaLabel={content.cta.sendProjectDetails}
      />

      <section data-home-section="faq" className="bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} copy={content.faq.subtitle} />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.home.faqs.map((faq) => (
              <article key={faq.question} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6">
                <HelpCircle aria-hidden="true" className="mb-5 h-5 w-5 text-[#a98945]" />
                <h3 className="font-serif text-2xl">{faq.question}</h3>
                <p className="mt-4 leading-7 text-[#596575]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section="final-cta" className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">{content.home.finalCta.eyebrow}</p>
              <h2 className="font-serif text-4xl">{content.home.finalCta.title}</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">{content.home.finalCta.copy}</p>
            </div>
            <Link
              href={inquiryHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              {content.cta.finalStartProject}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <LocalizedFooter locale={locale} />
    </main>
  );
}

export function LocalizedProducts({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/products")} />
      <PageHero
        eyebrow={content.products.eyebrow}
        title={content.products.title}
        subtitle={content.products.subtitle}
      >
        <CtaRow
          locale={locale}
          sourcePath={localizedPath("/products", locale)}
          interest="B2B jewelry products"
        />
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.products.eyebrow}
            title={content.products.sectionTitle}
            copy={content.products.sectionCopy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.products.cards.map((product) => (
              <ProductSummaryCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.products.eyebrow}
            title={content.products.proofTitle}
            copy={content.products.proofCopy}
            tone="dark"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.products.proofCards.map((card) => (
              <article key={card.title} className="rounded-md border border-white/12 bg-white/7 p-6">
                <BadgeCheck aria-hidden="true" className="mb-6 h-6 w-6 text-[#e6cf96]" />
                <h2 className="font-serif text-2xl">{card.title}</h2>
                <p className="mt-5 leading-7 text-white/72">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">{content.contact.eyebrow}</p>
              <h2 className="font-serif text-4xl">{content.contact.title}</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">{content.contact.subtitle}</p>
            </div>
            <Link
              href={localizedPath("/contact", locale)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              {content.cta.sendInquiry}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <LocalizedFooter locale={locale} />
    </main>
  );
}

export function LocalizedCollection({ locale, slug }: LocalizedCollectionProps) {
  const content = getI18nContent(locale);
  const collection = getLocalizedCollectionContent(locale, slug);

  if (!collection) {
    return null;
  }

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, `/collections/${slug}`)} />
      <nav aria-label="Breadcrumb" className="border-b border-[#e7ddc8] bg-[#fbfaf7] px-5 py-4 sm:px-8">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-[#596575]">
          <li>
            <Link href={localizedPath("/", locale)} className="transition hover:text-[#17202a]">
              {content.navigation[0]?.label ?? "Home"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={localizedPath("/products", locale)} className="transition hover:text-[#17202a]">
              {content.products.eyebrow}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#17202a]">{collection.eyebrow}</li>
        </ol>
      </nav>
      <PageHero eyebrow={collection.eyebrow} title={collection.title} subtitle={collection.subtitle}>
        <CollectionCta locale={locale} slug={slug} />
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative min-h-[420px] overflow-hidden rounded-md bg-[#17202a] shadow-sm">
            <Image
              src={collection.image}
              alt={collection.alt}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow={collection.eyebrow}
              title={content.products.sectionTitle}
              copy={content.products.sectionCopy}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {collection.options.map((option) => (
                <div
                  key={option}
                  className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-4 shadow-sm"
                >
                  <p className="leading-7 text-[#344150]">{option}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="OEM / ODM"
            title={content.home.sections.manufacturingTitle}
            copy={content.home.sections.manufacturingCopy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {collection.capabilities.map((capability) => (
              <article
                key={capability}
                className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm"
              >
                <Sparkles aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                <p className="leading-7 text-[#344150]">{capability}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.cta.sendDesign}
            title={content.about.capabilityTitle}
            copy={content.about.capabilityCopy}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {collection.customization.map((item) => (
              <article key={item} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <Check aria-hidden="true" className="mb-5 h-5 w-5 text-[#a98945]" />
                <p className="leading-7 text-[#344150]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={content.products.proofTitle}
              title={content.products.proofTitle}
              copy={content.products.proofCopy}
              tone="dark"
            />
            <div className="grid gap-4">
              {collection.quality.map((note) => (
                <article key={note.title} className="rounded-md border border-white/12 bg-white/7 p-6">
                  <ShieldCheck aria-hidden="true" className="mb-5 h-5 w-5 text-[#e6cf96]" />
                  <h3 className="font-serif text-2xl">{note.title}</h3>
                  <p className="mt-4 leading-7 text-white/72">{note.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={content.faq.eyebrow}
              title={content.faq.title}
              copy={content.faq.subtitle}
              tone="dark"
            />
            <div className="grid gap-4">
              {collection.faqs.map((faq) => (
                <article key={faq.question} className="rounded-md border border-white/12 bg-white/7 p-6">
                  <HelpCircle aria-hidden="true" className="mb-5 h-5 w-5 text-[#e6cf96]" />
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-4 leading-7 text-white/72">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">{content.contact.eyebrow}</p>
              <h2 className="font-serif text-4xl">{content.contact.title}</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">{content.contact.subtitle}</p>
            </div>
            <Link
              href={localizedPath("/contact", locale)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              {content.cta.sendInquiry}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <LocalizedFooter locale={locale} />
    </main>
  );
}

export function LocalizedAbout({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/about")} />
      <PageHero eyebrow={content.about.eyebrow} title={content.about.title} subtitle={content.about.subtitle}>
        <Link
          href={localizedPath("/contact", locale)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          {content.cta.sendInquiry}
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden rounded-md bg-[#e9e4d9]">
            <Image
              src="/images/b2b-factory-workshop.jpg"
              alt={pageImageAlts[locale].workshop}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-[#8a734b]">{content.about.profileEyebrow}</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">{content.about.profileTitle}</h2>
            <div className="mt-6 space-y-5 leading-8 text-[#596575]">
              {content.about.profileCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.about.facts.map((fact) => (
                <div key={fact.value} className="border-t border-[#cbb06e] pt-4">
                  <p className="font-serif text-2xl text-[#17202a]"><bdi dir="auto">{fact.value}</bdi></p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.about.eyebrow}
            title={content.about.capabilityTitle}
            copy={content.about.capabilityCopy}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.about.capabilities.map((item) => (
              <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6">
                <PackageCheck aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-5 leading-7 text-[#596575]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocalizedFooter locale={locale} />
    </main>
  );
}

export function LocalizedFaq({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/faq")} />
      <PageHero eyebrow={content.faq.eyebrow} title={content.faq.title} subtitle={content.faq.subtitle}>
        <CtaRow
          locale={locale}
          sourcePath={localizedPath("/faq", locale)}
          interest="Wholesale jewelry inquiry"
        />
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6">
          {content.faq.groups.map((group) => (
            <div key={group.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-3xl text-[#17202a]">{group.title}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {group.items.map((faq) => (
                  <article key={faq.question} className="rounded-md bg-[#fbfaf7] p-5">
                    <HelpCircle aria-hidden="true" className="mb-5 h-5 w-5 text-[#a98945]" />
                    <h3 className="font-serif text-2xl">{faq.question}</h3>
                    <p className="mt-4 leading-7 text-[#596575]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LocalizedFooter locale={locale} />
    </main>
  );
}

export function LocalizedContact({ locale }: LocalizedPageProps) {
  const content = getI18nContent(locale);
  const emailHref = emailInquiryHref(locale);

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/contact")} />
      <PageHero
        eyebrow={content.contact.eyebrow}
        title={content.contact.title}
        subtitle={content.contact.subtitle}
      />

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow={content.contact.eyebrow}
              title={content.contact.checklistTitle}
              copy={content.contact.checklistCopy}
            />
            <div className="relative min-h-[360px] overflow-hidden rounded-md bg-[#e9e4d9]">
              <Image
                src="/images/b2b-certificate-packaging.jpg"
                alt={pageImageAlts[locale].contact}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {content.contact.cards.map((card, index) => {
                const icons = [Clock3, Mail, PackageCheck, Truck];
                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={card.title}
                    className={
                      index === 0
                        ? "rounded-md bg-[#17202a] p-5 text-white"
                        : "rounded-md border border-[#e3dbcb] bg-white/86 p-5"
                    }
                  >
                    <Icon
                      aria-hidden="true"
                      className={index === 0 ? "mb-4 h-5 w-5 text-[#e6cf96]" : "mb-4 h-5 w-5 text-[#a98945]"}
                    />
                    <h2 className="font-serif text-xl">{card.title}</h2>
                    <p className={index === 0 ? "mt-3 text-sm leading-6 text-white/72" : "mt-3 text-sm leading-6 text-[#596575]"}>
                      {card.copy}
                    </p>
                    {index === 0 ? (
                      <a
                        href={brand.whatsappHref}
                        className="mt-3 inline-flex text-sm font-semibold text-[#e6cf96] transition hover:text-white"
                      >
                        <bdi dir="ltr">{brand.whatsapp}</bdi>
                      </a>
                    ) : null}
                    {index === 1 ? (
                      <a
                        href={emailHref}
                        className="mt-3 inline-flex break-all text-sm font-semibold text-[#17202a] transition hover:text-[#8a734b]"
                      >
                        {content.footer.email}: <bdi dir="ltr">{brand.email}</bdi>
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <ContactInquiryForm
              content={content.contact.form}
              emailHref={emailHref}
              locale={locale}
              sourcePath={localizedPath("/contact", locale)}
            />
            <div className="mt-6 flex gap-3 rounded-md border border-[#e3dbcb] bg-white/72 p-5 text-[#596575]">
              <MessageSquareText aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#a98945]" />
              <p className="leading-7">{content.contact.note}</p>
            </div>
          </div>
        </div>
      </section>
      <LocalizedFooter locale={locale} />
    </main>
  );
}
