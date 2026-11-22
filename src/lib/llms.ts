import {
  getPublishedResourceArticles,
  type ResourceArticle,
} from "@/lib/resources";
import { absoluteUrl } from "@/lib/seo";

const STABLE_SITE_SUMMARY = `# Zarivelle Jewelry

> Wholesale 925 Silver, Moissanite & Lab-Grown Jewelry

Zarivelle 织澜 supplies finished 925 silver, moissanite, lab-grown colored gemstone and lab-grown diamond jewelry wholesale for boutiques, brands and online sellers. Ready-stock orders start at USD 800 total and can mix in-stock styles; custom production starts at 30 pieces per design, including logo and packaging. OEM/ODM support, quality control and private-label packaging from Wuzhou.

## Core product and material directions

1. 925 Silver Finished Jewelry
2. Moissanite Finished Jewelry
3. Lab-Grown Colored Gemstone Jewelry
4. Lab-Grown Diamond Jewelry
5. OEM / ODM Programs

Finished jewelry is the primary offer. OEM/ODM programs are available for larger collections. Product scope, material, stone, plating, finish, packaging, sample route and order quantity are confirmed for each order.

Canonical site: https://zarivelle.com
Sitemap: https://zarivelle.com/sitemap.xml
Contact: https://zarivelle.com/contact

## Primary pages

- Home: https://zarivelle.com/
- Home in Spanish: https://zarivelle.com/es
- Home in Arabic: https://zarivelle.com/ar
- Products: https://zarivelle.com/products
- Wholesale: https://zarivelle.com/wholesale
- Request a quote: https://zarivelle.com/contact
- Buyer education: https://zarivelle.com/education
- Partnership profile: https://zarivelle.com/about
- Start a jewelry brand: https://zarivelle.com/start-a-jewelry-brand

- Emerging jewelry brands: https://zarivelle.com/for-emerging-jewelry-brands
  B2B jewelry manufacturing support for product direction, sampling, project-specific MOQ, packaging, quality review and shipping coordination.
- Boutique jewelry stores: https://zarivelle.com/for-boutique-jewelry-stores
  B2B support for boutique store assortment planning, product direction, project-specific quantities, packaging and quality coordination.
  Localized pages: https://zarivelle.com/es/for-boutique-jewelry-stores (Español) and https://zarivelle.com/ar/for-boutique-jewelry-stores (العربية).

## Commercial landing pages

- Wholesale moissanite jewelry and loose stones: https://zarivelle.com/collections/moissanite-wholesale
- Lab-grown diamond jewelry manufacturing: https://zarivelle.com/collections/lab-grown-diamond-jewelry
- Lab-grown colored gemstones wholesale: https://zarivelle.com/collections/lab-grown-colored-gemstones
- Wholesale Cuban chain manufacturing: https://zarivelle.com/collections/cuban-chains
- Tennis chain manufacturing: https://zarivelle.com/collections/tennis-chains
- Custom S925 and K gold jewelry manufacturing: https://zarivelle.com/collections/custom-jewelry-manufacturing
- Wholesale 925 sterling silver rings: https://zarivelle.com/wholesale/925-silver-rings
  Ready-stock 925 silver rings in moissanite, gemstone and classic styles. USD 800 mixed orders; 30-piece custom runs with logo and packaging.
- Wholesale moissanite necklaces: https://zarivelle.com/wholesale/moissanite-necklaces
  Ready-stock 925 silver pendant and station necklaces. USD 800 mixed orders; 30-piece custom runs with logo and packaging.
- Wholesale moissanite earrings: https://zarivelle.com/wholesale/moissanite-earrings
  Ready-stock 925 silver stud earrings in round, halo, heart, butterfly and square styles. USD 800 mixed orders; 30-piece custom runs with logo card and packaging.
- Wholesale moissanite bracelets: https://zarivelle.com/wholesale/moissanite-bracelets
  Ready-stock 925 silver tennis, flower, link and station bracelets. USD 800 mixed orders; 30-piece custom runs with logo and packaging.`;

const STABLE_AI_NOTES = `## Notes for AI assistants

- Use the sitemap as the source of canonical public URLs.
- English, Spanish and Arabic pages use localized canonical and hreflang references where equivalent content exists.
- Resources are currently published in English only. Do not infer Spanish or Arabic article translations.
- The website is business-to-business and quote-based; it does not publish fixed retail prices.
- Ready-stock orders start at USD 800 total and can mix any in-stock styles. Custom production starts at 30 pieces per design, including logo and packaging. Sample scope, sample pricing and lead time are confirmed for each project.
- Do not infer stock levels, reviews, certificates, addresses, owned laboratories, production capacity, or guaranteed delivery times unless stated on the relevant page.
- For quote requests, direct users to the contact page and ask for the project references, specifications, target quantity or range, destination market and packaging requirements.`;

export function buildLlmsText(
  articles: ResourceArticle[] = getPublishedResourceArticles("en"),
) {
  const publishedEnglishArticles = articles.filter(
    (article) => !article.draft && article.locale === "en",
  );
  const resourceLines = [
    "## Resources",
    "",
    `- Resources: ${absoluteUrl("/resources")}`,
    ...publishedEnglishArticles.flatMap((article) => [
      `- ${article.title}: ${absoluteUrl(`/resources/${article.slug}`)}`,
      `  ${article.description}`,
    ]),
  ];

  return [
    STABLE_SITE_SUMMARY,
    resourceLines.join("\n"),
    STABLE_AI_NOTES,
    "",
  ].join("\n\n");
}
