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
    title: "Jewelry Manufacturing & Supply Chain Partner | XINGYUE",
    description:
      "Jewelry manufacturing and supply chain support for emerging brands, boutique stores, independent designers and entrepreneurs.",
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
        <JsonLd data={organizationSchema(htmlAttributes.lang)} />
        {children}
      </body>
    </html>
  );
}
