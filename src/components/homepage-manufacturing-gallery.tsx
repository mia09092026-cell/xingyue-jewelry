import Image from "next/image";

type ManufacturingVisualItem = {
  title: string;
  copy: string;
  image: string;
  alt: string;
  imageClassName?: string;
};

type HomepageManufacturingGalleryProps = {
  eyebrow: string;
  title: string;
  copy: string;
  items: ManufacturingVisualItem[];
};

export function HomepageManufacturingGallery({
  eyebrow,
  title,
  copy,
  items,
}: HomepageManufacturingGalleryProps) {
  return (
    <section
      data-home-section="manufacturing-gallery"
      className="scroll-mt-36 bg-[#17202a] px-5 py-16 text-white sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#e6cf96]">{eyebrow}</p>
          <h2 className="text-balance font-serif text-4xl leading-tight">{title}</h2>
          <p className="mt-5 leading-8 text-white/72">{copy}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              data-manufacturing-visual={item.title}
              className="overflow-hidden rounded-md border border-white/12 bg-white/7"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#26313d]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={`object-cover ${item.imageClassName ?? ""}`}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/72">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
