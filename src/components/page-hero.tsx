import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: boolean;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, image = false, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:py-24">
      {image ? (
        <>
          <Image
            src="/images/xingyue-hero.webp"
            alt="Moonlit moissanite and lab-grown diamond jewelry"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071221]/90 via-[#071221]/58 to-[#071221]/18" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(230,207,150,0.32),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f1ede2_48%,#e9edf0_100%)]" />
      )}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className={`max-w-3xl ${image ? "text-white" : "text-[#17202a]"}`}>
          <p className={`mb-4 text-sm uppercase ${image ? "text-[#e6cf96]" : "text-[#8a734b]"}`}>
            {eyebrow}
          </p>
          <h1 className="text-balance font-serif text-5xl leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className={`mt-6 text-lg leading-8 ${image ? "text-white/84" : "text-[#596575]"}`}>
            {subtitle}
          </p>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
