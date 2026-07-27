import { ArrowRight, BadgeCheck, CheckCircle2, ClipboardCheck, Factory, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getI18nContent } from "@/content/i18n";
import {
  factoryPagesContentByLocale,
  type FactoryPagePath,
} from "@/content/i18n/factory-pages";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/structured-data";

type FactoryInformationPageProps = {
  locale: SupportedLocale;
  path: FactoryPagePath;
};

const labels: Record<
  SupportedLocale,
  {
    gallery: string;
    facts: string;
    stages: string;
    buyerGuidance: string;
    faq: string;
    navigation: string;
    logoAlt: string;
  }
> = {
  en: {
    gallery: "Factory Workshop and Craftsmanship",
    facts: "Factory Facts and Capabilities",
    stages: "How the Work Is Coordinated",
    buyerGuidance: "What B2B Buyers Should Confirm",
    faq: "Frequently Asked Questions",
    navigation: "Main navigation",
    logoAlt: "Xingyue Jewelry factory logo",
  },
  es: {
    gallery: "Taller y trabajo artesanal",
    facts: "Datos y capacidades de fábrica",
    stages: "Cómo se coordina el trabajo",
    buyerGuidance: "Qué debe confirmar un comprador B2B",
    faq: "Preguntas frecuentes",
    navigation: "Navegación principal",
    logoAlt: "Logotipo de la fábrica de Xingyue Jewelry",
  },
  ar: {
    gallery: "الورشة والعمل الحرفي",
    facts: "حقائق المصنع وقدراته",
    stages: "كيف يتم تنسيق العمل",
    buyerGuidance: "ما الذي ينبغي للمشتري بين الشركات تأكيده",
    faq: "الأسئلة الشائعة",
    navigation: "التنقل الرئيسي",
    logoAlt: "شعار مصنع Xingyue للمجوهرات",
  },
};

export function FactoryInformationPage({
  locale,
  path,
}: FactoryInformationPageProps) {
  const sharedContent = getI18nContent(locale);
  const page = factoryPagesContentByLocale[locale][path];
  const pagePath = localizedPath(path, locale);
  const contactHref = contactInquiryHref({
    locale,
    sourcePath: pagePath,
  });
  const collectionItems = Object.entries(sharedContent.collections).map(
    ([slug, collection]) => ({
      label: collection.eyebrow,
      href: localizedPath(`/collections/${slug}`, locale),
    }),
  );

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"}>
      <JsonLd
        data={breadcrumbSchema([
          {
            name: locale === "es" ? "Inicio" : locale === "ar" ? "الرئيسية" : "Home",
            path: localizedPath("/", locale),
          },
          { name: page.title, path: pagePath },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          audience:
            locale === "es"
              ? "Marcas, diseñadores, boutiques y compradores mayoristas"
              : locale === "ar"
                ? "العلامات التجارية والمصممون والمتاجر والمشترون بالجملة"
                : "Jewelry brands, designers, boutiques and wholesale buyers",
          description: page.intro,
          name: page.title,
          serviceType:
            locale === "es"
              ? "Fabricación de joyería OEM/ODM"
              : locale === "ar"
                ? "تصنيع المجوهرات OEM/ODM"
                : "OEM/ODM jewelry manufacturing",
        })}
      />
      <JsonLd data={faqPageSchema(page.faqs)} />

      <SiteHeader
        currentLocale={locale}
        homeHref={localizedPath("/", locale)}
        inquiryHref={contactHref}
        inquiryLabel={sharedContent.cta.headerStartProject}
        languagePath={path}
        logoAlt={labels[locale].logoAlt}
        navigationLabel={labels[locale].navigation}
        navigationItems={sharedContent.navigation}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
          >
            {page.cta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <Link
            href={localizedPath("/products", locale)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/75 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
          >
            {sharedContent.cta.viewProducts}
          </Link>
        </div>
      </PageHero>

      {page.images ? (
        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 flex items-center gap-3 text-[#17202a]">
              <Factory aria-hidden="true" className="h-6 w-6 text-[#a98945]" />
              <h2 className="font-serif text-3xl">{labels[locale].gallery}</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {page.images.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-4 text-sm leading-6 text-[#596575]">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className={
          page.images
            ? "bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20"
            : "px-5 py-16 sm:px-8 lg:py-20"
        }
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-9 font-serif text-3xl text-[#17202a]">
            {labels[locale].facts}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {page.facts.map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-[#e3dbcb] bg-white/88 p-6"
              >
                <Gem aria-hidden="true" className="mb-4 h-5 w-5 text-[#a98945]" />
                <h3 className="font-serif text-xl text-[#17202a]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#596575]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-center gap-3">
            <ClipboardCheck aria-hidden="true" className="h-6 w-6 text-[#e6cf96]" />
            <h2 className="font-serif text-3xl">{labels[locale].stages}</h2>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {page.stages.map((stage, index) => (
              <li
                key={stage.title}
                className="rounded-md border border-white/15 bg-white/6 p-6"
              >
                <span className="text-sm font-semibold text-[#e6cf96]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl">{stage.title}</h3>
                <p className="mt-3 leading-7 text-white/72">{stage.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-9 font-serif text-3xl text-[#17202a]">
            {labels[locale].buyerGuidance}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {page.buyerGuidance.map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-6"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mb-4 h-5 w-5 text-[#a98945]"
                />
                <h3 className="font-serif text-xl text-[#17202a]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#596575]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-9 flex items-center gap-3 text-[#17202a]">
            <BadgeCheck aria-hidden="true" className="h-6 w-6 text-[#a98945]" />
            <h2 className="font-serif text-3xl">{labels[locale].faq}</h2>
          </div>
          <div className="grid gap-4">
            {page.faqs.map((item) => (
              <details
                key={item.question}
                className="rounded-md border border-[#e3dbcb] bg-white px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-[#17202a]">
                  {item.question}
                </summary>
                <p className="mt-3 leading-7 text-[#596575]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl rounded-md bg-[#17202a] px-6 py-12 text-center text-white sm:px-10">
          <h2 className="font-serif text-3xl">{page.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/72">
            {page.cta.copy}
          </p>
          <Link
            href={contactHref}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
          >
            {page.cta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      <SiteFooter
        collectionItems={collectionItems}
        locale={locale}
        emailHref={emailInquiryHref(locale, undefined, { source: "footer" })}
        emailLabel={sharedContent.footer.email}
        intro={sharedContent.footer.intro}
        inquiryLabel={sharedContent.footer.inquiry}
        logoAlt={labels[locale].logoAlt}
        navigationItems={sharedContent.navigation.slice(0, 4)}
        sectionLabels={{
          pages: sharedContent.footer.pages,
          collections: sharedContent.footer.collections,
          reachUs: sharedContent.footer.reachUs,
        }}
      />
    </main>
  );
}
