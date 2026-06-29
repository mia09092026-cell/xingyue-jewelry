import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Gem, PackageCheck, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products, processSteps } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";
import { getCollectionLandingPage } from "@/lib/collection-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | XINGYUE",
    };
  }

  return createPageMetadata({
    title: `${product.name} | Wholesale Jewelry | XINGYUE`,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const collection = getCollectionLandingPage(product.collectionSlug);

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          ...(collection
            ? [
                {
                  name: collection.title,
                  path: `/collections/${collection.slug}`,
                },
              ]
            : []),
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd data={productSchema(product)} />
      <SiteHeader />
      <nav aria-label="Breadcrumb" className="border-b border-[#e7ddc8] bg-[#fbfaf7] px-5 py-4 sm:px-8">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-[#596575]">
          <li>
            <Link href="/" className="transition hover:text-[#17202a]">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/collections" className="transition hover:text-[#17202a]">Collections</Link>
          </li>
          {collection ? (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="transition hover:text-[#17202a]"
                >
                  {collection.eyebrow}
                </Link>
              </li>
            </>
          ) : null}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#17202a]">{product.name}</li>
        </ol>
      </nav>
      <PageHero
        eyebrow="Wholesale Product"
        title={product.name}
        subtitle={product.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
          >
            Request Wholesale Quote
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href={collection ? `/collections/${collection.slug}` : "/collections"}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8c28a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
          >
            {collection ? `Back to ${collection.eyebrow}` : "Back to Collections"}
            <Gem aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="relative min-h-[460px] overflow-hidden rounded-md bg-[#17202a] shadow-sm">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {product.gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#e3dbcb] bg-white"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm">
            <p className="mb-3 text-sm text-[#8a734b]">{product.category}</p>
            <h2 className="font-serif text-4xl">Quote Information</h2>
            <p className="mt-6 leading-8 text-[#596575]">{product.description}</p>
            <div className="mt-8 grid gap-3">
              {[
                ["Stone", product.stone],
                ["Metal", product.material],
                ["Setting", product.setting],
                ["Wholesale", product.wholesale],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-[#f8f6ef] p-4">
                  <p className="text-sm text-[#8a734b]">{label}</p>
                  <p className="mt-1 font-medium text-[#17202a]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {product.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-4"
                >
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#a98945]" />
                  <p className="leading-7 text-[#344150]">{highlight}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542] sm:w-auto"
            >
              Send Inquiry
              <Send aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="B2B Selling Points"
            title="Visual proof for wholesale buyers."
            copy="These sections show the parts buyers usually care about before sending an inquiry: supply, testing, packaging and customization."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {product.b2bSellingPoints.map((point) => (
              <article
                key={point.title}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-[#f4efe3]">
                  <Image
                    src={point.image}
                    alt={point.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl">{point.title}</h2>
                  <p className="mt-5 leading-7 text-[#596575]">{point.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Specification"
            title="Quote-ready product details."
            copy={product.priceNote}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {product.specs.map(([label, value]) => (
              <div key={label} className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-5">
                <p className="text-sm text-[#8a734b]">{label}</p>
                <p className="mt-2 font-medium text-[#17202a]">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-md bg-[#17202a] p-6 text-white">
            <PackageCheck aria-hidden="true" className="mb-5 h-6 w-6 text-[#e6cf96]" />
            <h3 className="font-serif text-2xl">Wholesale Note</h3>
            <p className="mt-4 leading-8 text-white/76">
              {product.wholesale}. Please send target quantity, reference photo,
              stone size, metal, certificate needs and packaging requirements for
              an accurate quotation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Custom Process"
            title="From reference image to shipment."
            copy="A simple inquiry flow helps buyers understand what information to prepare before production."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6">
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
