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
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getI18nContent,
  getLocalizedCollectionContent,
} from "@/content/i18n";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { brand } from "@/lib/site-data";

type LocalizedPageProps = {
  locale: SupportedLocale;
};

type LocalizedCollectionProps = LocalizedPageProps & {
  slug: string;
};

function localizedShellProps(locale: SupportedLocale, path: string) {
  const content = getI18nContent(locale);

  return {
    currentLocale: locale,
    homeHref: localizedPath("/", locale),
    inquiryHref: localizedPath("/contact", locale),
    inquiryLabel: content.cta.sendInquiry,
    languagePath: path,
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
      intro={content.footer.intro}
      inquiryLabel={content.footer.inquiry}
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
  locale,
}: {
  catalogHref?: string;
  contactHref?: string;
  locale: SupportedLocale;
}) {
  const content = getI18nContent(locale);
  const inquiryHref = contactHref ?? localizedPath("/contact", locale);
  const secondaryHref = catalogHref ?? localizedPath("/products", locale);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href={inquiryHref}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
      >
        {content.cta.getWholesalePrice}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
  const isCustom = slug === "custom-jewelry-manufacturing";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href={localizedPath("/contact", locale)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
      >
        {isCustom ? content.cta.sendDesign : content.cta.getWholesalePrice}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
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

  return (
    <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader {...localizedShellProps(locale, "/")} />

      <section className="relative min-h-[78svh] overflow-hidden bg-[#f8f6ef] px-5 py-24 sm:px-8 lg:py-28">
        <Image
          src="/images/xingyue-loose-moissanite.jpg"
          alt="Luxury lab grown diamond and moissanite jewelry close up"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf7]/96 via-[#fbfaf7]/84 to-[#fbfaf7]/20 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8f6ef] to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-7xl items-center">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm uppercase text-[#9a7a36]">{content.home.eyebrow}</p>
            <h1 className="text-balance font-serif text-5xl leading-tight text-[#17202a] sm:text-6xl lg:text-7xl">
              {content.home.title}
            </h1>
            <p className="mt-6 text-2xl font-light text-[#8a734b]">{content.home.subtitle}</p>
            <p className="mt-6 max-w-xl leading-8 text-[#596575]">{content.home.copy}</p>
            <div className="mt-9">
              <CtaRow locale={locale} />
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {content.home.stats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-md border border-[#e3dbcb] bg-white/76 p-4 shadow-sm backdrop-blur"
                >
                  <p className="font-serif text-2xl text-[#17202a]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.home.sections.productsEyebrow}
            title={content.home.sections.productsTitle}
            copy={content.home.sections.productsCopy}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.home.productCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                {card.image ? (
                  <div className="relative aspect-[4/3] bg-[#f4efe3]">
                    <Image
                      src={card.image}
                      alt={card.alt ?? card.title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h2 className="font-serif text-2xl text-[#17202a]">{card.title}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.home.sections.manufacturingEyebrow}
            title={content.home.sections.manufacturingTitle}
            copy={content.home.sections.manufacturingCopy}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.home.manufacturingCards.map((card) => (
              <article key={card.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <Sparkles aria-hidden="true" className="mb-7 h-6 w-6 text-[#a98945]" />
                <h2 className="font-serif text-2xl">{card.title}</h2>
                <p className="mt-5 leading-7 text-[#596575]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm uppercase text-[#e6cf96]">{content.faq.eyebrow}</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">{content.faq.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.home.faqs.map((faq) => (
              <article key={faq.question} className="rounded-md border border-white/12 bg-white/7 p-6">
                <HelpCircle aria-hidden="true" className="mb-5 h-5 w-5 text-[#e6cf96]" />
                <h3 className="font-serif text-2xl">{faq.question}</h3>
                <p className="mt-4 leading-7 text-white/72">{faq.answer}</p>
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
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
        <CtaRow locale={locale} />
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
              <article
                key={product.name}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-[#f4efe3]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#8a734b]">{product.category}</p>
                  <h2 className="mt-2 font-serif text-2xl text-[#17202a]">{product.name}</h2>
                  <p className="mt-4 text-sm text-[#344150]">{product.material}</p>
                  <p className="mt-4 leading-7 text-[#596575]">{product.copy}</p>
                </div>
              </article>
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
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden rounded-md bg-[#e9e4d9]">
            <Image
              src="/images/b2b-factory-workshop.jpg"
              alt="Xingyue Jewelry factory workshop"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-[#8a734b]">{content.about.eyebrow}</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">{content.about.profileTitle}</h2>
            <div className="mt-6 space-y-5 leading-8 text-[#596575]">
              {content.about.profileCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.about.facts.map((fact) => (
                <div key={fact.value} className="border-t border-[#cbb06e] pt-4">
                  <p className="font-serif text-2xl text-[#17202a]">{fact.value}</p>
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
        <CtaRow locale={locale} contactHref={localizedPath("/contact", locale)} />
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
  const emailHref = brand.emailInquiryHref;

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
                alt="Jewelry sample with certificate and packaging"
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
                        {brand.whatsapp}
                      </a>
                    ) : null}
                    {index === 1 ? (
                      <a
                        href={brand.emailHref}
                        className="mt-3 inline-flex break-all text-sm font-semibold text-[#17202a] transition hover:text-[#8a734b]"
                      >
                        Email: {brand.email}
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <ContactInquiryForm content={content.contact.form} emailHref={emailHref} />
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
