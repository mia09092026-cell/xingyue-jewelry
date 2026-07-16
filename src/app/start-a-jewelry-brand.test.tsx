import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getI18nContent } from "@/content/i18n";
import { localizedPublicPages } from "@/lib/i18n";

const locales = ["en", "es", "ar"] as const;
const expectedSectionOrder = [
  "hero",
  "who-this-is-for",
  "what-you-need-to-start",
  "product-direction",
  "how-xingyue-supports",
  "sample-moq-planning",
  "branding-packaging",
  "quality-production",
  "prepare-first-inquiry",
  "faq",
  "final-cta",
];

const routeFiles = [
  "src/app/start-a-jewelry-brand/page.tsx",
  "src/app/[locale]/start-a-jewelry-brand/page.tsx",
  "src/components/start-jewelry-brand-page.tsx",
];

type StartBrandContent = {
  sectionOrder: string[];
  hero: { title: string; subtitle: string };
  audience: { items: string[] };
  preparation: { groups: Array<{ items: string[] }> };
  productDirection: { items: Array<{ title: string; copy: string }> };
  support: { phases: Array<{ title: string; copy: string }>; boundary: string };
  sampleMoq: { items: Array<{ title: string; copy: string }> };
  brandingPackaging: { items: string[] };
  qualityProduction: { items: Array<{ title: string; copy: string }> };
  inquiry: { fields: Array<{ label: string; status: string }> };
  faq: { items: Array<{ question: string; answer: string }> };
  finalCta: { title: string; copy: string };
};

function startBrandContent(locale: (typeof locales)[number]) {
  return (getI18nContent(locale) as unknown as { startBrand?: StartBrandContent }).startBrand;
}

describe("Start Your Jewelry Brand Phase 5 contract", () => {
  it("defines the three localized route files and sitemap path", () => {
    for (const routeFile of routeFiles) {
      expect(existsSync(resolve(process.cwd(), routeFile))).toBe(true);
    }

    expect(localizedPublicPages).toContain("/start-a-jewelry-brand");
  });

  it("provides the same eleven-section content model in every locale", () => {
    for (const locale of locales) {
      const content = startBrandContent(locale);

      expect(content).toBeDefined();
      expect(content?.sectionOrder).toEqual(expectedSectionOrder);
      expect(content?.hero.title).toBeTruthy();
      expect(content?.hero.subtitle).toBeTruthy();
      expect(content?.audience.items).toHaveLength(6);
      expect(content?.preparation.groups).toHaveLength(3);
      expect(content?.productDirection.items).toHaveLength(9);
      expect(content?.support.phases.length).toBeGreaterThanOrEqual(3);
      expect(content?.sampleMoq.items.length).toBeGreaterThanOrEqual(3);
      expect(content?.brandingPackaging.items.length).toBeGreaterThanOrEqual(4);
      expect(content?.qualityProduction.items).toHaveLength(6);
      expect(content?.inquiry.fields).toHaveLength(10);
      expect(content?.faq.items).toHaveLength(8);
      expect(content?.finalCta.title).toBeTruthy();
    }
  });

  it("keeps commercial boundaries free of fixed values or guarantees", () => {
    for (const locale of locales) {
      const content = startBrandContent(locale);
      const serialized = JSON.stringify(content);

      expect(serialized).not.toMatch(/\bMOQ\s*[:=]\s*\d+/i);
      expect(serialized).not.toMatch(/sample fee\s*[:=]?\s*\$?\d+/i);
      expect(serialized).not.toMatch(/\b\d+\s*(business\s*)?(days|weeks)\b/i);
      expect(serialized).not.toMatch(/guaranteed success|easy profit|guaranteed sales|guaranteed margin|low-risk business|cheapest supplier/i);
      expect(serialized).not.toMatch(/one-piece samples? for every product|all products.*small[- ]batch/i);
      expect(serialized).not.toMatch(/profit margin|sales forecast|investment advice|owned factory|factory capacity|employee count|laboratory equipment/i);
    }
  });

  it("uses shared localized routing and structured data without changing the inquiry form", () => {
    const componentSource = readFileSync(
      resolve(process.cwd(), "src/components/start-jewelry-brand-page.tsx"),
      "utf8",
    );

    expect(componentSource).toContain("contactInquiryHref");
    expect(componentSource).toContain("breadcrumbSchema");
    expect(componentSource).toContain("faqPageSchema");
    expect(componentSource).not.toContain("ContactInquiryForm");
    expect(componentSource).not.toContain("<form");
  });
});
