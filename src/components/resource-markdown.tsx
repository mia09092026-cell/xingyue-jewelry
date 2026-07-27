import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";

type SafeLink = {
  href: string;
  external: boolean;
};

const SITE_ORIGIN = "https://xingyuejewelry.com";

export function resolveSafeResourceLink(href?: string): SafeLink | null {
  const value = href?.trim();
  if (!value || value.startsWith("//") || value.includes("\\")) {
    return null;
  }

  if (value.startsWith("/") || value.startsWith("#")) {
    return { href: value, external: false };
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return null;
  }

  return {
    href: value,
    external: url.origin !== SITE_ORIGIN,
  };
}

function SafeMarkdownLink({
  children,
  href,
  node: _node,
  ...props
}: ComponentPropsWithoutRef<"a"> & { children?: ReactNode; node?: unknown }) {
  void _node;
  const safeLink = resolveSafeResourceLink(href);

  if (!safeLink) {
    return <span>{children}</span>;
  }

  return (
    <a
      {...props}
      href={safeLink.href}
      {...(safeLink.external
        ? { rel: "noopener noreferrer", target: "_blank" }
        : {})}
      className="font-semibold text-[#17202a] underline decoration-[#cbb06e] decoration-2 underline-offset-4 transition hover:decoration-[#17202a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17202a]"
    >
      {children}
    </a>
  );
}

const markdownComponents: Components = {
  a: SafeMarkdownLink,
  h2: ({ children }) => (
    <h2 className="mt-12 text-balance font-serif text-3xl leading-tight text-[#17202a] first:mt-0 sm:text-4xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 font-serif text-2xl leading-tight text-[#17202a]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[1.02rem] leading-8 text-[#4f5b68]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 ps-6 leading-8 text-[#4f5b68]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 ps-6 leading-8 text-[#4f5b68]">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-7 border-s-4 border-[#cbb06e] bg-[#f4efe3] px-6 py-4 text-[#4f5b68]">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#17202a]">{children}</strong>
  ),
};

export function ResourceMarkdown({ body }: { body: string }) {
  return (
    <div className="resource-markdown">
      <ReactMarkdown components={markdownComponents} skipHtml>
        {body}
      </ReactMarkdown>
    </div>
  );
}
