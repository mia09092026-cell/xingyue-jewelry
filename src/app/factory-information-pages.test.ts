import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { FactoryInformationPage } from "@/components/factory-information-page";
import { getI18nContent } from "@/content/i18n";
import {
  getLanguageAlternates,
  localizedPath,
  localizedPublicPages,
  supportedLocales,
} from "@/lib/i18n";

const factoryPaths = [
  "/factory",
  "/manufacturing-capabilities",
  "/custom-process",
] as const;

type FactoryPageContent = {
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  facts: Array<{ title: string; copy: string }>;
  stages: Array<{ title: string; copy: string }>;
  buyerGuidance: Array<{ title: string; copy: string }>;
  images?: Array<{ src: string; alt: string; caption: string }>;
  faqs: Array<{ question: string; answer: string }>;
  cta: { title: string; copy: string; label: string };
};

function factoryPagesFor(locale: (typeof supportedLocales)[number]) {
  return (
    getI18nContent(locale) as unknown as {
      factoryPages?: Record<(typeof factoryPaths)[number], FactoryPageContent>;
    }
  ).factoryPages;
}

describe("multilingual factory information pages", () => {
  it.each([
    ["en", "Factory Workshop and Craftsmanship", "Factory Facts and Capabilities"],
    ["es", "Taller y trabajo artesanal", "Datos y capacidades de fábrica"],
    ["ar", "الورشة والعمل الحرفي", "حقائق المصنع وقدراته"],
  ] as const)(
    "uses distinct gallery and factory-facts headings in %s",
    (locale, galleryHeading, factsHeading) => {
      render(
        React.createElement(FactoryInformationPage, {
          locale,
          path: "/factory",
        }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: galleryHeading }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: factsHeading }),
      ).toBeInTheDocument();
    },
  );

  it("registers only real translated factory routes in localized SEO", () => {
    for (const path of factoryPaths) {
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
    "provides complete typed factory facts, process guidance and FAQs in %s",
    (locale) => {
      const pages = factoryPagesFor(locale);

      expect(pages).toBeDefined();
      expect(Object.keys(pages ?? {})).toEqual(factoryPaths);

      for (const path of factoryPaths) {
        const page = pages?.[path];

        expect(page?.seo.title).toBeTruthy();
        expect(page?.seo.description).toBeTruthy();
        expect(page?.title).toBeTruthy();
        expect(page?.intro).toBeTruthy();
        expect(page?.facts.length).toBeGreaterThanOrEqual(3);
        expect(page?.stages.length).toBeGreaterThanOrEqual(3);
        expect(page?.buyerGuidance.length).toBeGreaterThanOrEqual(3);
        expect(page?.faqs).toHaveLength(3);
        expect(page?.cta.label).toBeTruthy();

        const serialized = JSON.stringify(page);
        expect(serialized).not.toMatch(
          /fixed MOQ|guaranteed lead time|employees|square meters|pieces per month|aggregateRating|certified factory/i,
        );
      }
    },
  );

  it.each(supportedLocales)(
    "uses the three verified workshop images as visible factory evidence in %s",
    (locale) => {
      const pages = factoryPagesFor(locale);
      const images = pages?.["/factory"].images;

      expect(images).toEqual([
        expect.objectContaining({
          src: "/images/factory-workshop-overview.webp",
        }),
        expect.objectContaining({
          src: "/images/jewelry-wax-model-preparation.webp",
        }),
        expect.objectContaining({
          src: "/images/manual-gemstone-setting.webp",
        }),
      ]);
      expect(images?.every(({ alt, caption }) => alt && caption)).toBe(true);
      expect(pages?.["/manufacturing-capabilities"].images).toBeUndefined();
      expect(pages?.["/custom-process"].images).toBeUndefined();
    },
  );

  it("uses clear own-factory language without inventing proof claims", () => {
    const english = factoryPagesFor("en");

    expect(english?.["/factory"].title).toContain("Own Jewelry Factory");
    expect(english?.["/manufacturing-capabilities"].intro).toContain(
      "Xingyue's own factory",
    );
    expect(english?.["/custom-process"].intro).toContain(
      "our own factory",
    );
  });
});
