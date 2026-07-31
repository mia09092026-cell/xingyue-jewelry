import { Children, isValidElement, type ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsScripts } from "./analytics-scripts";
import RootLayout from "@/app/layout";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-ga-id={gaId} />
  ),
}));

vi.mock("next/script", () => ({
  default: ({
    children,
    id,
    strategy,
  }: {
    children: ReactNode;
    id: string;
    strategy: string;
  }) => (
    <script data-testid="clarity-loader" id={id} data-strategy={strategy}>
      {children}
    </script>
  ),
}));

vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (name: string) =>
      name === "host" ? "xingyuejewelry.com" : name === "x-xingyue-pathname" ? "/" : null,
  }),
}));

vi.mock("@/app/globals.css", () => ({}));

function countElementsOfType(node: ReactNode, type: unknown): number {
  return Children.toArray(node).reduce<number>((count, child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return count;
    }

    return (
      count +
      (child.type === type ? 1 : 0) +
      countElementsOfType(child.props.children, type)
    );
  }, 0);
}

describe("AnalyticsScripts", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders no analytics integrations when the runtime gate is disabled", () => {
    render(
      <AnalyticsScripts
        environment="preview"
        hostname="xingyue-preview.vercel.app"
        qaEnabled="false"
        gaMeasurementId="G-ABC123"
        clarityProjectId="abc123"
      />,
    );

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(screen.queryByTestId("clarity-loader")).not.toBeInTheDocument();
  });

  it("renders one official GA integration and one afterInteractive Clarity loader", () => {
    render(
      <AnalyticsScripts
        environment="production"
        hostname="xingyuejewelry.com"
        gaMeasurementId="G-ABC123"
        clarityProjectId="abc123"
      />,
    );

    expect(screen.getAllByTestId("google-analytics")).toHaveLength(1);
    expect(screen.getByTestId("google-analytics")).toHaveAttribute(
      "data-ga-id",
      "G-ABC123",
    );
    expect(screen.getAllByTestId("clarity-loader")).toHaveLength(1);
    expect(screen.getByTestId("clarity-loader")).toHaveAttribute(
      "data-strategy",
      "afterInteractive",
    );
    expect(screen.getByTestId("clarity-loader").textContent).toContain("abc123");
  });

  it("mounts AnalyticsScripts exactly once from the root layout", async () => {
    const layout = await RootLayout({ children: <main>Page content</main> });

    expect(countElementsOfType(layout, AnalyticsScripts)).toBe(1);
  });
});
