import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/language-switcher";

afterEach(cleanup);

describe("language switcher route availability", () => {
  it("does not create Spanish or Arabic links for an English-only collection", () => {
    render(
      <LanguageSwitcher
        currentLocale="en"
        path="/collections/tennis-chains"
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/collections/tennis-chains",
    );
    expect(
      screen.queryByRole("link", { name: "Español" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "العربية" }),
    ).not.toBeInTheDocument();
  });

  it("keeps all language links for a truly localized page", () => {
    render(<LanguageSwitcher currentLocale="en" path="/products" />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute(
      "href",
      "/es/products",
    );
    expect(screen.getByRole("link", { name: "العربية" })).toHaveAttribute(
      "href",
      "/ar/products",
    );
  });
});
