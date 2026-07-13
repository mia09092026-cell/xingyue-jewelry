import Image from "next/image";

type BrandLogoProps = {
  alt?: string;
  variant?: "header" | "footer";
};

export function BrandLogo({ alt = "Star & Moon Jewelry logo", variant = "header" }: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={
        isFooter
          ? "inline-flex rounded-md bg-[#fbfaf7] px-3 py-2 shadow-sm"
          : "inline-flex"
      }
    >
      <Image
        src="/logo-star-moon.png"
        alt={alt}
        width={1254}
        height={1254}
        priority={!isFooter}
        className={
          isFooter
            ? "h-20 w-20 rounded-md object-contain"
            : "h-12 w-12 rounded-md object-contain sm:h-14 sm:w-14"
        }
      />
    </span>
  );
}
