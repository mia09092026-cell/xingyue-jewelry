import type { Metadata } from "next";
import Script from "next/script";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { organizationSchema } from "@/lib/structured-data";
import { defaultLocale, supportedLocales } from "@/lib/i18n";
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

// Keep the Hong Kong region close to the primary China/Asia audience for
// server-rendered API routes. Static pages are served from the CDN edge.
export const preferredRegion = "hkg1";

const langScript = `(function(){try{var p=window.location.pathname.split("/")[1]||"";var s=${JSON.stringify(
  supportedLocales,
)};var l=s.indexOf(p)>-1?p:${JSON.stringify(
  defaultLocale,
)};var d=document.documentElement;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} dir="ltr" suppressHydrationWarning>
      <body>
        <Script
          id="html-lang-sync"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: langScript }}
        />
        <HtmlLangSync />
        <JsonLd data={organizationSchema(defaultLocale)} />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
