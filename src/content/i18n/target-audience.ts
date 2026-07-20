import type { SupportedLocale } from "@/lib/i18n";

export const emergingBrandsSectionOrder = [
  "hero",
  "who-this-is-for",
  "common-challenges",
  "how-xingyue-supports",
  "product-directions",
  "sampling-moq-planning",
  "quality-packaging",
  "how-we-work",
  "prepare-your-inquiry",
  "faq",
  "final-cta",
] as const;

export const boutiqueStoresSectionOrder = emergingBrandsSectionOrder;

export type TargetAudienceKey = "emerging-brands" | "boutique-stores";

type SeoCopy = { title: string; description: string };
type Card = { title: string; copy: string };
type ProductDirection = Card & { path: string };
type FaqItem = { question: string; answer: string };
type InquiryField = { label: string; status: "required" | "conditional" | "optional" };
type WorkflowStep = { title: string; copy: string };

export type TargetAudienceContent = {
  seo: SeoCopy;
  sectionOrder: readonly string[];
  definition: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  audience: { eyebrow: string; title: string; copy: string; items: string[] };
  challenges: { eyebrow: string; title: string; copy: string; items: Card[] };
  support: { eyebrow: string; title: string; copy: string; values: Card[] };
  productDirections: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ProductDirection[];
    boundary: string;
    linkLabel: string;
  };
  sampleMoq: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Card[];
    cta: string;
  };
  qualityPackaging: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Card[];
    packaging: string;
    cta: string;
  };
  process: { eyebrow: string; title: string; copy: string; steps: WorkflowStep[] };
  inquiry: {
    eyebrow: string;
    title: string;
    copy: string;
    statusLabels: Record<InquiryField["status"], string>;
    fields: InquiryField[];
    cta: string;
  };
  faq: { eyebrow: string; title: string; copy: string; items: FaqItem[] };
  finalCta: { eyebrow: string; title: string; copy: string; cta: string };
  links: {
    products: string;
    startBrand: string;
    emergingBrands: string;
    boutiqueStores?: string;
    about: string;
    howWeWork: string;
  };
  schema: {
    service: {
      name: string;
      description: string;
      serviceType: string;
      audience: string;
    };
  };
};

