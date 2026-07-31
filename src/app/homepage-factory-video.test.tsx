import { act, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LocalizedHomePage from "./[locale]/page";
import Home from "./page";

const VIDEO_SRC = "/videos/xingyue-factory-process.mp4";
const POSTER_SRC = "/images/xingyue-factory-process-poster.jpg";

let intersectionCallback: IntersectionObserverCallback | undefined;
let prefersReducedMotion = false;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "240px 0px";
  readonly thresholds = [0.1];

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

const homeCases = [
  {
    locale: "en",
    renderPage: async () => <Home />,
    title: "See How Custom Jewelry Is Made",
    copy:
      "From CAD design and model preparation to stone setting, polishing, and final inspection, see how we turn custom concepts into production-ready jewelry.",
    cta: "Start Your OEM/ODM Project",
    href: "/contact?locale=en&source=homepage-prepare-inquiry&contactMethod=form&interest=other",
  },
  {
    locale: "es",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "es" }) }),
    title: "Descubra cómo fabricamos joyería personalizada",
    copy:
      "Desde el diseño CAD y la preparación del modelo hasta el engaste, el pulido y la inspección final, vea cómo convertimos conceptos personalizados en joyería lista para producción.",
    cta: "Inicie su proyecto OEM/ODM",
    href: "/es/contact?locale=es&source=homepage-prepare-inquiry&contactMethod=form&interest=other",
  },
  {
    locale: "ar",
    renderPage: () => LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) }),
    title: "شاهد كيف نصنع المجوهرات المخصصة",
    copy:
      "من تصميم CAD وإعداد النموذج إلى ترصيع الأحجار والتلميع والفحص النهائي، شاهد كيف نحول الأفكار المخصصة إلى مجوهرات جاهزة للإنتاج.",
    cta: "ابدأ مشروع OEM/ODM الخاص بك",
    href: "/ar/contact?locale=ar&source=homepage-prepare-inquiry&contactMethod=form&interest=other",
  },
] as const;

beforeEach(() => {
  intersectionCallback = undefined;
  prefersReducedMotion = false;
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: prefersReducedMotion,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("homepage factory process video", () => {
  it.each(homeCases)("renders approved $locale copy and routes into the existing inquiry", async ({
    renderPage,
    title,
    copy,
    cta,
    href,
  }) => {
    const page = await renderPage();
    const { container } = render(page as ReactElement);
    const section = container.querySelector<HTMLElement>('[data-home-section="factory-video"]');

    expect(section).not.toBeNull();
    expect(within(section as HTMLElement).getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    expect(within(section as HTMLElement).getByText(copy)).toBeInTheDocument();
    expect(within(section as HTMLElement).getByRole("link", { name: cta })).toHaveAttribute("href", href);
  });

  it("keeps the video source lazy and exposes the required media attributes", () => {
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play");
    const { container } = render(<Home />);
    const section = container.querySelector<HTMLElement>('[data-home-section="factory-video"]');
    const video = section?.querySelector("video") as HTMLVideoElement;

    expect(video).toHaveAttribute("poster", POSTER_SRC);
    expect(video).not.toHaveAttribute("src");
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAccessibleName("Xingyue Jewelry factory manufacturing process video");
    expect(within(section as HTMLElement).getByRole("button", { name: "Play factory process video" })).toBeInTheDocument();

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(video).toHaveAttribute("src", VIDEO_SRC);
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("does not autoplay when reduced motion is requested but allows explicit playback", () => {
    prefersReducedMotion = true;
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play");
    const { container } = render(<Home />);
    const section = container.querySelector<HTMLElement>('[data-home-section="factory-video"]');
    const video = section?.querySelector("video") as HTMLVideoElement;

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(video).toHaveAttribute("src", VIDEO_SRC);
    expect(playSpy).not.toHaveBeenCalled();

    fireEvent.click(within(section as HTMLElement).getByRole("button", { name: "Play factory process video" }));
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("shows the poster fallback if video loading fails", () => {
    const { container } = render(<Home />);
    const section = container.querySelector<HTMLElement>('[data-home-section="factory-video"]');
    const video = section?.querySelector("video") as HTMLVideoElement;

    fireEvent.error(video);

    expect(
      within(section as HTMLElement).getByRole("img", {
        name: "Xingyue Jewelry factory process poster",
      }),
    ).toHaveAttribute("src", expect.stringContaining("xingyue-factory-process-poster.jpg"));
  });

  it("keeps the Arabic homepage RTL with the video before How We Work", async () => {
    const page = await LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) });
    const { container } = render(page);

    expect(container.querySelector("main")).toHaveAttribute("dir", "rtl");
    const sections = Array.from(container.querySelectorAll<HTMLElement>("[data-home-section]")).map(
      (section) => section.dataset.homeSection,
    );
    expect(sections.indexOf("factory-video")).toBe(sections.indexOf("how-we-work") - 1);
  });
});
