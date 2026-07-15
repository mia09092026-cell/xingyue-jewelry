import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

type QualityCheck = { title: string; copy: string };
type OptionalSectionImage = { src: string; alt: string } | null;

type QualityControlSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  items: QualityCheck[];
  image: OptionalSectionImage;
  ctaHref: string;
  ctaLabel: string;
};

export function QualityControlSection({
  eyebrow,
  title,
  copy,
  items,
  image,
  ctaHref,
  ctaLabel,
}: QualityControlSectionProps) {
  return (
    <section
      data-home-section="quality-control"
      className="bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
        <div className={image ? "grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start" : ""}>
          {image ? (
            <div data-phase4b-media className="overflow-hidden rounded-md bg-[#f4efe3]">
              <Image src={image.src} alt={image.alt} width={1200} height={800} className="h-auto w-full object-cover" />
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.title}
                data-quality-check
                className="rounded-md border border-[#e3dbcb] bg-white/86 p-6"
              >
                <CheckCircle2 aria-hidden="true" className="mb-5 h-6 w-6 text-[#a98945]" />
                <h3 className="font-serif text-2xl leading-snug text-[#17202a]">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
              </article>
            ))}
          </div>
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
