import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocalizedGemstonePage, { generateMetadata, generateStaticParams } from "./page";

describe("localized lab-grown gemstone App Router page", () => {
  it("generates Arabic and Spanish static params", () => {
    expect(generateStaticParams()).toEqual([{ locale: "ar" }, { locale: "es" }]);
  });

  it("publishes Arabic metadata and renders the RTL catalog", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "ar" }),
    });
    const page = await LocalizedGemstonePage({
      params: Promise.resolve({ locale: "ar" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "أحجار كريمة مُنتَجة في المختبر بالجملة حسب اللون",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(metadata.title).toBe(
      "أحجار كريمة مُنتَجة في المختبر بالجملة حسب اللون | Zarivelle Jewelry",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://zarivelle.com/ar/lab-grown-gemstones",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://zarivelle.com/lab-grown-gemstones",
      ar: "https://zarivelle.com/ar/lab-grown-gemstones",
      es: "https://zarivelle.com/es/lab-grown-gemstones",
      "x-default": "https://zarivelle.com/lab-grown-gemstones",
    });
  });

  it("publishes Spanish metadata and renders the localized catalog", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "es" }),
    });
    const page = await LocalizedGemstonePage({
      params: Promise.resolve({ locale: "es" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "Gemas de laboratorio al por mayor por color",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(metadata.title).toBe(
      "Gemas de laboratorio al por mayor por color | Zarivelle Jewelry",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://zarivelle.com/es/lab-grown-gemstones",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://zarivelle.com/lab-grown-gemstones",
      ar: "https://zarivelle.com/ar/lab-grown-gemstones",
      es: "https://zarivelle.com/es/lab-grown-gemstones",
      "x-default": "https://zarivelle.com/lab-grown-gemstones",
    });
  });
});
