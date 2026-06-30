import { notFound } from "next/navigation";
import { isSupportedLocale, type SupportedLocale } from "@/lib/i18n";

export const prefixedLocales = ["ar", "es"] as const satisfies readonly SupportedLocale[];

export type LocaleParams = Promise<{ locale: string }>;

export async function readPrefixedLocale(params: LocaleParams): Promise<SupportedLocale> {
  const { locale } = await params;

  if (!isSupportedLocale(locale) || locale === "en") {
    notFound();
  }

  return locale;
}

export function generatePrefixedLocaleParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}
