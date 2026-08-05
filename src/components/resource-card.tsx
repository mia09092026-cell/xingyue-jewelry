import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ResourceArticle } from "@/lib/resources";

export function formatResourceDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function resourceCoverAlt(article: ResourceArticle) {
  if (article.coverImage.includes("xingyue-loose-moissanite")) {
    return "Loose moissanite stones for a jewelry buyer comparison guide";
  }

  if (article.coverImage.includes("b2b-manual-setting-workshop")) {
    return "Jewelry setting work for a sterling silver manufacturer guide";
  }

  if (article.coverImage.includes("xingyue-ring-sample")) {
    return "925 sterling silver solitaire ring sample with a colorless center stone";
  }

  return `Cover image for ${article.title}`;
}

export function ResourceCard({ article }: { article: ResourceArticle }) {
  return (
    <article className="group overflow-hidden rounded-md border border-[#e3dbcb] bg-white/82 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/resources/${article.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17202a]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e4d9]">
          <Image
            src={article.coverImage}
            alt={resourceCoverAlt(article)}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#8a734b]">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {formatResourceDate(article.publishedAt)}
            </time>
          </div>
          <h2 className="mt-4 text-balance font-serif text-2xl leading-tight text-[#17202a]">
            {article.title}
          </h2>
          <p className="mt-4 line-clamp-3 leading-7 text-[#596575]">
            {article.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Article tags">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[#e3dbcb] bg-[#f8f6ef] px-3 py-1 text-xs text-[#596575]"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]">
            Read guide
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
