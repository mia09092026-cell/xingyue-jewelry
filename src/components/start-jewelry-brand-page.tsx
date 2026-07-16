import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  Gem,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getI18nContent } from "@/content/i18n";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema } from "@/lib/structured-data";

const navigationLabels: Record<SupportedLocale, string> = {
  en: "Main navigation",
  es: "Navegación principal",
  ar: "التنقل الرئيسي",
};

const logoAlts: Record<SupportedLocale, string> = {
  en: "XINGYUE Jewelry logo",
  es: "Logotipo de XINGYUE Jewelry",
  ar: "شعار XINGYUE Jewelry",
};

type StartJewelryBrandPageProps = { locale: SupportedLocale };

function shellProps(locale: SupportedLocale, content: ReturnType<typeof getI18nContent>) {
  return {
    currentLocale: locale,
    homeHref: localizedPath("/", locale),
    inquiryHref: localizedPath("/contact", locale),
    inquiryLabel: content.cta.headerStartProject,
    languagePath: "/start-a-jewelry-brand",
    logoAlt: logoAlts[locale],
    navigationLabel: navigationLabels[locale],
    navigationItems: content.navigation,
  };
}

export function StartJewelryBrandPage({ locale }: StartJewelryBrandPageProps) {
  const content = getI18nContent(locale);
  const page = content.startBrand;

  if (!page) {
    return null;
  }

  const pagePath = localizedPath("/start-a-jewelry-brand", locale);
  const contactHref = contactInquiryHref({
    locale,
    sourcePath: pagePath,
    interest: page.hero.title,
  });
  const productHref = localizedPath("/products", locale);
  const aboutHref = localizedPath("/about", locale);

  const collectionItems = Object.entries(content.collections).map(([slug, collection]) => ({
    label: collection.eyebrow,
    href: localizedPath(`/collections/${slug}`, locale),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "en" ? "Home" : locale === "es" ? "Inicio" : "الرئيسية", path: localizedPath("/", locale) },
          { name: page.hero.title, path: pagePath },
        ])}
      />
      <JsonLd data={faqPageSchema(page.faq.items)} />
      <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
        <SiteHeader {...shellProps(locale, content)} />

        <section data-start-section="hero" className="bg-[#f8f6ef] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a36] sm:text-sm">{page.hero.eyebrow}</p>
              <h1 className="text-balance font-serif text-4xl leading-[1.08] text-[#17202a] sm:text-5xl lg:text-6xl">{page.hero.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#4c5968] sm:text-lg">{page.hero.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]">
                  {page.hero.primaryCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <Link href="#product-direction" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white">
                  {page.hero.secondaryCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
            <div className="hidden border-s border-[#d8c9aa] ps-8 lg:block">
              <Gem aria-hidden="true" className="h-10 w-10 text-[#a98945]" />
              <p className="mt-5 text-sm leading-7 text-[#596575]">{page.preparation.copy}</p>
            </div>
          </div>
        </section>

        <section data-start-section="who-this-is-for" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.audience.eyebrow} title={page.audience.title} copy={page.audience.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.audience.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-[#e3dbcb] bg-white/70 p-5">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#a98945]" />
                  <span className="font-medium leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-start-section="what-you-need-to-start" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.preparation.eyebrow} title={page.preparation.title} copy={page.preparation.copy} />
            <div className="grid gap-5 lg:grid-cols-3">
              {page.preparation.groups.map((group, index) => (
                <article key={group.title} className="rounded-md border border-[#d8c9aa] bg-white/70 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a36]"><bdi dir="ltr">0{index + 1}</bdi></p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug">{group.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-[#596575]">
                    {group.items.map((item) => <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#a98945]" /><span>{item}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="product-direction" data-start-section="product-direction" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.productDirection.eyebrow} title={page.productDirection.title} copy={page.productDirection.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.productDirection.items.map((item) => (
                <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/80 p-5">
                  <Sparkles aria-hidden="true" className="h-5 w-5 text-[#a98945]" />
                  <h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                </article>
              ))}
            </div>
            <Link href={productHref} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a] underline decoration-[#cbb06e] underline-offset-4">
              {page.productDirection.linkLabel}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section id="how-xingyue-supports" data-start-section="how-xingyue-supports" className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.support.eyebrow} title={page.support.title} copy={page.support.copy} tone="dark" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.support.phases.map((phase, index) => (
                <article key={phase.title} className="rounded-md border border-white/14 bg-white/7 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e6cf96]"><bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi></p>
                  <h3 className="mt-4 font-serif text-xl leading-snug">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{phase.copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-4xl text-sm leading-7 text-white/62">{page.support.boundary}</p>
          </div>
        </section>

        <section id="sample-moq-planning" data-start-section="sample-moq-planning" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.sampleMoq.eyebrow} title={page.sampleMoq.title} copy={page.sampleMoq.copy} />
            <div className="grid gap-4 sm:grid-cols-2">
              {page.sampleMoq.items.map((item, index) => (
                <article key={item.title} className="rounded-md border border-[#d8c9aa] bg-white/72 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8a734b]"><bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi></p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#596575]">{item.copy}</p>
                </article>
              ))}
            </div>
            <Link href={contactHref} className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white">
              {page.sampleMoq.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section id="branding-packaging" data-start-section="branding-packaging" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.brandingPackaging.eyebrow} title={page.brandingPackaging.title} copy={page.brandingPackaging.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {page.brandingPackaging.items.map((item) => (
                <div key={item} className="rounded-md border border-[#e3dbcb] bg-white/80 p-5"><PackageCheck aria-hidden="true" className="h-5 w-5 text-[#a98945]" /><p className="mt-4 text-sm font-semibold leading-6">{item}</p></div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#596575]">{page.brandingPackaging.boundary}</p>
          </div>
        </section>

        <section id="quality-production" data-start-section="quality-production" className="bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.qualityProduction.eyebrow} title={page.qualityProduction.title} copy={page.qualityProduction.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.qualityProduction.items.map((item) => (
                <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-5"><ShieldCheck aria-hidden="true" className="h-5 w-5 text-[#a98945]" /><h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p></article>
              ))}
            </div>
            <Link href={contactHref} className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white">
              {page.qualityProduction.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section id="prepare-first-inquiry" data-start-section="prepare-first-inquiry" className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.inquiry.eyebrow} title={page.inquiry.title} copy={page.inquiry.copy} tone="dark" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.inquiry.fields.map((field) => (
                <div key={field.label} className="rounded-md border border-white/14 bg-white/7 p-5"><ClipboardList aria-hidden="true" className="h-5 w-5 text-[#e6cf96]" /><p className="mt-4 font-semibold leading-6">{field.label}</p><p className="mt-2 text-sm text-white/62">{page.inquiry.statusLabels[field.status]}</p></div>
              ))}
            </div>
            <Link href={contactHref} className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f1dda9]">
              {page.inquiry.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section data-start-section="faq" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow={page.faq.eyebrow} title={page.faq.title} copy={page.faq.copy} />
            <div className="divide-y divide-[#e3dbcb] border-y border-[#e3dbcb]">
              {page.faq.items.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl leading-snug marker:hidden"><span>{item.question}</span><ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition group-open:rotate-180" /></summary>
                  <p className="mt-4 max-w-3xl leading-7 text-[#596575]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section data-start-section="final-cta" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading eyebrow={page.finalCta.eyebrow} title={page.finalCta.title} copy={page.finalCta.copy} />
            <Link href={contactHref} className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]">
              {page.finalCta.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[#596575]">
              <Link href={productHref} className="underline decoration-[#cbb06e] underline-offset-4">{page.links.products}</Link>
              <Link href={aboutHref} className="underline decoration-[#cbb06e] underline-offset-4">{page.links.about}</Link>
              <Link href="#how-xingyue-supports" className="underline decoration-[#cbb06e] underline-offset-4">{page.links.howWeWork}</Link>
            </div>
          </div>
        </section>

        <SiteFooter
          collectionItems={collectionItems}
          emailHref={emailInquiryHref(locale)}
          emailLabel={content.footer.email}
          intro={content.footer.intro}
          inquiryLabel={content.footer.inquiry}
          logoAlt={logoAlts[locale]}
          navigationItems={content.navigation.slice(0, 4)}
          startBrandItem={{ label: page.hero.title, href: pagePath }}
          sectionLabels={{ pages: content.footer.pages, collections: content.footer.collections, reachUs: content.footer.reachUs }}
        />
      </main>
    </>
  );
}
