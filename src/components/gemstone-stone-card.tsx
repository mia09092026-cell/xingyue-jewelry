import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquareText, Plus } from "lucide-react";
import type { GemstoneCatalogCopy } from "@/content/gemstone-catalog";
import type { GemstoneCatalogItem } from "@/data/gemstones";
import { buildWhatsAppInquiryUrl, contactInquiryHref } from "@/lib/contact-links";
import type { SupportedLocale } from "@/lib/i18n";

type GemstoneStoneCardProps = {
  copy: GemstoneCatalogCopy;
  item: GemstoneCatalogItem;
  locale: SupportedLocale;
};

export function GemstoneStoneCard({ copy, item, locale }: GemstoneStoneCardProps) {
  const hasImage = Boolean(item.image && item.alt);
  const inquiryHref = contactInquiryHref({
    locale,
    source: "products",
    interest: "loose-stones",
  });
  const fields = [
    [copy.fields.color, item.color],
    [copy.fields.shape, item.shape],
    [copy.fields.sizeRange, item.sizeRange],
    [copy.fields.quality, item.quality],
    [copy.fields.moq, item.moq],
    [copy.fields.referencePrice, item.referencePrice],
    [copy.fields.availability, item.availability],
  ];

  return (
    <article
      data-image-state={hasImage ? "available" : "none"}
      className="group overflow-hidden rounded-md border border-[#ded4c0] bg-white/90 shadow-[0_18px_50px_rgba(23,32,42,0.06)]"
    >
      {item.image && item.alt ? (
        <div
          data-gemstone-media
          className="relative aspect-[4/3] overflow-hidden bg-[#ede8dc]"
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            style={{ objectPosition: item.imagePosition }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101720]/85 to-transparent px-5 pb-5 pt-12 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ead7a5]">
              {item.gemstoneType}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">{item.name}</h3>
          </div>
        </div>
      ) : null}

      <div className={`p-5 md:p-6 ${hasImage ? "" : "border-t-4 border-[#a98945]"}`}>
        {!hasImage ? (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a734b]">
              {item.gemstoneType}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-[#17202a]">
              {item.name}
            </h3>
          </div>
        ) : null}
        <p className="leading-7 text-[#596575]">{item.description}</p>
        <dl className="mt-6 divide-y divide-[#ece5d8] border-y border-[#ece5d8]">
          {fields.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[0.38fr_0.62fr] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8a734b]">
                {label}
              </dt>
              <dd className="text-sm leading-6 text-[#344150]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-2">
          <Link
            href={inquiryHref}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
          >
            {copy.cta.getWholesalePrice}
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href={inquiryHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cfb976] px-3 py-2.5 text-xs font-semibold text-[#17202a] transition hover:bg-[#f4efe3]"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              {copy.cta.addInquiry}
            </Link>
            <a
              href={buildWhatsAppInquiryUrl({
                context: "product",
                locale,
                source: "products",
                interest: "loose-stones",
                formData: { productInterest: "loose-stones" },
              })}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8cfbc] px-3 py-2.5 text-xs font-semibold text-[#17202a] transition hover:bg-[#f4efe3]"
            >
              <MessageSquareText aria-hidden="true" className="h-4 w-4" />
              {copy.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
