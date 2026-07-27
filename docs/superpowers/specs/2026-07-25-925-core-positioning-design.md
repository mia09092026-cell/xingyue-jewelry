# Xingyue 925 Core Positioning Design

## Objective

Reposition the English, Spanish, and Arabic homepage around Xingyue's approved business hierarchy:

1. Custom 925 sterling silver jewelry
2. Lab-created colored gemstone jewelry
3. Custom moissanite jewelry
4. Lab-grown diamond jewelry
5. Custom K-gold jewelry

The primary brand position is:

> Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner

Lab-grown diamonds remain available as a secondary product direction. They must not lead the homepage, default metadata, structured data, navigation, FAQ, or AI-facing site summary.

## Scope

This phase changes only the positioning layer:

- Multilingual homepage Hero and supporting value copy
- Homepage product hierarchy and links
- Homepage FAQ emphasis
- Main navigation labels and product-route priority
- Localized metadata and Open Graph content
- Organization and homepage Service structured data
- `public/llms.txt`
- Tests that lock the multilingual positioning, routes, and SEO/GEO output

This phase does not:

- Add, remove, or change public routes
- Modify the Contact form or its rendered fields
- Modify `/api/contact`, Google Sheets, email, or WhatsApp flows
- Add or replace images
- Add dependencies
- Publish fixed MOQ, sample-price, sample-time, production-time, capacity, certification, or delivery claims
- Describe partner workshops as Xingyue-owned factories

## Homepage Content Design

### English

**Eyebrow**

Custom Jewelry Manufacturing from Wuzhou

**H1**

Custom 925 Sterling Silver Jewelry Manufacturer & OEM/ODM Partner

**Hero description**

Develop custom sterling silver jewelry with lab-created colored gemstones, moissanite, lab-grown diamonds and project-specific K-gold options—from reference images and CAD development to sampling, production, quality control and private-label packaging.

**Primary CTA**

Discuss Your Custom Jewelry Project

**Secondary CTA**

Explore Materials & Capabilities

### Spanish

**Eyebrow**

Fabricación de joyería personalizada desde Wuzhou

**H1**

Fabricante de joyería personalizada en plata 925 y socio OEM/ODM

**Hero description**

Desarrolla joyería personalizada en plata 925 con gemas de color creadas en laboratorio, moissanita, diamantes de laboratorio y opciones de oro K según el proyecto, desde la imagen de referencia y el desarrollo CAD hasta la muestra, la producción, el control de calidad y el empaque de marca privada.

**Primary CTA**

Habla de tu proyecto de joyería

**Secondary CTA**

Explora materiales y capacidades

### Arabic

**Eyebrow**

تصنيع مجوهرات مخصصة من ووتشو

**H1**

مصنّع مجوهرات فضة إسترلينية 925 حسب الطلب وشريك OEM/ODM

**Hero description**

طوّر مجوهرات مخصصة من فضة 925 مع أحجار ملونة مصنّعة مخبرياً، وموسانيت، وألماس مزروع، وخيارات ذهب K حسب المشروع، بدءاً من الصورة المرجعية وتطوير CAD وصولاً إلى العينة والإنتاج وفحص الجودة والتغليف بعلامة خاصة.

**Primary CTA**

ناقش مشروع مجوهراتك

**Secondary CTA**

استكشف المواد وقدرات التصنيع

Arabic keeps `lang="ar"` and `dir="rtl"`. Product names and prose use natural Arabic; `OEM/ODM`, `CAD`, and metal purity abbreviations remain LTR where needed.

## Supporting Value Hierarchy

The first proof points below the Hero reinforce the actual buyer decision:

1. **925 Sterling Silver** — the core material direction for custom collections
2. **Project-Specific Sampling & MOQ** — sample scope and order quantity are reviewed against product, material, stone, process, and packaging
3. **OEM/ODM Coordination** — reference review, CAD discussion, production, quality review, and private-label packaging

The copy must not imply that every product supports one-piece sampling or every project supports a small production run.

## Products & Manufacturing Capabilities

The homepage product cards use this fixed order:

1. **Custom 925 Sterling Silver Jewelry**
   - Route: `/collections/custom-jewelry-manufacturing`
   - Focus: rings, earrings, pendants, bracelets, chains, finish, setting, and private-label direction
2. **Lab-Created Colored Gemstone Jewelry**
   - Route: `/collections/lab-grown-colored-gemstones`
   - Focus: stone color, shape, cut, size, matching, and jewelry application
3. **Custom Moissanite Jewelry**
   - Route: `/collections/moissanite-wholesale`
   - Focus: loose stones, finished S925 styles, custom settings, and repeat wholesale collections
4. **Lab-Grown Diamond Jewelry**
   - Route: `/collections/lab-grown-diamond-jewelry`
   - Focus: an optional product program rather than the main brand identity
