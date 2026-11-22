import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gem,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { products } from "@/lib/site-data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/structured-data";
import { contactInquiryHref } from "@/lib/contact-links";

const bracelets = products.filter(
  (product) =>
    product.series === "925-silver" && product.category === "Bracelets",
);

const heroBracelet =
  bracelets.find((product) => product.slug.startsWith("moissanite-bracelet-")) ??
  bracelets[0];
const heroImage = heroBracelet?.image ?? "/images/b2b-sample-packaging.jpg";

export const metadata: Metadata = createPageMetadata({
  title: "Wholesale Moissanite Bracelets | 925 Silver Tennis Bracelets",
  description:
    "Source wholesale moissanite bracelets and 925 sterling silver tennis bracelets from a Wuzhou workshop: tennis, flower, round link and station styles. Mix in-stock bracelets to USD 800; custom runs from 30 pieces.",
  path: "/wholesale/moissanite-bracelets",
  image: heroImage,
});

const specs = [
  ["Metal", "925 sterling silver; rhodium or 18K gold plating"],
  ["Stones", "Moissanite, zircon, lab-grown colored gemstone or lab-grown diamond by order"],
  ["Styles", "Tennis, flower, round link and station bracelets"],
  ["Lengths", "6.5\", 7\", 7.5\" and 8\" in stock; custom lengths confirmed by order"],
  ["Clasp", "Lobster clasp, box clasp or spring ring; confirmed per SKU"],
  ["Finish", "Rhodium, white gold tone, yellow gold tone or rose gold tone"],
  ["MOQ", "Ready stock: USD 800 total, mix any in-stock styles. Custom: 30 pcs per design"],
  ["Lead time", "In-stock dispatch; custom production confirmed per order (typically 15–25 days after approval)"],
  ["Packaging", "Poly bag, pouch, gift box or private-label packaging"],
  ["QC", "Length, clasp function, stone setting, flexibility and plating check"],
];

const customization = [
  {
    title: "Bracelet length",
    copy: "6.5\", 7\", 7.5\" and 8\" are the common stock lengths. Custom lengths and extenders can be confirmed for production orders.",
  },
  {
    title: "Clasp type",
    copy: "Lobster clasp, box clasp and spring ring are the common options. Clasp type and safety details are confirmed per style.",
  },
  {
    title: "Stone type and size",
    copy: "Moissanite, zircon, lab-grown colored stones and lab-grown diamonds can be quoted by cut, size and matching requirements.",
  },
  {
    title: "Plating and finish",
    copy: "Rhodium, white, yellow or rose gold tone. Finish and plating details are confirmed for the order before production.",
  },
  {
    title: "Logo and clasp tag",
    copy: "A small logo tag or clasp detail is available on custom runs from 30 pieces per design, after artwork approval.",
  },
  {
    title: "Packaging",
    copy: "Pouches, boxes and labels can be quoted with the bracelets for retail-ready delivery.",
  },
];

const steps = [
  ["Send your brief", "Share the SKU or reference photo, bracelet length, clasp, stone type, plating and quantity."],
  ["Confirm availability", "We check stock, stone matching and finish options before quoting."],
  ["Approve the sample", "Optional for new styles; sample details and cost are confirmed first."],
  ["Production and QC", "Length, clasp function, setting, flexibility and plating are checked before packing."],
  ["Ship with tracking", "Export packing and DHL / FedEx / UPS tracking are shared after dispatch."],
];

