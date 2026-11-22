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

const rings = products.filter(
  (product) => product.series === "925-silver" && product.category === "Rings",
);

const heroRing =
  rings.find((product) => product.slug.startsWith("moissanite-ring-")) ?? rings[0];
const ringImage = heroRing?.image ?? "/images/b2b-sample-packaging.jpg";

export const metadata: Metadata = createPageMetadata({
  title: "Wholesale 925 Sterling Silver Rings | Moissanite & Gemstone Rings",
  description:
    "Source ready-stock 925 sterling silver rings from a Wuzhou jewelry workshop: moissanite, lab-grown gemstone and CZ styles. Mix in-stock rings to USD 800; custom production from 30 pieces per design.",
  path: "/wholesale/925-silver-rings",
  image: ringImage,
});

const specs = [
  ["Metal", "925 sterling silver; rhodium or 18K gold plating"],
  ["Stones", "Moissanite, CZ, lab-grown colored gemstone or lab-grown diamond by order"],
  ["Ring sizes", "US 5–10 in stock; custom sizes confirmed by order"],
  ["Finish", "Rhodium, white gold tone, yellow gold tone or rose gold tone"],
  ["MOQ", "Ready stock: USD 800 total, mix any in-stock styles. Custom: 30 pcs per design"],
  ["Lead time", "In-stock dispatch; custom production confirmed per order (typically 15–25 days after approval)"],
  ["Packaging", "Poly bag, pouch, gift box or private-label packaging"],
  ["QC", "Stone matching, setting check, plating, size and pre-shipment photos"],
];

const customization = [
  {
    title: "Ring size and width",
    copy: "Stock sizes can be mixed; custom sizes and band widths are confirmed against your size chart before production.",
  },
  {
    title: "Stone type and size",
    copy: "Moissanite, CZ, lab-grown colored stones and lab-grown diamonds can be quoted by cut, size, color and matching requirements.",
  },
  {
    title: "Plating and finish",
    copy: "Rhodium, white, yellow or rose gold tone. Plating thickness and finish are confirmed for the specific order.",
  },
  {
    title: "Logo and engraving",
    copy: "Inside-band logo or short engraving is available on custom runs from 30 pieces per design, after artwork approval.",
  },
  {
    title: "Packaging",
    copy: "Cards, pouches, boxes and labels can be quoted with the rings so the assortment arrives retail-ready.",
  },
  {
    title: "Sample-first development",
    copy: "For new styles, approve a sample before the full run. Sample cost and lead time are confirmed by style and stock.",
  },
];

const steps = [
  ["Send your brief", "Share the SKU or reference photo, ring size, stone type, plating and quantity."],
  ["Confirm availability", "We check stock, stone matching and finish options before quoting."],
  ["Approve the sample", "Optional for new styles; sample details and cost are confirmed first."],
  ["Production and QC", "Material, setting, plating, size and surface are checked before packing."],
  ["Ship with tracking", "Export packing and DHL / FedEx / UPS tracking are shared after dispatch."],
];

const faqs = [
  {
    question: "What is the minimum order for wholesale 925 silver rings?",
    answer:
      "Ready-stock rings start at USD 800 total and you can mix any in-stock styles. Custom rings start at 30 pieces per design, including logo and packaging.",
  },
  {
    question: "Can I mix ring styles in one order?",
    answer:
      "Yes. Ready-stock rings can be mixed across solitaire, halo, eternity and statement styles to reach the USD 800 order minimum.",
  },
  {
    question: "Are the stones moissanite or cubic zirconia?",
    answer:
      "Both options are available. Stone type is confirmed per SKU before quotation; lab-grown colored gemstones and lab-grown diamonds can also be quoted.",
  },
  {
    question: "Can I order one sample before a full run?",
    answer:
      "Yes, sample availability, cost and lead time are confirmed by style and stock status. Sample-first approval is recommended for new custom designs.",
  },
  {
    question: "Can you put our logo inside the ring band?",
    answer:
      "Yes, on custom runs from 30 pieces per design. Logo artwork, size and placement are confirmed before production.",
  },
  {
    question: "What ring sizes do you stock?",
    answer:
      "Common US sizes are available in stock and confirmed per SKU. Custom sizes can be produced with a confirmed size chart.",
  },
  {
    question: "How long does production take?",
    answer:
      "In-stock rings are prepared for dispatch after payment and stock confirmation. Custom production is typically 15–25 days after sample approval, confirmed per order.",
  },
];

