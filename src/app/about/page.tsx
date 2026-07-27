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
  title: "About Our Own Jewelry Factory | Xingyue Jewelry",
  description:
    "Meet Xingyue Jewelry's own factory in Wuzhou for lab-grown diamond jewelry, OEM/ODM development, samples, production and quality checks.",
  path: "/about",
  languages: getLanguageAlternates("/about"),
});

const capabilities = [
  {
    title: "Loose Stone Expertise",
    copy: "Moissanite, lab-grown diamonds, colored gemstones and zirconia selected for stable repeat supply.",
    icon: Gem,
  },
  {
    title: "OEM / ODM Manufacturing",
    copy: "Photo-to-sample development, S925 silver production and custom 10K, 14K or 18K gold settings.",
    icon: Factory,
  },
  {
    title: "Export-Ready Quality Control",
    copy: "Material confirmation, stone matching, inspection, certificate options and packaging before shipment.",
    icon: PackageCheck,
  },
];

const partnershipFacts = [
  ["Emerging Brands", "Development support for growing jewelry businesses"],
  ["Boutique Jewelry Stores & Design Studios", "Flexible planning for stores and independent designers"],
  ["Global B2B", "Wholesale, OEM / ODM and private-label coordination"],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader languagePath="/about" />
      <PageHero
        eyebrow="How We Work With Brands"
        title="About XINGYUE"
        subtitle="Our own jewelry factory in Wuzhou supports lab-grown diamond jewelry and OEM/ODM projects for brands, boutique stores, designers and wholesale buyers."
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Start a Partnership Inquiry
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden rounded-md bg-[#e9e4d9]">
            <Image
              src="/images/b2b-factory-workshop.jpg"
              alt="XINGYUE jewelry production workshop"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-[#8a734b]">Who We Support</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              One partner, one coordinated workflow.
            </h2>
            <p className="mt-6 leading-8 text-[#596575]">
              Xingyue operates our own jewelry factory in Wuzhou. Buyers work
              directly with our manufacturing team to review stones and
              materials, develop CAD and samples, coordinate production,
              inspect finished jewelry and prepare packaging and shipment.
            </p>
            <p className="mt-5 leading-8 text-[#596575]">
              Our core range covers moissanite, lab-grown diamonds, lab-grown
              colored gemstones, zirconia, Cuban chains, tennis chains, rings,
              necklaces and bracelets.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {partnershipFacts.map(([value, label]) => (
                <div key={value} className="border-t border-[#cbb06e] pt-4">
                  <p className="font-serif text-2xl text-[#17202a]">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/factory"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a] underline decoration-[#cbb06e] underline-offset-4"
            >
              Visit Our Factory Page
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Integrated Supply"
            title="Built for overseas inquiry and repeat production."
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
