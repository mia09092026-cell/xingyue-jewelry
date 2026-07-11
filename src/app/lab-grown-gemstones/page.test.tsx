import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GemstonePage, { metadata } from "./page";

describe("lab-grown gemstone App Router page", () => {
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
});