const en: TargetAudienceContent = {
  seo: {
    title: "Jewelry Manufacturing Support for Emerging Brands | Xingyue",
    description:
      "B2B jewelry manufacturing and supply-chain support for emerging brands, from product direction and sampling to packaging, quality review and shipping coordination.",
  },
  sectionOrder: emergingBrandsSectionOrder,
  definition:
    "Xingyue Jewelry is a B2B jewelry manufacturing and supply-chain partner for emerging brands.",
  hero: {
    eyebrow: "For Emerging Jewelry Brands",
    title: "Develop Your Jewelry Collection with a Coordinated Manufacturing Partner",
    subtitle:
      "Bring a product idea, reference image, or collection direction. Xingyue helps coordinate product selection, custom development, sampling, project-specific MOQ, packaging, quality review, and international shipping discussions.",
    primaryCta: "Discuss Your Collection",
    secondaryCta: "Explore Product Directions",
  },
  audience: {
    eyebrow: "Who This Is For",
    title: "A practical starting point for your first or next collection",
    copy:
      "This page is for teams that need product direction, sampling, quantity, packaging and project scope clarified before production.",
    items: [
      "Early-stage jewelry brands",
      "Online jewelry businesses building a collection",
      "Private-label collection developers",
      "Boutique founders preparing an early collection",
    ],
  },
  challenges: {
    eyebrow: "Common Challenges",
    title: "Turn an early idea into a clear project brief",
    copy: "The first step is often alignment, not a larger catalog.",
    items: [
      { title: "Product direction", copy: "Choose a focused category, material and stone direction for the collection." },
      { title: "Reference to specification", copy: "Translate an image or concept into details that can be reviewed for quotation." },
      { title: "Sample and quantity planning", copy: "Discuss the sample route and project-specific quantity expectations before production." },
      { title: "Presentation and shipping coordination", copy: "Bring packaging, destination and timing questions into the same project conversation." },
    ],
  },
  support: {
    eyebrow: "How Xingyue Supports",
    title: "Three points of coordination for an emerging brand",
    copy: "A shared project brief keeps product, sample and delivery decisions connected.",
    values: [
      { title: "Clearer product direction", copy: "Define category, material, stone and target market before deeper quotation discussions." },
      { title: "Project-specific sampling and quantity", copy: "Review sample scope, cost, expected timing and MOQ according to the product and project." },
      { title: "Coordinated presentation and shipping", copy: "Align packaging, quality checks and shipping discussions after project information is confirmed." },
    ],
  },
  productDirections: {
    eyebrow: "Product Directions",
    title: "Start with a product direction that fits your brief",
    copy: "Explore a few established directions, then discuss the right material, stone and development route for your collection.",
    items: [
      { title: "Lab-grown diamond jewelry", copy: "Explore diamond jewelry directions for a considered collection brief.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "Moissanite jewelry", copy: "Review moissanite styles and references for a product-led conversation.", path: "/products" },
      { title: "Custom S925 or K-gold settings", copy: "Discuss custom settings, metal choices and development details by project.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "Private-label packaging", copy: "Coordinate boxes, pouches, cards, labels and logo placement with the collection scope.", path: "/products" },
    ],
    boundary:
      "Final product, material, stone, sample route and quantity are reviewed for each project; no single direction is assumed to fit every brief.",
    linkLabel: "Explore Products & Capabilities",
  },
  sampleMoq: {
    eyebrow: "Sampling & MOQ Planning",
    title: "Samples and project-specific quantity planning",
    copy:
      "Sample requirements, cost, expected timing, and minimum order quantity are reviewed for each project. Product type, material, stone, setting complexity, and packaging affect the appropriate route. The sample scope is discussed first; the production scope is aligned after sample approval.",
    items: [
      { title: "Project-specific MOQ", copy: "Quantity is confirmed according to product type, material, stone, process complexity and packaging." },
      { title: "Sample scope first", copy: "Discuss the reference, specifications and sample route before confirming the project scope." },
      { title: "Review before production", copy: "Material, setting, finish and packaging direction are reviewed with the sample before production is aligned." },
      { title: "Availability depends on the product", copy: "One-piece samples or small production runs are not assumed for every product." },
    ],
    cta: "Discuss Your Sampling Plan",
  },
  qualityPackaging: {
    eyebrow: "Quality & Packaging",
    title: "Coordinate the details before shipping",
    copy: "Quality checks and presentation details are discussed against the approved sample or confirmed project specifications.",
    items: [
      { title: "Material and stone confirmation", copy: "Review the agreed material and stone type, size and color direction." },
      { title: "Approved sample reference", copy: "Use the approved sample, images or specifications as the project reference." },
      { title: "Setting and finish review", copy: "Discuss setting alignment, surface finish and relevant closures." },
      { title: "Size and specification checks", copy: "Compare dimensions, lengths, quantities and included logo or engraving details." },
      { title: "Packaging confirmation", copy: "Align box, pouch, card, label and logo placement requirements." },
      { title: "Pre-shipment review", copy: "Review agreed project details before packaging and international shipping coordination." },
    ],
    packaging: "Packaging options can include boxes, pouches, cards, labels and logo placement when included in the project scope.",
    cta: "Discuss Quality Requirements",
  },
  process: {
    eyebrow: "How We Work",
    title: "Six stages from first brief to shipping coordination",
    copy: "A clear sequence helps an emerging brand make decisions at the right point in the project.",
    steps: [
      { title: "Share your project", copy: "Send product references or requirements, including material, stone, quantity range, destination and packaging needs." },
      { title: "Review design or product direction", copy: "Review a custom design or existing product options and align the specifications needed for quotation." },
      { title: "Confirm quote and scope", copy: "Discuss quotation, sample route, project-specific quantity, expected timing and payment terms." },
      { title: "Develop and approve sample", copy: "Review material, setting, finish and packaging direction against the agreed sample scope." },
      { title: "Production and quality review", copy: "Coordinate production against the approved sample or project brief and review agreed quality points." },
      { title: "Packaging and shipping coordination", copy: "Align packaging and international shipping discussions with the project and destination." },
    ],
  },
  inquiry: {
    eyebrow: "Prepare Your Inquiry",
    title: "Bring the details that make a first conversation useful",
    copy: "A short project brief helps us review product direction, sample route and next steps together.",
    statusLabels: { required: "Required", conditional: "If available", optional: "Optional" },
    fields: [
      { label: "Product type", status: "required" },
      { label: "Target quantity or range", status: "required" },
      { label: "Destination country", status: "required" },
      { label: "Business type", status: "required" },
      { label: "Reference image or design", status: "conditional" },
      { label: "Material", status: "optional" },
      { label: "Stone", status: "optional" },
      { label: "Packaging requirements", status: "optional" },
      { label: "Expected timing", status: "optional" },
    ],
    cta: "Prepare Your Inquiry",
  },
  faq: {
    eyebrow: "Questions from Emerging Brands",
    title: "Before you send your first project brief",
    copy: "These answers set a clear starting point without assuming a fixed route for every product.",
    items: [
      { question: "Do I need a finished design?", answer: "No. You can begin with a product idea, reference image or collection direction. We can review the information needed to clarify the next step." },
      { question: "How is minimum order quantity determined?", answer: "Minimum order quantity is reviewed for each project and depends on product type, material, stone, setting complexity, process and packaging." },
      { question: "Can every product be sampled as one piece?", answer: "Not necessarily. Sample routes and quantity options depend on the product and confirmed project scope." },
      { question: "Can Xingyue coordinate private-label packaging?", answer: "Packaging can be discussed as part of the project, including boxes, pouches, cards, labels and logo placement where applicable." },
      { question: "What should I include in my first inquiry?", answer: "Share product type, target quantity or range, destination country and business type. Add a reference, material, stone, packaging needs and expected timing when available." },
      { question: "Can international shipping be discussed?", answer: "Yes. Destination and shipping requirements can be reviewed as part of the confirmed project and packaging discussion." },
      { question: "What quality checks can be discussed?", answer: "Material and stone confirmation, sample reference, setting and finish, size and specification checks, packaging confirmation and a pre-shipment review can be discussed according to the project." },
    ],
  },
  finalCta: {
    eyebrow: "Ready to Start a Conversation?",
    title: "Ready to discuss your collection? Send your product direction and project details.",
    copy: "A clear first inquiry gives the project a practical starting point.",
    cta: "Discuss Your Collection",
  },
  links: { products: "Explore Products", startBrand: "Start Your Jewelry Brand", emergingBrands: "For Emerging Jewelry Brands", about: "About Xingyue", howWeWork: "Review the six stages" },
  schema: {
    service: {
      name: "Emerging Jewelry Brand Manufacturing Support",
      description: "B2B support for product direction, sampling, project-specific quantity planning, packaging, quality review and shipping coordination.",
      serviceType: "Jewelry manufacturing support",
      audience: "Emerging jewelry brands",
    },
  },
};

const es: TargetAudienceContent = {
  seo: {
    title: "Fabricación de joyería para marcas emergentes | Xingyue",
    description: "Apoyo B2B de fabricación y cadena de suministro para marcas emergentes: dirección de producto, muestras, empaque, revisión de calidad y coordinación de envíos.",
  },
  sectionOrder: emergingBrandsSectionOrder,
  definition: "Xingyue Jewelry es un socio B2B de fabricación y cadena de suministro de joyería para marcas emergentes.",
  hero: {
    eyebrow: "Para marcas de joyería emergentes",
    title: "Desarrolla tu colección con un socio de fabricación coordinado",
    subtitle: "Comparte una idea de producto, una imagen de referencia o una dirección de colección. Xingyue ayuda a coordinar la selección, el desarrollo personalizado, las muestras, el MOQ según el proyecto, el empaque, la revisión de calidad y la conversación sobre el envío internacional.",
    primaryCta: "Hablemos de tu colección",
    secondaryCta: "Explora las opciones de producto",
  },
  audience: {
    eyebrow: "Para quién es",
    title: "Un punto de partida práctico para tu primera colección o la siguiente",
    copy: "Esta página es para equipos que necesitan aclarar la dirección del producto, las muestras, la cantidad, el empaque y el alcance del proyecto antes de producir.",
    items: ["Marcas de joyería en etapa inicial", "Negocios de joyería online que están creando una colección", "Desarrolladores de colecciones de marca privada", "Fundadores de boutiques que preparan una colección inicial"],
  },
  challenges: {
    eyebrow: "Retos habituales",
    title: "Convierte una idea inicial en un brief claro",
    copy: "El primer paso suele ser la alineación, no un catálogo más grande.",
    items: [
      { title: "Dirección del producto", copy: "Elige una categoría, un material y una dirección de piedra para la colección." },
      { title: "De la referencia a la especificación", copy: "Convierte una imagen o concepto en detalles que se puedan revisar para cotizar." },
      { title: "Planificación de muestra y cantidad", copy: "Habla de la ruta de muestra y de la cantidad prevista según el proyecto antes de producir." },
      { title: "Presentación y envío", copy: "Incluye las preguntas de empaque, destino y plazo en la misma conversación del proyecto." },
    ],
  },
  support: {
    eyebrow: "Cómo apoya Xingyue",
    title: "Tres puntos de coordinación para una marca emergente",
    copy: "Un brief compartido conecta las decisiones de producto, muestra y entrega.",
    values: [
      { title: "Una dirección de producto más clara", copy: "Define categoría, material, piedra y mercado objetivo antes de profundizar en la cotización." },
      { title: "Muestras y cantidad según el proyecto", copy: "Revisa alcance, costo, plazo previsto de muestra y MOQ según el producto y el proyecto." },
      { title: "Presentación y envío coordinados", copy: "Alinea empaque, controles de calidad y envío después de confirmar la información del proyecto." },
    ],
  },
  productDirections: {
    eyebrow: "Direcciones de producto",
    title: "Comienza con una dirección que encaje con tu brief",
    copy: "Explora algunas direcciones y después conversa sobre el material, la piedra y la ruta de desarrollo adecuada para tu colección.",
    items: [
      { title: "Joyería con diamantes de laboratorio", copy: "Explora una dirección de joyería con diamantes para un brief de colección definido.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "Joyería de moissanita", copy: "Revisa estilos y referencias de moissanita para una conversación centrada en el producto.", path: "/products" },
      { title: "Monturas personalizadas en S925 u oro K", copy: "Habla de monturas, metales y detalles de desarrollo según el proyecto.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "Empaque de marca privada", copy: "Coordina cajas, bolsas, tarjetas, etiquetas y logo dentro del alcance de la colección.", path: "/products" },
    ],
    boundary: "El producto final, el material, la piedra, la ruta de muestra y la cantidad se revisan en cada proyecto; ninguna dirección se da por adecuada para todos los briefs.",
    linkLabel: "Explora productos y capacidades",
  },
  sampleMoq: {
    eyebrow: "Muestras y planificación del MOQ",
    title: "Muestras y cantidad según el proyecto",
    copy: "Los requisitos, el costo y el plazo previsto de la muestra, así como el MOQ, se revisan para cada proyecto. El tipo de producto, el material, la piedra, la complejidad de la montura y el empaque determinan la ruta adecuada. Primero se conversa el alcance de la muestra; después de aprobarla se alinea el alcance de producción.",
    items: [
      { title: "MOQ según el proyecto", copy: "La cantidad se confirma según el producto, el material, la piedra, la complejidad del proceso y el empaque." },
      { title: "Primero el alcance de la muestra", copy: "Revisa la referencia, las especificaciones y la ruta de muestra antes de confirmar el alcance." },
      { title: "Revisión antes de producir", copy: "El material, la montura, el acabado y el empaque se revisan con la muestra antes de alinear la producción." },
      { title: "La disponibilidad depende del producto", copy: "No se presupone que todos los productos admitan una muestra de una unidad o lotes pequeños." },
    ],
    cta: "Habla sobre tu plan de muestras",
  },
  qualityPackaging: {
    eyebrow: "Calidad y empaque",
    title: "Coordina los detalles antes del envío",
    copy: "Los controles de calidad y la presentación se conversan frente a la muestra aprobada o las especificaciones confirmadas.",
    items: [
      { title: "Confirmación de material y piedra", copy: "Revisa el material y el tipo, tamaño y color de piedra acordados." },
      { title: "Referencia de la muestra aprobada", copy: "Usa la muestra, las imágenes o las especificaciones aprobadas como referencia." },
      { title: "Revisión de montura y acabado", copy: "Habla de la alineación de la montura, el acabado y los cierres relevantes." },
      { title: "Medidas y especificaciones", copy: "Compara dimensiones, largos, cantidades y detalles de logo o grabado incluidos." },
      { title: "Confirmación del empaque", copy: "Alinea requisitos de caja, bolsa, tarjeta, etiqueta y logo." },
      { title: "Revisión previa al envío", copy: "Revisa los detalles acordados antes del empaque y la coordinación del envío internacional." },
    ],
    packaging: "Las opciones pueden incluir cajas, bolsas, tarjetas, etiquetas y ubicación del logo cuando forman parte del alcance del proyecto.",
    cta: "Habla sobre los requisitos de calidad",
  },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "Seis etapas desde el primer brief hasta la coordinación del envío",
    copy: "Una secuencia clara ayuda a tomar cada decisión en el momento adecuado.",
    steps: [
      { title: "Comparte tu proyecto", copy: "Envía referencias o requisitos, incluidos material, piedra, cantidad prevista, destino y empaque." },
      { title: "Revisamos el diseño o la dirección", copy: "Revisamos tu diseño o las opciones de producto y alineamos las especificaciones para cotizar." },
      { title: "Confirmamos cotización y alcance", copy: "Conversamos cotización, ruta de muestra, cantidad según el proyecto, plazo previsto y condiciones de pago." },
      { title: "Desarrollamos y aprobamos la muestra", copy: "Revisamos material, montura, acabado y dirección del empaque según el alcance acordado." },
      { title: "Producción y revisión de calidad", copy: "Coordinamos la producción frente a la muestra aprobada o el brief y revisamos los puntos acordados." },
      { title: "Coordinamos empaque y envío", copy: "Alineamos empaque y conversación de envío internacional según el proyecto y el destino." },
    ],
  },
  inquiry: {
    eyebrow: "Prepara tu consulta",
    title: "Trae los datos que hacen útil la primera conversación",
    copy: "Un brief breve ayuda a revisar la dirección del producto, la muestra y los siguientes pasos.",
    statusLabels: { required: "Obligatorio", conditional: "Si está disponible", optional: "Opcional" },
    fields: [
      { label: "Tipo de producto", status: "required" },
      { label: "Cantidad objetivo o rango", status: "required" },
      { label: "País de destino", status: "required" },
      { label: "Tipo de negocio", status: "required" },
      { label: "Imagen o diseño de referencia", status: "conditional" },
      { label: "Material", status: "optional" },
      { label: "Piedra", status: "optional" },
      { label: "Requisitos de empaque", status: "optional" },
      { label: "Plazo esperado", status: "optional" },
    ],
    cta: "Prepara tu consulta",
  },
  faq: {
    eyebrow: "Preguntas de las marcas emergentes",
    title: "Antes de enviar tu primer brief",
    copy: "Estas respuestas aclaran el punto de partida sin asumir una ruta fija para todos los productos.",
    items: [
      { question: "¿Necesito un diseño terminado?", answer: "No. Puedes comenzar con una idea, una imagen de referencia o una dirección de colección. Revisaremos la información necesaria para definir el siguiente paso." },
      { question: "¿Cómo se determina el MOQ?", answer: "El MOQ se revisa para cada proyecto y depende del producto, material, piedra, complejidad de la montura, proceso y empaque." },
      { question: "¿Todos los productos se pueden muestrear en una unidad?", answer: "No necesariamente. La ruta de muestra y las opciones de cantidad dependen del producto y del alcance confirmado." },
      { question: "¿Xingyue puede coordinar empaque de marca privada?", answer: "El empaque se puede conversar dentro del proyecto, incluyendo cajas, bolsas, tarjetas, etiquetas y logo cuando corresponda." },
      { question: "¿Qué debo incluir en mi primera consulta?", answer: "Comparte tipo de producto, cantidad objetivo o rango, país de destino y tipo de negocio. Añade referencia, material, piedra, empaque y plazo esperado cuando los tengas." },
      { question: "¿Se puede hablar del envío internacional?", answer: "Sí. El destino y los requisitos de envío se pueden revisar dentro del proyecto y la conversación de empaque." },
      { question: "¿Qué controles de calidad se pueden conversar?", answer: "Se pueden hablar de material y piedra, muestra de referencia, montura y acabado, medidas, empaque y revisión previa al envío según el proyecto." },
    ],
  },
  finalCta: {
    eyebrow: "¿Listo para empezar?",
    title: "¿Listo para hablar sobre tu colección? Envíanos la dirección del producto y los detalles del proyecto.",
    copy: "Una primera consulta clara da al proyecto un punto de partida práctico.",
    cta: "Hablemos de tu colección",
  },
  links: { products: "Explora productos", startBrand: "Inicia tu marca de joyería", emergingBrands: "Para marcas de joyería emergentes", about: "Sobre Xingyue", howWeWork: "Revisa las seis etapas" },
  schema: {
    service: {
      name: "Apoyo de fabricación para marcas de joyería emergentes",
      description: "Apoyo B2B para dirección de producto, muestras, planificación de cantidad según el proyecto, empaque, revisión de calidad y coordinación de envíos.",
      serviceType: "Apoyo de fabricación de joyería",
      audience: "Marcas de joyería emergentes",
    },
  },
};

const ar: TargetAudienceContent = {
  seo: {
    title: "دعم تصنيع المجوهرات للعلامات التجارية الناشئة | Xingyue",
    description: "دعم B2B للعلامات التجارية الناشئة في اتجاه المنتج والعينات والحد الأدنى للطلب حسب المشروع والتغليف ومراجعة الجودة وتنسيق الشحن.",
  },
  sectionOrder: emergingBrandsSectionOrder,
  definition: "Xingyue Jewelry شريك B2B لتصنيع المجوهرات وتنسيق سلسلة التوريد للعلامات التجارية الناشئة.",
  hero: {
    eyebrow: "للعلامات التجارية الناشئة في المجوهرات",
    title: "طوّر مجموعة مجوهراتك مع شريك تصنيع ينسّق مراحل المشروع",
    subtitle: "شارك فكرة منتج أو صورة مرجعية أو اتجاهًا للمجموعة. تساعد Xingyue في تنسيق اختيار المنتجات والتطوير المخصص والعينات والحد الأدنى للطلب حسب المشروع والتغليف ومراجعة الجودة ومناقشة الشحن الدولي.",
    primaryCta: "ناقش مجموعتك معنا",
    secondaryCta: "استكشف اتجاهات المنتجات",
  },
  audience: {
    eyebrow: "لمن صُممت هذه الصفحة",
    title: "نقطة بداية عملية لمجموعتك الأولى أو التالية",
    copy: "هذه الصفحة مناسبة للفرق التي تحتاج إلى توضيح اتجاه المنتج والعينات والكمية والتغليف ونطاق المشروع قبل الإنتاج.",
    items: ["العلامات التجارية الناشئة في المجوهرات", "أعمال المجوهرات عبر الإنترنت التي تطوّر مجموعة", "مطوّرو مجموعات العلامة الخاصة", "مؤسسو المتاجر الصغيرة الذين يجهزون مجموعة مبكرة"],
  },
  challenges: {
    eyebrow: "تحديات شائعة",
    title: "حوّل الفكرة الأولى إلى موجز مشروع واضح",
    copy: "غالبًا ما تكون الخطوة الأولى هي توحيد التفاصيل، وليس إضافة كتالوج أكبر.",
    items: [
      { title: "اتجاه المنتج", copy: "حدّد فئة مركزة واتجاه المادة والحجر للمجموعة." },
      { title: "من المرجع إلى المواصفات", copy: "حوّل الصورة أو الفكرة إلى تفاصيل يمكن مراجعتها للتسعير." },
      { title: "تخطيط العينة والكمية", copy: "ناقش مسار العينة والكمية المتوقعة حسب المشروع قبل الإنتاج." },
      { title: "تنسيق العرض والشحن", copy: "اجمع أسئلة التغليف والوجهة والتوقيت في محادثة المشروع نفسها." },
    ],
  },
  support: {
    eyebrow: "كيف تدعم Xingyue مشروعك",
    title: "ثلاث نقاط تنسيق للعلامة التجارية الناشئة",
    copy: "يساعد موجز المشروع المشترك على ربط قرارات المنتج والعينة والتسليم.",
    values: [
      { title: "اتجاه أوضح للمنتج", copy: "حدّد الفئة والمادة والحجر والسوق المستهدف قبل التوسع في مناقشة العرض." },
      { title: "العينات والكمية حسب المشروع", copy: "راجع نطاق العينة وتكلفتها وتوقيتها المتوقع والحد الأدنى للطلب حسب المنتج والمشروع." },
      { title: "تنسيق العرض والشحن", copy: "نسّق التغليف وفحوص الجودة ومناقشة الشحن بعد تأكيد معلومات المشروع." },
    ],
  },
  productDirections: {
    eyebrow: "اتجاهات المنتجات",
    title: "ابدأ باتجاه منتج يناسب موجزك",
    copy: "استكشف بعض الاتجاهات ثم ناقش المادة والحجر ومسار التطوير المناسب لمجموعتك.",
    items: [
      { title: "مجوهرات الألماس المصنع في المختبر", copy: "استكشف اتجاهات مجوهرات الألماس لموجز مجموعة واضح.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "مجوهرات المويسانتي", copy: "راجع أساليب ومراجع المويسانتي لمحادثة تركز على المنتج.", path: "/products" },
      { title: "تصاميم S925 أو الذهب المخصص", copy: "ناقش التصاميم المخصصة واختيارات المعدن وتفاصيل التطوير حسب المشروع.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "تغليف العلامة الخاصة", copy: "نسّق الصناديق والأكياس والبطاقات والملصقات وموضع الشعار ضمن نطاق المجموعة.", path: "/products" },
    ],
    boundary: "تتم مراجعة المنتج النهائي والمادة والحجر ومسار العينة والكمية لكل مشروع؛ ولا يُفترض أن يناسب اتجاه واحد كل موجز.",
    linkLabel: "استكشف المنتجات والقدرات",
  },
  sampleMoq: {
    eyebrow: "تخطيط العينات والحد الأدنى للطلب",
    title: "العينات وتخطيط الكمية حسب المشروع",
    copy: "تتم مراجعة متطلبات العينة وتكلفتها وتوقيتها المتوقع والحد الأدنى للطلب لكل مشروع. ويؤثر نوع المنتج والمادة والحجر وتعقيد التركيب والتغليف في المسار المناسب. تتم مناقشة نطاق العينة أولًا، ثم يتم تأكيد نطاق الإنتاج بعد اعتماد العينة.",
    items: [
      { title: "الحد الأدنى للطلب حسب المشروع", copy: "تُحدد الكمية وفق نوع المنتج والمادة والحجر وتعقيد العملية والتغليف." },
      { title: "نطاق العينة أولًا", copy: "ناقش المرجع والمواصفات ومسار العينة قبل تأكيد نطاق المشروع." },
      { title: "المراجعة قبل الإنتاج", copy: "تتم مراجعة المادة والتركيب والتشطيب واتجاه التغليف مع العينة قبل تنسيق الإنتاج." },
      { title: "التوفر يعتمد على المنتج", copy: "لا يُفترض أن يتيح كل منتج عينة من قطعة واحدة أو إنتاجًا بكميات صغيرة." },
    ],
    cta: "ناقش خطة العينات الخاصة بك",
  },
  qualityPackaging: {
    eyebrow: "الجودة والتغليف",
    title: "نسّق التفاصيل قبل الشحن",
    copy: "تتم مناقشة فحوص الجودة وتفاصيل العرض بالرجوع إلى العينة المعتمدة أو مواصفات المشروع المؤكدة.",
    items: [
      { title: "تأكيد المادة والحجر", copy: "راجع المادة المتفق عليها ونوع الحجر وحجمه واتجاه لونه." },
      { title: "مرجع العينة المعتمدة", copy: "استخدم العينة أو الصور أو المواصفات المعتمدة كمرجع للمشروع." },
      { title: "مراجعة التركيب والتشطيب", copy: "ناقش محاذاة التركيب والتشطيب السطحي والأقفال عند الحاجة." },
      { title: "فحص المقاس والمواصفات", copy: "قارن الأبعاد والأطوال والكميات وتفاصيل الشعار أو النقش المضمنة." },
      { title: "تأكيد التغليف", copy: "نسّق متطلبات الصندوق والكيس والبطاقة والملصق وموضع الشعار." },
      { title: "مراجعة ما قبل الشحن", copy: "راجع تفاصيل المشروع المتفق عليها قبل التغليف وتنسيق الشحن الدولي." },
    ],
    packaging: "يمكن أن تشمل خيارات التغليف الصناديق والأكياس والبطاقات والملصقات وموضع الشعار عندما تكون ضمن نطاق المشروع.",
    cta: "ناقش متطلبات الجودة",
  },
  process: {
    eyebrow: "كيف نعمل",
    title: "ست مراحل من الموجز الأول إلى تنسيق الشحن",
    copy: "يساعد التسلسل الواضح العلامة الناشئة على اتخاذ كل قرار في الوقت المناسب.",
    steps: [
      { title: "شارك مشروعك", copy: "أرسل مراجع المنتج أو متطلباتك، بما في ذلك المادة والحجر والكمية والوجهة واحتياجات التغليف." },
      { title: "راجع التصميم أو اتجاه المنتج", copy: "نراجع التصميم المخصص أو خيارات المنتج وننسق المواصفات اللازمة للعرض." },
      { title: "أكد العرض ونطاق المشروع", copy: "تتم مناقشة العرض ومسار العينة والكمية حسب المشروع والتوقيت المتوقع وشروط الدفع." },
      { title: "طوّر العينة واعتمدها", copy: "راجع المادة والتركيب والتشطيب واتجاه التغليف وفق نطاق العينة المتفق عليه." },
      { title: "الإنتاج ومراجعة الجودة", copy: "ننسق الإنتاج وفق العينة المعتمدة أو موجز المشروع ونراجع نقاط الجودة المتفق عليها." },
      { title: "تنسيق التغليف والشحن", copy: "ننسق التغليف ومناقشة الشحن الدولي وفق المشروع والوجهة." },
    ],
  },
  inquiry: {
    eyebrow: "جهّز استفسارك",
    title: "أحضر التفاصيل التي تجعل المحادثة الأولى مفيدة",
    copy: "يساعد موجز قصير على مراجعة اتجاه المنتج ومسار العينة والخطوات التالية معًا.",
    statusLabels: { required: "مطلوب", conditional: "عند توفره", optional: "اختياري" },
    fields: [
      { label: "نوع المنتج", status: "required" },
      { label: "الكمية المستهدفة أو النطاق", status: "required" },
      { label: "بلد الوجهة", status: "required" },
      { label: "نوع النشاط", status: "required" },
      { label: "صورة أو تصميم مرجعي", status: "conditional" },
      { label: "المادة", status: "optional" },
      { label: "الحجر", status: "optional" },
      { label: "متطلبات التغليف", status: "optional" },
      { label: "التوقيت المتوقع", status: "optional" },
    ],
    cta: "جهّز استفسارك",
  },
  faq: {
    eyebrow: "أسئلة العلامات الناشئة",
    title: "قبل إرسال موجز مشروعك الأول",
    copy: "توضح هذه الإجابات نقطة البداية دون افتراض مسار ثابت لكل منتج.",
    items: [
      { question: "هل أحتاج إلى تصميم نهائي؟", answer: "لا. يمكنك البدء بفكرة منتج أو صورة مرجعية أو اتجاه للمجموعة. نراجع المعلومات اللازمة لتحديد الخطوة التالية." },
      { question: "كيف يتم تحديد الحد الأدنى للطلب؟", answer: "تتم مراجعة الحد الأدنى للطلب لكل مشروع، ويتأثر بنوع المنتج والمادة والحجر وتعقيد التركيب والعملية والتغليف." },
      { question: "هل يمكن أخذ عينة من قطعة واحدة لكل منتج؟", answer: "ليس بالضرورة. يعتمد مسار العينة وخيارات الكمية على المنتج ونطاق المشروع المؤكد." },
      { question: "هل يمكن لـ Xingyue تنسيق تغليف العلامة الخاصة؟", answer: "يمكن مناقشة التغليف ضمن المشروع، بما في ذلك الصناديق والأكياس والبطاقات والملصقات وموضع الشعار عند انطباقه." },
      { question: "ما الذي أدرجه في استفساري الأول؟", answer: "اذكر نوع المنتج والكمية المستهدفة أو النطاق وبلد الوجهة ونوع النشاط. أضف المرجع والمادة والحجر والتغليف والتوقيت المتوقع عند توفرها." },
      { question: "هل يمكن مناقشة الشحن الدولي؟", answer: "نعم. يمكن مراجعة الوجهة ومتطلبات الشحن ضمن المشروع ومناقشة التغليف." },
      { question: "ما فحوص الجودة التي يمكن مناقشتها؟", answer: "يمكن مناقشة تأكيد المادة والحجر ومرجع العينة والتركيب والتشطيب وفحص المقاس والمواصفات والتغليف والمراجعة قبل الشحن وفق المشروع." },
    ],
  },
  finalCta: {
    eyebrow: "هل أنت مستعد للبدء؟",
    title: "هل أنت مستعد لمناقشة مجموعتك؟ أرسل اتجاه المنتج وتفاصيل المشروع.",
    copy: "يمنح الاستفسار الأول الواضح المشروع نقطة بداية عملية.",
    cta: "ناقش مجموعتك معنا",
  },
  links: { products: "استكشف المنتجات", startBrand: "ابدأ علامتك التجارية للمجوهرات", emergingBrands: "للعلامات التجارية الناشئة في المجوهرات", about: "عن Xingyue", howWeWork: "راجع المراحل الست" },
  schema: {
    service: {
      name: "دعم تصنيع للعلامات التجارية الناشئة في المجوهرات",
      description: "دعم B2B لاتجاه المنتج والعينات وتخطيط الكمية حسب المشروع والتغليف ومراجعة الجودة وتنسيق الشحن.",
      serviceType: "دعم تصنيع المجوهرات",
      audience: "العلامات التجارية الناشئة في المجوهرات",
    },
  },
};

export const emergingBrandsContentByLocale = { en, es, ar } satisfies Record<SupportedLocale, TargetAudienceContent>;

const boutiqueEn: TargetAudienceContent = {
  seo: {
    title: "Jewelry Manufacturing Support for Boutique Stores | Xingyue Jewelry",
    description:
      "Explore jewelry manufacturing support for boutique stores, including product assortment planning, samples, project-based MOQ discussions, packaging and custom requirements.",
  },
  sectionOrder: boutiqueStoresSectionOrder,
  definition:
    "Xingyue Jewelry helps boutique stores discuss practical product assortments, samples, packaging and custom jewelry requirements by project.",
  hero: {
    eyebrow: "For Boutique Jewelry Stores",
    title: "Source Boutique-Ready Jewelry with a Coordinated Manufacturing Partner",
    subtitle:
      "Plan a store assortment with a clear conversation about product direction, materials, samples, project scope, packaging and future order coordination.",
    primaryCta: "Discuss Your Store Assortment",
    secondaryCta: "Explore Product Directions",
  },
  audience: {
    eyebrow: "Who This Is For",
    title: "A practical sourcing conversation for boutique retail",
    copy:
      "This page is for stores that need to compare product directions and prepare a focused brief before requesting samples or a quotation.",
    items: [
      "Independent boutique jewelry stores",
      "Multi-brand jewelry retailers",
      "Stores testing new materials or product categories",
      "Retailers exploring private-label or custom pieces",
      "Buyers evaluating products through samples",
    ],
  },
  challenges: {
    eyebrow: "Common Challenges",
    title: "Build an assortment around the way your store sells",
    copy:
      "Boutique buyers often need to balance product direction, presentation and project scope before placing an order.",
    items: [
      { title: "Choosing product directions", copy: "Compare categories, materials and stones that fit your store positioning and customer conversations." },
      { title: "Testing before deeper orders", copy: "Discuss samples and a practical review route before confirming a broader production scope." },
      { title: "Coordinating specifications", copy: "Bring sizes, finishes, stones, packaging and custom details into one project brief." },
      { title: "Planning presentation", copy: "Consider boxes, pouches, cards, labels and logo placement with the assortment." },
      { title: "Keeping quotation information clear", copy: "Align references, quantity ranges, destination and requirements before quotation discussions." },
      { title: "Preparing for future replenishment", copy: "Keep approved specifications and project notes available for later conversations." },
    ],
  },
  support: {
    eyebrow: "How Xingyue Supports",
    title: "Coordinate the decisions behind a boutique assortment",
    copy:
      "The project conversation can connect product selection, sampling, packaging and order details without assuming the same route for every store.",
    values: [
      { title: "Product assortment planning", copy: "Discuss categories, materials, stones and styles that may fit your store direction." },
      { title: "Material and style discussion", copy: "Review metal, stone, finish, size and presentation requirements by product." },
      { title: "Sample and specification review", copy: "Use samples, references and confirmed specifications to clarify the next step." },
      { title: "Project-based quantity discussion", copy: "Discuss quantity according to product type, material, process and packaging scope." },
      { title: "Private-label packaging options", copy: "Coordinate boxes, pouches, cards, labels and logo placement where included." },
      { title: "Quotation preparation", copy: "Organize the product and project information needed for a focused quotation conversation." },
      { title: "Order detail coordination", copy: "Keep approved specifications and project notes aligned for later order discussions." },
      { title: "Destination and timing review", copy: "Discuss destination and expected timing as part of the project brief." },
    ],
  },
  productDirections: {
    eyebrow: "Product Directions",
    title: "Explore directions for a considered store assortment",
    copy:
      "Start with the categories that fit your store, then discuss the material, stone, finish and packaging details for the project.",
    items: [
      { title: "Lab-grown diamond jewelry", copy: "Explore diamond jewelry directions for a refined store assortment.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "Moissanite jewelry", copy: "Review moissanite styles for a product-led assortment conversation.", path: "/products" },
      { title: "Sterling silver jewelry", copy: "Discuss silver jewelry directions, finishes and product categories by project.", path: "/products" },
      { title: "K-gold jewelry", copy: "Review gold tone, setting and custom details for selected pieces.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "Rings", copy: "Consider ring styles, sizes, stones and presentation requirements.", path: "/products" },
      { title: "Earrings", copy: "Discuss earrings for coordinated product families and store presentation.", path: "/products" },
      { title: "Pendants", copy: "Explore pendant directions with material, stone and packaging details.", path: "/products" },
      { title: "Tennis jewelry", copy: "Review tennis jewelry directions and project-specific specifications.", path: "/collections/tennis-chains" },
      { title: "Custom pieces", copy: "Share a reference or concept for a custom product discussion.", path: "/collections/custom-jewelry-manufacturing" },
    ],
    boundary:
      "Product suitability, availability, sample route and quantity are reviewed for each project; no assortment is assumed to fit every store.",
    linkLabel: "Explore Products & Capabilities",
  },
  sampleMoq: {
    eyebrow: "Sampling & MOQ Planning",
    title: "Review samples and project scope before production",
    copy:
      "Samples help clarify design direction, workmanship, size and presentation. The minimum order quantity is discussed according to the product, material, process and packaging scope.",
    items: [
      { title: "Sample for product review", copy: "Use a sample to review design direction, workmanship, size and presentation." },
      { title: "Project-based quantity", copy: "Quantity is discussed according to product type, material, process complexity and packaging." },
      { title: "Quotation after specifications", copy: "A quotation conversation follows the confirmed product details and project requirements." },
      { title: "No assumed route for every product", copy: "One-piece samples or small production runs are not assumed for every product." },
    ],
    cta: "Discuss Your Sampling Plan",
  },
  qualityPackaging: {
    eyebrow: "Quality & Packaging",
    title: "Coordinate product presentation before shipping",
    copy:
      "Review agreed specifications, sample references and packaging requirements as part of the project conversation.",
    items: [
      { title: "Specification confirmation", copy: "Review sizes, finishes, stones, materials and other agreed product details." },
      { title: "Material and workmanship discussion", copy: "Discuss material, process and workmanship requirements against the project brief." },
      { title: "Sample reference", copy: "Use the approved sample, images or specifications as the product reference." },
      { title: "Packaging requirements", copy: "Coordinate boxes, pouches, cards, labels and logo placement where applicable." },
      { title: "Batch and order information", copy: "Keep agreed batch requirements and order information recorded for review." },
      { title: "Pre-shipment review", copy: "Review confirmed project details before packaging and shipping coordination." },
    ],
    packaging: "Private-label packaging options are discussed according to the assortment and confirmed project scope.",
    cta: "Discuss Quality & Packaging",
  },
  process: {
    eyebrow: "How We Work",
    title: "Five stages for planning a boutique assortment",
    copy: "A clear sequence helps store buyers review product direction and project details at the right time.",
    steps: [
      { title: "Share your store needs", copy: "Send store direction, target market, product categories and presentation requirements." },
      { title: "Review product directions", copy: "Compare categories, materials, stones and references that fit the assortment." },
      { title: "Confirm specifications and sample plan", copy: "Discuss product details, sample scope and project-based quantity considerations." },
      { title: "Discuss quotation and project terms", copy: "Review the information needed for quotation, packaging and project coordination." },
      { title: "Prepare the order after confirmation", copy: "Align confirmed specifications, packaging and destination details for the next step." },
    ],
  },
  inquiry: {
    eyebrow: "Prepare Your Inquiry",
    title: "Bring the details that help plan your store assortment",
    copy: "A focused first brief helps connect product direction, sampling and packaging discussions.",
    statusLabels: { required: "Required", conditional: "If available", optional: "Optional" },
    fields: [
      { label: "Store or company name", status: "required" },
      { label: "Target market", status: "required" },
      { label: "Product categories", status: "required" },
      { label: "Estimated quantity range", status: "required" },
      { label: "Sample requirements", status: "conditional" },
      { label: "Preferred material", status: "optional" },
      { label: "Packaging or private-label needs", status: "optional" },
      { label: "Reference images or specifications", status: "optional" },
      { label: "Preferred contact method", status: "optional" },
    ],
    cta: "Discuss Your Store Assortment",
  },
  faq: {
    eyebrow: "Questions from Boutique Stores",
    title: "Before you discuss a store assortment",
    copy: "These answers explain the project conversation without assuming fixed commercial terms.",
    items: [
      { question: "Can boutique stores request samples?", answer: "Sample options can be discussed according to the product, reference, material, process and confirmed project scope." },
      { question: "How is the minimum order quantity determined?", answer: "The minimum order quantity is discussed for each project and depends on product type, material, process complexity and packaging." },
      { question: "Can you discuss private-label packaging?", answer: "Yes. Boxes, pouches, cards, labels and logo placement can be discussed when included in the project scope." },
      { question: "Can I ask about several product categories in one inquiry?", answer: "Yes. Share the categories, references and priorities so the assortment conversation can be organized by project." },
      { question: "Do you support custom jewelry requirements?", answer: "Custom requirements can be discussed from a reference, drawing, specification or product idea." },
      { question: "What information helps prepare a quotation?", answer: "Store direction, categories, materials, stones, quantity range, packaging needs, destination and references are useful starting information." },
      { question: "Can future orders follow approved specifications?", answer: "Approved specifications and project notes can be used as references for later order discussions, subject to the confirmed project." },
    ],
  },
  finalCta: {
    eyebrow: "Plan Your Store Assortment",
    title: "Ready to discuss a boutique-ready jewelry assortment?",
    copy: "Share your product categories, references and project requirements to start a practical conversation.",
    cta: "Discuss Your Store Assortment",
  },
  links: {
    products: "Explore Products",
    startBrand: "Start Your Jewelry Brand",
    emergingBrands: "For Emerging Jewelry Brands",
    boutiqueStores: "For Boutique Jewelry Stores",
    about: "About Xingyue",
    howWeWork: "Review the five stages",
  },
  schema: {
    service: {
      name: "Boutique Jewelry Store Manufacturing Support",
      description: "B2B support for boutique store assortment planning, samples, project-based quantity discussions, packaging and custom jewelry requirements.",
      serviceType: "Jewelry manufacturing support",
      audience: "Boutique jewelry stores",
    },
  },
};

const boutiqueEs: TargetAudienceContent = {
  seo: {
    title: "Apoyo de fabricación de joyería para boutiques | Xingyue Jewelry",
    description: "Apoyo B2B para boutiques: planificación del surtido, muestras, cantidades según el proyecto, empaque y requisitos de joyería personalizada.",
  },
  sectionOrder: boutiqueStoresSectionOrder,
  definition: "Xingyue Jewelry ayuda a las boutiques a conversar sobre surtidos, muestras, empaque y requisitos de joyería personalizada según cada proyecto.",
  hero: {
    eyebrow: "Para boutiques de joyería",
    title: "Abastece tu boutique de joyería con un socio de fabricación coordinado",
    subtitle: "Planifica el surtido de tu tienda con una conversación clara sobre dirección de producto, materiales, muestras, alcance del proyecto, empaque y coordinación de futuros pedidos.",
    primaryCta: "Habla sobre el surtido de tu tienda",
    secondaryCta: "Explora las opciones de producto",
  },
  audience: {
    eyebrow: "Para quién es",
    title: "Una conversación de abastecimiento práctica para el comercio boutique",
    copy: "Esta página es para tiendas que necesitan comparar direcciones de producto y preparar un brief antes de solicitar muestras o una cotización.",
    items: ["Boutiques independientes de joyería", "Tiendas minoristas multimarca", "Tiendas que prueban nuevos materiales o categorías", "Minoristas que exploran marca privada o piezas personalizadas", "Compradores que evalúan productos mediante muestras"],
  },
  challenges: {
    eyebrow: "Retos habituales",
    title: "Construye un surtido alrededor de la forma en que vende tu tienda",
    copy: "Los compradores boutique suelen equilibrar dirección de producto, presentación y alcance del proyecto antes de pedir.",
    items: [
      { title: "Elegir direcciones de producto", copy: "Compara categorías, materiales y piedras que encajen con el posicionamiento de tu tienda." },
      { title: "Probar antes de ampliar", copy: "Habla de muestras y de una ruta de revisión práctica antes de confirmar un alcance de producción más amplio." },
      { title: "Coordinar especificaciones", copy: "Reúne tamaños, acabados, piedras, empaque y detalles personalizados en un mismo brief." },
      { title: "Planificar la presentación", copy: "Considera cajas, bolsas, tarjetas, etiquetas y logo junto con el surtido." },
      { title: "Mantener clara la información de cotización", copy: "Alinea referencias, rangos de cantidad, destino y requisitos antes de cotizar." },
      { title: "Preparar futuras reposiciones", copy: "Conserva las especificaciones aprobadas y las notas del proyecto para conversaciones posteriores." },
    ],
  },
  support: {
    eyebrow: "Cómo apoya Xingyue",
    title: "Coordina las decisiones detrás de un surtido boutique",
    copy: "La conversación del proyecto conecta selección, muestras, empaque y detalles del pedido sin asumir la misma ruta para todas las tiendas.",
    values: [
      { title: "Planificación del surtido", copy: "Habla de categorías, materiales, piedras y estilos que pueden encajar con tu tienda." },
      { title: "Materiales y estilos", copy: "Revisa metal, piedra, acabado, tamaño y presentación según cada producto." },
      { title: "Revisión de muestra y especificaciones", copy: "Usa muestras, referencias y especificaciones confirmadas para aclarar el siguiente paso." },
      { title: "Cantidad según el proyecto", copy: "La cantidad se conversa según producto, material, proceso y empaque." },
      { title: "Opciones de empaque de marca privada", copy: "Coordina cajas, bolsas, tarjetas, etiquetas y logo cuando estén incluidos." },
      { title: "Preparación de la cotización", copy: "Organiza la información del producto y del proyecto para una conversación de cotización enfocada." },
      { title: "Coordinación de detalles del pedido", copy: "Mantén alineadas las especificaciones aprobadas y las notas del proyecto." },
      { title: "Destino y plazo esperado", copy: "Habla del destino y del plazo esperado como parte del brief del proyecto." },
    ],
  },
  productDirections: {
    eyebrow: "Direcciones de producto",
    title: "Explora direcciones para un surtido pensado para tu tienda",
    copy: "Empieza con las categorías que encajan con tu tienda y después conversa sobre material, piedra, acabado y empaque.",
    items: [
      { title: "Joyería con diamantes de laboratorio", copy: "Explora una dirección de diamantes para un surtido refinado.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "Joyería de moissanita", copy: "Revisa estilos de moissanita para una conversación centrada en el producto.", path: "/products" },
      { title: "Joyería de plata de ley", copy: "Habla de direcciones en plata, acabados y categorías según el proyecto.", path: "/products" },
      { title: "Joyería de oro K", copy: "Revisa tono, montura y detalles personalizados para piezas seleccionadas.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "Anillos", copy: "Considera estilos, tallas, piedras y requisitos de presentación.", path: "/products" },
      { title: "Pendientes", copy: "Habla de pendientes para familias de producto coordinadas.", path: "/products" },
      { title: "Colgantes", copy: "Explora colgantes con detalles de material, piedra y empaque.", path: "/products" },
      { title: "Joyería tennis", copy: "Revisa direcciones tennis y especificaciones según el proyecto.", path: "/collections/tennis-chains" },
      { title: "Piezas personalizadas", copy: "Comparte una referencia o concepto para conversar sobre una pieza personalizada.", path: "/collections/custom-jewelry-manufacturing" },
    ],
    boundary: "La adecuación del producto, la disponibilidad, la ruta de muestra y la cantidad se revisan en cada proyecto; ningún surtido se da por adecuado para todas las tiendas.",
    linkLabel: "Explora productos y capacidades",
  },
  sampleMoq: {
    eyebrow: "Muestras y planificación de cantidades",
    title: "Revisa muestras y alcance antes de producir",
    copy: "Las muestras ayudan a aclarar dirección, acabado, tamaño y presentación. La cantidad mínima se conversa según producto, material, proceso y empaque.",
    items: [
      { title: "Muestra para revisar el producto", copy: "Usa una muestra para revisar dirección, acabado, tamaño y presentación." },
      { title: "Cantidad según el proyecto", copy: "La cantidad se conversa según producto, material, complejidad del proceso y empaque." },
      { title: "Cotización después de especificar", copy: "La conversación de cotización parte de los detalles y requisitos confirmados." },
      { title: "Sin una ruta asumida para todos", copy: "No se presupone que todos los productos admitan una muestra de una unidad o lotes pequeños." },
    ],
    cta: "Habla sobre tu plan de muestras",
  },
  qualityPackaging: {
    eyebrow: "Calidad y empaque",
    title: "Coordina la presentación del producto antes del envío",
    copy: "Revisa especificaciones, referencias de muestra y requisitos de empaque como parte de la conversación del proyecto.",
    items: [
      { title: "Confirmación de especificaciones", copy: "Revisa tamaños, acabados, piedras, materiales y otros detalles acordados." },
      { title: "Material y proceso", copy: "Habla de los requisitos de material, proceso y acabado frente al brief." },
      { title: "Referencia de muestra", copy: "Usa la muestra, las imágenes o las especificaciones aprobadas como referencia." },
      { title: "Requisitos de empaque", copy: "Coordina cajas, bolsas, tarjetas, etiquetas y logo cuando corresponda." },
      { title: "Información del lote y pedido", copy: "Mantén registrados los requisitos acordados para su revisión." },
      { title: "Revisión antes del envío", copy: "Revisa los detalles confirmados antes de coordinar empaque y envío." },
    ],
    packaging: "Las opciones de marca privada se conversan según el surtido y el alcance confirmado del proyecto.",
    cta: "Habla sobre calidad y empaque",
  },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "Cinco etapas para planificar un surtido boutique",
    copy: "Una secuencia clara ayuda a revisar la dirección del producto y los detalles del proyecto en el momento adecuado.",
    steps: [
      { title: "Comparte las necesidades de tu tienda", copy: "Envía la dirección de la tienda, el mercado, las categorías y los requisitos de presentación." },
      { title: "Revisa las direcciones de producto", copy: "Compara categorías, materiales, piedras y referencias para el surtido." },
      { title: "Confirma especificaciones y muestra", copy: "Habla de los detalles, el alcance de la muestra y las cantidades según el proyecto." },
      { title: "Habla de cotización y condiciones", copy: "Revisa la información necesaria para cotizar, empacar y coordinar el proyecto." },
      { title: "Prepara el pedido después de confirmar", copy: "Alinea especificaciones, empaque y destino para el siguiente paso." },
    ],
  },
  inquiry: {
    eyebrow: "Prepara tu consulta",
    title: "Trae los datos que ayudan a planificar tu surtido",
    copy: "Un brief inicial enfocado conecta las conversaciones de producto, muestras y empaque.",
    statusLabels: { required: "Obligatorio", conditional: "Si está disponible", optional: "Opcional" },
    fields: [
      { label: "Nombre de la tienda o empresa", status: "required" },
      { label: "Mercado objetivo", status: "required" },
      { label: "Categorías de producto", status: "required" },
      { label: "Rango de cantidad estimado", status: "required" },
      { label: "Requisitos de muestra", status: "conditional" },
      { label: "Material preferido", status: "optional" },
      { label: "Necesidades de empaque o marca privada", status: "optional" },
      { label: "Imágenes o especificaciones de referencia", status: "optional" },
      { label: "Método de contacto preferido", status: "optional" },
    ],
    cta: "Habla sobre el surtido de tu tienda",
  },
  faq: {
    eyebrow: "Preguntas de las boutiques",
    title: "Antes de hablar sobre un surtido",
    copy: "Estas respuestas explican la conversación del proyecto sin asumir condiciones comerciales fijas.",
    items: [
      { question: "¿Las boutiques pueden solicitar muestras?", answer: "Las opciones de muestra se conversan según el producto, la referencia, el material, el proceso y el alcance confirmado." },
      { question: "¿Cómo se determina la cantidad mínima?", answer: "La cantidad mínima se conversa para cada proyecto y depende del producto, material, complejidad del proceso y empaque." },
      { question: "¿Pueden hablar de empaque de marca privada?", answer: "Sí. Se pueden conversar cajas, bolsas, tarjetas, etiquetas y logo cuando formen parte del alcance." },
      { question: "¿Puedo preguntar por varias categorías en una consulta?", answer: "Sí. Comparte las categorías, referencias y prioridades para organizar la conversación del surtido." },
      { question: "¿Admiten requisitos de joyería personalizada?", answer: "Los requisitos personalizados se pueden conversar a partir de una referencia, dibujo, especificación o idea." },
      { question: "¿Qué información ayuda a preparar una cotización?", answer: "La dirección de la tienda, categorías, materiales, piedras, rango de cantidad, empaque, destino y referencias son un buen comienzo." },
      { question: "¿Los pedidos futuros pueden seguir las especificaciones aprobadas?", answer: "Las especificaciones y notas aprobadas pueden servir de referencia para conversaciones posteriores, según el proyecto confirmado." },
    ],
  },
  finalCta: {
    eyebrow: "Planifica tu surtido",
    title: "¿Listo para hablar sobre un surtido de joyería para tu boutique?",
    copy: "Comparte tus categorías, referencias y requisitos para iniciar una conversación práctica.",
    cta: "Habla sobre el surtido de tu tienda",
  },
  links: {
    products: "Explora productos",
    startBrand: "Inicia tu marca de joyería",
    emergingBrands: "Para marcas de joyería emergentes",
    boutiqueStores: "Para boutiques de joyería",
    about: "Sobre Xingyue",
    howWeWork: "Revisa las cinco etapas",
  },
  schema: {
    service: {
      name: "Apoyo de fabricación para boutiques de joyería",
      description: "Apoyo B2B para planificar surtidos boutique, muestras, cantidades según el proyecto, empaque y requisitos de joyería personalizada.",
      serviceType: "Apoyo de fabricación de joyería",
      audience: "Tiendas boutique de joyería",
    },
  },
};

const boutiqueAr: TargetAudienceContent = {
  seo: {
    title: "دعم تصنيع المجوهرات للمتاجر المتخصصة | Xingyue Jewelry",
    description: "دعم B2B للمتاجر المتخصصة في تخطيط تشكيلة المجوهرات والعينات والكميات حسب المشروع والتغليف ومتطلبات القطع المخصصة.",
  },
  sectionOrder: boutiqueStoresSectionOrder,
  definition: "تساعد Xingyue Jewelry المتاجر المتخصصة على مناقشة تشكيلات المنتجات والعينات والتغليف ومتطلبات المجوهرات المخصصة حسب كل مشروع.",
  hero: {
    eyebrow: "للمتاجر المتخصصة في المجوهرات",
    title: "وفّر لمتجرك الخاص بالمجوهرات تشكيلة مناسبة للبيع مع شريك تصنيع منسّق",
    subtitle: "خطط لتشكيلة متجرك من خلال مناقشة واضحة لاتجاه المنتج والمواد والعينات ونطاق المشروع والتغليف وتنسيق الطلبات اللاحقة.",
    primaryCta: "ناقش تشكيلة متجرك",
    secondaryCta: "استكشف اتجاهات المنتجات",
  },
  audience: {
    eyebrow: "لمن تناسب هذه الصفحة",
    title: "محادثة توريد عملية للبيع بالتجزئة المتخصص",
    copy: "هذه الصفحة للمتاجر التي تحتاج إلى مقارنة اتجاهات المنتجات وإعداد موجز واضح قبل طلب العينات أو مناقشة عرض السعر.",
    items: ["متاجر المجوهرات المتخصصة المستقلة", "متاجر التجزئة متعددة العلامات", "متاجر تختبر مواد أو فئات جديدة", "تجار التجزئة الذين يبحثون عن تغليف خاص أو قطع مخصصة", "المشترون الذين يقيّمون المنتجات من خلال العينات"],
  },
  challenges: {
    eyebrow: "التحديات الشائعة",
    title: "ابنِ تشكيلة تناسب طريقة بيع متجرك",
    copy: "يحتاج مشترو المتاجر المتخصصة غالباً إلى موازنة اتجاه المنتج والعرض ونطاق المشروع قبل الطلب.",
    items: [
      { title: "اختيار اتجاهات المنتجات", copy: "قارن الفئات والمواد والأحجار التي تناسب هوية متجرك وحوارك مع العملاء." },
      { title: "الاختبار قبل التوسع", copy: "ناقش العينات ومسار المراجعة قبل تأكيد نطاق إنتاج أوسع." },
      { title: "تنسيق المواصفات", copy: "اجمع المقاسات والتشطيبات والأحجار والتغليف والتفاصيل المخصصة في موجز واحد." },
      { title: "تخطيط العرض", copy: "ناقش الصناديق والأكياس والبطاقات والملصقات ووضع الشعار مع التشكيلة." },
      { title: "وضوح معلومات عرض السعر", copy: "نسّق المراجع ونطاق الكمية والوجهة والمتطلبات قبل مناقشة عرض السعر." },
      { title: "الاستعداد للطلبات اللاحقة", copy: "احتفظ بالمواصفات المعتمدة وملاحظات المشروع للمناقشات المستقبلية." },
    ],
  },
  support: {
    eyebrow: "كيف تدعم Xingyue مشروعك",
    title: "نسّق القرارات التي تقف خلف تشكيلة متجرك",
    copy: "تربط محادثة المشروع بين اختيار المنتجات والعينات والتغليف وتفاصيل الطلب من دون افتراض المسار نفسه لكل متجر.",
    values: [
      { title: "تخطيط تشكيلة المنتجات", copy: "ناقش الفئات والمواد والأحجار والأساليب التي قد تناسب اتجاه متجرك." },
      { title: "مناقشة المواد والأساليب", copy: "راجع المعدن والحجر والتشطيب والمقاس ومتطلبات العرض حسب المنتج." },
      { title: "مراجعة العينة والمواصفات", copy: "استخدم العينات والمراجع والمواصفات المؤكدة لتوضيح الخطوة التالية." },
      { title: "مناقشة الكمية حسب المشروع", copy: "تُناقش الكمية حسب نوع المنتج والمواد والعملية ونطاق التغليف." },
      { title: "خيارات التغليف الخاص", copy: "نسّق الصناديق والأكياس والبطاقات والملصقات ووضع الشعار عند إدراجها في النطاق." },
      { title: "إعداد معلومات عرض السعر", copy: "رتّب معلومات المنتج والمشروع اللازمة لمحادثة واضحة حول عرض السعر." },
      { title: "تنسيق تفاصيل الطلب", copy: "حافظ على اتساق المواصفات المعتمدة وملاحظات المشروع للمناقشات اللاحقة." },
      { title: "مراجعة الوجهة والتوقيت المتوقع", copy: "ناقش الوجهة والتوقيت المتوقع ضمن موجز المشروع." },
    ],
  },
  productDirections: {
    eyebrow: "اتجاهات المنتجات",
    title: "استكشف اتجاهات لتشكيلة مدروسة لمتجرك",
    copy: "ابدأ بالفئات المناسبة لمتجرك ثم ناقش المادة والحجر والتشطيب والتغليف الخاص بالمشروع.",
    items: [
      { title: "مجوهرات الألماس المصنع في المختبر", copy: "استكشف اتجاه الألماس لتشكيلة متجر راقية.", path: "/collections/lab-grown-diamond-jewelry" },
      { title: "مجوهرات المويسانيت", copy: "راجع أساليب المويسانيت لمحادثة تركز على المنتج.", path: "/products" },
      { title: "مجوهرات الفضة الإسترلينية", copy: "ناقش اتجاهات الفضة والتشطيبات والفئات حسب المشروع.", path: "/products" },
      { title: "مجوهرات الذهب K", copy: "راجع اللون والإعداد والتفاصيل المخصصة للقطع المختارة.", path: "/collections/custom-jewelry-manufacturing" },
      { title: "الخواتم", copy: "ناقش الأساليب والمقاسات والأحجار ومتطلبات العرض.", path: "/products" },
      { title: "الأقراط", copy: "ناقش الأقراط ضمن عائلات منتجات متناسقة للمتجر.", path: "/products" },
      { title: "القلائد المتدلية", copy: "استكشف اتجاهات القلائد مع تفاصيل المادة والحجر والتغليف.", path: "/products" },
      { title: "مجوهرات التنس", copy: "راجع اتجاهات مجوهرات التنس والمواصفات حسب المشروع.", path: "/collections/tennis-chains" },
      { title: "قطع مخصصة", copy: "شارك مرجعاً أو فكرة لمناقشة قطعة مخصصة.", path: "/collections/custom-jewelry-manufacturing" },
    ],
    boundary: "تُراجع ملاءمة المنتج وتوفره ومسار العينة والكمية لكل مشروع؛ ولا يُفترض أن تناسب تشكيلة واحدة جميع المتاجر.",
    linkLabel: "استكشف المنتجات والقدرات",
  },
  sampleMoq: {
    eyebrow: "تخطيط العينات والكمية الدنيا",
    title: "راجع العينات ونطاق المشروع قبل الإنتاج",
    copy: "تساعد العينات على توضيح اتجاه التصميم والتشطيب والمقاس والعرض. وتُناقش الكمية الدنيا حسب المنتج والمواد والعملية ونطاق التغليف.",
    items: [
      { title: "عينة لمراجعة المنتج", copy: "استخدم العينة لمراجعة الاتجاه والتشطيب والمقاس وطريقة العرض." },
      { title: "الكمية حسب المشروع", copy: "تُناقش الكمية حسب نوع المنتج والمواد وتعقيد العملية ونطاق التغليف." },
      { title: "عرض السعر بعد تحديد المواصفات", copy: "تبدأ مناقشة عرض السعر بعد تأكيد تفاصيل المنتج ومتطلبات المشروع." },
      { title: "لا يوجد مسار مفترض لكل منتج", copy: "لا يُفترض أن يدعم كل منتج عينة من قطعة واحدة أو دفعة إنتاج صغيرة." },
    ],
    cta: "ناقش خطة العينات",
  },
  qualityPackaging: {
    eyebrow: "الجودة والتغليف",
    title: "نسّق عرض المنتج قبل الشحن",
    copy: "راجع المواصفات المتفق عليها ومراجع العينات ومتطلبات التغليف ضمن محادثة المشروع.",
    items: [
      { title: "تأكيد المواصفات", copy: "راجع المقاسات والتشطيبات والأحجار والمواد وبقية التفاصيل المتفق عليها." },
      { title: "المادة والعملية", copy: "ناقش متطلبات المواد والعملية والتشطيب مقابل موجز المشروع." },
      { title: "مرجع العينة", copy: "استخدم العينة أو الصور أو المواصفات المعتمدة كمرجع للمنتج." },
      { title: "متطلبات التغليف", copy: "نسّق الصناديق والأكياس والبطاقات والملصقات ووضع الشعار عند الحاجة." },
      { title: "معلومات الدفعة والطلب", copy: "احتفظ بمتطلبات الدفعة ومعلومات الطلب المتفق عليها للمراجعة." },
      { title: "مراجعة ما قبل الشحن", copy: "راجع تفاصيل المشروع المؤكدة قبل تنسيق التغليف والشحن." },
    ],
    packaging: "تُناقش خيارات التغليف الخاص حسب التشكيلة ونطاق المشروع المؤكد.",
    cta: "ناقش الجودة والتغليف",
  },
  process: {
    eyebrow: "كيف نعمل",
    title: "خمس مراحل لتخطيط تشكيلة متجر متخصص",
    copy: "يساعد التسلسل الواضح مشتري المتجر على مراجعة اتجاه المنتج وتفاصيل المشروع في الوقت المناسب.",
    steps: [
      { title: "شارك احتياجات متجرك", copy: "أرسل اتجاه المتجر والسوق والفئات ومتطلبات العرض." },
      { title: "راجع اتجاهات المنتجات", copy: "قارن الفئات والمواد والأحجار والمراجع المناسبة للتشكيلة." },
      { title: "أكد المواصفات وخطة العينة", copy: "ناقش التفاصيل ونطاق العينة والكمية حسب المشروع." },
      { title: "ناقش عرض السعر وشروط المشروع", copy: "راجع المعلومات اللازمة لعرض السعر والتغليف وتنسيق المشروع." },
      { title: "جهّز الطلب بعد التأكيد", copy: "نسّق المواصفات والتغليف والوجهة للخطوة التالية." },
    ],
  },
  inquiry: {
    eyebrow: "جهّز استفسارك",
    title: "أرسل التفاصيل التي تساعد على تخطيط تشكيلة متجرك",
    copy: "يساعد الموجز الأولي المختصر على ربط مناقشة المنتج والعينة والتغليف.",
    statusLabels: { required: "مطلوب", conditional: "إن توفر", optional: "اختياري" },
    fields: [
      { label: "اسم المتجر أو الشركة", status: "required" },
      { label: "السوق المستهدف", status: "required" },
      { label: "فئات المنتجات", status: "required" },
      { label: "نطاق الكمية المتوقع", status: "required" },
      { label: "متطلبات العينة", status: "conditional" },
      { label: "المادة المفضلة", status: "optional" },
      { label: "احتياجات التغليف أو العلامة الخاصة", status: "optional" },
      { label: "صور أو مواصفات مرجعية", status: "optional" },
      { label: "طريقة التواصل المفضلة", status: "optional" },
    ],
    cta: "ناقش تشكيلة متجرك",
  },
  faq: {
    eyebrow: "أسئلة المتاجر المتخصصة",
    title: "قبل مناقشة تشكيلة المتجر",
    copy: "توضح هذه الإجابات محادثة المشروع من دون افتراض شروط تجارية ثابتة.",
    items: [
      { question: "هل يمكن للمتاجر المتخصصة طلب عينات؟", answer: "يمكن مناقشة خيارات العينات حسب المنتج والمرجع والمواد والعملية ونطاق المشروع المؤكد." },
      { question: "كيف تُحدد الكمية الدنيا للطلب؟", answer: "تُناقش الكمية الدنيا لكل مشروع وتعتمد على نوع المنتج والمواد وتعقيد العملية والتغليف." },
      { question: "هل يمكن مناقشة تغليف خاص بالعلامة؟", answer: "نعم. يمكن مناقشة الصناديق والأكياس والبطاقات والملصقات ووضع الشعار عند إدراجها في النطاق." },
      { question: "هل يمكنني السؤال عن فئات متعددة في استفسار واحد؟", answer: "نعم. شارك الفئات والمراجع والأولويات لتنظيم محادثة التشكيلة." },
      { question: "هل تدعمون متطلبات المجوهرات المخصصة؟", answer: "يمكن مناقشة المتطلبات المخصصة انطلاقاً من مرجع أو رسم أو مواصفة أو فكرة منتج." },
      { question: "ما المعلومات التي تساعد في إعداد عرض السعر؟", answer: "اتجاه المتجر والفئات والمواد والأحجار ونطاق الكمية والتغليف والوجهة والمراجع بداية مفيدة." },
      { question: "هل يمكن أن تتبع الطلبات اللاحقة المواصفات المعتمدة؟", answer: "يمكن استخدام المواصفات والملاحظات المعتمدة كمرجع للمناقشات اللاحقة وفق المشروع المؤكد." },
    ],
  },
  finalCta: {
    eyebrow: "خطط لتشكيلتك",
    title: "هل أنت مستعد لمناقشة تشكيلة مجوهرات مناسبة لمتجرك؟",
    copy: "شارك الفئات والمراجع ومتطلبات المشروع لبدء محادثة عملية.",
    cta: "ناقش تشكيلة متجرك",
  },
  links: {
    products: "استكشف المنتجات",
    startBrand: "ابدأ علامتك التجارية للمجوهرات",
    emergingBrands: "للعلامات التجارية الناشئة في المجوهرات",
    boutiqueStores: "للمتاجر المتخصصة في المجوهرات",
    about: "عن Xingyue",
    howWeWork: "راجع المراحل الخمس",
  },
  schema: {
    service: {
      name: "دعم تصنيع المجوهرات للمتاجر المتخصصة",
      description: "دعم B2B لتخطيط تشكيلة المتجر والعينات والكميات حسب المشروع والتغليف ومتطلبات المجوهرات المخصصة.",
      serviceType: "دعم تصنيع المجوهرات",
      audience: "المتاجر المتخصصة في المجوهرات",
    },
  },
};

export const boutiqueStoresContentByLocale = {
  en: boutiqueEn,
  es: boutiqueEs,
  ar: boutiqueAr,
} satisfies Record<SupportedLocale, TargetAudienceContent>;

export const targetAudienceContentByKey = {
  "emerging-brands": emergingBrandsContentByLocale,
  "boutique-stores": boutiqueStoresContentByLocale,
} satisfies Record<TargetAudienceKey, Record<SupportedLocale, TargetAudienceContent>>;

export const targetAudiencePaths: Record<TargetAudienceKey, string> = {
  "emerging-brands": "/for-emerging-jewelry-brands",
  "boutique-stores": "/for-boutique-jewelry-stores",
};
