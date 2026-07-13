import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleDot,
  Gem,
  Heart,
  HelpCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { faqPageSchema, websiteSchema } from "@/lib/structured-data";
import { getLanguageAlternates } from "@/lib/i18n";
import { contactInquiryHref } from "@/lib/contact-links";

export const metadata = createPageMetadata({
  title: "Jewelry Manufacturing & Supply Chain Partner | XINGYUE",
  description:
    "Jewelry manufacturing, custom development and supply chain support for emerging brands, boutique stores and independent designers.",
  path: "/",
  languages: getLanguageAlternates("/"),
});

const coreProducts = [
  {
    title: "Moissanite",
    copy: "High-fire loose stones and finished jewelry styles for wholesale buyers.",
    image: "/images/xingyue-loose-moissanite.jpg",
    alt: "Round moissanite stone held by tweezers",
    href: "/collections/moissanite-wholesale",
    cta: "Explore Moissanite",
  },
  {
    title: "Lab-Grown Diamonds",
    copy: "Precision-cut stones for modern fine jewelry and certificate-ready orders.",
    image: "/images/xingyue-loose-stones.jpg",
    alt: "Loose lab-grown diamond stones on a black surface",
    href: "/collections/lab-grown-diamond-jewelry",
    cta: "Explore Lab-Grown Diamonds",
  },
  {
    title: "Lab-Grown Colored Gemstones",
    copy: "Vivid color options for bracelets, rings, necklaces and custom collections.",
    image: "/images/xingyue-colored-gemstones.jpg",
    alt: "Assorted lab-grown colored gemstones",
    href: "/collections/lab-grown-colored-gemstones",
    cta: "Explore Colored Gemstones",
  },
  {
    title: "Zirconia",
    copy: "Bright, value-focused stone options for fashion jewelry and sample programs.",
    image: "/images/xingyue-heart-tennis-chain.jpg",
    alt: "Heart cut tennis chain jewelry on a blue surface",
    href: "/collections/custom-jewelry-manufacturing",
    cta: "Explore Zirconia",
  },
  {
    title: "Cuban Chains",
    copy: "Statement chain production with iced finishes and bold wholesale styling.",
    image: "/images/xingyue-cuban-chain.jpg",
    alt: "Iced Cuban chain bracelet on a dark background",
    href: "/collections/cuban-chains",
    cta: "Explore Cuban Chains",
  },
  {
    title: "Tennis Chains",
    copy: "Clean line necklaces and bracelets for daily luxury and gifting collections.",
    image: "/images/xingyue-tennis-necklace.jpg",
    alt: "Two tennis chain necklaces on a blue jewelry display",
    href: "/collections/tennis-chains",
    cta: "Explore Tennis Chains",
  },
  {
    title: "Bracelets",
    copy: "Moissanite, colored gemstone and custom line bracelet production.",
    image: "/images/xingyue-tennis-bracelet.jpg",
    alt: "Moissanite tennis bracelet on a black reflective surface",
    href: "/collections/tennis-chains",
    cta: "Explore Bracelets",
  },
  {
    title: "Necklaces",
    copy: "Pendant, chain and tennis necklace styles with flexible metal options.",
    image: "/images/xingyue-tennis-necklace.jpg",
    alt: "Layered tennis necklaces on a display bust",
    href: "/collections/tennis-chains",
    cta: "Explore Necklaces",
  },
  {
    title: "Rings",
    copy: "Sample rings, bridal-inspired styles and photo-based custom development.",
    image: "/images/xingyue-ring-sample.jpg",
    alt: "S925 silver ring sample on a white background",
    href: "/collections/moissanite-wholesale",
    cta: "Explore Rings",
  },
];

const categories = [
  {
    title: "Rings",
    copy: "Solitaire, halo and bridal-inspired styles for refined everyday luxury.",
    href: "/collections/moissanite-wholesale",
    image: "/images/xingyue-ring-sample.jpg",
    alt: "Rings jewelry category sample",
    icon: CircleDot,
  },
  {
    title: "Necklaces",
    copy: "Elegant pendants, tennis chains and layering pieces with clean settings.",
    href: "/collections/lab-grown-diamond-jewelry",
    image: "/images/xingyue-tennis-necklace.jpg",
    alt: "Necklaces jewelry category sample",
    icon: Gem,
  },
  {
    title: "Earrings",
    copy: "Moissanite and lab-grown diamond studs, drops and gift-ready pairs.",
    href: "/collections/moissanite-wholesale",
    image: "/images/b2b-sample-packaging.jpg",
    alt: "Earrings jewelry category sample",
    icon: Sparkles,
  },
  {
    title: "Bracelets",
    copy: "Tennis bracelets, Cuban chain styles and custom line jewelry programs.",
    href: "/collections/tennis-chains",
    image: "/images/xingyue-tennis-bracelet.jpg",
    alt: "Bracelets jewelry category sample",
    icon: Heart,
  },
];

