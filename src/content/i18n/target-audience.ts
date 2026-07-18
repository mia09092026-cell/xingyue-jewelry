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
  links: { products: string; startBrand: string; emergingBrands: string; about: string; howWeWork: string };
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
