import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getI18nContent } from "@/content/i18n";
import {
  legalPagesContentByLocale,
  type LegalPagePath,
} from "@/content/i18n/legal-pages";
import { contactInquiryHref, emailInquiryHref } from "@/lib/contact-links";
import { localizedPath, type SupportedLocale } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/structured-data";

type LegalInformationPageProps = {
  locale: SupportedLocale;
  path: LegalPagePath;
};

const localizedLabels: Record<
  SupportedLocale,
  {
    home: string;
    navigation: string;
    logoAlt: string;
    sections: string;
  }
> = {
  en: {
    home: "Home",
    navigation: "Main navigation",
    logoAlt: "Xingyue Jewelry logo",
    sections: "Information",
  },
  es: {
    home: "Inicio",
    navigation: "Navegación principal",
    logoAlt: "Logotipo de Xingyue Jewelry",
    sections: "Información",
  },
  ar: {
    home: "الرئيسية",
    navigation: "التنقل الرئيسي",
    logoAlt: "شعار Xingyue للمجوهرات",
    sections: "المعلومات",
  },
};

export function LegalInformationPage({
  locale,
  path,
}: LegalInformationPageProps) {
  const sharedContent = getI18nContent(locale);
  const page = legalPagesContentByLocale[locale][path];
  const pagePath = localizedPath(path, locale);
  const contactHref = contactInquiryHref({
    locale,
    sourcePath: pagePath,
  });

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"}>
      <JsonLd
        data={breadcrumbSchema([
          {
            name: localizedLabels[locale].home,
            path: localizedPath("/", locale),
          },
          { name: page.title, path: pagePath },
        ])}
      />
      <SiteHeader
        currentLocale={locale}
        homeHref={localizedPath("/", locale)}
        inquiryHref={contactHref}
        inquiryLabel={sharedContent.cta.headerStartProject}
        languagePath={path}
        logoAlt={localizedLabels[locale].logoAlt}
        navigationLabel={localizedLabels[locale].navigation}
        navigationItems={sharedContent.navigation}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.intro}
      />

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3 text-[#17202a]">
            {path === "/privacy" ? (
              <ShieldCheck
                aria-hidden="true"
                className="h-6 w-6 text-[#a98945]"
              />
            ) : (
              <FileText
                aria-hidden="true"
                className="h-6 w-6 text-[#a98945]"
              />
            )}
            <h2 className="font-serif text-3xl">
              {localizedLabels[locale].sections}
            </h2>
          </div>
          <div className="space-y-5">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-md border border-[#e3dbcb] bg-white/85 p-6"
              >
                <h3 className="font-serif text-2xl text-[#17202a]">
                  {section.title}
                </h3>
                <p className="mt-3 leading-7 text-[#596575]">{section.copy}</p>
              </article>
            ))}
          </div>
          <Link
            href={contactHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
          >
            {page.contactLabel}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rtl:rotate-180"
            />
          </Link>
        </div>
      </section>

      <SiteFooter
        locale={locale}
        emailHref={emailInquiryHref(locale, undefined, { source: "footer" })}
        emailLabel={sharedContent.footer.email}
        intro={sharedContent.footer.intro}
        inquiryLabel={sharedContent.footer.inquiry}
        logoAlt={localizedLabels[locale].logoAlt}
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