const advantages = [
  {
    title: "Real Diamond",
    copy: "Lab-grown diamonds have the same carbon crystal structure and optical beauty as mined diamonds.",
    icon: Gem,
  },
  {
    title: "Ethical Choice",
    copy: "A modern sourcing direction for clients who care about traceability, responsibility and transparency.",
    icon: ShieldCheck,
  },
  {
    title: "Better Value",
    copy: "Moissanite, zirconia and lab-grown stones create strong price-to-sparkle advantages.",
    icon: Star,
  },
  {
    title: "Certified Quality",
    copy: "Certificate and testing options can be discussed by stone type, size and order needs.",
    icon: BadgeCheck,
  },
];

const partnerHighlights = [
  {
    value: "Quality Control Coordination",
    label: "Stone, setting and finish checks",
    copy: "Quality checkpoints can be aligned with the approved sample and project brief.",
  },
  {
    value: "Flexible B2B Support",
    label: "Samples, launch orders and repeat programs",
    copy: "Project planning supports emerging brands, boutique stores and independent designers.",
  },
  {
    value: "Supply Chain Coordination",
    label: "From sourcing to shipment planning",
    copy: "Stone sourcing, jewelry development, packaging and delivery details stay in one workflow.",
  },
];

const customCapabilities = [
  {
    title: "Photo-to-Sample Customization",
    copy: "Send reference photos, stone size, metal preference and quantity. We can develop samples for review.",
  },
  {
    title: "OEM / ODM Jewelry Production",
    copy: "Private-label production support for overseas brands, online sellers and wholesale buyers.",
  },
  {
    title: "Fine Jewelry Custom Manufacturing",
    copy: "S925 silver, K gold settings, loose stone matching and premium finishing by project needs.",
  },
];

const featuredProducts = [
  {
    name: "Moissanite Loose Stone Selection",
    category: "Loose Stones",
    material: "Round, oval, emerald and fancy cut options",
    note: "Wholesale Moissanite Jewelry and OEM ready.",
    image: "/images/xingyue-loose-stones.jpg",
    alt: "Loose moissanite and lab-grown diamond stones",
  },
  {
    name: "Lab-Grown Colored Gemstone Set",
    category: "Colored Stones",
    material: "Vivid custom color options for jewelry production",
    note: "Suitable for bracelets, rings and custom collections.",
    image: "/images/xingyue-colored-gemstones.jpg",
    alt: "Lab-grown colored gemstone set on a dark surface",
  },
  {
    name: "Custom Tennis Bracelet",
    category: "Bracelets",
    material: "S925 silver / K gold setting options",
    note: "Sample, wholesale and private-label production supported.",
    image: "/images/xingyue-tennis-bracelet.jpg",
    alt: "Tennis bracelet product sample",
  },
];

