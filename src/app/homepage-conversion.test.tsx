import { cleanup, render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import LocalizedHomePage from "./[locale]/page";
import Home from "./page";

const expectedSectionOrder = [
  "hero",
  "who-we-support",
  "core-values",
  "products-capabilities",
  "how-we-work",
  "sample-moq",
  "quality-control",
  "prepare-inquiry",
  "faq",
  "final-cta",
];

const homeCases = [
  {
    locale: "en",
    renderPage: async () => <Home />,
    h1: "Bring Your Jewelry Collection from Idea to Production",
    audience: "Emerging Jewelry Brands",
    primaryCta: "Discuss Your Collection",
    secondaryCta: "Explore Our Capabilities",
    productsCta: "View Products",
  },
  {
    locale: "es",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
    h1: "Lleva tu colección de joyería de la idea a la producción",
    audience: "Marcas de joyería emergentes",
    primaryCta: "Hablemos de tu colección",
    secondaryCta: "Conoce nuestras capacidades",
    productsCta: "Ver productos",
  },
  {
    locale: "ar",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }),
    h1: "حوّل فكرة مجموعتك إلى إنتاج فعلي",
    audience: "علامات المجوهرات التجارية الناشئة",
    primaryCta: "ناقش مجموعتك معنا",
    secondaryCta: "استكشف قدراتنا",
    productsCta: "عرض المنتجات",
  },
] as const;

afterEach(cleanup);

describe("Phase 4A homepage conversion structure", () => {
  it.each(homeCases)(
    "uses the approved shared section order and content in $locale",
    async ({ renderPage, h1, audience, primaryCta, secondaryCta, productsCta }) => {
      const page = await renderPage();
      const { container } = render(page as ReactElement);

      expect(
        Array.from(container.querySelectorAll<HTMLElement>("[data-home-section]")).map(
          (section) => section.dataset.homeSection,
        ),
      ).toEqual(expectedSectionOrder);
      expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
      expect(screen.getByText(audience)).toBeInTheDocument();
      const hero = container.querySelector<HTMLElement>('[data-home-section="hero"]');
      expect(hero?.querySelector("img")).toHaveAttribute("alt", "");
      expect(within(hero as HTMLElement).getByRole("link", { name: primaryCta })).toHaveAttribute(
        "href",
        expect.stringContaining("/contact?"),
      );
      expect(screen.getByRole("link", { name: secondaryCta })).toHaveAttribute(
        "href",
        "#products-capabilities",
      );
      expect(screen.getByRole("link", { name: productsCta })).toHaveAttribute(
        "href",
        expect.stringMatching(/\/products$/),
      );
    },
  );

  it.each(homeCases)("renders six ordered workflow steps in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const workflow = container.querySelector<HTMLElement>('[data-home-section="how-we-work"]');
    expect(workflow?.querySelector("[data-process-timeline]")).toBeInTheDocument();
    const steps = Array.from(
      workflow?.querySelectorAll<HTMLElement>("[data-process-step]") ?? [],
    );

    expect(steps).toHaveLength(6);
    expect(workflow?.querySelectorAll("[data-process-node]")).toHaveLength(6);
    expect(steps.map((step) => step.dataset.processStep)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
    ]);
    for (const [index, step] of steps.entries()) {
      const number = step.querySelector("bdi");
      expect(number).toHaveAttribute("dir", "ltr");
      expect(number).toHaveTextContent(String(index + 1).padStart(2, "0"));
    }
  });

  it("keeps Arabic RTL while preserving workflow DOM order", async () => {
    const page = await LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) });
    const { container } = render(page);

    expect(container.querySelector("main")).toHaveAttribute("dir", "rtl");
    expect(
      Array.from(container.querySelectorAll<HTMLElement>("[data-process-step]")).map(
        (step) => step.dataset.processStep,
      ),
    ).toEqual(["01", "02", "03", "04", "05", "06"]);
  });

  it.each(homeCases)("avoids unconfirmed operational claims in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/small[- ]batch/i);
    expect(text).not.toMatch(/MOQ\s*[:=]?\s*\d+/i);
    expect(text).not.toMatch(/sample fee\s*[:=]?\s*\d+/i);
    expect(text).not.toMatch(/\d+\s*(business\s*)?(days|weeks)/i);
    expect(text).not.toMatch(/\d+\+?\s*(employees|workers|m²|sqm)/i);
  });

  it("consolidates the three duplicate English product entrances", () => {
    render(<Home />);

    const productsSection = screen.getByTestId("products-capabilities");
    expect(within(productsSection).getByRole("heading", { level: 2 })).toHaveTextContent(
      "Products & Capabilities",
    );
    expect(screen.queryByText("Core Products")).not.toBeInTheDocument();
    expect(screen.queryByText("Collections")).not.toBeInTheDocument();
    expect(screen.queryByText("Featured Products")).not.toBeInTheDocument();
  });
});