export default function SilverRingsWholesalePage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale", path: "/wholesale" },
          { name: "925 Silver Rings", path: "/wholesale/925-silver-rings" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Wholesale 925 Sterling Silver Rings",
          itemListElement: rings.map((product, index) => ({
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
          <li aria-current="page" className="text-[#17202a]">925 Silver Rings</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Wholesale 925 Silver Rings"
        title="Wholesale 925 Sterling Silver Rings"
        subtitle="Ready-stock moissanite and gemstone rings from Wuzhou — mix styles to USD 800, or move to 30-piece custom production with your logo and packaging."
      >
        <Link
          href={contactInquiryHref({ source: "wholesale-925-silver-rings" })}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Ring Catalog
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
              eyebrow="Factory-Direct Rings"
              title="Finished 925 silver rings for boutiques and online sellers."
              copy="Zarivelle is a jewelry workshop in Wuzhou, Guangxi, supplying finished 925 sterling silver rings to boutiques, online sellers and emerging brands. The range covers solitaire, halo, eternity, cluster and statement styles set with moissanite, lab-grown colored gemstones, CZ or lab-grown diamonds."
            />
            <div className="mt-8 space-y-5 leading-8 text-[#596575]">
              <p>
                Buyers can start with ready-stock rings and mix styles to reach the
                USD 800 order minimum, then move into 30-piece custom production
                when a design proves itself. Custom runs can include logo
                engraving, plating changes and private-label packaging.
              </p>
              <p>
                Every quotation is built around the actual style, stone size,
                metal, plating and quantity. Material and availability are
                confirmed before payment, so the ring you approve is the ring that
                ships.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Ready stock — mix any in-stock styles",
                "Moissanite, CZ and lab-grown stone options",
                "US 5–10 stock sizes; custom sizes by order",
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
              src={ringImage}
              alt="Wholesale 925 sterling silver moissanite ring"
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
            eyebrow="Ready-Stock Ring Styles"
            title="Ring styles you can order now."
            copy="These are real ready-stock SKUs. Mix any styles to reach the USD 800 order minimum; stone type and current availability are confirmed before quotation."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rings.map((product) => (
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
            copy="Wholesale terms are kept practical: clear metal, stone, size, plating and packaging details before the order is confirmed."
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
            title="What can be changed on a ring order."
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
              title="Checked before the rings are packed."
              copy="Each order is confirmed against its own specification instead of relying on blanket claims."
              tone="dark"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Material check", copy: "Metal, plating and stone type are checked against the approved order." },
                { icon: Gem, title: "Stone matching", copy: "Stone size, cut and color are matched before setting and packing." },
                { icon: Ruler, title: "Size check", copy: "Ring size and band width are verified against the confirmed size chart." },
                { icon: PackageCheck, title: "Packaging", copy: "Cards, pouches, boxes and labels are checked with the finished order." },
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
                Ready-stock rings: USD 800 total, mix styles. Custom rings: 30 pcs
                per design, including logo and packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Buyer FAQs"
            title="Questions before a ring order."
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
            copy="Use these pages to compare materials, terms and the wider 925 silver range."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Moissanite necklaces", href: "/wholesale/moissanite-necklaces", copy: "Pendant and station necklaces in 925 silver." },
              { title: "All 925 silver jewelry", href: "/products/series/925-silver", copy: "Browse the full ready-stock 925 silver catalog." },
              { title: "Moissanite wholesale", href: "/collections/moissanite-wholesale", copy: "Loose stones and finished moissanite jewelry." },
              { title: "Wholesale terms", href: "/wholesale", copy: "MOQ, samples, pricing and shipping overview." },
              { title: "Choosing a 925 silver manufacturer", href: "/resources/choose-925-sterling-silver-jewelry-manufacturer", copy: "What to check before a first order." },
              { title: "First wholesale silver order", href: "/resources/first-wholesale-sterling-silver-jewelry-order", copy: "A practical first-order checklist." },
              { title: "Moissanite vs cubic zirconia", href: "/resources/moissanite-vs-cubic-zirconia", copy: "Material differences buyers should know." },
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
              <h2 className="font-serif text-4xl">Ready to price your ring assortment?</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">
                Send the ring styles or reference photos, sizes, stone preference,
                plating and quantity. We will confirm stock and prepare the next
                step for your quote.
              </p>
            </div>
            <Link
              href={contactInquiryHref({ source: "wholesale-925-silver-rings" })}
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
