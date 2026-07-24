import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type GemstoneColorItem = {
  title: string;
  image: string;
  alt: string;
};

type HomepageGemstoneGalleryProps = {
  eyebrow: string;
  title: string;
  copy: string;
  items: GemstoneColorItem[];
  href: string;
  linkLabel: string;
};

export function HomepageGemstoneGallery({
  eyebrow,
  title,
  copy,
  items,
  href,
  linkLabel,
}: HomepageGemstoneGalleryProps) {
  return (
    <section
      data-home-section="gemstone-colors"
      className="scroll-mt-36 bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#8a734b]">{eyebrow}</p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-[#17202a]">{title}</h2>
          <p className="mt-5 leading-8 text-[#596575]">{copy}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <article
              key={item.title}
              data-gemstone-color={item.title}
              className="overflow-hidden rounded-md border border-[#e3dbcb] bg-white shadow-sm"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="px-4 py-4 font-serif text-lg text-[#17202a] sm:text-xl">
                {item.title}
              </h3>
            </article>
          ))}
        </div>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17202a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#17202a] hover:text-white"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
