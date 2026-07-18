import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Gem,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { HowWeWork } from "@/components/how-we-work";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { emergingBrandsContentByLocale } from "@/content/i18n/target-audience";
import { getI18nContent } from "@/content/i18n";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/structured-data";

type TargetAudiencePageProps = { locale: SupportedLocale };

const logoAlts: Record<SupportedLocale, string> = {
  en: "XINGYUE Jewelry logo",
  es: "Logotipo de XINGYUE Jewelry",
  ar: "شعار XINGYUE Jewelry",
};

const navigationLabels: Record<SupportedLocale, string> = {
  en: "Main navigation",
  es: "Navegación principal",
  ar: "التنقل الرئيسي",
};

export function TargetAudiencePage({ locale }: TargetAudiencePageProps) {
  const content = getI18nContent(locale);
  const page = emergingBrandsContentByLocale[locale];
  const pagePath = localizedPath("/for-emerging-jewelry-brands", locale);
  const contactHref = contactInquiryHref({
    locale,
    source: "emerging-brands",
    interest: "other",
  });
  const productsHref = localizedPath("/products", locale);
  const startBrandHref = localizedPath("/start-a-jewelry-brand", locale);
  const aboutHref = localizedPath("/about", locale);
  const homeLabel = locale === "en" ? "Home" : locale === "es" ? "Inicio" : "الرئيسية";
  const collectionItems = Object.entries(content.collections).map(([slug, collection]) => ({
    label: collection.eyebrow,
    href: localizedPath(`/collections/${slug}`, locale),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, path: localizedPath("/", locale) },
          { name: page.hero.eyebrow, path: pagePath },
        ])}
      />
      <JsonLd data={serviceSchema(page.schema.service)} />
      <JsonLd data={faqPageSchema(page.faq.items)} />
      <main dir={content.dir} className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
        <SiteHeader
          currentLocale={locale}
          homeHref={localizedPath("/", locale)}
          inquiryHref={contactHref}
          inquiryLabel={content.cta.headerStartProject}
          languagePath="/for-emerging-jewelry-brands"
          logoAlt={logoAlts[locale]}
          navigationLabel={navigationLabels[locale]}
          navigationItems={content.navigation}
        />

        <section data-target-section="hero" className="relative overflow-hidden bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(230,207,150,0.32),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f1ede2_48%,#e9edf0_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-5xl">
              <p className="mb-4 text-sm uppercase tracking-[0.14em] text-[#8a734b]">{page.hero.eyebrow}</p>
              <h1 className="max-w-4xl text-balance font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{page.hero.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#596575] sm:text-lg">{page.hero.subtitle}</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#596575]">{page.definition}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]">
                  {page.hero.primaryCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <Link href="#product-directions" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white">
                  {page.hero.secondaryCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section data-target-section="who-this-is-for" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.audience.eyebrow} title={page.audience.title} copy={page.audience.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.audience.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-[#e3dbcb] bg-white/70 p-5">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#a98945]" />
                  <span className="font-medium leading-6">{item}</span>
                </div>
              ))}
            </div>
            <Link href={pagePath} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#cbb06e] underline-offset-4">
              {page.hero.eyebrow}
            </Link>
          </div>
        </section>

        <section data-target-section="common-challenges" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.challenges.eyebrow} title={page.challenges.title} copy={page.challenges.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.challenges.items.map((item, index) => (
                <article key={item.title} className="rounded-md border border-[#d8c9aa] bg-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a36]"><bdi dir="ltr">0{index + 1}</bdi></p>
                  <h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-target-section="how-xingyue-supports" className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.support.eyebrow} title={page.support.title} copy={page.support.copy} tone="dark" />
            <div className="grid gap-3 md:grid-cols-3">
              {page.support.values.map((item) => (
                <article key={item.title} className="rounded-md border border-white/14 bg-white/7 p-6">
                  <Gem aria-hidden="true" className="h-5 w-5 text-[#e6cf96]" />
                  <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/72">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="product-directions" data-target-section="product-directions" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.productDirections.eyebrow} title={page.productDirections.title} copy={page.productDirections.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.productDirections.items.map((item) => (
                <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/80 p-5">
                  <Gem aria-hidden="true" className="h-5 w-5 text-[#a98945]" />
                  <h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                  <Link href={localizedPath(item.path, locale)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#cbb06e] underline-offset-4">
                    {page.productDirections.linkLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-4xl text-sm leading-7 text-[#596575]">{page.productDirections.boundary}</p>
          </div>
        </section>

        <section data-target-section="sampling-moq-planning" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.sampleMoq.eyebrow} title={page.sampleMoq.title} copy={page.sampleMoq.copy} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.sampleMoq.items.map((item, index) => (
                <article key={item.title} className="rounded-md border border-[#d8c9aa] bg-white/72 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8a734b]"><bdi dir="ltr">0{index + 1}</bdi></p>
                  <h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                </article>
              ))}
            </div>
            <Link href={contactInquiryHref({ locale, source: "emerging-brands", interest: "other" })} className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white">
              {page.sampleMoq.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section data-target-section="quality-packaging" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.qualityPackaging.eyebrow} title={page.qualityPackaging.title} copy={page.qualityPackaging.copy} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.qualityPackaging.items.map((item) => (
                <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/80 p-5">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5 text-[#a98945]" />
                  <h3 className="mt-4 font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-7 text-[#596575]">{page.qualityPackaging.packaging}</p>
              <Link href={contactInquiryHref({ locale, source: "emerging-brands", interest: "other" })} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white">
                {page.qualityPackaging.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        <div id="how-we-work" data-target-section="how-we-work">
          <HowWeWork
            eyebrow={page.process.eyebrow}
            title={page.process.title}
            copy={page.process.copy}
            steps={page.process.steps}
            ctaHref={contactHref}
            ctaLabel={page.finalCta.cta}
          />
        </div>

        <section data-target-section="prepare-your-inquiry" className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={page.inquiry.eyebrow} title={page.inquiry.title} copy={page.inquiry.copy} tone="dark" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.inquiry.fields.map((field) => (
                <div key={field.label} className="rounded-md border border-white/14 bg-white/7 p-5">
                  <ClipboardCheck aria-hidden="true" className="h-5 w-5 text-[#e6cf96]" />
                  <p className="mt-4 font-semibold leading-6">{field.label}</p>
                  <p className="mt-2 text-sm text-white/62">{page.inquiry.statusLabels[field.status]}</p>
                </div>
              ))}
            </div>
            <Link href={contactHref} className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f1dda9]">
              {page.inquiry.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section data-target-section="faq" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow={page.faq.eyebrow} title={page.faq.title} copy={page.faq.copy} />
            <div className="divide-y divide-[#e3dbcb] border-y border-[#e3dbcb]">
              {page.faq.items.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl leading-snug marker:hidden">
                    <span>{item.question}</span>
                    <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-3xl leading-7 text-[#596575]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section data-target-section="final-cta" className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading eyebrow={page.finalCta.eyebrow} title={page.finalCta.title} copy={page.finalCta.copy} />
            <Link href={contactHref} className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]">
              {page.finalCta.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[#596575]">
              <Link href={productsHref} className="underline decoration-[#cbb06e] underline-offset-4">{page.links.products}</Link>
              <Link href={startBrandHref} className="underline decoration-[#cbb06e] underline-offset-4">{page.links.startBrand}</Link>
              <Link href={aboutHref} className="underline decoration-[#cbb06e] underline-offset-4">{page.links.about}</Link>
              <a href="#how-we-work" className="underline decoration-[#cbb06e] underline-offset-4">{page.links.howWeWork}</a>
            </div>
          </div>
        </section>

        <SiteFooter
          collectionItems={collectionItems}
          locale={locale}
          emailHref={emailInquiryHref(locale, undefined, { source: "footer" })}
          emailLabel={content.footer.email}
          intro={content.footer.intro}
          inquiryLabel={content.footer.inquiry}
          logoAlt={logoAlts[locale]}
          navigationItems={content.navigation.slice(0, 4)}
          startBrandItem={{ label: page.hero.eyebrow, href: pagePath }}
          sectionLabels={{ pages: content.footer.pages, collections: content.footer.collections, reachUs: content.footer.reachUs }}
        />
      </main>
    </>
  );
}
