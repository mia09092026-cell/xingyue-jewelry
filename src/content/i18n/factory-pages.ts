import type { SupportedLocale } from "@/lib/i18n";

export const factoryPagePaths = [
  "/factory",
  "/manufacturing-capabilities",
  "/custom-process",
] as const;

export type FactoryPagePath = (typeof factoryPagePaths)[number];

type FactoryPageCard = {
  title: string;
  copy: string;
};

export type FactoryPageContent = {
  seo: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  images?: Array<{ src: string; alt: string; caption: string }>;
  facts: FactoryPageCard[];
  stages: FactoryPageCard[];
  buyerGuidance: FactoryPageCard[];
  faqs: Array<{ question: string; answer: string }>;
  cta: {
    title: string;
    copy: string;
    label: string;
  };
};

export const factoryPagesContentByLocale: Record<
  SupportedLocale,
  Record<FactoryPagePath, FactoryPageContent>
> = {
  en: {
    "/factory": {
      seo: {
        title: "Own Jewelry Factory in Wuzhou | Xingyue Jewelry",
        description:
          "Meet Xingyue's own jewelry factory in Wuzhou for lab-grown diamond jewelry, custom OEM/ODM development, sampling, production, quality checks and packaging.",
      },
      eyebrow: "Xingyue Own Factory",
      title: "Our Own Jewelry Factory in Wuzhou",
      intro:
        "Xingyue operates its own jewelry factory in Wuzhou for lab-grown diamond jewelry and custom OEM/ODM projects. Brands, designers, boutique stores and wholesale buyers work directly with our team from the first manufacturing brief through sample review, production, quality checks and shipment preparation.",
      images: [
        {
          src: "/images/factory-workshop-overview.webp",
          alt: "Jewelry artisans working at setting benches inside Xingyue's Wuzhou factory",
          caption:
            "Factory workshop overview showing jewelry artisans working at dedicated benches.",
        },
        {
          src: "/images/jewelry-wax-model-preparation.webp",
          alt: "Hands preparing jewelry wax models for applicable custom designs",
          caption:
            "Wax model preparation used for applicable custom jewelry development.",
        },
        {
          src: "/images/manual-gemstone-setting.webp",
          alt: "Jeweler setting a gemstone by hand under magnification",
          caption:
            "Manual stone setting according to the confirmed design and setting requirements.",
        },
      ],
      facts: [
        {
          title: "Direct Factory Communication",
          copy: "Project references, materials, stones, settings, branding and packaging requirements are reviewed directly with the team coordinating the factory workflow.",
        },
        {
          title: "Jewelry Manufacturing Focus",
          copy: "The factory supports lab-grown diamond jewelry, lab-created colored gemstone jewelry, moissanite jewelry and custom settings in materials confirmed for each project.",
        },
        {
          title: "OEM/ODM Project Development",
          copy: "We can review reference images, sketches, CAD requirements, existing samples or a product direction before confirming the development route.",
        },
      ],
      stages: [
        {
          title: "Workshop Preparation",
          copy: "The confirmed design, material, stone and setting requirements are translated into a practical sampling or production brief.",
        },
        {
          title: "Hands-On Jewelry Work",
          copy: "Applicable projects move through model preparation, metal production, stone setting, polishing and finishing according to the confirmed scope.",
        },
        {
          title: "Review Before Dispatch",
          copy: "Finished pieces, visible workmanship, specifications and packaging are reviewed against the approved sample or project brief before dispatch.",
        },
      ],
      buyerGuidance: [
        {
          title: "Factory Facts, Not Generic Claims",
          copy: "Factory size, staffing, capacity, certifications and production timing are only provided when they are verified for the project.",
        },
        {
          title: "Project-Specific Commercial Terms",
          copy: "MOQ, sample cost, expected timing, bulk-production scope and payment terms are confirmed after the specifications are reviewed.",
        },
        {
          title: "Confidential Project Information",
          copy: "Send only the references and business details needed for the initial review. Confidentiality requirements can be discussed before detailed files are shared.",
        },
      ],
      faqs: [
        {
          question: "Is Xingyue a jewelry factory or a sourcing agent?",
          answer:
            "Xingyue operates its own jewelry factory in Wuzhou and works directly with overseas B2B buyers on jewelry development and production.",
        },
        {
          question: "What kinds of projects can the factory review?",
          answer:
            "We can review lab-grown diamond jewelry, lab-created colored gemstone jewelry, moissanite jewelry and custom OEM/ODM projects using materials and specifications confirmed for the project.",
        },
        {
          question: "Does every product use the same MOQ or lead time?",
          answer:
            "No. MOQ, sample scope and expected timing depend on the product, material, stone, setting complexity, packaging and quantity.",
        },
      ],
      cta: {
        title: "Discuss a Project with Our Factory Team",
        copy: "Share your product direction, references and target quantity so we can review the appropriate manufacturing route.",
        label: "Contact the Factory Team",
      },
    },
    "/manufacturing-capabilities": {
      seo: {
        title: "Jewelry Manufacturing Capabilities | OEM/ODM Factory",
        description:
          "Review Xingyue's jewelry manufacturing capabilities: CAD development, sampling, casting coordination, stone setting, polishing, quality checks, packaging and shipping preparation.",
      },
      eyebrow: "Manufacturing Capabilities",
      title: "Jewelry Development and Production Capabilities",
      intro:
        "Xingyue's own factory supports a coordinated OEM/ODM workflow for lab-grown diamond jewelry and custom collections. The exact material, stone, process and commercial scope is confirmed for each project before work begins.",
      facts: [
        {
          title: "CAD and Sample Development",
          copy: "Reference images, sketches, specifications or an existing sample can be reviewed before CAD requirements and the sample route are confirmed.",
        },
        {
          title: "Materials and Stone Options",
          copy: "Lab-grown diamonds, lab-created colored gemstones, moissanite, S925 silver and K-gold options can be reviewed according to the design and project requirements.",
        },
        {
          title: "Private-Label Presentation",
          copy: "Logo, engraving, plating direction, boxes, pouches, cards and labels can be discussed as part of the confirmed production and packaging scope.",
        },
      ],
      stages: [
        {
          title: "Model and Metal Preparation",
          copy: "Applicable custom designs move from approved CAD or sample direction into model preparation and the confirmed metal-production route.",
        },
        {
          title: "Setting, Polishing and Finish",
          copy: "Stone setting, surface finish, plating direction, clasps and other visible details are reviewed against the approved requirements.",
        },
        {
          title: "Quality and Packaging Review",
          copy: "Material, stones, dimensions, visible workmanship, quantity and packaging are checked according to the approved sample or project brief.",
        },
      ],
      buyerGuidance: [
        {
          title: "What to Send",
          copy: "Share the product type, reference image or design, material, stone, target quantity, destination and packaging requirements.",
        },
        {
          title: "What Is Confirmed",
          copy: "The quotation records the confirmed sample route, project-specific MOQ, expected timing, production scope and packaging direction.",
        },
        {
          title: "What Is Not Assumed",
          copy: "One-piece sampling, small-batch production, fixed timing and every material or process are not assumed to be available for every design.",
        },
      ],
      faqs: [
        {
          question: "Can Xingyue develop jewelry from a reference image?",
          answer:
            "Yes. A reference image, sketch, specification or existing sample can be reviewed to determine the CAD, sampling and production route.",
        },
        {
          question: "Can materials, stones and plating be customized?",
          answer:
            "Options can be reviewed by project, including the metal, stone type, color, shape, size, setting, finish and plating direction.",
        },
        {
          question: "Are packaging and international shipment included?",
          answer:
            "Packaging and shipment preparation can be coordinated after the packaging format, destination and project requirements are confirmed.",
        },
      ],
      cta: {
        title: "Match Your Design to the Right Manufacturing Route",
        copy: "Send the specifications you already know and mark undecided details as open for review.",
        label: "Discuss Manufacturing Capabilities",
      },
    },
    "/custom-process": {
      seo: {
        title: "Custom Jewelry OEM/ODM Process | Xingyue Factory",
        description:
          "Follow Xingyue's custom jewelry process from project brief and CAD through sampling, approval, production, quality review, packaging and shipment preparation.",
      },
      eyebrow: "Custom OEM/ODM Process",
      title: "From Your Jewelry Brief to Production",
      intro:
        "Work with our own factory through a clear custom jewelry process. Each step is based on the confirmed design, materials, stones, sample requirements, quantity and destination rather than a fixed route for every product.",
      facts: [
        {
          title: "Start with a Clear Brief",
          copy: "Send the product type, reference, material, stone, target quantity, target market, packaging needs and destination country.",
        },
        {
          title: "Confirm Before Manufacturing",
          copy: "Quotation, CAD or specification review, sample scope, project-specific MOQ, expected timing and payment terms are confirmed before work proceeds.",
        },
        {
          title: "Use the Approved Reference",
          copy: "The approved sample, CAD, images or written specifications become the reference for the agreed production scope.",
        },
      ],
      stages: [
        {
          title: "Brief and Feasibility Review",
          copy: "We review the design direction, material, stone, setting, quantity and packaging requirements and identify questions that must be resolved.",
        },
        {
          title: "CAD, Quotation and Sample",
          copy: "When applicable, CAD or specification details are reviewed, followed by the quotation and sample route confirmed for the project.",
        },
        {
          title: "Approval, Production and Dispatch",
          copy: "After sample or specification approval, the production scope, quality checkpoints, packaging and shipment preparation are coordinated.",
        },
      ],
      buyerGuidance: [
        {
          title: "Changes Before Approval",
          copy: "Design, material, stone and packaging changes should be resolved before the production scope is confirmed.",
        },
        {
          title: "Expected Timing",
          copy: "The buyer's requested timing is reviewed as a project requirement; it is not treated as a guaranteed production or delivery date.",
        },
        {
          title: "Repeat Orders",
          copy: "Approved specifications and packaging references help review consistency for later orders, while availability and timing are reconfirmed.",
        },
      ],
      faqs: [
        {
          question: "Do I need a finished CAD file to start?",
          answer:
            "No. A clear reference image, sketch, existing sample or product direction can be enough for an initial review.",
        },
        {
          question: "When is the bulk-production scope confirmed?",
          answer:
            "The production scope is confirmed after the quotation and applicable sample or specification review are approved.",
        },
        {
          question: "Can I request a fixed delivery date before review?",
          answer:
            "You can share the expected timing, but production and delivery timing must be reviewed against the design, materials, quantity, packaging and destination.",
        },
      ],
      cta: {
        title: "Prepare Your First Manufacturing Brief",
        copy: "A concise brief helps the factory review feasibility, missing specifications and the next practical step.",
        label: "Send Your Project Details",
      },
    },
  },
  es: {
    "/factory": {
      seo: {
        title: "Fábrica propia de joyería en Wuzhou | Xingyue Jewelry",
        description:
          "Conoce la fábrica propia de Xingyue en Wuzhou para joyería con diamantes de laboratorio, desarrollo OEM/ODM, muestras, producción, control de calidad y empaque.",
      },
      eyebrow: "Fábrica propia de Xingyue",
      title: "Nuestra propia fábrica de joyería en Wuzhou",
      intro:
        "Xingyue opera su propia fábrica de joyería en Wuzhou para proyectos de joyería con diamantes de laboratorio y OEM/ODM. Marcas, diseñadores, boutiques y compradores mayoristas trabajan directamente con nuestro equipo desde el brief inicial hasta la muestra, la producción, el control de calidad y la preparación del envío.",
      images: [
        {
          src: "/images/factory-workshop-overview.webp",
          alt: "Artesanos trabajando en bancos de engaste dentro de la fábrica de Xingyue en Wuzhou",
          caption:
            "Vista del taller con artesanos de joyería trabajando en bancos dedicados.",
        },
        {
          src: "/images/jewelry-wax-model-preparation.webp",
          alt: "Manos preparando modelos de cera para diseños de joyería personalizados",
          caption:
            "Preparación de modelos de cera para los proyectos personalizados que lo requieren.",
        },
        {
          src: "/images/manual-gemstone-setting.webp",
          alt: "Artesano engastando una gema a mano con aumento",
          caption:
            "Engaste manual según el diseño y los requisitos confirmados.",
        },
      ],
      facts: [
        {
          title: "Comunicación directa con fábrica",
          copy: "Las referencias, materiales, piedras, engastes, marca y empaque se revisan directamente con el equipo que coordina el flujo de la fábrica.",
        },
        {
          title: "Enfoque en fabricación de joyería",
          copy: "La fábrica trabaja joyería con diamantes de laboratorio, gemas de color creadas en laboratorio, moissanita y monturas personalizadas en materiales confirmados por proyecto.",
        },
        {
          title: "Desarrollo de proyectos OEM/ODM",
          copy: "Podemos revisar imágenes, bocetos, requisitos CAD, muestras existentes o una dirección de producto antes de confirmar la ruta de desarrollo.",
        },
      ],
      stages: [
        {
          title: "Preparación en taller",
          copy: "El diseño, material, piedra y engaste confirmados se convierten en un brief práctico para muestra o producción.",
        },
        {
          title: "Trabajo artesanal de joyería",
          copy: "Según el proyecto, el proceso puede incluir preparación de modelos, producción en metal, engaste, pulido y acabado.",
        },
        {
          title: "Revisión antes del despacho",
          copy: "Las piezas, el trabajo visible, las especificaciones y el empaque se revisan con la muestra aprobada o el brief antes del envío.",
        },
      ],
      buyerGuidance: [
        {
          title: "Hechos verificables",
          copy: "Tamaño de fábrica, personal, capacidad, certificaciones y plazos solo se comunican cuando están verificados para el proyecto.",
        },
        {
          title: "Condiciones según el proyecto",
          copy: "MOQ, costo de muestra, plazo previsto, alcance de producción y pago se confirman después de revisar las especificaciones.",
        },
        {
          title: "Información confidencial",
          copy: "Comparte solo las referencias y datos necesarios para la revisión inicial. Los requisitos de confidencialidad pueden discutirse antes de enviar archivos detallados.",
        },
      ],
      faqs: [
        {
          question: "¿Xingyue es una fábrica o un agente de compras?",
          answer:
            "Xingyue opera su propia fábrica de joyería en Wuzhou y trabaja directamente con compradores B2B internacionales en desarrollo y producción.",
        },
        {
          question: "¿Qué proyectos puede revisar la fábrica?",
          answer:
            "Podemos revisar joyería con diamantes de laboratorio, gemas de color creadas en laboratorio, moissanita y proyectos OEM/ODM personalizados.",
        },
        {
          question: "¿Todos los productos tienen el mismo MOQ y plazo?",
          answer:
            "No. El MOQ, la muestra y el plazo previsto dependen del producto, material, piedra, complejidad, empaque y cantidad.",
        },
      ],
      cta: {
        title: "Habla de tu proyecto con el equipo de fábrica",
        copy: "Comparte la dirección del producto, referencias y cantidad objetivo para revisar la ruta de fabricación adecuada.",
        label: "Contactar con la fábrica",
      },
    },
    "/manufacturing-capabilities": {
      seo: {
        title: "Capacidades de fabricación de joyería | Fábrica OEM/ODM",
        description:
          "Revisa las capacidades de Xingyue: CAD, muestras, producción en metal, engaste, pulido, control de calidad, empaque y preparación del envío.",
      },
      eyebrow: "Capacidades de fabricación",
      title: "Desarrollo y producción de joyería",
      intro:
        "La fábrica propia de Xingyue ofrece un flujo OEM/ODM coordinado para joyería con diamantes de laboratorio y colecciones personalizadas. Material, piedra, proceso y alcance comercial se confirman por proyecto.",
      facts: [
        {
          title: "CAD y desarrollo de muestras",
          copy: "Se pueden revisar imágenes, bocetos, especificaciones o una muestra existente antes de confirmar CAD y la ruta de muestra.",
        },
        {
          title: "Materiales y piedras",
          copy: "Diamantes de laboratorio, gemas de color creadas en laboratorio, moissanita, plata S925 y opciones de oro K se revisan según el diseño.",
        },
        {
          title: "Presentación de marca privada",
          copy: "Logo, grabado, dirección de baño, cajas, bolsas, tarjetas y etiquetas se pueden incluir en el alcance confirmado.",
        },
      ],
      stages: [
        {
          title: "Modelo y preparación del metal",
          copy: "Los diseños aplicables pasan del CAD o muestra aprobados a la preparación del modelo y la ruta de producción en metal.",
        },
        {
          title: "Engaste, pulido y acabado",
          copy: "El engaste, acabado superficial, dirección de baño, cierres y otros detalles se revisan con los requisitos aprobados.",
        },
        {
          title: "Revisión de calidad y empaque",
          copy: "Material, piedras, medidas, trabajo visible, cantidad y empaque se comprueban con la muestra o brief aprobado.",
        },
      ],
      buyerGuidance: [
        {
          title: "Qué enviar",
          copy: "Comparte tipo de producto, referencia, material, piedra, cantidad objetivo, destino y requisitos de empaque.",
        },
        {
          title: "Qué se confirma",
          copy: "La cotización registra muestra, MOQ según el proyecto, plazo previsto, alcance de producción y dirección de empaque.",
        },
        {
          title: "Qué no se presupone",
          copy: "No se presupone que cada diseño admita una muestra de una unidad, lotes pequeños, plazo fijo o cualquier proceso.",
        },
      ],
      faqs: [
        {
          question: "¿Xingyue puede desarrollar una pieza desde una imagen?",
          answer:
            "Sí. Se puede revisar una imagen, boceto, especificación o muestra existente para definir CAD, muestra y producción.",
        },
        {
          question: "¿Se pueden personalizar materiales, piedras y baños?",
          answer:
            "Las opciones se revisan por proyecto: metal, piedra, color, talla, tamaño, engaste, acabado y dirección de baño.",
        },
        {
          question: "¿Incluyen empaque y envío internacional?",
          answer:
            "El empaque y la preparación del envío se coordinan después de confirmar formato, destino y requisitos.",
        },
      ],
      cta: {
        title: "Relaciona tu diseño con la ruta de fabricación adecuada",
        copy: "Envía las especificaciones conocidas y marca como pendientes los detalles aún no decididos.",
        label: "Consultar capacidades",
      },
    },
    "/custom-process": {
      seo: {
        title: "Proceso de joyería personalizada OEM/ODM | Xingyue",
        description:
          "Conoce el proceso de Xingyue: brief, CAD, muestra, aprobación, producción, revisión de calidad, empaque y preparación del envío.",
      },
      eyebrow: "Proceso personalizado OEM/ODM",
      title: "Del brief de joyería a la producción",
      intro:
        "Trabaja con nuestra propia fábrica mediante un proceso claro. Cada etapa se basa en el diseño, material, piedras, muestra, cantidad y destino confirmados, sin asumir la misma ruta para todos los productos.",
      facts: [
        {
          title: "Comienza con un brief claro",
          copy: "Envía tipo de producto, referencia, material, piedra, cantidad, mercado, empaque y país de destino.",
        },
        {
          title: "Confirma antes de fabricar",
          copy: "Cotización, CAD o especificaciones, muestra, MOQ por proyecto, plazo previsto y pago se confirman antes de avanzar.",
        },
        {
          title: "Usa la referencia aprobada",
          copy: "La muestra, CAD, imágenes o especificaciones aprobadas se convierten en referencia para el alcance acordado.",
        },
      ],
      stages: [
        {
          title: "Brief y viabilidad",
          copy: "Revisamos diseño, material, piedra, engaste, cantidad y empaque e identificamos dudas por resolver.",
        },
        {
          title: "CAD, cotización y muestra",
          copy: "Cuando corresponde, se revisan CAD o especificaciones y se confirma la cotización y la ruta de muestra.",
        },
        {
          title: "Aprobación, producción y despacho",
          copy: "Después de aprobar muestra o especificaciones, se coordinan producción, controles, empaque y preparación del envío.",
        },
      ],
      buyerGuidance: [
        {
          title: "Cambios antes de aprobar",
          copy: "Diseño, material, piedra y empaque deben resolverse antes de confirmar el alcance de producción.",
        },
        {
          title: "Plazo esperado",
          copy: "El plazo solicitado se revisa como requisito del proyecto; no es una fecha garantizada de producción o entrega.",
        },
        {
          title: "Pedidos recurrentes",
          copy: "Las especificaciones aprobadas ayudan a revisar consistencia, pero disponibilidad y plazo se reconfirman.",
        },
      ],
      faqs: [
        {
          question: "¿Necesito un archivo CAD terminado?",
          answer:
            "No. Una imagen clara, boceto, muestra existente o dirección de producto puede servir para la revisión inicial.",
        },
        {
          question: "¿Cuándo se confirma la producción?",
          answer:
            "El alcance se confirma después de aprobar la cotización y la muestra o revisión de especificaciones aplicable.",
        },
        {
          question: "¿Puedo solicitar una fecha fija antes de la revisión?",
          answer:
            "Puedes indicar el plazo esperado, pero debe revisarse con diseño, materiales, cantidad, empaque y destino.",
        },
      ],
      cta: {
        title: "Prepara tu primer brief de fabricación",
        copy: "Un brief conciso ayuda a revisar viabilidad, datos faltantes y el siguiente paso práctico.",
        label: "Enviar detalles del proyecto",
      },
    },
  },
  ar: {
    "/factory": {
      seo: {
        title: "مصنع Xingyue الخاص للمجوهرات في ووتشو",
        description:
          "تعرّف إلى مصنع Xingyue الخاص في ووتشو لمجوهرات الألماس المزروع وتطوير OEM/ODM والعينات والإنتاج وفحوص الجودة والتغليف.",
      },
      eyebrow: "مصنع Xingyue الخاص",
      title: "مصنعنا الخاص للمجوهرات في ووتشو",
      intro:
        "تدير Xingyue مصنعها الخاص للمجوهرات في ووتشو لمشاريع مجوهرات الألماس المزروع وOEM/ODM. تعمل العلامات التجارية والمصممون والمتاجر والمشترون بالجملة مباشرة مع فريقنا من موجز التصنيع الأول إلى مراجعة العينة والإنتاج وفحوص الجودة والاستعداد للشحن.",
      images: [
        {
          src: "/images/factory-workshop-overview.webp",
          alt: "حرفيو مجوهرات يعملون على طاولات الترصيع داخل مصنع Xingyue في ووتشو",
          caption:
            "نظرة عامة على ورشة المصنع وحرفيي المجوهرات في محطات العمل.",
        },
        {
          src: "/images/jewelry-wax-model-preparation.webp",
          alt: "يدان تحضران نماذج شمعية لتصاميم المجوهرات المخصصة",
          caption:
            "تحضير نماذج الشمع للمشاريع المخصصة التي تتطلب هذه المرحلة.",
        },
        {
          src: "/images/manual-gemstone-setting.webp",
          alt: "حرفي يرصع حجراً كريماً يدوياً باستخدام أداة تكبير",
          caption:
            "ترصيع يدوي وفق التصميم ومتطلبات التثبيت المعتمدة.",
        },
      ],
      facts: [
        {
          title: "تواصل مباشر مع المصنع",
          copy: "تتم مراجعة المراجع والمواد والأحجار والترصيع والعلامة والتغليف مباشرة مع الفريق الذي ينسق سير العمل داخل المصنع.",
        },
        {
          title: "تركيز على تصنيع المجوهرات",
          copy: "يدعم المصنع مجوهرات الألماس المزروع والأحجار الملونة المصنعة مخبرياً والمويسانيت والترصيعات المخصصة بمواد تُعتمد لكل مشروع.",
        },
        {
          title: "تطوير مشاريع OEM/ODM",
          copy: "يمكن مراجعة الصور أو الرسومات أو متطلبات CAD أو عينة موجودة أو اتجاه المنتج قبل تحديد مسار التطوير.",
        },
      ],
      stages: [
        {
          title: "التحضير في الورشة",
          copy: "تتحول متطلبات التصميم والمادة والحجر والترصيع المعتمدة إلى موجز عملي للعينة أو الإنتاج.",
        },
        {
          title: "عمل المجوهرات اليدوي",
          copy: "بحسب المشروع، قد تشمل المراحل إعداد النموذج وإنتاج المعدن وترصيع الأحجار والتلميع والتشطيب.",
        },
        {
          title: "المراجعة قبل الإرسال",
          copy: "تُراجع القطع وجودة العمل الظاهرة والمواصفات والتغليف مقارنة بالعينة أو موجز المشروع قبل الإرسال.",
        },
      ],
      buyerGuidance: [
        {
          title: "حقائق قابلة للتحقق",
          copy: "لا تُذكر مساحة المصنع أو عدد العاملين أو الطاقة أو الشهادات أو التوقيت إلا عندما تكون معلومات موثقة للمشروع.",
        },
        {
          title: "شروط خاصة بالمشروع",
          copy: "يتم تأكيد الحد الأدنى للطلب وتكلفة العينة والتوقيت المتوقع ونطاق الإنتاج والدفع بعد مراجعة المواصفات.",
        },
        {
          title: "معلومات المشروع السرية",
          copy: "أرسل فقط المراجع والبيانات اللازمة للمراجعة الأولى، ويمكن مناقشة السرية قبل مشاركة الملفات التفصيلية.",
        },
      ],
      faqs: [
        {
          question: "هل Xingyue مصنع مجوهرات أم وكيل شراء؟",
          answer:
            "تدير Xingyue مصنعها الخاص للمجوهرات في ووتشو وتعمل مباشرة مع المشترين الدوليين في تطوير المجوهرات وإنتاجها.",
        },
        {
          question: "ما أنواع المشاريع التي يراجعها المصنع؟",
          answer:
            "يمكن مراجعة مجوهرات الألماس المزروع والأحجار الملونة المصنعة مخبرياً والمويسانيت ومشاريع OEM/ODM المخصصة.",
        },
        {
          question: "هل لكل المنتجات حد طلب وتوقيت واحد؟",
          answer:
            "لا. يعتمد الحد الأدنى للطلب والعينة والتوقيت المتوقع على المنتج والمادة والحجر والتعقيد والتغليف والكمية.",
        },
      ],
      cta: {
        title: "ناقش مشروعك مع فريق المصنع",
        copy: "شارك اتجاه المنتج والمراجع والكمية المستهدفة لمراجعة مسار التصنيع المناسب.",
        label: "تواصل مع فريق المصنع",
      },
    },
    "/manufacturing-capabilities": {
      seo: {
        title: "قدرات تصنيع المجوهرات | مصنع OEM/ODM",
        description:
          "راجع قدرات Xingyue في CAD والعينات وإنتاج المعدن والترصيع والتلميع وفحوص الجودة والتغليف والاستعداد للشحن.",
      },
      eyebrow: "قدرات التصنيع",
      title: "قدرات تطوير المجوهرات وإنتاجها",
      intro:
        "يدعم مصنع Xingyue الخاص مسار OEM/ODM منسقاً لمجوهرات الألماس المزروع والمجموعات المخصصة. يتم تأكيد المادة والحجر والعملية والنطاق التجاري لكل مشروع قبل البدء.",
      facts: [
        {
          title: "تصميم CAD وتطوير العينة",
          copy: "يمكن مراجعة الصور والرسومات والمواصفات أو عينة موجودة قبل تأكيد متطلبات CAD ومسار العينة.",
        },
        {
          title: "خيارات المواد والأحجار",
          copy: "يمكن مراجعة الألماس المزروع والأحجار الملونة المصنعة مخبرياً والمويسانيت والفضة S925 وخيارات ذهب K حسب التصميم.",
        },
        {
          title: "عرض العلامة الخاصة",
          copy: "يمكن مناقشة الشعار والنقش واتجاه الطلاء والعلب والأكياس والبطاقات والملصقات ضمن النطاق المعتمد.",
        },
      ],
      stages: [
        {
          title: "إعداد النموذج والمعدن",
          copy: "تنتقل التصاميم المناسبة من CAD أو العينة المعتمدة إلى إعداد النموذج ومسار إنتاج المعدن المؤكد.",
        },
        {
          title: "الترصيع والتلميع والتشطيب",
          copy: "تُراجع الأحجار والتشطيب السطحي واتجاه الطلاء والأقفال والتفاصيل الظاهرة وفق المتطلبات المعتمدة.",
        },
        {
          title: "مراجعة الجودة والتغليف",
          copy: "تُفحص المادة والأحجار والأبعاد والعمل الظاهر والكمية والتغليف مقابل العينة أو الموجز المعتمد.",
        },
      ],
      buyerGuidance: [
        {
          title: "ما الذي ترسله",
          copy: "شارك نوع المنتج والمرجع والمادة والحجر والكمية المستهدفة والوجهة ومتطلبات التغليف.",
        },
        {
          title: "ما الذي يتم تأكيده",
          copy: "يوضح عرض السعر مسار العينة والحد الأدنى للطلب حسب المشروع والتوقيت المتوقع ونطاق الإنتاج والتغليف.",
        },
        {
          title: "ما لا يُفترض مسبقاً",
          copy: "لا يُفترض أن كل تصميم يدعم عينة واحدة أو دفعات صغيرة أو توقيتاً ثابتاً أو كل العمليات.",
        },
      ],
      faqs: [
        {
          question: "هل يمكن تطوير قطعة من صورة مرجعية؟",
          answer:
            "نعم. يمكن مراجعة صورة أو رسم أو مواصفة أو عينة لتحديد مسار CAD والعينة والإنتاج.",
        },
        {
          question: "هل يمكن تخصيص المواد والأحجار والطلاء؟",
          answer:
            "تُراجع الخيارات حسب المشروع، ومنها المعدن ونوع الحجر ولونه وشكله وحجمه والترصيع والتشطيب والطلاء.",
        },
        {
          question: "هل يشمل العمل التغليف والشحن الدولي؟",
          answer:
            "يمكن تنسيق التغليف والاستعداد للشحن بعد تأكيد الشكل والوجهة ومتطلبات المشروع.",
        },
      ],
      cta: {
        title: "طابق تصميمك مع مسار التصنيع المناسب",
        copy: "أرسل المواصفات المعروفة وحدد التفاصيل غير المحسومة لتتم مراجعتها.",
        label: "ناقش قدرات التصنيع",
      },
    },
    "/custom-process": {
      seo: {
        title: "مسار تصنيع المجوهرات المخصصة OEM/ODM | Xingyue",
        description:
          "تعرّف إلى مسار Xingyue من موجز المشروع وCAD إلى العينة والموافقة والإنتاج ومراجعة الجودة والتغليف والاستعداد للشحن.",
      },
      eyebrow: "مسار OEM/ODM المخصص",
      title: "من موجز المجوهرات إلى الإنتاج",
      intro:
        "اعمل مع مصنعنا الخاص عبر مسار واضح للمجوهرات المخصصة. تعتمد كل مرحلة على التصميم والمواد والأحجار والعينة والكمية والوجهة المعتمدة، وليس على مسار ثابت لكل المنتجات.",
      facts: [
        {
          title: "ابدأ بموجز واضح",
          copy: "أرسل نوع المنتج والمرجع والمادة والحجر والكمية والسوق والتغليف ودولة الوجهة.",
        },
        {
          title: "أكد التفاصيل قبل التصنيع",
          copy: "يتم تأكيد عرض السعر وCAD أو المواصفات والعينة والحد الأدنى حسب المشروع والتوقيت المتوقع والدفع قبل المتابعة.",
        },
        {
          title: "استخدم المرجع المعتمد",
          copy: "تصبح العينة أو CAD أو الصور أو المواصفات المعتمدة مرجعاً لنطاق الإنتاج المتفق عليه.",
        },
      ],
      stages: [
        {
          title: "الموجز ومراجعة الجدوى",
          copy: "نراجع التصميم والمادة والحجر والترصيع والكمية والتغليف ونحدد الأسئلة التي يجب حلها.",
        },
        {
          title: "CAD وعرض السعر والعينة",
          copy: "عند الحاجة، تُراجع تفاصيل CAD أو المواصفات ثم يُعتمد عرض السعر ومسار العينة.",
        },
        {
          title: "الموافقة والإنتاج والإرسال",
          copy: "بعد اعتماد العينة أو المواصفات، يتم تنسيق الإنتاج وفحوص الجودة والتغليف والاستعداد للشحن.",
        },
      ],
      buyerGuidance: [
        {
          title: "التغييرات قبل الاعتماد",
          copy: "ينبغي حسم تغييرات التصميم والمادة والحجر والتغليف قبل تأكيد نطاق الإنتاج.",
        },
        {
          title: "التوقيت المتوقع",
          copy: "يُراجع توقيت المشتري المطلوب كمتطلب للمشروع، وليس كموعد مضمون للإنتاج أو التسليم.",
        },
        {
          title: "الطلبات المتكررة",
          copy: "تساعد المواصفات المعتمدة في مراجعة الاتساق، بينما يعاد تأكيد التوفر والتوقيت لكل طلب.",
        },
      ],
      faqs: [
        {
          question: "هل أحتاج إلى ملف CAD نهائي للبدء؟",
          answer:
            "لا. قد تكفي صورة واضحة أو رسم أو عينة موجودة أو اتجاه منتج للمراجعة الأولى.",
        },
        {
          question: "متى يتم تأكيد نطاق الإنتاج؟",
          answer:
            "يُؤكد النطاق بعد اعتماد عرض السعر والعينة أو مراجعة المواصفات المناسبة.",
        },
        {
          question: "هل يمكن طلب تاريخ تسليم ثابت قبل المراجعة؟",
          answer:
            "يمكنك مشاركة التوقيت المتوقع، لكن يجب مراجعته مع التصميم والمواد والكمية والتغليف والوجهة.",
        },
      ],
      cta: {
        title: "جهّز موجز التصنيع الأول",
        copy: "يساعد الموجز المختصر على مراجعة الجدوى والمواصفات الناقصة والخطوة العملية التالية.",
        label: "أرسل تفاصيل المشروع",
      },
    },
  },
};