const faqs = [
  {
    question: "What is the minimum order for wholesale moissanite bracelets?",
    answer:
      "Ready-stock bracelets start at USD 800 total and you can mix any in-stock styles. Custom bracelets start at 30 pieces per design, including logo and packaging.",
  },
  {
    question: "What bracelet lengths are available?",
    answer:
      "6.5-inch, 7-inch, 7.5-inch and 8-inch lengths are the common stock options. Custom lengths and extenders can be confirmed for production orders.",
  },
  {
    question: "What clasp types are available?",
    answer:
      "Lobster clasp, box clasp and spring ring are the common options. Clasp type and safety details are confirmed per SKU before quotation.",
  },
  {
    question: "Can I mix tennis and link styles in one order?",
    answer:
      "Yes. Ready-stock tennis, flower, round link and station bracelets can be mixed to reach the USD 800 order minimum.",
  },
  {
    question: "Are the stones moissanite or zircon?",
    answer:
      "Both can be quoted. Stone type is confirmed per SKU before quotation; lab-grown colored stones and lab-grown diamonds can also be discussed.",
  },
  {
    question: "Can I order one sample before a full run?",
    answer:
      "Yes, sample availability, cost and lead time are confirmed by style and stock status. Sample-first approval is recommended for new custom designs.",
  },
  {
    question: "How long does production take?",
    answer:
      "In-stock bracelets are prepared for dispatch after payment and stock confirmation. Custom production is typically 15–25 days after sample approval, confirmed per order.",
  },
];

