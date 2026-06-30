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
    title: "Moissanite & Lab-Grown Diamond Jewelry Manufacturer | XINGYUE",
    description:
      "XINGYUE supplies wholesale moissanite jewelry, lab-grown diamonds, colored gemstones, S925 silver jewelry and custom K gold production.",
    path: "/",
  }),
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
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
