import type { Metadata } from "next";
import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedResourceArticles,
  RESOURCE_CATEGORIES,
  type ResourceCategory,
} from "@/lib/resources";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Jewelry Buyer Resources | Xingyue Jewelry",
  description:
    "Practical B2B guides for custom jewelry sourcing, 925 sterling silver, moissanite, lab-created gemstones, sampling, and OEM or ODM coordination.",
  path: "/resources",
});

type ResourcesPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

function categoryHref(category: ResourceCategory) {
  const params = new URLSearchParams({ category });
  return `/resources?${params.toString()}`;
}

export default async function ResourcesPage({
  searchParams = Promise.resolve({}),
}: ResourcesPageProps) {
  const query = await searchParams;
  const requestedCategory =
    typeof query.category === "string" ? query.category : undefined;
  const activeCategory = RESOURCE_CATEGORIES.includes(
    requestedCategory as ResourceCategory,
  )
    ? (requestedCategory as ResourceCategory)
    : undefined;
  const articles = getPublishedResourceArticles("en").filter(
    (article) => !activeCategory || article.category === activeCategory,
  );

  return (
    <main
      lang="en"
      dir="ltr"
      className="min-h-screen bg-[#f8f6ef] text-[#17202a]"
    >
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#e3dbcb] bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(230,207,150,0.34),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f1ede2_52%,#e9edf0_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8a734b]">
            Buyer Knowledge Center
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Resources for Jewelry Buyers
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#596575]">
            Practical sourcing guides for custom jewelry, materials, sampling,
            specifications, OEM and ODM coordination, and buyer preparation.
          </p>
          <p
            role="note"
            className="mt-6 inline-flex rounded-md border border-[#d8c9aa] bg-white/72 px-4 py-3 text-sm text-[#596575]"
          >
            This resource is currently available in English only.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2" aria-label="Resource categories">
            <Link
              href="/resources"
              aria-current={!activeCategory ? "page" : undefined}
              className="rounded-full border border-[#cbb06e] px-4 py-2 text-sm font-semibold transition hover:bg-[#17202a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17202a] aria-[current=page]:bg-[#17202a] aria-[current=page]:text-white"
            >
              All resources
            </Link>
            {RESOURCE_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                aria-current={activeCategory === category ? "page" : undefined}
                className="rounded-full border border-[#cbb06e] px-4 py-2 text-sm font-semibold transition hover:bg-[#17202a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17202a] aria-[current=page]:bg-[#17202a] aria-[current=page]:text-white"
              >
                {category}
              </Link>
            ))}
          </div>

          {articles.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ResourceCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-[#e3dbcb] bg-white/72 p-8">
              <h2 className="font-serif text-2xl">No published guides yet</h2>
              <p className="mt-3 leading-7 text-[#596575]">
                More buyer resources will be added to this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
