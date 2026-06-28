import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema } from "@/lib/structured-data";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
