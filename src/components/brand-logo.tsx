import Image from "next/image";

type BrandLogoProps = {
  alt?: string;
  variant?: "header" | "footer";
};

export function BrandLogo({ alt = "XINGYUE Jewelry logo", variant = "header" }: BrandLogoProps) {
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
        src="/xingyue-jewelry-logo.png"
        alt={alt}
        width={1254}
        height={1254}
        priority={!isFooter}
        className={
          isFooter
            ? "h-28 w-28 rounded-md object-contain"
            : "h-16 w-16 rounded-md object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
        }
      />
    </span>
  );
}
