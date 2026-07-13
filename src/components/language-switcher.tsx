import Link from "next/link";
import {
  localeLabels,
  localizedPath,
  type SupportedLocale,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
  className?: string;
  currentLocale: SupportedLocale;
  path: string;
};

const localeOrder: SupportedLocale[] = ["en", "es", "ar"];

const switcherLabels: Record<SupportedLocale, string> = {
  en: "Language switcher",
  es: "Selector de idioma",
  ar: "مبدل اللغة",
};

export function LanguageSwitcher({ className = "", currentLocale, path }: LanguageSwitcherProps) {
  return (
    <div
      aria-label={switcherLabels[currentLocale]}
      role="group"
      dir="ltr"
      className={`flex items-center gap-1 rounded-md border border-[#e3dbcb] bg-white/72 p-1 text-xs font-semibold text-[#596575] ${className}`}
    >
      {localeOrder.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(path, locale)}
          hrefLang={locale}
          aria-current={locale === currentLocale ? "page" : undefined}
          aria-label={localeLabels[locale]}
          className={
            locale === currentLocale
              ? "rounded bg-[#17202a] px-2.5 py-1.5 text-white"
              : "rounded px-2.5 py-1.5 transition hover:bg-[#f4efe3] hover:text-[#17202a]"
          }
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
