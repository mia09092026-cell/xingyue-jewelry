import type { SupportedLocale } from "@/lib/i18n";

export const legalPagePaths = ["/privacy", "/terms"] as const;

export type LegalPagePath = (typeof legalPagePaths)[number];

export type LegalPageContent = {
  seo: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    copy: string;
  }>;
  contactLabel: string;
};

export const legalPagesContentByLocale: Record<
  SupportedLocale,
  Record<LegalPagePath, LegalPageContent>
> = {
  en: {
    "/privacy": {
      seo: {
        title: "Privacy Notice | Xingyue Jewelry",
        description:
          "Learn how Xingyue Jewelry uses the information submitted through its B2B jewelry inquiry channels.",
      },
      eyebrow: "Website Information",
      title: "Privacy Notice",
      intro:
        "This notice explains how Xingyue Jewelry handles the details you choose to share when you contact our factory about a jewelry project.",
      sections: [
        {
          title: "Information you provide",
          copy:
            "You may provide your name, business or brand name, contact details, destination country, product interests, target quantity, reference links, packaging needs, expected timing and project message.",
        },
        {
          title: "How we use inquiry details",
          copy:
            "We use submitted details to review your request, discuss manufacturing options, prepare project communication and respond through the contact method you provide.",
        },
        {
          title: "Systems used for inquiries",
          copy:
            "Inquiry information may be processed through our website form, business email, WhatsApp and the business tools used to organize and respond to B2B project requests.",
        },
        {
          title: "What not to submit",
          copy:
            "Do not send payment card details, account passwords, government identification numbers or other sensitive personal information through the inquiry form.",
        },
        {
          title: "Questions about your information",
          copy:
            "Contact Xingyue Jewelry if you have a question about information you previously submitted or want us to review a request concerning that information.",
        },
      ],
      contactLabel: "Contact Xingyue Jewelry",
    },
    "/terms": {
      seo: {
        title: "Website Terms | Xingyue Jewelry",
        description:
          "Review the website terms for Xingyue Jewelry's B2B jewelry manufacturing information and inquiry channels.",
      },
      eyebrow: "Website Information",
      title: "Website Terms",
      intro:
        "These terms explain the role of this website and how project information is discussed before a jewelry manufacturing order is confirmed.",
      sections: [
        {
          title: "Website purpose",
          copy:
            "The website introduces Xingyue Jewelry's factory, product directions, OEM/ODM capabilities and inquiry process for business buyers. It is not a retail checkout or an automatic order-acceptance system.",
        },
        {
          title: "Project confirmation",
          copy:
            "Materials, stones, design scope, samples, minimum order requirements, packaging, expected timing, payment and shipping are reviewed for each project and become binding only when confirmed in the relevant quotation or agreement.",
        },
        {
          title: "References and custom designs",
          copy:
            "Buyers are responsible for having permission to share reference images, trademarks and design materials. Confidentiality and intellectual-property requirements should be raised before project work begins.",
        },
        {
          title: "Website accuracy",
          copy:
            "We aim to keep visible information accurate, but product options and manufacturing suitability depend on the specifications reviewed for an individual project.",
        },
        {
          title: "Contact before ordering",
          copy:
            "Send a project inquiry so our team can review the relevant product, material, sample, production and delivery requirements before you rely on a quotation.",
        },
      ],
      contactLabel: "Discuss a Project",
    },
  },
  es: {
    "/privacy": {
      seo: {
        title: "Aviso de privacidad | Xingyue Jewelry",
        description:
          "Consulta cómo Xingyue Jewelry utiliza la información enviada a través de sus canales de consulta B2B.",
      },
      eyebrow: "Información del sitio",
      title: "Aviso de privacidad",
      intro:
        "Este aviso explica cómo Xingyue Jewelry gestiona los datos que decides compartir al contactar con nuestra fábrica sobre un proyecto de joyería.",
      sections: [
        {
          title: "Información que proporcionas",
          copy:
            "Puedes facilitar tu nombre, empresa o marca, datos de contacto, país de destino, producto de interés, cantidad objetivo, enlaces de referencia, necesidades de empaque, fecha esperada y mensaje del proyecto.",
        },
        {
          title: "Cómo usamos los datos de la consulta",
          copy:
            "Usamos los datos enviados para revisar tu solicitud, conversar sobre opciones de fabricación, preparar la comunicación del proyecto y responder por el medio de contacto que indiques.",
        },
        {
          title: "Sistemas utilizados para las consultas",
          copy:
            "La información puede procesarse mediante el formulario del sitio, el correo corporativo, WhatsApp y las herramientas de negocio empleadas para organizar y responder solicitudes B2B.",
        },
        {
          title: "Información que no debes enviar",
          copy:
            "No envíes datos de tarjetas de pago, contraseñas, números de identificación oficial ni otra información personal sensible mediante el formulario.",
        },
        {
          title: "Consultas sobre tu información",
          copy:
            "Contacta con Xingyue Jewelry si tienes preguntas sobre información enviada anteriormente o quieres que revisemos una solicitud relacionada con esos datos.",
        },
      ],
      contactLabel: "Contactar con Xingyue Jewelry",
    },
    "/terms": {
      seo: {
        title: "Términos del sitio web | Xingyue Jewelry",
        description:
          "Consulta los términos del sitio web de Xingyue Jewelry para información y consultas de fabricación de joyería B2B.",
      },
      eyebrow: "Información del sitio",
      title: "Términos del sitio web",
      intro:
        "Estos términos explican la función del sitio y cómo se revisa la información del proyecto antes de confirmar un pedido de fabricación de joyería.",
      sections: [
        {
          title: "Finalidad del sitio",
          copy:
            "El sitio presenta la fábrica, las líneas de producto, las capacidades OEM/ODM y el proceso de consulta de Xingyue Jewelry para compradores profesionales. No es una tienda minorista ni acepta pedidos automáticamente.",
        },
        {
          title: "Confirmación del proyecto",
          copy:
            "Materiales, piedras, diseño, muestras, requisitos mínimos de pedido, empaque, fecha esperada, pago y envío se revisan por proyecto y solo son vinculantes cuando se confirman en la cotización o acuerdo correspondiente.",
        },
        {
          title: "Referencias y diseños personalizados",
          copy:
            "El comprador debe tener permiso para compartir imágenes, marcas y materiales de diseño. Los requisitos de confidencialidad y propiedad intelectual deben comunicarse antes de iniciar el trabajo.",
        },
        {
          title: "Exactitud del sitio",
          copy:
            "Procuramos mantener la información visible actualizada, pero las opciones de producto y la viabilidad de fabricación dependen de las especificaciones de cada proyecto.",
        },
        {
          title: "Contacto antes de realizar un pedido",
          copy:
            "Envía una consulta para que nuestro equipo revise producto, materiales, muestras, producción y entrega antes de basarte en una cotización.",
        },
      ],
      contactLabel: "Hablar sobre un proyecto",
    },
  },
  ar: {
    "/privacy": {
      seo: {
        title: "إشعار الخصوصية | Xingyue Jewelry",
        description:
          "تعرّف على كيفية استخدام Xingyue Jewelry للمعلومات المرسلة عبر قنوات استفسارات تصنيع المجوهرات بين الشركات.",
      },
      eyebrow: "معلومات الموقع",
      title: "إشعار الخصوصية",
      intro:
        "يوضح هذا الإشعار كيفية تعامل Xingyue Jewelry مع البيانات التي تختار مشاركتها عند التواصل مع مصنعنا بشأن مشروع مجوهرات.",
      sections: [
        {
          title: "المعلومات التي تقدمها",
          copy:
            "قد تقدم الاسم واسم الشركة أو العلامة التجارية وبيانات التواصل وبلد الوجهة ونوع المنتج والكمية المستهدفة وروابط مرجعية ومتطلبات التغليف والتوقيت المتوقع ورسالة المشروع.",
        },
        {
          title: "كيفية استخدام بيانات الاستفسار",
          copy:
            "نستخدم البيانات المرسلة لمراجعة طلبك ومناقشة خيارات التصنيع وتنظيم التواصل بشأن المشروع والرد عبر وسيلة الاتصال التي تقدمها.",
        },
        {
          title: "الأنظمة المستخدمة للاستفسارات",
          copy:
            "قد تُعالج معلومات الاستفسار عبر نموذج الموقع والبريد الإلكتروني التجاري وواتساب وأدوات العمل المستخدمة لتنظيم طلبات المشاريع بين الشركات والرد عليها.",
        },
        {
          title: "معلومات لا ينبغي إرسالها",
          copy:
            "لا ترسل بيانات بطاقات الدفع أو كلمات المرور أو أرقام الهوية الحكومية أو غيرها من المعلومات الشخصية الحساسة عبر نموذج الاستفسار.",
        },
        {
          title: "الاستفسار عن معلوماتك",
          copy:
            "تواصل مع Xingyue Jewelry إذا كان لديك سؤال عن معلومات سبق أن أرسلتها أو أردت منا مراجعة طلب متعلق بها.",
        },
      ],
      contactLabel: "تواصل مع Xingyue Jewelry",
    },
    "/terms": {
      seo: {
        title: "شروط الموقع | Xingyue Jewelry",
        description:
          "راجع شروط موقع Xingyue Jewelry الخاصة بمعلومات تصنيع المجوهرات واستفسارات الأعمال.",
      },
      eyebrow: "معلومات الموقع",
      title: "شروط الموقع",
      intro:
        "توضح هذه الشروط دور الموقع وكيفية مراجعة معلومات المشروع قبل تأكيد طلب تصنيع المجوهرات.",
      sections: [
        {
          title: "غرض الموقع",
          copy:
            "يعرّف الموقع بمصنع Xingyue Jewelry واتجاهات المنتجات وقدرات OEM/ODM ومسار الاستفسار للمشترين بين الشركات. وهو ليس متجر تجزئة ولا نظاماً لقبول الطلبات تلقائياً.",
        },
        {
          title: "تأكيد المشروع",
          copy:
            "تتم مراجعة المواد والأحجار ونطاق التصميم والعينات والحد الأدنى للطلب والتغليف والتوقيت المتوقع والدفع والشحن لكل مشروع، ولا تصبح ملزمة إلا بعد تأكيدها في عرض السعر أو الاتفاق المعني.",
        },
        {
          title: "المراجع والتصاميم المخصصة",
          copy:
            "يتحمل المشتري مسؤولية امتلاك الإذن لمشاركة الصور المرجعية والعلامات التجارية ومواد التصميم. ويجب طرح متطلبات السرية والملكية الفكرية قبل بدء العمل.",
        },
        {
          title: "دقة معلومات الموقع",
          copy:
            "نسعى إلى إبقاء المعلومات الظاهرة دقيقة، لكن خيارات المنتجات وإمكانية التصنيع تعتمد على المواصفات التي تتم مراجعتها لكل مشروع.",
        },
        {
          title: "التواصل قبل الطلب",
          copy:
            "أرسل استفساراً عن المشروع ليتمكن فريقنا من مراجعة متطلبات المنتج والمواد والعينة والإنتاج والتسليم قبل الاعتماد على عرض السعر.",
        },
      ],
      contactLabel: "ناقش مشروعك",
    },
  },
};