export default function MoissaniteBraceletsWholesalePage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale", path: "/wholesale" },
          { name: "Moissanite Bracelets", path: "/wholesale/moissanite-bracelets" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Wholesale Moissanite Bracelets",
          itemListElement: bracelets.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: absoluteUrl(`/products/${product.slug}`),
          })),
        }}
      />
      <SiteHeader />

      <nav aria-label="Breadcrumb" className="border-b border-[#e7ddc8] bg-[#fbfaf7] px-5 py-4 sm:px-8">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-[#596575]">
          <li>
            <Link href="/" className="transition hover:text-[#17202a]">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/wholesale" className="transition hover:text-[#17202a]">Wholesale</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#17202a]">Moissanite Bracelets</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Wholesale Moissanite Bracelets"
        title="Wholesale Moissanite Bracelets & 925 Silver Tennis Bracelets"
        subtitle="Ready-stock tennis, flower, link and station bracelets from Wuzhou — mix styles to USD 800, or move to 30-piece custom production with your logo and packaging."
      >
        <Link
          href={contactInquiryHref({ source: "wholesale-moissanite-bracelets" })}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Bracelet Catalog
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <Link
          href="/products/series/925-silver"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8c28a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
        >
          Browse All 925 Silver
          <Gem aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Factory-Direct Bracelets"
              title="Finished 925 silver bracelets for boutiques and online sellers."
              copy="Zarivelle is a jewelry workshop in Wuzhou, Guangxi, supplying finished 925 sterling silver bracelets to boutiques, online sellers and emerging brands. The range covers tennis, flower, round link and station styles set with moissanite, zircon or lab-grown stones."
            />
            <div className="mt-8 space-y-5 leading-8 text-[#596575]">
              <p>
                Buyers can start with ready-stock bracelets and mix styles to
                reach the USD 800 order minimum, then move into 30-piece custom
                production when a style proves itself. Custom runs can include
                length changes, clasp changes, plating changes and private-label
                packaging.
              </p>
              <p>
                Every quotation is built around the actual bracelet, length,
                clasp, stone type, plating and quantity. Material and
                availability are confirmed before payment, so the bracelet you
                approve is the bracelet that ships.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Ready stock — mix any in-stock styles",
                "Moissanite, zircon and lab-grown options",
                "6.5\", 7\", 7.5\" and 8\" stock lengths",
                "Rhodium and 18K gold-tone plating",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#344150]">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#a98945]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-white shadow-sm">
            <Image
              src={heroImage}
              alt="Wholesale 925 sterling silver moissanite tennis bracelet"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ready-Stock Bracelet Styles"
            title="Tennis and link bracelets you can order now."
            copy="These are real ready-stock SKUs. Mix any styles to reach the USD 800 order minimum; stone type and current availability are confirmed before quotation."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bracelets.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Specs & Terms"
            title="What is confirmed before you order."
            copy="Wholesale terms are kept practical: clear metal, stone, length, clasp and packaging details before the order is confirmed."
          />
          <div className="mt-10 overflow-hidden rounded-md border border-[#e3dbcb] bg-white">
            {specs.map(([label, value], index) => (
              <div
                key={label}
                className={`grid gap-2 px-6 py-4 sm:grid-cols-[180px_1fr] ${
                  index > 0 ? "border-t border-[#eee6d6]" : ""
                }`}
              >
                <dt className="text-sm font-semibold text-[#17202a]">{label}</dt>
                <dd className="text-sm leading-6 text-[#596575]">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customization"
            title="What can be changed on a bracelet order."
            copy="Start from a stock style or send a reference. These are the details buyers usually change first."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customization.map((item) => (
              <article key={item.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <Ruler aria-hidden="true" className="mb-5 h-5 w-5 text-[#a98945]" />
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ordering Process"
            title="From brief to shipment."
            copy="A simple workflow keeps the quotation, sample and production steps clear."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {steps.map(([title, copy], index) => (
              <article key={title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <span className="text-sm font-semibold text-[#a98945]">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#596575]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Quality & Packaging"
              title="Checked before the bracelets are packed."
              copy="Each order is confirmed against its own specification instead of relying on blanket claims."
              tone="dark"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Material check", copy: "Metal, plating and stone type are checked against the approved order." },
                { icon: Gem, title: "Stone setting", copy: "Stone size, cut and setting are checked across the bracelet." },
                { icon: Ruler, title: "Length and clasp", copy: "Bracelet length, clasp function and end connections are verified." },
                { icon: PackageCheck, title: "Packaging", copy: "Pouches, boxes and labels are checked with the finished order." },
              ].map((item) => (
                <article key={item.title} className="rounded-md border border-white/12 bg-white/7 p-6">
                  <item.icon aria-hidden="true" className="mb-4 h-5 w-5 text-[#e6cf96]" />
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/72">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Shipping"
              title="Export packing and tracking."
              copy="In-stock and custom orders are packed for export with tracking shared after dispatch."
              tone="dark"
            />
            <div className="space-y-4">
              {[
                "DHL / FedEx / UPS with tracking",
                "Poly bag, pouch or gift box",
                "Private-label cards and labels by order",
                "Pre-shipment photos for approval",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-white/12 bg-white/7 p-5">
                  <Truck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#e6cf96]" />
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-md border border-[#e6cf96]/30 bg-[#e6cf96]/10 p-5">
              <p className="text-sm leading-6 text-white/80">
                Ready-stock bracelets: USD 800 total, mix styles. Custom
                bracelets: 30 pcs per design, including logo and packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Buyer FAQs"
            title="Questions before a bracelet order."
            copy="Short answers to the questions buyers ask most often before requesting a wholesale quote."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <h2 className="font-serif text-2xl text-[#17202a]">{faq.question}</h2>
                <p className="mt-4 leading-7 text-[#596575]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Related Wholesale Pages"
            title="Keep sourcing in context."
            copy="Use these pages to compare categories, materials and the wider 925 silver range."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "925 silver rings", href: "/wholesale/925-silver-rings", copy: "Ready-stock solitaire, halo, eternity and statement rings." },
              { title: "Moissanite necklaces", href: "/wholesale/moissanite-necklaces", copy: "Pendant and station necklaces in 925 silver." },
              { title: "Moissanite earrings", href: "/wholesale/moissanite-earrings", copy: "Round, halo, heart and butterfly stud earrings." },
              { title: "All 925 silver jewelry", href: "/products/series/925-silver", copy: "Browse the full ready-stock 925 silver catalog." },
              { title: "Moissanite wholesale", href: "/collections/moissanite-wholesale", copy: "Loose stones and finished moissanite jewelry." },
              { title: "Wholesale terms", href: "/wholesale", copy: "MOQ, samples, pricing and shipping overview." },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm transition hover:border-[#a98945]/60"
              >
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#596575]">{item.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8a734b]">
                  Open page
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">Contact</p>
              <h2 className="font-serif text-4xl">Ready to price your bracelet assortment?</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">
                Send the bracelet styles or reference photos, length, clasp, stone
                preference, plating and quantity. We will confirm stock and
                prepare the next step for your quote.
              </p>
            </div>
            <Link
              href={contactInquiryHref({ source: "wholesale-moissanite-bracelets" })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              Request a Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
