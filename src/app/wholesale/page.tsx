import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, PackageCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Wholesale 925 Silver & Lab-Grown Jewelry | Zarivelle 织澜",
  description:
    "Wholesale finished 925 silver, moissanite, colored lab-grown gemstone and lab-grown diamond jewelry for boutiques, brands and online sellers. Low MOQ, samples, fast dispatch and OEM/ODM support.",
  path: "/wholesale",
});

const categories = [
  {
    title: "925 Silver Finished Jewelry",
    copy: "Rings, earrings, pendants, bracelets and chains in finished 925 silver, ready for boutique and online collections.",
    image: "/images/b2b-sample-packaging.jpg",
    alt: "Finished 925 silver jewelry in wholesale packaging",
  },
  {
    title: "Moissanite Jewelry",
    copy: "Finished moissanite rings, studs, pendants and tennis styles with strong fire and wholesale pricing.",
    image: "/images/b2b-color-options.jpg",
    alt: "Moissanite finished jewelry color options",
  },
  {
    title: "Lab-Grown Colored Gemstones",
    copy: "Finished colored gemstone styles in lab-grown ruby, sapphire, emerald and fancy colors.",
    image: "/images/b2b-color-stone-inventory.jpg",
    alt: "Lab-grown colored gemstone inventory",
  },
  {
    title: "Lab-Grown Diamonds",
    copy: "Finished lab-grown diamond pieces with certificate options for premium wholesale collections.",
    image: "/images/b2b-certificate-packaging.jpg",
    alt: "Lab-grown diamond jewelry with certificate and packaging",
  },
];

const terms = [
  ["MOQ", "From 6–12 pieces per style; mixed-style orders where available"],
  ["Pricing", "Tiered wholesale pricing by quantity; quoted by style and finish"],
  ["Samples", "Sample orders confirmed by style, stock and finish"],
  ["Lead time", "In-stock dispatch or 7–15 days for quick replenishment"],
  ["Payment", "T/T; terms confirmed for repeat buyers"],
  ["Shipping", "DHL / FedEx / UPS with export packaging and tracking"],
];

const faqs = [
  {
    question: "Do you sell finished jewelry or only custom orders?",
    answer:
      "Both. Finished 925 silver, moissanite, lab-grown colored gemstone and lab-grown diamond styles are our main wholesale offer. OEM/ODM is available for larger programs.",
  },
  {
    question: "What is the MOQ?",
    answer:
      "Typical MOQ starts from 6–12 pieces per style, with mixed-style orders where stock allows. Final MOQ is confirmed by style, finish and current stock.",
  },
  {
    question: "Can I order samples?",
    answer:
      "Yes. Sample availability, cost and lead time are confirmed by style and stock status before payment.",
  },
  {
    question: "Can you add our logo or packaging?",
    answer:
      "Yes. Private-label cards, boxes, pouches and labels can be quoted for qualified orders. Logo and packaging details are confirmed before production.",
  },
];

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader />
      <PageHero
        eyebrow="Wholesale"
        title="Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry"
        subtitle="Finished jewelry for boutiques, brands and online sellers. Low MOQ. Fast dispatch. Consistent quality."
      >
        <Link
          href="/contact?source=wholesale"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Wholesale Catalog
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Finished Collections"
            title="What you can order"
            copy="Start with finished styles, then add categories as your collection grows."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-xl leading-tight">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#596575]">
                    {category.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8a734b]">
              Wholesale Without the Friction
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Clear MOQ. Clear pricing. Clear lead times.
            </h2>
            <p className="mt-6 leading-8 text-[#596575]">
              We keep the buying process simple: choose finished styles, confirm
              MOQ and finish, then receive a wholesale quote with stock status
              and lead time. No endless sampling cycle for standard pieces.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: BadgeCheck, title: "Low MOQ", copy: "Start from 6–12 pieces per style." },
                { icon: PackageCheck, title: "QC Photos", copy: "See your order before dispatch." },
                { icon: Truck, title: "Fast Dispatch", copy: "In-stock and quick-replenishment options." },
              ].map(({ icon: Icon, title, copy }) => (
                <div key={title} className="border-t border-[#cbb06e] pt-4">
                  <Icon aria-hidden="true" className="mb-3 h-5 w-5 text-[#a98945]" />
                  <p className="font-serif text-xl">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/b2b-finished-jewelry-qc.jpg"
                alt="Finished jewelry quality check before wholesale dispatch"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl">Wholesale terms at a glance</h3>
              <dl className="mt-5 divide-y divide-[#eee5d5]">
                {terms.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm">
                    <dt className="font-semibold text-[#17202a]">{label}</dt>
                    <dd className="text-[#596575]">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-5 text-[#7a6952]">
                Final MOQ, price, stock status and lead time are confirmed by
                style and finish before payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8a734b]">
              OEM / ODM
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Need a custom program? We can support that too.
            </h2>
            <p className="mt-6 leading-8 text-[#596575]">
              For larger collections, we support reference review, sample
              development, production, quality control and private-label
              packaging. Custom work is a secondary path, not a requirement for
              every order.
            </p>
            <Link
              href="/contact?source=wholesale-oem"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-5 py-3 text-sm font-semibold transition hover:bg-[#17202a] hover:text-white"
            >
              Discuss an OEM/ODM Project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#e3dbcb]">
            <Image
              src="/images/b2b-factory-workshop.jpg"
              alt="Zarivelle jewelry workshop for OEM and ODM programs"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Wholesale questions" />
          <div className="mt-8 divide-y divide-[#e3dbcb] border-y border-[#e3dbcb]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-[#596575]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121923] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#e6cf96]">
              Wholesale Inquiry
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              Request our wholesale catalog or sample kit.
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Tell us your market, target styles and quantity. We will confirm
              MOQ, pricing and lead time.
            </p>
          </div>
          <Link
            href="/contact?source=wholesale"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
          >
            Request Wholesale Catalog
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
