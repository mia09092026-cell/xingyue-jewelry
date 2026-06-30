import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShieldCheck, Sparkles } from "lucide-react";
import { collectionLandingPages } from "@/lib/collection-data";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { b2bInquiryProofs, collectionCategories, products } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";
import { contactInquiryHref } from "@/lib/contact-links";

export const metadata: Metadata = createPageMetadata({
  title: "Collections | XINGYUE B2B Jewelry Factory",
  description:
    "Browse moissanite wholesale, lab-grown diamonds, colored gemstones, Cuban chains, tennis chains and OEM jewelry production options.",
  path: "/collections",
});

const serviceHighlights = [
  {
    title: "Photo-to-Sample Customization",
    copy: "Send reference images, stone size, metal, quantity and packaging needs for sample discussion.",
    icon: Sparkles,
  },
  {
    title: "Factory Production Support",
    copy: "One-stop workflow from loose stone matching to finished jewelry, QC and shipment.",
    icon: Factory,
  },
  {
    title: "B2B Quality Assurance",
    copy: "Testing, certificate options and inspection visuals help overseas buyers build confidence.",
    icon: ShieldCheck,
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          collectionLandingPages.map((page) => ({
            name: page.title,
            path: `/collections/${page.slug}`,
          })),
        )}
      />
      <SiteHeader />
      <PageHero
        eyebrow="B2B Collections"
        title="Collections"
        subtitle="Moissanite, lab-grown diamonds, colored gemstones, Cuban chains, tennis chains and custom jewelry manufacturing for wholesale buyers."
      >
        <Link
          href={contactInquiryHref({
            sourcePath: "/collections",
            interest: "B2B jewelry collections",
          })}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Collection Quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Structure"
            title="Wholesale categories built for fast inquiry."
            copy="Each category is designed to help overseas customers understand what they can source, customize and repeat order."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collectionCategories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-[#f4efe3]">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl">{category.title}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{category.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] px-3 py-2 text-sm text-[#344150]"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Collection Pages"
            title="Dedicated landing pages for each buying path."
            copy="These links expose the six collection landing pages directly so overseas buyers can jump to the right sourcing path."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collectionLandingPages.map((page) => (
              <Link
                key={page.slug}
                href={`/collections/${page.slug}`}
                className="group rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#cbb06e]"
              >
                <p className="mb-3 text-sm text-[#8a734b]">{page.eyebrow}</p>
                <h2 className="font-serif text-2xl text-[#17202a]">{page.title}</h2>
                <p className="mt-4 leading-7 text-[#596575]">{page.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]">
                  View Collection
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm text-[#e6cf96]">B2B Inquiry Proof</p>
              <h2 className="text-balance font-serif text-4xl leading-tight text-white">
                What overseas buyers usually want to confirm.
              </h2>
            </div>
            <p className="max-w-2xl leading-7 text-white/72">
              These visual selling points help the page feel like a real factory
              inquiry site, not only a product gallery.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {b2bInquiryProofs.map((proof) => (
              <article
                key={proof.title}
                className="overflow-hidden rounded-md border border-white/12 bg-white/7"
              >
                <div className="relative aspect-[4/3] bg-white/8">
                  <Image
                    src={proof.image}
                    alt={proof.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-2xl text-white">{proof.title}</h2>
                  <p className="mt-4 leading-7 text-white/72">{proof.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Examples"
            title="Quote-ready product examples."
            copy="The first product cards now use real images and are structured for wholesale inquiry rather than retail checkout."
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-[#a98945]" />
                  <h2 className="font-serif text-2xl">{item.title}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
