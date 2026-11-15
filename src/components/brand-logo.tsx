import Image from "next/image";

type BrandLogoProps = {
  alt?: string;
  variant?: "header" | "footer";
};

export function BrandLogo({
  alt = "Zarivelle 织澜珠宝 logo",
  variant = "header",
}: BrandLogoProps) {
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
        src="/zarivelle-logo.svg"
        alt={alt}
        width={440}
        height={112}
        priority={!isFooter}
        sizes={isFooter ? "240px" : "(min-width: 640px) 176px, 128px"}
        className={isFooter ? "h-16 w-auto" : "h-8 w-auto sm:h-11"}
      />
    </span>
  );
}
