"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getHtmlAttributesForPath } from "@/lib/i18n";

/**
 * Keeps <html lang/dir> correct after client-side locale navigation.
 * The initial value is set by an inline beforeInteractive script so the
 * first paint is correct even before hydration.
 */
export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const { lang, dir } = getHtmlAttributesForPath(pathname ?? "/");
    const root = document.documentElement;

    if (root.lang !== lang) {
      root.lang = lang;
    }

    if (root.dir !== dir) {
      root.dir = dir;
    }
  }, [pathname]);

  return null;
}
