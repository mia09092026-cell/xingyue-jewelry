import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Xingyue Jewelry",
  description:
    "How Xingyue Jewelry collects and uses inquiry information and website analytics data.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#fbfaf7] px-5 py-20 text-[#344150] sm:px-8">
        <article className="mx-auto max-w-3xl space-y-8">
          <header>
            <p className="text-sm uppercase tracking-[0.18em] text-[#8a734b]">
              Legal
            </p>
            <h1 className="mt-3 font-serif text-4xl text-[#17202a] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-[#596575]">
              Last updated: November 12, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">Who we are</h2>
            <p>
              Xingyue Jewelry provides custom 925 sterling silver, moissanite,
              lab-grown diamond and colored gemstone jewelry manufacturing for
              wholesale buyers, brands and retailers. You can contact us at{" "}
              <a
                className="text-[#8a734b] underline underline-offset-4"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">
              Information you provide
            </h2>
            <p>
              When you submit an inquiry, we collect the details you enter,
              including your name, company, email, WhatsApp or phone number,
              country, product interest, quantity, customization requirements
              and message. We use this information only to respond to your
              request and to manage the resulting business conversation.
            </p>
            <p>
              Inquiry records are stored in a restricted Google Sheets
              spreadsheet accessible to our sales team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">
              Analytics and cookies
            </h2>
            <p>
              We use Microsoft Clarity to understand how visitors use this site.
              Clarity may collect device and browser information, pages viewed,
              clicks and session recordings. Form fields are masked so that
              names, emails, phone numbers and message contents are not captured
              in recordings.
            </p>
            <p>
              If enabled, Google Analytics 4 collects aggregated traffic and page
              performance data. These tools may set cookies or similar
              identifiers in your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">
              How we use information
            </h2>
            <p>
              We use inquiry information to answer your request, prepare quotes
              and samples, and manage production. We use analytics data to
              improve site performance, content and marketing measurement. We do
              not sell personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">
              Your choices
            </h2>
            <p>
              You can ask us to access, correct or delete the inquiry
              information we hold about you by emailing{" "}
              <a
                className="text-[#8a734b] underline underline-offset-4"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              . You can also block analytics cookies in your browser; the site
              will continue to work.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#17202a]">Changes</h2>
            <p>
              We may update this policy when our tools or practices change. The
              date at the top of this page shows the latest revision.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
