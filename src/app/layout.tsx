import type { Metadata } from "next";
import { headers } from "next/headers";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema } from "@/lib/structured-data";
import { getHtmlAttributesForPath } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: "Custom 925 Sterling Silver Jewelry Manufacturer | Xingyue",
    description: siteConfig.description,
    path: "/",
    image: siteConfig.socialImage,
    locale: "en",
  }),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const htmlAttributes = getHtmlAttributesForPath(
    headerStore.get("x-xingyue-pathname") ?? "/",
  );

  return (
    <html lang={htmlAttributes.lang} dir={htmlAttributes.dir}>
      <body>
        <JsonLd data={organizationSchema(htmlAttributes.lang)} />
        {children}
      </body>
    </html>
  );
}
