import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { getI18nContent } from "@/content/i18n";
import {
  getLanguageAlternates,
  localizedPath,
  localizedPublicPages,
  supportedLocales,
} from "@/lib/i18n";

const legalPaths = ["/privacy", "/terms"] as const;

type LegalPageContent = {
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ title: string; copy: string }>;
  contactLabel: string;
};

function legalPagesFor(locale: (typeof supportedLocales)[number]) {
  return (
    getI18nContent(locale) as unknown as {
      legalPages?: Record<(typeof legalPaths)[number], LegalPageContent>;
    }
  ).legalPages;
}

afterEach(cleanup);

describe("localized Privacy and Terms pages", () => {
  it("registers only real translated legal routes in sitemap and hreflang", () => {
    for (const path of legalPaths) {
      expect(localizedPublicPages).toContain(path);

      for (const locale of supportedLocales) {
        const localizedUrl = new URL(
          localizedPath(path, locale),
          "https://xingyuejewelry.com",
        ).toString();
        const entry = sitemap().find(({ url }) => url === localizedUrl);

        expect(entry?.alternates?.languages).toEqual(
          getLanguageAlternates(path),
        );
      }
    }
  });

  it.each(supportedLocales)(
    "provides complete, localized and conservative legal copy in %s",
    (locale) => {
      const pages = legalPagesFor(locale);

      expect(pages).toBeDefined();
      expect(Object.keys(pages ?? {})).toEqual(legalPaths);

      for (const path of legalPaths) {
        const page = pages?.[path];

        expect(page?.seo.title).toBeTruthy();
        expect(page?.seo.description).toBeTruthy();
        expect(page?.title).toBeTruthy();
        expect(page?.intro).toBeTruthy();
        expect(page?.sections.length).toBeGreaterThanOrEqual(4);
        expect(page?.contactLabel).toBeTruthy();

        const serialized = JSON.stringify(page);
        expect(serialized).not.toMatch(
          /retain(?:ed)? for \d+|registered company number|guaranteed delivery|fixed MOQ|certified factory/i,
        );
      }
    },
  );

  it.each(supportedLocales)(
    "links the Contact privacy notice to the matching locale in %s",
    (locale) => {
      const { container } = render(
        <ContactInquiryForm
          content={getI18nContent(locale).contact.form}
          emailHref="mailto:hello@example.com"
          locale={locale}
          sourcePath={localizedPath("/contact", locale)}
        />,
      );

      const privacyLink = container.querySelector(
        `a[href="${localizedPath("/privacy", locale)}"]`,
      );
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink?.textContent?.trim()).toBeTruthy();
    },
  );
});
