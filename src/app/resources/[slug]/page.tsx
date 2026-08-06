import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ResourceCard, formatResourceDate, resourceCoverAlt } from "@/components/resource-card";
import { ResourceMarkdown } from "@/components/resource-markdown";
import { ResourceViewTracker } from "@/components/resource-view-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactInquiryHref } from "@/lib/contact-links";
import {
  getPublishedResourceArticle,
  getRelatedResourceArticles,
  getResourceStaticParams,
} from "@/lib/resources";
import { createArticleMetadata, createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

type ResourceArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getResourceStaticParams();
}

export async function generateMetadata({
  params,
}: ResourceArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedResourceArticle(slug, "en");

  if (!article) {
    return createPageMetadata({
      title: "Resource Not Found | Xingyue Jewelry",
      description: "The requested jewelry buyer resource could not be found.",
      path: `/resources/${slug}`,
    });
  }

  return createArticleMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    image: article.coverImage,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: article.author,
    tags: article.tags,
  });
}

export default async function ResourceArticlePage({
  params,
}: ResourceArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedResourceArticle(slug, "en");

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedResourceArticles(article, 3);
  const contactHref = contactInquiryHref({
    locale: "en",
    source: "general",
  });

  const articlePath = `/resources/${article.slug}`;

  return (
    <>
      <ResourceViewTracker
        slug={article.slug}
        title={article.title}
        locale="en"
        path={articlePath}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: article.title, path: articlePath },
        ])}
      />
      <JsonLd
        data={articleSchema({
          author: article.author,
          dateModified: article.updatedAt,
          datePublished: article.publishedAt,
          description: article.description,
          headline: article.title,
          image: article.coverImage,
          path: articlePath,
        })}
      />
      <main
        lang="en"
        dir="ltr"
        className="min-h-screen bg-[#f8f6ef] text-[#17202a]"
      >
      <SiteHeader />

      <article>
        <header className="border-b border-[#e3dbcb] bg-[#fbfaf7] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="text-sm text-[#596575]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="underline decoration-[#cbb06e] underline-offset-4"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/resources"
                    className="underline decoration-[#cbb06e] underline-offset-4"
                  >
                    Resources
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{article.title}</li>
              </ol>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a734b]">
              {article.category}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#596575]">
              {article.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#596575]">
              <span>
                Published{" "}
                <time dateTime={article.publishedAt}>
                  {formatResourceDate(article.publishedAt)}
                </time>
              </span>
              <span>
                Updated{" "}
                <time dateTime={article.updatedAt}>
                  {formatResourceDate(article.updatedAt)}
                </time>
              </span>
              <span>By {article.author}</span>
            </div>
          </div>
        </header>

        <div className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#e9e4d9] sm:aspect-[16/9]">
              <Image
                src={article.coverImage}
                alt={resourceCoverAlt(article)}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <ResourceMarkdown body={article.body} />
            </div>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="border-y border-[#e3dbcb] bg-[#f4efe3] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8a734b]">
              Continue Reading
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Related resources
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ResourceCard
                  key={relatedArticle.slug}
                  article={relatedArticle}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#17202a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e6cf96]">
              Manufacturing Inquiry
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
              Share your references, specifications, and target quantity or
              range.
            </h2>
          </div>
          <Link
            href={contactHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f4efe3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Discuss Your Jewelry Project
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

        <SiteFooter />
      </main>
    </>
  );
}
