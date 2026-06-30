import Link from "next/link";
import {
  localeLabels,
  localizedPath,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: SupportedLocale;
  path: string;
};

const localeShortLabels: Record<SupportedLocale, string> = {
  en: "EN",
  ar: "AR",
  es: "ES",
};

export function LanguageSwitcher({ currentLocale, path }: LanguageSwitcherProps) {
  return (
    <div
      aria-label="Language switcher"
      className="flex items-center gap-1 rounded-md border border-[#e3dbcb] bg-white/72 p-1 text-xs font-semibold text-[#596575]"
    >
      {supportedLocales.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(path, locale)}
          hrefLang={locale}
          aria-current={locale === currentLocale ? "page" : undefined}
          aria-label={localeLabels[locale]}
          className={
            locale === currentLocale
              ? "rounded px-2 py-1 text-[#17202a]"
              : "rounded px-2 py-1 transition hover:bg-[#f4efe3] hover:text-[#17202a]"
          }
        >
          {localeShortLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
