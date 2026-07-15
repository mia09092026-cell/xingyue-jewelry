import { ArrowRight, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

type InquiryFieldStatus = "required" | "conditional" | "optional";
type InquiryField = { label: string; status: InquiryFieldStatus };
type OptionalSectionImage = { src: string; alt: string } | null;

type PrepareInquirySectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  statusLabels: Record<InquiryFieldStatus, string>;
  fields: InquiryField[];
  image: OptionalSectionImage;
  ctaHref: string;
  ctaLabel: string;
};

export function PrepareInquirySection({
  eyebrow,
  title,
  copy,
  statusLabels,
  fields,
  image,
  ctaHref,
  ctaLabel,
}: PrepareInquirySectionProps) {
  return (
    <section
      data-home-section="prepare-inquiry"
      className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} tone="dark" />
        {image ? (
          <div data-phase4b-media className="mb-8 overflow-hidden rounded-md bg-white/10">
            <Image src={image.src} alt={image.alt} width={1200} height={800} className="h-auto w-full object-cover" />
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <div
              key={field.label}
              data-inquiry-field
              data-inquiry-status={field.status}
              className="rounded-md border border-white/14 bg-white/7 p-5"
            >
              <ClipboardList aria-hidden="true" className="mb-4 h-5 w-5 text-[#e6cf96]" />
              <p className="font-semibold leading-6">{field.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/62">{statusLabels[field.status]}</p>
            </div>
          ))}
        </div>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f1dda9]"
        >
          {ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
