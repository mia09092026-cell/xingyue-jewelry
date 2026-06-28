import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gem, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { educationTopics } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Education | Moissanite & Lab-Grown Diamond Guide | XINGYUE",
  description:
    "A practical buyer guide to moissanite, lab-grown diamonds, certificates, S925 silver and custom K gold settings.",
  path: "/education",
});

const comparison = [
  ["Identity", "A distinct lab-created gemstone", "A real diamond grown in a controlled environment"],
  ["Visual character", "Strong fire and rainbow sparkle", "Classic diamond brilliance and scintillation"],
  ["Best wholesale use", "Value-led rings, earrings and gifts", "Fine jewelry, bridal and premium gifts"],
  ["Certificate", "Stone report available by request", "IGI, GIA or NGTC options by order"],
  ["Price position", "Most budget-friendly", "Above moissanite, below many mined diamonds"],
];

const materialGuides = [
  {
    title: "Certificates",
    copy: "Report options depend on stone type, size, order quantity and target market. Confirm the required laboratory before quotation.",
    icon: BadgeCheck,
  },
  {
    title: "S925 Silver",
    copy: "A practical metal for sample programs, fast-moving collections and value-focused finished jewelry.",
    icon: ShieldCheck,
  },
  {
    title: "K Gold Custom",
    copy: "10K, 14K and 18K gold can be discussed for premium orders, depending on structure, weight and quantity.",
    icon: Gem,
  },
];

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader />
      <PageHero
        eyebrow="Jewelry Education"
        title="Education"
        subtitle="A practical sourcing guide for buyers comparing moissanite, lab-grown diamonds, certificates and metal options."
      />

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Sourcing Basics"
            title="Buyer Knowledge Center"
            copy="Clear product language helps wholesale buyers choose the right stone and explain its value to their own customers."
          />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-md bg-[#e9e4d9]">
              <Image
                src="/images/b2b-bulk-loose-stones.jpg"
                alt="Loose moissanite stones for wholesale buyers"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {educationTopics.map((topic) => (
                <article key={topic.title} className="rounded-md border border-[#e3dbcb] bg-white/86 p-6">
                  <Sparkles aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                  <h2 className="font-serif text-2xl">{topic.title}</h2>
                  <p className="mt-5 leading-7 text-[#596575]">{topic.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Stone Comparison"
            title="Moissanite vs Lab-Grown Diamond"
            copy="Both are strong commercial choices, but they serve different price points and customer expectations."
          />
          <div className="overflow-x-auto rounded-md border border-[#e3dbcb] bg-white/86">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[#17202a] text-white">
                <tr>
                  <th className="p-5 text-sm font-medium">Buying Factor</th>
                  <th className="p-5 text-sm font-medium">Moissanite</th>
                  <th className="p-5 text-sm font-medium">Lab-Grown Diamond</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, moissanite, lab]) => (
                  <tr key={label} className="border-t border-[#e3dbcb]">
                    <th className="p-5 font-semibold text-[#17202a]">{label}</th>
                    <td className="p-5 leading-7 text-[#596575]">{moissanite}</td>
                    <td className="p-5 leading-7 text-[#596575]">{lab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Order Assurance"
              title="Certificates & Materials"
              copy="Certificate and metal choices should be agreed before sample or bulk production, not after the order is finished."
            />
            <div className="grid gap-4">
              {materialGuides.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="flex gap-5 border-t border-[#e3dbcb] pt-5">
                    <Icon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-[#a98945]" />
                    <div>
                      <h2 className="font-serif text-2xl">{item.title}</h2>
                      <p className="mt-3 leading-7 text-[#596575]">{item.copy}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden rounded-md bg-[#17202a]">
            <Image
              src="/images/b2b-stone-testing-certificate.jpg"
              alt="Gemstone testing and certificate options"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-sm text-[#e6cf96]">Need a Material Recommendation?</p>
            <h2 className="font-serif text-4xl">Tell us your price point and target market.</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f4efe3]"
          >
            Ask XINGYUE
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
