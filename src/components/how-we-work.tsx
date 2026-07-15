import {
  ArrowRight,
  ClipboardCheck,
  Gem,
  MessageSquareText,
  PackageCheck,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

type WorkflowStep = {
  title: string;
  copy: string;
};

type HowWeWorkProps = {
  eyebrow: string;
  title: string;
  copy: string;
  steps: WorkflowStep[];
  ctaHref: string;
  ctaLabel: string;
};

const stepIcons = [
  MessageSquareText,
  Gem,
  ClipboardCheck,
  Settings,
  ShieldCheck,
  PackageCheck,
] as const;

export function HowWeWork({
  eyebrow,
  title,
  copy,
  steps,
  ctaHref,
  ctaLabel,
}: HowWeWorkProps) {
  return (
    <section
      data-home-section="how-we-work"
      className="bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} tone="dark" />
        <div
          data-process-timeline
          className="relative grid gap-4 ps-7 before:absolute before:inset-y-5 before:start-2 before:w-px before:bg-white/20 md:grid-cols-2 md:ps-0 md:before:hidden lg:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? ClipboardCheck;
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={stepNumber}
                data-process-step={stepNumber}
                className="relative rounded-md border border-white/14 bg-white/7 p-6"
              >
                <span
                  data-process-node
                  aria-hidden="true"
                  className="absolute top-10 -start-[1.65rem] h-3 w-3 rounded-full border-2 border-[#e6cf96] bg-[#17202a] md:hidden"
                />
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-[#e6cf96]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <bdi dir="ltr" className="font-serif text-2xl text-[#e6cf96]">
                    {stepNumber}
                  </bdi>
                </div>
                <h3 className="font-serif text-2xl leading-snug">{step.title}</h3>
                <p className="mt-4 leading-7 text-white/72">{step.copy}</p>
              </article>
            );
          })}
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
