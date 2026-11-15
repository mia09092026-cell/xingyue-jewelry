import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Gem, Globe2, PackageCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { processSteps } from "@/lib/site-data";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Zarivelle 织澜 | Wholesale 925 Silver & Lab-Grown Jewelry",
  description:
    "Zarivelle 织澜 supplies finished 925 silver, moissanite, lab-grown colored gemstone and lab-grown diamond jewelry wholesale for boutiques, brands and online sellers, with OEM/ODM support from Wuzhou.",
  path: "/about",
  languages: getLanguageAlternates("/about"),
});

const capabilities = [
  {
    title: "Finished Jewelry Collections",
    copy: "Finished 925 silver, moissanite, lab-grown colored gemstone and lab-grown diamond styles for wholesale buyers.",
    icon: Gem,
  },
  {
    title: "Wholesale & OEM/ODM",
    copy: "Low-MOQ finished orders, tiered pricing, samples and custom development for larger programs.",
    icon: Factory,
  },
  {
    title: "Export-Ready Quality Control",
    copy: "Material confirmation, stone matching, inspection, certificate options and packaging before shipment.",
    icon: PackageCheck,
  },
];

const partnershipFacts = [
  ["Boutique Jewelry Stores", "Finished collections and low-MOQ reorders"],
  ["Emerging Brands", "Wholesale styles plus OEM/ODM support as you grow"],
  ["Wholesalers & Distributors", "Stock, quick replenishment and private-label coordination"],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader languagePath="/about" />
      <PageHero
        eyebrow="Wholesale Finished Jewelry"
        title="About Zarivelle"
        subtitle="A finished jewelry supplier for boutiques, emerging brands, online sellers and wholesalers, with OEM/ODM support for larger programs."
      >
        <Link
          href="/wholesale"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Wholesale Catalog
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden rounded-md bg-[#e9e4d9]">
            <Image
              src="/images/b2b-factory-workshop.jpg"
              alt="ZARIVELLE jewelry production workshop"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-[#8a734b]">Who We Supply</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Finished jewelry, without the friction.
            </h2>
            <p className="mt-6 leading-8 text-[#596575]">
              Zarivelle supplies finished 925 silver, moissanite,
              lab-grown colored gemstone and lab-grown diamond jewelry from
              Wuzhou. Boutiques, brands and online sellers can order from
              finished collections with clear MOQ, pricing and lead times.
            </p>
            <p className="mt-5 leading-8 text-[#596575]">
              For larger collections, we also support OEM/ODM development,
              sampling, private label and packaging — without making custom
              work the default path for every buyer.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {partnershipFacts.map(([value, label]) => (
                <div key={value} className="border-t border-[#cbb06e] pt-4">
                  <p className="font-serif text-2xl text-[#17202a]">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Wholesale Supply"
            title="Built for overseas wholesale and repeat orders."
            copy="Each capability answers a practical question buyers ask before trusting a new jewelry supplier."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6">
                  <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                  <h2 className="font-serif text-2xl">{item.title}</h2>
                  <p className="mt-5 leading-7 text-[#596575]">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Globe2 aria-hidden="true" className="mb-6 h-7 w-7 text-[#e6cf96]" />
            <p className="mb-3 text-sm text-[#e6cf96]">B2B Partnership</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Flexible production, clear communication.
            </h2>
            <p className="mt-6 leading-8 text-white/76">
              Send a reference image, preferred stone, metal, quantity and target
              market. We can discuss a sample route before bulk production.
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-md border border-white/12 bg-white/7">
            <Image
              src="/images/b2b-manual-setting-workshop.webp"
              alt="Jewelry artisan working on custom stone setting"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Order Flow"
            title="From reference image to international shipment."
            copy="A clear four-step process keeps product decisions visible before production begins."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step} className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-6">
                <p className="text-sm text-[#8a734b]">0{index + 1}</p>
                <p className="mt-5 leading-7 text-[#344150]">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
