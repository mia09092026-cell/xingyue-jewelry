import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import LocalizedHomePage from "./[locale]/page";
import Home from "./page";

const expectedSectionOrder = [
  "hero",
  "manufacturing-support",
  "products-capabilities",
  "gemstone-colors",
  "manufacturing-gallery",
  "how-we-work",
  "sample-moq",
  "quality-control",
  "who-we-support",
  "prepare-inquiry",
  "faq",
  "final-cta",
];

const gemstoneImages = [
  "lab-grown-blue-gemstones.webp",
  "lab-grown-green-gemstones.webp",
  "lab-grown-pink-gemstones.webp",
  "lab-grown-purple-gemstones.webp",
  "lab-grown-colorless-gemstones.webp",
  "lab-grown-yellow-gemstones.webp",
];

const manufacturingImages = [
  "factory-workshop-overview.webp",
  "jewelry-wax-model-preparation.webp",
  "manual-gemstone-setting.webp",
];

const homeCases = [
  {
    locale: "en",
    renderPage: async () => <Home />,
    eyebrow: "From Wuzhou to the World",
    h1: "Lab-Grown Diamond & Colored Gemstone Manufacturing Partner",
    heroAlt: "Jewelry artisans working at setting benches in a Wuzhou workshop",
  },
  {
    locale: "es",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
    eyebrow: "De Wuzhou al mundo",
    h1: "Socio de fabricación de diamantes de laboratorio y gemas de color",
    heroAlt: "Artesanos de joyería trabajando en bancos de engaste en un taller de Wuzhou",
  },
  {
    locale: "ar",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }),
    eyebrow: "من ووتشو إلى العالم",
    h1: "شريك لتصنيع الألماس المزروع والأحجار الكريمة الملونة",
    heroAlt: "حرفيو مجوهرات يعملون على طاولات الترصيع في ورشة في ووتشو",
  },
] as const;

afterEach(cleanup);

describe("factory-positioned homepage visuals", () => {
  it.each(homeCases)(
    "uses the Wuzhou manufacturing hero and shared visual section order in $locale",
    async ({ renderPage, eyebrow, h1, heroAlt }) => {
      const page = await renderPage();
      const { container } = render(page as ReactElement);
      const hero = container.querySelector<HTMLElement>('[data-home-section="hero"]');

      expect(screen.getByText(eyebrow)).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
      expect(hero?.querySelector("img")).toHaveAttribute("alt", heroAlt);
      expect(hero?.querySelector("img")).toHaveAttribute(
        "src",
        expect.stringContaining("factory-workshop-overview.webp"),
      );
      expect(
        Array.from(container.querySelectorAll<HTMLElement>("[data-home-section]")).map(
          (section) => section.dataset.homeSection,
        ),
      ).toEqual(expectedSectionOrder);
    },
  );

  it.each(homeCases)("renders six authorized gemstone color images in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const section = container.querySelector<HTMLElement>('[data-home-section="gemstone-colors"]');
    const cards = Array.from(section?.querySelectorAll<HTMLElement>("[data-gemstone-color]") ?? []);
    const imageSources = cards.map((card) => card.querySelector("img")?.getAttribute("src") ?? "");

    expect(cards).toHaveLength(6);
    for (const image of gemstoneImages) {
      expect(imageSources.some((src) => src.includes(image))).toBe(true);
    }
  });

  it.each(homeCases)("renders three distinct manufacturing process images in $locale", async ({ renderPage }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const section = container.querySelector<HTMLElement>(
      '[data-home-section="manufacturing-gallery"]',
    );
    const cards = Array.from(
      section?.querySelectorAll<HTMLElement>("[data-manufacturing-visual]") ?? [],
    );
    const imageSources = cards.map((card) => card.querySelector("img")?.getAttribute("src") ?? "");

    expect(cards).toHaveLength(3);
    for (const image of manufacturingImages) {
      expect(imageSources.some((src) => src.includes(image))).toBe(true);
    }
  });
});
