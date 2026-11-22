import Link from "next/link";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  catalogSeriesMeta,
  getSeriesPageCount,
  getStockProductsBySeries,
  type StockSeries,
} from "@/lib/catalog";
import { contactInquiryHref } from "@/lib/contact-links";

type SeriesCatalogProps = {
  series: StockSeries;
  page: number;
  pageSize?: number;
};

function pageHref(series: StockSeries, page: number) {
  return page <= 1
    ? `/products/series/${series}`
    : `/products/series/${series}/page/${page}`;
}

export function SeriesCatalog({ series, page, pageSize = 48 }: SeriesCatalogProps) {
  const meta = catalogSeriesMeta[series];
  const allProducts = getStockProductsBySeries(series);
  const totalPages = getSeriesPageCount(series, pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleProducts = allProducts.slice(start, start + pageSize);

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader languagePath="/products" />
      <PageHero eyebrow="Ready Stock" title={meta.title} subtitle={meta.copy}>
        <Link
          href={contactInquiryHref({ source: "products", interest: "other" })}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
        >
          Request Wholesale Quote
          <Send aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageHero>

      <nav aria-label="Breadcrumb" className="border-b border-[#e7ddc8] bg-[#fbfaf7] px-5 py-4 sm:px-8">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-[#596575]">
          <li>
            <Link href="/" className="transition hover:text-[#17202a]">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="transition hover:text-[#17202a]">Products</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#17202a]">{meta.title}</li>
        </ol>
      </nav>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#8a734b]">
                {allProducts.length} ready-stock SKU{allProducts.length === 1 ? "" : "s"}
              </p>
              <h2 className="mt-2 font-serif text-3xl">Shop {meta.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#596575]">
              {meta.description} Ready-stock orders start at USD 800 total and can mix any in-stock styles.
            </p>
          </div>

          {series === "925-silver" ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/wholesale/925-silver-rings"
                className="rounded-full border border-[#d8c28a] px-4 py-2 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                Shop 925 silver rings
              </Link>
              <Link
                href="/wholesale/moissanite-necklaces"
                className="rounded-full border border-[#d8c28a] px-4 py-2 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                Shop moissanite necklaces
              </Link>
              <Link
                href="/wholesale/moissanite-earrings"
                className="rounded-full border border-[#d8c28a] px-4 py-2 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                Shop moissanite earrings
              </Link>
              <Link
                href="/wholesale/moissanite-bracelets"
                className="rounded-full border border-[#d8c28a] px-4 py-2 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                Shop moissanite bracelets
              </Link>
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-between border-t border-[#e7ddc8] pt-6">
              <div>
                {currentPage > 1 ? (
                  <Link
                    href={pageHref(series, currentPage - 1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]"
                  >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Previous
                  </Link>
                ) : null}
              </div>
              <p className="text-sm text-[#596575]">
                Page {currentPage} of {totalPages}
              </p>
              <div>
                {currentPage < totalPages ? (
                  <Link
                    href={pageHref(series, currentPage + 1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]"
                  >
                    Next
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </nav>
          ) : null}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
