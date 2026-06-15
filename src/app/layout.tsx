import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XINGYUE 星悦 | Moissanite & Lab-grown Diamond Jewelry",
  description:
    "XINGYUE 星悦 creates moissanite, lab-grown diamond, S925 silver, and custom K gold jewelry for modern fine jewelry lovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
