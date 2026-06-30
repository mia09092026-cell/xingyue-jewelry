import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  languages?: NonNullable<Metadata["alternates"]>["languages"];
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.socialImage,
  languages,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
