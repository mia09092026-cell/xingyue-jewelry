import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

type SampleMoqItem = { title: string; copy: string };
type OptionalSectionImage = { src: string; alt: string } | null;

type SampleMoqSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  items: SampleMoqItem[];
  image: OptionalSectionImage;
  ctaHref: string;
  ctaLabel: string;
};

export function SampleMoqSection({
  eyebrow,
  title,
  copy,
  items,
  image,
  ctaHref,
  ctaLabel,
}: SampleMoqSectionProps) {
  return (
    <section
      data-home-section="sample-moq"
      className="bg-[#f4efe3] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
        {image ? (
          <div data-phase4b-media className="mb-8 overflow-hidden rounded-md bg-white/70">
            <Image src={image.src} alt={image.alt} width={1200} height={800} className="h-auto w-full object-cover" />
          </div>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.title}
              data-sample-moq-item
              className="rounded-md border border-[#d8c9aa] bg-white/72 p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8a734b]">
                  <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-snug text-[#17202a]">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
            </article>
          ))}
        </div>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white"
        >
          {ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