const faqs = [
  {
    question: "Can you produce jewelry from reference photos?",
    answer:
      "Yes. We support photo-to-sample customization for stones, settings, plating, packaging and private-label projects.",
  },
  {
    question: "Do you support moissanite wholesale orders?",
    answer:
      "Yes. We support Wholesale Moissanite Jewelry inquiries, sample orders and repeat production discussions.",
  },
  {
    question: "Can I request custom K gold settings?",
    answer:
      "Yes. Selected designs can be customized in 10K, 14K or 18K gold depending on style and quantity.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqPageSchema(faqs)} />
      <SiteHeader languagePath="/" />

      <section className="relative min-h-[82svh] overflow-hidden bg-[#f8f6ef] px-5 py-24 sm:px-8 lg:py-28">
        <Image
          src="/images/xingyue-loose-moissanite.jpg"
          alt="Luxury moissanite and lab-grown diamond close up"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf7]/96 via-[#fbfaf7]/84 to-[#fbfaf7]/20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8f6ef] to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[62svh] max-w-7xl items-center">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm uppercase text-[#9a7a36]">
              Jewelry Manufacturing Partner for Emerging Brands
            </p>
            <h1 className="text-balance font-serif text-5xl leading-tight text-[#17202a] sm:text-6xl lg:text-7xl">
              Jewelry Manufacturing & Supply Chain Partner
            </h1>
            <p className="mt-6 text-2xl font-light text-[#8a734b]">
              Ethical Brilliance, Modern Luxury
            </p>
            <p className="mt-6 max-w-xl leading-8 text-[#596575]">
              Moissanite, Lab-Grown Diamonds, Lab-Grown Colored Gemstones,
              Zirconia, Cuban Chains, Tennis Chains and custom fine jewelry
              manufacturing support for emerging brands, boutique jewelry
              stores, independent designers and jewelry entrepreneurs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
              >
                Explore Collection
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={contactInquiryHref({
                  sourcePath: "/",
                  interest: "Wholesale lab-grown diamond jewelry",
                })}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cbb06e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-white"
              >
                Request a Quote
                <Mail aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {partnerHighlights.map((item) => (
                <div
                  key={item.value}
                  className="rounded-md border border-[#e3dbcb] bg-white/76 p-4 shadow-sm backdrop-blur"
                >
                  <p className="font-serif text-2xl text-[#17202a]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#596575]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core Products"
            title="Main product range for wholesale and custom orders."
            copy="Real product visuals from loose stone supply to finished jewelry, selected for a cleaner overseas brand presentation."
          />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreProducts.map((product) => (
              <article
                key={product.title}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-[#f4efe3]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl text-[#17202a]">{product.title}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{product.copy}</p>
                  <Link
                    href={product.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]"
                  >
                    {product.cta}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Collections"
            title="Jewelry categories for modern buyers."
            copy="A clean product entry for international customers looking for elevated lab-grown diamond and moissanite jewelry."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
              <Link
                key={category.title}
                href={category.href}
                className="group overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm transition hover:-translate-y-1 hover:border-[#cbb06e]"
              >
                  <div className="relative aspect-[4/3] bg-[#f4efe3]">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-md bg-[#f4efe3] text-[#a98945]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h2 className="font-serif text-2xl text-[#17202a]">{category.title}</h2>
                    <p className="mt-5 leading-7 text-[#596575]">{category.copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]">
                      View styles
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Advantages"
            title="Why lab-grown diamonds and moissanite."
            copy="Clear selling points for premium jewelry customers who want beauty, transparency and better value."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;

              return (
                <article
                  key={advantage.title}
                  className="rounded-md border border-[#e3dbcb] bg-[#fbfaf7] p-6"
                >
                  <Icon aria-hidden="true" className="mb-7 h-6 w-6 text-[#a98945]" />
                  <h2 className="font-serif text-2xl">{advantage.title}</h2>
                  <p className="mt-5 leading-7 text-[#596575]">{advantage.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm uppercase text-[#e6cf96]">B2B Partnership</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Coordinated manufacturing support from concept to repeat order.
            </h2>
            <p className="mt-6 leading-8 text-white/76">
              XINGYUE focuses on premium loose stone production and high-end
              jewelry customization, supporting overseas brands from product
              development to finished goods.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {partnerHighlights.map((item) => (
                <div key={item.value} className="rounded-md border border-white/12 bg-white/7 p-5">
                  <p className="font-serif text-3xl text-[#e6cf96]">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-white/72">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-md border border-white/12 bg-white/7">
            <Image
              src="/images/xingyue-certificate-testing.jpg"
              alt="Gemstone certificate testing and quality control"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customization"
            title="Photo-based custom work and OEM production."
            copy="Built for emerging brands and independent designers who need clear communication, sample development and repeat production support."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {customCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm"
              >
                <Sparkles aria-hidden="true" className="mb-7 h-6 w-6 text-[#a98945]" />
                <h2 className="font-serif text-2xl">{capability.title}</h2>
                <p className="mt-5 leading-7 text-[#596575]">{capability.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Products"
            title="Featured Products"
            copy="Selected loose stones and finished jewelry examples for wholesale, OEM and private-label inquiries."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-[#f4efe3]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#8a734b]">{product.category}</p>
                  <h2 className="mt-2 font-serif text-2xl">{product.name}</h2>
                  <p className="mt-4 leading-7 text-[#596575]">{product.material}</p>
                  <p className="mt-4 border-t border-[#e7ddc8] pt-4 text-sm text-[#344150]">
                    {product.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm uppercase text-[#e6cf96]">About</p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              About XINGYUE
            </h2>
          </div>
          <div className="space-y-5 leading-8 text-white/76">
            <p>
              XINGYUE is a jewelry manufacturing and supply chain partner for
              emerging brands, boutique jewelry stores, independent designers
              and entrepreneurs building new jewelry businesses.
            </p>
            <p>
              We coordinate loose stone sourcing, S925 silver jewelry, K gold
              custom settings, OEM / ODM development, quality control and
              packaging around each approved project brief.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="FAQ"
            title="FAQ"
            copy="Short answers for first-time buyers before they request a quote."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-md border border-[#e3dbcb] bg-white/86 p-6"
              >
                <HelpCircle aria-hidden="true" className="mb-6 h-6 w-6 text-[#a98945]" />
                <h2 className="font-serif text-2xl">{faq.question}</h2>
                <p className="mt-5 leading-7 text-[#596575]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-[#f4efe3] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase text-[#8a734b]">Contact</p>
              <h2 className="font-serif text-4xl">Ready to build your jewelry collection?</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#596575]">
                Send your target style, reference photo, stone size, metal,
                certificate needs and quantity. We will prepare the next step for
                your quote.
              </p>
            </div>
            <Link
              href={contactInquiryHref({
                sourcePath: "/",
                interest: "Custom wholesale jewelry collection",
              })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542]"
            >
              Request a Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