5. **Custom K-Gold Jewelry**
   - Route: `/collections/custom-jewelry-manufacturing`
   - Focus: project-specific 10K, 14K, and 18K premium material options

Existing approved product, gemstone, packaging, and workshop images are reused. No new media files or empty placeholders are introduced.

## Navigation

The navigation keeps the existing number of primary product links while changing their priority:

- Products → `/products`
- Gemstones → `/lab-grown-gemstones`
- Moissanite Wholesale → `/collections/moissanite-wholesale`
- OEM / ODM → `/collections/custom-jewelry-manufacturing`

The lab-grown diamond collection remains accessible through Products, homepage product cards, footer collection links, and relevant internal links. It is removed from the generic top-level “Wholesale” shortcut so that the navigation no longer defines wholesale as lab-grown diamond jewelry.

Spanish and Arabic navigation labels use the same routes and equivalent meaning.

## Homepage FAQ

The visible FAQ and FAQ JSON-LD use one shared localized data source and follow this order:

1. Do you manufacture custom 925 sterling silver jewelry?
2. Can buyers send a reference image, sketch, or CAD direction?
3. Which gemstone directions can be discussed?
4. How are samples and MOQ confirmed?
5. Can finish, plating, packaging, and private-label requirements be reviewed?
6. Are lab-grown diamond and K-gold options available?

Answers stay project-specific. They do not promise fixed MOQ, fixed pricing, fixed timing, universal small-batch availability, certificates, or delivery performance.

## SEO and GEO Design

### English metadata

**Title**

Custom 925 Sterling Silver Jewelry Manufacturer | Xingyue

**Description**

Custom 925 sterling silver jewelry manufacturing with lab-created colored gemstones, moissanite, OEM/ODM sampling, quality control and private-label packaging.

### Spanish metadata

**Title**

Fabricante de joyería personalizada en plata 925 | Xingyue

**Description**

Fabricación OEM/ODM de joyería personalizada en plata 925 con gemas de color creadas en laboratorio, moissanita, muestras, control de calidad y empaque privado.

### Arabic metadata

**Title**

مصنّع مجوهرات فضة 925 حسب الطلب | Xingyue

**Description**

تصنيع OEM/ODM لمجوهرات فضة 925 حسب الطلب مع أحجار ملونة مصنّعة مخبرياً وموسانيت وعينات وفحص جودة وتغليف بعلامة خاصة.

Canonical, `en`, `es`, `ar`, and `x-default` alternates remain unchanged.

The Organization `knowsAbout` order becomes:

1. Custom 925 sterling silver jewelry
2. Lab-created colored gemstone jewelry
3. Custom moissanite jewelry
4. Lab-grown diamond jewelry
5. Custom K-gold jewelry
6. OEM/ODM jewelry manufacturing
7. CAD and sample development
8. Jewelry quality control
9. Private-label packaging

The homepage Service schema uses the English core position as `name` and `serviceType`. Localized service descriptions use the localized homepage content.

`public/llms.txt` defines Xingyue as a custom 925 sterling silver jewelry manufacturer and OEM/ODM partner, then lists the approved product hierarchy. Existing canonical routes and safety notes remain.

## Safety and Ownership Language

Existing workshop imagery remains described as authorized, representative production stages used in a coordinated manufacturing workflow.

The implementation must continue rejecting:

- owned factory
- our factory
- factory-direct
- in-house factory
- equivalent Spanish or Arabic ownership claims

No page may convert partner-workshop evidence into an ownership claim.

## Testing and Acceptance

Tests are written or updated before production code and must initially fail because the old diamond-first positioning is still present.

Automated coverage must verify:

- English, Spanish, and Arabic use the approved 925-first H1
- Homepage product cards appear in the approved five-item order
- Navigation routes Moissanite Wholesale to the moissanite collection
- Lab-grown diamond remains available but does not lead the homepage
- Homepage metadata, Open Graph, Organization Schema, Service Schema, and `llms.txt` use the 925-first position
- FAQ visible content and FAQ JSON-LD share the same localized source
- Canonical, hreflang, `x-default`, and Arabic RTL do not regress
- Existing Products, Contact, gemstone, target-audience, and collection routes remain available
- Contact form, `/api/contact`, Google Sheets, email, and WhatsApp files are unchanged
- Ownership-language tests remain active

Required final commands:

- `npm run lint`
- `npx tsc --noEmit`
- `npm test`
- `npm run build`
- `git diff --check`

Visual review covers `/`, `/es`, and `/ar` at 390×844, 768×1024, and 1440×900. It confirms one H1, visible desktop Hero CTA, no horizontal overflow, natural Spanish and Arabic copy, correct RTL, and no broken images or console errors.
