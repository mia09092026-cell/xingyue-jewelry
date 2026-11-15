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
      "Lab-Grown Gemstones Wholesale by Color | Zarivelle Jewelry",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://zarivelle.com/lab-grown-gemstones",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://zarivelle.com/lab-grown-gemstones",
      ar: "https://zarivelle.com/ar/lab-grown-gemstones",
      es: "https://zarivelle.com/es/lab-grown-gemstones",
      "x-default": "https://zarivelle.com/lab-grown-gemstones",
    });
    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          url: "https://zarivelle.com/images/xingyue-colored-gemstones.jpg",
        },
      ],
    });
  });
});
