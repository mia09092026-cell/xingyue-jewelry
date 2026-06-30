import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, Mail, MessageSquareText, PackageCheck, Truck } from "lucide-react";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/site-data";
import { getLanguageAlternates } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Quote | Jewelry Wholesale Inquiry | XINGYUE",
  description:
    "Request a wholesale quote for moissanite, lab-grown diamonds, S925 silver jewelry, custom K gold settings and OEM production.",
  path: "/contact",
  languages: getLanguageAlternates("/contact"),
});

const emailHref = brand.emailInquiryHref;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <SiteHeader />
      <PageHero
        eyebrow="B2B Inquiry"
        title="Request a Quote"
        subtitle="Send the key project details in one place: contact person, phone, brand, product type, quantity, delivery city, budget range and requirements."
      />

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Inquiry Checklist"
              title="Tell us what you want to make and where it needs to go."
              copy="A structured inquiry helps us compare material options, estimate production difficulty and prepare a cleaner wholesale discussion."
            />
            <div className="relative min-h-[360px] overflow-hidden rounded-md bg-[#e9e4d9]">
              <Image
                src="/images/b2b-certificate-packaging.jpg"
                alt="Jewelry sample with certificate and packaging"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-[#17202a] p-5 text-white">
                <Clock3 aria-hidden="true" className="mb-4 h-5 w-5 text-[#e6cf96]" />
                <h2 className="font-serif text-xl">Quotation Inputs</h2>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  Contact, project type, estimated quantity, delivery city, budget and requirements.
                </p>
              </div>
              <div className="rounded-md border border-[#e3dbcb] bg-white/86 p-5">
                <Mail aria-hidden="true" className="mb-4 h-5 w-5 text-[#a98945]" />
                <h2 className="font-serif text-xl">Email / WhatsApp</h2>
                <a
                  href={brand.emailHref}
                  className="mt-3 inline-flex break-all text-sm font-semibold text-[#17202a] transition hover:text-[#8a734b]"
                >
                  Email: {brand.email}
                </a>
                <p className="mt-3 text-sm leading-6 text-[#596575]">
                  For wholesale pricing, OEM/ODM customization, and catalog requests, please contact us by email or WhatsApp.
                </p>
                <a
                  href={brand.whatsappHref}
                  className="mt-2 inline-flex text-sm font-semibold text-[#17202a] transition hover:text-[#8a734b]"
                >
                  {brand.whatsapp}
                </a>
              </div>
              <div className="rounded-md border border-[#e3dbcb] bg-white/86 p-5">
                <PackageCheck aria-hidden="true" className="mb-4 h-5 w-5 text-[#a98945]" />
                <h2 className="font-serif text-xl">Project Match</h2>
                <p className="mt-3 text-sm leading-6 text-[#596575]">
                  We use your project type and budget range to suggest suitable metal, stone and packaging options.
                </p>
              </div>
              <div className="rounded-md bg-[#f1eadc] p-5">
                <Truck aria-hidden="true" className="mb-4 h-5 w-5 text-[#a98945]" />
                <h2 className="font-serif text-xl">Delivery Planning</h2>
                <p className="mt-3 text-sm leading-6 text-[#596575]">
                  Delivery city helps us discuss sample timing, export packaging and shipment expectations earlier.
                </p>
              </div>
            </div>
          </div>

          <div>
            <ContactInquiryForm emailHref={emailHref} />
            <div className="mt-6 flex gap-3 rounded-md border border-[#e3dbcb] bg-white/72 p-5 text-[#596575]">
              <MessageSquareText aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#a98945]" />
              <p className="leading-7">
                For the most useful quotation, mention reference photos, stone size,
                metal choice, certificate expectations, packaging and sample timeline.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
