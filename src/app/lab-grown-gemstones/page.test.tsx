import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GemstonePage, { metadata } from "./page";
import LocalizedGemstonePage, {
  generateMetadata,
} from "../[locale]/lab-grown-gemstones/page";

describe("lab-grown gemstone App Router pages", () => {
  it("publishes English metadata and renders the catalog", () => {
    render(<GemstonePage />);

    expect(
      screen.getByRole("heading", {
        name: "Lab-Grown Gemstones Wholesale by Color",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(metadata.title).toBe(
      "Lab-Grown Gemstones Wholesale by Color | Xingyue Jewelry",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://xingyuejewelry.com/lab-grown-gemstones",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://xingyuejewelry.com/lab-grown-gemstones",
      ar: "https://xingyuejewelry.com/ar/lab-grown-gemstones",
      es: "https://xingyuejewelry.com/es/lab-grown-gemstones",
      "x-default": "https://xingyuejewelry.com/lab-grown-gemstones",
    });
    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          url: "https://xingyuejewelry.com/images/xingyue-colored-gemstones.jpg",
        },
      ],
    });
  });

  it("publishes localized metadata and localized pages", async () => {
    const arabicMetadata = await generateMetadata({
      params: Promise.resolve({ locale: "ar" }),
    });
    const spanishMetadata = await generateMetadata({
      params: Promise.resolve({ locale: "es" }),
    });
    const arabicPage = await LocalizedGemstonePage({
      params: Promise.resolve({ locale: "ar" }),
    });
    const { unmount } = render(arabicPage);

    expect(arabicMetadata.alternates?.canonical).toBe(
      "https://xingyuejewelry.com/ar/lab-grown-gemstones",
    );
    expect(spanishMetadata.alternates?.canonical).toBe(
      "https://xingyuejewelry.com/es/lab-grown-gemstones",
    );
    expect(
      screen.getByRole("heading", {
        name: "أحجار كريمة مخبرية بالجملة حسب اللون",
      }),
    ).toBeInTheDocument();
    unmount();

    const spanishPage = await LocalizedGemstonePage({
      params: Promise.resolve({ locale: "es" }),
    });
    render(spanishPage);
    expect(
      screen.getByRole("heading", {
        name: "Gemas de laboratorio al por mayor por color",
      }),
    ).toBeInTheDocument();
  });
});
