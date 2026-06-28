type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, copy, tone = "light" }: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className={isDark ? "mb-3 text-sm text-[#e6cf96]" : "mb-3 text-sm text-[#8a734b]"}>
          {eyebrow}
        </p>
        <h2
          className={
            isDark
              ? "text-balance font-serif text-4xl leading-tight text-white"
              : "text-balance font-serif text-4xl leading-tight text-[#17202a]"
          }
        >
          {title}
        </h2>
      </div>
      {copy ? (
        <p className={isDark ? "max-w-2xl leading-7 text-white/72" : "max-w-2xl leading-7 text-[#596575]"}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
