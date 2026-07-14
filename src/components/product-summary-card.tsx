import Image from "next/image";
import type { ProductSummary } from "@/content/i18n";

type ProductSummaryCardProps = {
  product: ProductSummary;
};

export function ProductSummaryCard({ product }: ProductSummaryCardProps) {
  const image = product.image;
  const hasImage = image !== null;

  return (
    <article
      data-image-state={hasImage ? "available" : "none"}
      className={`flex h-full flex-col overflow-hidden rounded-md border bg-white/86 shadow-sm ${
        hasImage ? "border-[#e3dbcb]" : "border-[#d8c99f] border-t-4 border-t-[#c9a95f]"
      }`}
    >
      {hasImage ? (
        <div data-product-media className="relative aspect-[4/3] overflow-hidden bg-[#f4efe3]">
          <Image
            src={image}
            alt={product.alt ?? ""}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`object-cover ${product.imageClassName ?? ""}`}
          />
        </div>
      ) : null}

      <div
        className={`flex flex-1 flex-col p-6 ${
          hasImage ? "" : "min-h-72 justify-center sm:p-8"
        }`}
      >
        <p className="text-sm text-[#8a734b]">{product.category}</p>
        <h2 className="mt-2 font-serif text-2xl text-[#17202a]">{product.name}</h2>
        <p className="mt-4 text-sm text-[#344150]">{product.material}</p>
        <p className="mt-4 leading-7 text-[#596575]">{product.copy}</p>
      </div>
    </article>
  );
}
