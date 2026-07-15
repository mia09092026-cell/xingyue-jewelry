import { cleanup, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import LocalizedHomePage from "./[locale]/page";
import Home from "./page";

const homeCases = [
  { locale: "en", renderPage: async () => <Home /> },
  { locale: "es", renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }) },
  { locale: "ar", renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }) },
] as const;

const expectedPhase4BSections = ["sample-moq", "quality-control", "prepare-inquiry"];

afterEach(cleanup);

describe("Phase 4B homepage conversion sections", () => {
  it.each(homeCases)("renders all three shared sections in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);

    expect(
      Array.from(container.querySelectorAll<HTMLElement>("[data-home-section]"))
        .map((section) => section.dataset.homeSection)
        .slice(5, 8),
    ).toEqual(expectedPhase4BSections);

    for (const sectionName of expectedPhase4BSections) {
      expect(container.querySelector(`[data-home-section="${sectionName}"] h2`)).toBeInTheDocument();
    }
  });

  it.each(homeCases)("renders the approved content counts and no image media in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const sample = container.querySelector<HTMLElement>('[data-home-section="sample-moq"]');
    const quality = container.querySelector<HTMLElement>('[data-home-section="quality-control"]');
    const inquiry = container.querySelector<HTMLElement>('[data-home-section="prepare-inquiry"]');

    expect(sample?.querySelectorAll("[data-sample-moq-item]")).toHaveLength(4);
    expect(quality?.querySelectorAll("[data-quality-check]")).toHaveLength(6);
    expect(inquiry?.querySelectorAll("[data-inquiry-field]")).toHaveLength(10);
    expect(container.querySelectorAll("[data-phase4b-media]")).toHaveLength(0);
    expect(sample?.querySelector("img")).toBeNull();
    expect(quality?.querySelector("img")).toBeNull();
    expect(inquiry?.querySelector("img")).toBeNull();
  });

  it.each(homeCases)("marks inquiry preparation fields without changing the form in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const inquiry = container.querySelector<HTMLElement>('[data-home-section="prepare-inquiry"]');
    const fields = Array.from(inquiry?.querySelectorAll<HTMLElement>("[data-inquiry-field]") ?? []);

    expect(fields.filter((field) => field.dataset.inquiryStatus === "required")).toHaveLength(4);
    expect(fields.filter((field) => field.dataset.inquiryStatus === "conditional")).toHaveLength(1);
    expect(fields.filter((field) => field.dataset.inquiryStatus === "optional")).toHaveLength(5);
    expect(container.querySelector("[data-home-section=prepare-inquiry] form")).toBeNull();
  });

  it.each(homeCases)("links all Phase 4B CTAs to the localized Contact route in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);

    for (const sectionName of expectedPhase4BSections) {
      const cta = container.querySelector<HTMLElement>(`[data-home-section="${sectionName}"] a`);
      expect(cta).toHaveAttribute("href", expect.stringMatching(/^\/((es|ar)\/)?contact\?/));
    }
  });

  it("keeps Arabic RTL and preserves the shared DOM order", async () => {
    const page = await LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) });
    const { container } = render(page);
    const main = container.querySelector("main");

    expect(main).toHaveAttribute("dir", "rtl");
    expect(
      Array.from(container.querySelectorAll<HTMLElement>("[data-inquiry-field]")).map(
        (field) => field.dataset.inquiryStatus,
      ),
    ).toEqual(["required", "required", "required", "required", "conditional", "optional", "optional", "optional", "optional", "optional"]);
  });

  it.each(homeCases)("does not add fixed commercial or operational claims in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const phase4BText = Array.from(
      container.querySelectorAll<HTMLElement>('[data-home-section="sample-moq"], [data-home-section="quality-control"], [data-home-section="prepare-inquiry"]'),
    )
      .map((section) => section.textContent ?? "")
      .join(" ");

    expect(phase4BText).not.toMatch(/MOQ\s*[:=]\s*\d+/i);
    expect(phase4BText).not.toMatch(/sample fee\s*[:=]\s*\d+/i);
    expect(phase4BText).not.toMatch(/\d+\s*(business\s*)?(days|weeks)/i);
    expect(phase4BText).not.toMatch(/\b(all|every)\s+(products?|orders?)\b.*\b(one[- ]piece|small[- ]batch)/i);
    expect(phase4BText).not.toMatch(/laboratory|certificate|employees|factory area/i);
  });
});
