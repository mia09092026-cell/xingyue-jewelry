import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { metadata as productsMetadata } from "./products/page";
import manifest from "./manifest";

const pngAssets = [
  ["/icons/favicon-16x16.png", 16],
  ["/icons/favicon-32x32.png", 32],
  ["/apple-touch-icon.png", 180],
  ["/icons/icon-192x192.png", 192],
  ["/icons/icon-512x512.png", 512],
] as const;

function publicPath(url: string) {
  return resolve("public", url.slice(1));
}

function readPngDimensions(path: string) {
  const data = readFileSync(path);

  expect(data.subarray(0, 8)).toEqual(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  );

  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20),
  };
}

describe("site icons", () => {
  it("publishes explicit icon and manifest metadata", () => {
    const layoutSource = readFileSync(resolve("src/app/layout.tsx"), "utf8");

    expect(layoutSource).toContain('manifest: "/manifest.webmanifest"');
    expect(layoutSource).toContain('url: "/favicon.ico"');
    expect(layoutSource).toContain('url: "/icons/favicon-16x16.png"');
    expect(layoutSource).toContain('url: "/icons/favicon-32x32.png"');
    expect(layoutSource).toContain('url: "/icons/icon-192x192.png"');
    expect(layoutSource).toContain('url: "/icons/icon-512x512.png"');
    expect(layoutSource).toContain('url: "/apple-touch-icon.png"');
    expect(layoutSource).toContain('shortcut: "/favicon.ico"');

    expect(manifest()).toMatchObject({
      name: "XINGYUE",
      start_url: "/",
      display: "standalone",
      icons: [
        { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    });
  });

  it("stores readable PNG icons at their declared dimensions", () => {
    for (const [url, size] of pngAssets) {
      const path = publicPath(url);
      const exists = existsSync(path);

      expect.soft(exists, `${url} should exist`).toBe(true);
      if (!exists) continue;

      expect(readPngDimensions(path)).toEqual({ width: size, height: size });
    }
  });

  it("stores a multi-size Windows icon at /favicon.ico", () => {
    const path = publicPath("/favicon.ico");
    const exists = existsSync(path);

    expect(exists).toBe(true);
    if (!exists) return;

    const data = readFileSync(path);
    const imageCount = data.readUInt16LE(4);
    const sizes = Array.from({ length: imageCount }, (_, index) => {
      const width = data[6 + index * 16];
      return width === 0 ? 256 : width;
    });

    expect(data.readUInt16LE(0)).toBe(0);
    expect(data.readUInt16LE(2)).toBe(1);
    expect(sizes).toEqual(expect.arrayContaining([16, 32, 48]));
  });

  it("keeps the existing multilingual product metadata unchanged", () => {
    expect(productsMetadata.alternates).toEqual({
      canonical: "https://xingyuejewelry.com/products",
      languages: {
        en: "https://xingyuejewelry.com/products",
        es: "https://xingyuejewelry.com/es/products",
        ar: "https://xingyuejewelry.com/ar/products",
        "x-default": "https://xingyuejewelry.com/products",
      },
    });
  });
});
