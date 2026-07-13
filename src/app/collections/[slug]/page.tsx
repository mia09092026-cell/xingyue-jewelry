import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, PackageSearch, Sparkles, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collectionLandingPages, getCollectionLandingPage } from "@/lib/collection-data";
import { products } from "@/lib/site-data";
import { getLanguageAlternates, isLocalizedCollectionSlug } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, faqPageSchema } from "@/lib/structured-data";
import { contactInquiryHref } from "@/lib/contact-links";

type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collectionLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionLandingPage(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | XINGYUE",
    };
  }

  return createPageMetadata({
    title: collection.metaTitle,
    description: collection.metaDescription,
    path: `/collections/${collection.slug}`,
    image: collection.image,
    languages: isLocalizedCollectionSlug(collection.slug)
      ? getLanguageAlternates(`/collections/${collection.slug}`)
      : undefined,
  });
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionLandingPage(slug);

  if (!collection) {
    notFound();
  }

  const relatedProducts = products.filter((product) =>
    collection.relatedProductSlugs.includes(product.slug),
  );

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: collection.title, path: `/collections/${collection.slug}` },
        ])}
      />
      <JsonLd data={faqPageSchema(collection.faqs)} />
      <SiteHeader
        languagePath={
          isLocalizedCollectionSlug(collection.slug)
            ? `/collections/${collection.slug}`
            : undefined
        }
      />
      <nav aria-label="Breadcrumb" className="border-b border-[#e7ddc8] bg-[#fbfaf7] px-5 py-4 sm:px-8">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-[#596575]">
          <li>
            <Link href="/" className="transition hover:text-[#17202a]">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="transition hover:text-[#17202a]">Products</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#17202a]">{collection.eyebrow}</li>
        </ol>
      </nav>
      <PageHero eyebrow={collection.eyebrow} title={collection.title} subtitle={collection.description}>
        <Link
          href={contactInquiryHref({
            sourcePath: `/collections/${collection.slug}`,
            interest: collection.eyebrow,
          })}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request a Quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative min-h-[420px] overflow-hidden rounded-md bg-[#17202a] shadow-sm">
            <Image
              src={collection.image}
              alt={collection.alt}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="Sourcing Options"
              title="How buyers can work with this collection."
              copy="Use these options to shape the order around loose stones, finished jewelry or a mixed assortment built for repeat wholesale work."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {collection.options.map((option) => (
                <div
                  key={option}
                  className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-4 shadow-sm"
                >
                  <p className="leading-7 text-[#344150]">{option}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="What this collection is built to support."
            copy="The page keeps the focus on practical production planning, not on speculative promises."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {collection.capabilities.map((capability, index) => {
              const icons = [Sparkles, ShieldCheck, PackageSearch, Sparkles];
              const Icon = icons[index % icons.length];

              return (
                <article
                  key={capability}
                  className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm"
                >
                  <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                  <p className="leading-7 text-[#344150]">{capability}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customization"
            title="Customization Options"
            copy="Define the details that matter to your assortment before the sample and quotation are confirmed."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {collection.customization.map((item) => (
              <article key={item} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
                <Check aria-hidden="true" className="mb-5 h-5 w-5 text-[#a98945]" />
                <p className="leading-7 text-[#344150]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Examples"
            title="Relevant products from this collection."
            copy="These sample products are filtered from the product catalog using the collection's related product slugs."
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Quality & Documentation"
              title="Quality & Project Confirmation"
              copy="Commercial details are confirmed against the individual order instead of presented as blanket promises."
              tone="dark"
            />
            <div className="grid gap-4">
              {collection.qualityNotes.map((note) => (
                <article key={note.title} className="rounded-md border border-white/12 bg-white/7 p-6">
                  <ShieldCheck aria-hidden="true" className="mb-5 h-5 w-5 text-[#e6cf96]" />
                  <h3 className="font-serif text-2xl">{note.title}</h3>
                  <p className="mt-4 leading-7 text-white/72">{note.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Buyer Knowledge"
              title="Related Education"
              copy="Use these guides to prepare a clearer sourcing brief before requesting a quote."
              tone="dark"
            />
            <div className="grid gap-4">
              {collection.educationLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-md border border-white/12 bg-white/7 p-6 transition hover:border-[#e6cf96]/60"
                >
                  <BookOpen aria-hidden="true" className="mb-5 h-5 w-5 text-[#e6cf96]" />
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-4 leading-7 text-white/72">{item.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e6cf96]">
                    Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Buyer FAQs"
            title="Short answers before a quote request."
            copy="These questions help first-time buyers understand the scope of the collection without adding unsupported claims."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {collection.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm"
              >
                <h2 className="font-serif text-2xl text-[#17202a]">{faq.question}</h2>
                <p className="mt-4 leading-7 text-[#596575]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">Contact</p>
              <h2 className="font-serif text-4xl">Ready to build your jewelry collection?</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">
                Send your target style, reference photo, stone size, metal,
                certificate needs and quantity. We will prepare the next step for
                your quote.
              </p>
            </div>
            <Link
              href={contactInquiryHref({
                sourcePath: `/collections/${collection.slug}`,
                interest: collection.eyebrow,
              })}
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
