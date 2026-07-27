import { cleanup, render } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import { LocalizedHome } from "@/components/localized-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getI18nContent } from "@/content/i18n";
import {
  localizedPath,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n";

afterEach(cleanup);

const ownFactoryPattern: Record<SupportedLocale, RegExp> = {
  en: /\b(?:our|Xingyue's) own jewelry factory\b/i,
  es: /\bfábrica propia\b/i,
  ar: /مصنعنا|مصنع مجوهرات خاص/,
};

const ownFactorySeoPattern: Record<SupportedLocale, RegExp> = {
  en: /\bown jewelry factory\b/i,
  es: /\bfábrica propia de joyería\b/i,
  ar: /مصنع.*الخاص|مصنعها الخاص/,
};

describe("factory authority discovery", () => {
  it.each(supportedLocales)(
    "makes the three factory authority pages discoverable in %s navigation",
    (locale) => {
      const navigationHrefs = getI18nContent(locale).navigation.map(
        ({ href }) => href,
      );

      expect(navigationHrefs).toContain(localizedPath("/factory", locale));
      expect(navigationHrefs).toContain(
        localizedPath("/manufacturing-capabilities", locale),
      );
      expect(navigationHrefs).toContain(
        localizedPath("/custom-process", locale),
      );
    },
  );

  it("uses the factory authority paths in the default English header", () => {
    const { container } = render(<SiteHeader />);

    for (const href of [
      "/factory",
      "/manufacturing-capabilities",
      "/custom-process",
    ]) {
      expect(container.querySelector(`a[href="${href}"]`)).toBeInTheDocument();
    }
  });

  it.each(supportedLocales)(
    "links the homepage manufacturing CTA to the localized capabilities page in %s",
    (locale) => {
      const { container } = render(<LocalizedHome locale={locale} />);
      const capabilitiesHref = localizedPath(
        "/manufacturing-capabilities",
        locale,
      );

      expect(
        container.querySelector(
          `[data-home-section="hero"] a[href="${capabilitiesHref}"]`,
        ),
      ).toBeInTheDocument();
    },
  );

  it.each(supportedLocales)(
    "publishes factory and legal links in the shared footer in %s",
    (locale) => {
      const { container } = render(<SiteFooter locale={locale} />);

      for (const pathName of [
        "/factory",
        "/manufacturing-capabilities",
        "/custom-process",
        "/privacy",
        "/terms",
      ]) {
        expect(
          container.querySelectorAll(
            `a[href="${localizedPath(pathName, locale)}"]`,
          ),
        ).toHaveLength(1);
      }
    },
  );

  it.each(supportedLocales)(
    "states the own-factory relationship in About content for %s",
    (locale) => {
      const about = getI18nContent(locale).about;
      const aboutCopy = JSON.stringify(about);
      expect(aboutCopy).toMatch(ownFactoryPattern[locale]);
      expect(JSON.stringify(about.seo)).toMatch(ownFactorySeoPattern[locale]);
    },
  );

  it("uses consistent third-person Arabic in the About factory profile", () => {
    const aboutCopy = getI18nContent("ar").about.profileCopy.join(" ");

    expect(aboutCopy).toContain("تدير Xingyue Jewelry مصنعها الخاص");
    expect(aboutCopy).not.toContain("تدير Xingyue Jewelry مصنعنا الخاص");
  });

  it("makes the English About page an own-factory authority path", () => {
    const { container } = render(<AboutPage />);

    expect(container.textContent).toMatch(/\bour own jewelry factory\b/i);
    expect(
      container.querySelector('a[href="/factory"]'),
    ).toBeInTheDocument();
  });

  it("publishes factual factory authority URLs for search and AI discovery", () => {
    const llmsText = fs.readFileSync(
      path.join(process.cwd(), "public", "llms.txt"),
      "utf8",
    );

    expect(llmsText).toContain(
      "XINGYUE operates its own jewelry factory in Wuzhou",
    );
    expect(llmsText).toContain(
      "https://xingyuejewelry.com/factory",
    );
    expect(llmsText).toContain(
      "https://xingyuejewelry.com/manufacturing-capabilities",
    );
    expect(llmsText).toContain(
      "https://xingyuejewelry.com/custom-process",
    );
    expect(llmsText).toContain("https://xingyuejewelry.com/privacy");
    expect(llmsText).toContain("https://xingyuejewelry.com/terms");
    expect(llmsText).not.toMatch(
      /employees|square meters|pieces per month|guaranteed lead time|fixed MOQ/i,
    );
  });
});
