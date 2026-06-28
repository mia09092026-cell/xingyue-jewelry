import { ArrowRight, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { products } from "@/lib/site-data";

type Product = (typeof products)[number];

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-[#e3dbcb] bg-white/86 shadow-sm transition hover:-translate-y-1 hover:border-[#d4b76d]">
      <div className="relative aspect-[4/3] bg-[#f4efe3]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-[#f4efe3] text-[#a98945]">
          <Gem aria-hidden="true" className="h-5 w-5" />
        </div>
        <p className="text-sm text-[#8a734b]">{product.category}</p>
        <h3 className="mt-2 font-serif text-2xl text-[#17202a]">{product.name}</h3>
        <p className="mt-5 flex-1 leading-7 text-[#596575]">{product.description}</p>
        <div className="mt-6 border-t border-[#e7ddc8] pt-5 text-sm text-[#344150]">
          <p>{product.material}</p>
          <p className="mt-2">{product.wholesale}</p>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17202a]"
        >
          View Product
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
