import { cleanup, render } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { BrandLogo } from "@/components/brand-logo";
import { getI18nContent } from "@/content/i18n";
import { supportedLocales } from "@/lib/i18n";
import { organizationSchema } from "@/lib/structured-data";

afterEach(cleanup);

describe("Mia-approved brand and product asset updates", () => {
  it("uses the approved Xingyue logo without changing brand contact systems", () => {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "xingyue-jewelry-logo.png",
    );
    const { container } = render(<BrandLogo />);

    expect(fs.existsSync(logoPath)).toBe(true);
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("xingyue-jewelry-logo.png"),
    );
    expect(organizationSchema().logo).toBe(
      "https://xingyuejewelry.com/xingyue-jewelry-logo.png",
    );
  });

  it.each(supportedLocales)(
    "adds S925 to the homepage and tennis bracelet material direction in %s",
    (locale) => {
      const content = getI18nContent(locale);
      const homepageMaterials = content.home.stats
        .map(({ value, label }) => `${value} ${label}`)
        .join(" ");
      const homepageProductCards = content.home.productCards
        .map(({ title, copy }) => `${title} ${copy}`)
        .join(" ");
      const tennisBracelet = content.products.cards.find(
        ({ id }) => id === "custom-tennis-bracelets",
      );

      expect(homepageMaterials).toMatch(/925|S925/);
      expect(homepageProductCards).toMatch(/925|S925/);
      expect(tennisBracelet?.material).toMatch(/925|S925/);
    },
  );

  it.each(supportedLocales)(
    "uses the approved lab-created colored gemstone pendant card in %s",
    (locale) => {
      const pendant = getI18nContent(locale).products.cards.find(
        ({ id }) => id === "lab-created-colored-gemstone-pendants",
      );

      expect(pendant).toBeDefined();
      expect(pendant?.image).toBe(
        "/images/lab-created-colored-gemstone-pendant.webp",
      );
      expect(pendant?.alt).toBeTruthy();
      expect(pendant?.name).not.toMatch(/diamond pendant|قلادات ألماس|diamantes/i);
    },
  );

  it("includes the approved pendant asset in the public image directory", () => {
    expect(
      fs.existsSync(
        path.join(
          process.cwd(),
          "public",
          "images",
          "lab-created-colored-gemstone-pendant.webp",
        ),
      ),
    ).toBe(true);
  });
});
