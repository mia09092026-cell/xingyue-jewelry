import type { SupportedLocale } from "@/lib/i18n";

export type GemstoneCatalogCopy = {
  seo: {
    title: string;
    description: string;
  };
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroNote: string;
  colors: {
    eyebrow: string;
    title: string;
    copy: string;
    view: string;
    representative: string;
    names: Record<string, string>;
  };
  types: {
    eyebrow: string;
    title: string;
    copy: string;
    colors: string;
    moq: string;
    fromPrice: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  fields: {
    color: string;
    shape: string;
    sizeRange: string;
    quality: string;
    moq: string;
    referencePrice: string;
    availability: string;
  };
  cta: {
    getWholesalePrice: string;
    addInquiry: string;
    whatsapp: string;
    email: string;
    sendInquiry: string;
    requestCatalog: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    copy: string;
    disclaimer: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ title: string; copy: string }>;
  };
  payment: {
    eyebrow: string;
    title: string;
    copy: string;
    options: string[];
  };
  closing: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const gemstoneCatalogContent: Record<SupportedLocale, GemstoneCatalogCopy> = {
  en: {
    seo: {
      title: "Lab-Grown Gemstones Wholesale by Color | Xingyue Jewelry",
      description:
        "Wholesale lab-grown ruby, sapphire, emerald, spinel, moissanite and colored gemstones by color, size and shape. OEM/ODM jewelry manufacturing and custom stone sourcing.",
    },
    navLabel: "Lab-Grown Gemstones",
    eyebrow: "B2B Loose Stone Sourcing",
    title: "Lab-Grown Gemstones Wholesale by Color",
    subtitle:
      "A quote-ready sourcing catalog for jewelry brands, wholesalers and OEM / ODM buyers.",
    heroNote:
      "Browse color families, calibrated sizes, mixed cuts and project-based stone sourcing. Final supply is confirmed against your size, quality, quantity and production brief.",
    colors: {
      eyebrow: "Source by Color",
      title: "Build a stone direction around your market.",
      copy:
        "Start with a color family, then confirm stone type, cut, millimeter size, matching tolerance and order quantity.",
      view: "View Stones",
      representative: "Representative stones",
      names: {
        red: "Red",
        blue: "Blue",
        green: "Green",
        pink: "Pink",
        purple: "Purple",
        "yellow-champagne": "Yellow / Champagne",
        "white-colorless": "White / Colorless",
        black: "Black",
      },
    },
    types: {
      eyebrow: "Stone Categories",
      title: "Wholesale gemstone programs for repeat production.",
      copy:
        "Choose a material direction for samples, calibrated batches, matched pairs or custom jewelry manufacturing.",
      colors: "Available colors",
      moq: "MOQ",
      fromPrice: "Reference price",
    },
    catalog: {
      eyebrow: "Quote-Ready Stone Cards",
      title: "Popular specifications for buyer discussion.",
      copy:
        "These cards are sourcing examples, not fixed retail inventory. Send the stone name with your target size, quantity and quality requirement.",
    },
    fields: {
      color: "Color",
      shape: "Shape",
      sizeRange: "Size range",
      quality: "Quality",
      moq: "MOQ",
      referencePrice: "Reference price",
      availability: "Availability",
    },
    cta: {
      getWholesalePrice: "Get Wholesale Price",
      addInquiry: "Add to Inquiry",
      whatsapp: "Contact on WhatsApp",
      email: "Email Inquiry",
      sendInquiry: "Send Inquiry",
      requestCatalog: "Request Stone Catalog",
    },
    pricing: {
      eyebrow: "Reference Pricing",
      title: "Reference wholesale price guidance",
      copy:
        "Use these bands for early budget planning. A formal quotation follows specification review and availability confirmation.",
      disclaimer:
        "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.",
    },
    capabilities: {
      eyebrow: "Wholesale & Custom Support",
      title: "From loose stones to finished jewelry production.",
      copy:
        "Xingyue supports the technical details overseas buyers need before approving samples and bulk production.",
      items: [
        {
          title: "Calibrated & Matched Supply",
          copy: "Discuss millimeter sizes, matching tolerance, pairs, lots and repeat-order consistency.",
        },
        {
          title: "MOQ & Bulk Planning",
          copy: "MOQ is confirmed by material, size, cut, color, calibration and production volume.",
        },
        {
          title: "Custom Cutting & Sourcing",
          copy: "Share CAD, setting dimensions or reference images for custom stone recommendations.",
        },
        {
          title: "OEM / ODM Jewelry",
          copy: "Combine loose stone sourcing with 14K / 18K gold, S925, setting, QC and packaging.",
        },
        {
          title: "Certificate Options",
          copy: "Certificate support is discussed by stone type, size, grade, market and budget.",
        },
        {
          title: "Worldwide Delivery",
          copy: "Sampling, production lead time, export packing and shipping are confirmed before order.",
        },
      ],
    },
    payment: {
      eyebrow: "B2B Order Support",
      title: "Payment options for confirmed orders",
      copy:
        "For confirmed wholesale or sample orders, we can provide PayPal invoice, secure credit card payment link, bank transfer, or Wise transfer. Large custom orders usually require a deposit before production and balance before shipment.",
      options: [
        "PayPal invoice",
        "Credit card payment link",
        "Bank transfer / T/T",
        "Wise transfer",
        "Sample order payment",
        "Deposit before production",
        "Balance before shipping",
      ],
    },
    closing: {
      eyebrow: "Prepare Your Stone Brief",
      title: "Tell us the color, cut, size and quantity you need.",
      copy:
        "Add a stone to the inquiry form or send your reference design. We will review availability, MOQ, calibration, quality and production options.",
    },
  },
  ar: {
    seo: {
      title: "أحجار كريمة مزروعة بالجملة حسب اللون | Xingyue Jewelry",
      description:
        "توريد أحجار الياقوت والسافير والزمرد والموسانيت والأحجار الملونة المزروعة بالجملة حسب اللون والحجم والشكل مع تصنيع مجوهرات OEM / ODM.",
    },
    navLabel: "أحجار كريمة مزروعة",
    eyebrow: "توريد أحجار سائبة B2B",
    title: "أحجار كريمة مزروعة بالجملة حسب اللون",
    subtitle: "كتالوج توريد جاهز للتسعير للعلامات التجارية والموزعين ومشتري OEM / ODM.",
    heroNote:
      "استعرض عائلات الألوان والمقاسات المعايرة والقصات المختلطة وتوريد الأحجار حسب المشروع. يتم تأكيد التوفر النهائي وفق الحجم والجودة والكمية وملخص الإنتاج.",
    colors: {
      eyebrow: "التوريد حسب اللون",
      title: "ابن اتجاه الأحجار المناسب لسوقك.",
      copy:
        "ابدأ بعائلة اللون، ثم أكد نوع الحجر والقطع والمقاس بالملليمتر ونسبة المطابقة وكمية الطلب.",
      view: "عرض الأحجار",
      representative: "أحجار ممثلة",
      names: {
        red: "أحمر",
        blue: "أزرق",
        green: "أخضر",
        pink: "وردي",
        purple: "بنفسجي",
        "yellow-champagne": "أصفر / شمبانيا",
        "white-colorless": "أبيض / عديم اللون",
        black: "أسود",
      },
    },
    types: {
      eyebrow: "فئات الأحجار",
      title: "برامج أحجار كريمة بالجملة للإنتاج المتكرر.",
      copy:
        "اختر اتجاه المادة للعينات أو الدفعات المعايرة أو الأزواج المتطابقة أو تصنيع المجوهرات المخصصة.",
      colors: "الألوان المتاحة",
      moq: "الحد الأدنى للطلب",
      fromPrice: "سعر مرجعي",
    },
    catalog: {
      eyebrow: "بطاقات أحجار جاهزة للتسعير",
      title: "مواصفات شائعة لنقاش المشترين.",
      copy:
        "هذه البطاقات أمثلة توريد وليست مخزون تجزئة ثابت. أرسل اسم الحجر مع المقاس والكمية ومستوى الجودة المطلوب.",
    },
    fields: {
      color: "اللون",
      shape: "الشكل",
      sizeRange: "نطاق المقاس",
      quality: "الجودة",
      moq: "MOQ",
      referencePrice: "سعر مرجعي",
      availability: "التوفر",
    },
    cta: {
      getWholesalePrice: "احصل على سعر الجملة",
      addInquiry: "أضف إلى الاستفسار",
      whatsapp: "تواصل عبر WhatsApp",
      email: "استفسار عبر البريد",
      sendInquiry: "إرسال استفسار",
      requestCatalog: "اطلب كتالوج الأحجار",
    },
    pricing: {
      eyebrow: "أسعار مرجعية",
      title: "إرشادات أسعار الجملة المرجعية",
      copy:
        "استخدم هذه النطاقات للتخطيط الأولي للميزانية. يتم إصدار عرض السعر الرسمي بعد مراجعة المواصفات وتأكيد التوفر.",
      disclaimer:
        "الأسعار نطاقات جملة مرجعية فقط. يعتمد عرض السعر النهائي على الحجم واللون والنقاء والقطع والشهادة والكمية والمتطلبات الخاصة.",
    },
    capabilities: {
      eyebrow: "دعم الجملة والتخصيص",
      title: "من الأحجار السائبة إلى إنتاج المجوهرات النهائية.",
      copy:
        "تدعم Xingyue التفاصيل الفنية التي يحتاجها المشترون الدوليون قبل اعتماد العينات والإنتاج بالجملة.",
      items: [
        {
          title: "توريد معاير ومتطابق",
          copy: "ناقش المقاسات بالملليمتر ونسبة المطابقة والأزواج والدفعات واتساق الطلبات المتكررة.",
        },
        {
          title: "تخطيط MOQ والطلبات الكبيرة",
          copy: "يتم تأكيد MOQ حسب المادة والحجم والقطع واللون والمعايرة وحجم الإنتاج.",
        },
        {
          title: "قطع مخصص وتوريد",
          copy: "شارك CAD أو أبعاد التركيب أو صور مرجعية للحصول على توصيات أحجار مخصصة.",
        },
        {
          title: "مجوهرات OEM / ODM",
          copy: "اجمع توريد الأحجار السائبة مع ذهب 14K / 18K أو S925 والتركيب والفحص والتغليف.",
        },
        {
          title: "خيارات الشهادات",
          copy: "تتم مناقشة الشهادات حسب نوع الحجر والحجم والدرجة والسوق والميزانية.",
        },
        {
          title: "توصيل عالمي",
          copy: "يتم تأكيد العينات ووقت الإنتاج وتغليف التصدير والشحن قبل الطلب.",
        },
      ],
    },
    payment: {
      eyebrow: "دعم طلبات B2B",
      title: "خيارات الدفع للطلبات المؤكدة",
      copy:
        "للطلبات المؤكدة بالجملة أو العينات، يمكننا توفير فاتورة PayPal أو رابط دفع آمن ببطاقة ائتمان أو تحويل بنكي أو Wise. الطلبات المخصصة الكبيرة تحتاج عادة إلى دفعة مقدمة قبل الإنتاج ورصيد قبل الشحن.",
      options: [
        "فاتورة PayPal",
        "رابط دفع ببطاقة ائتمان",
        "تحويل بنكي / T/T",
        "تحويل Wise",
        "دفع طلب عينة",
        "دفعة مقدمة قبل الإنتاج",
        "الرصيد قبل الشحن",
      ],
    },
    closing: {
      eyebrow: "جهز ملخص الأحجار",
      title: "أخبرنا باللون والقطع والمقاس والكمية المطلوبة.",
      copy:
        "أضف حجرا إلى نموذج الاستفسار أو أرسل التصميم المرجعي. سنراجع التوفر وMOQ والمعايرة والجودة وخيارات الإنتاج.",
    },
  },
  es: {
    seo: {
      title: "Gemas de laboratorio al por mayor por color | Xingyue Jewelry",
      description:
        "Compra al por mayor rubí, zafiro, esmeralda, espinela, moissanita y gemas de laboratorio por color, tamaño y forma con fabricación de joyería OEM / ODM.",
    },
    navLabel: "Gemas de laboratorio",
    eyebrow: "Suministro B2B de piedras sueltas",
    title: "Gemas de laboratorio al por mayor por color",
    subtitle:
      "Un catálogo listo para cotización para marcas de joyería, mayoristas y compradores OEM / ODM.",
    heroNote:
      "Explora familias de color, tamaños calibrados, cortes mixtos y sourcing por proyecto. La disponibilidad final se confirma según tamaño, calidad, cantidad y brief de producción.",
    colors: {
      eyebrow: "Sourcing por color",
      title: "Construye una dirección de piedras para tu mercado.",
      copy:
        "Empieza con una familia de color y luego confirma tipo de piedra, corte, tamaño en milímetros, tolerancia de matching y cantidad.",
      view: "Ver gemas",
      representative: "Piedras representativas",
      names: {
        red: "Rojo",
        blue: "Azul",
        green: "Verde",
        pink: "Rosa",
        purple: "Morado",
        "yellow-champagne": "Amarillo / Champagne",
        "white-colorless": "Blanco / Incoloro",
        black: "Negro",
      },
    },
    types: {
      eyebrow: "Categorías de piedra",
      title: "Programas mayoristas de gemas para producción recurrente.",
      copy:
        "Elige una dirección de material para muestras, lotes calibrados, pares iguales o fabricación de joyería personalizada.",
      colors: "Colores disponibles",
      moq: "MOQ",
      fromPrice: "Precio de referencia",
    },
    catalog: {
      eyebrow: "Fichas listas para cotizar",
      title: "Especificaciones populares para conversación con compradores.",
      copy:
        "Estas fichas son ejemplos de sourcing, no inventario minorista fijo. Envía el nombre de la piedra con tamaño, cantidad y calidad objetivo.",
    },
    fields: {
      color: "Color",
      shape: "Forma",
      sizeRange: "Rango de tamaño",
      quality: "Calidad",
      moq: "MOQ",
      referencePrice: "Precio de referencia",
      availability: "Disponibilidad",
    },
    cta: {
      getWholesalePrice: "Solicitar precio mayorista",
      addInquiry: "Añadir a consulta",
      whatsapp: "Contactar por WhatsApp",
      email: "Consulta por email",
      sendInquiry: "Enviar consulta",
      requestCatalog: "Solicitar catálogo de gemas",
    },
    pricing: {
      eyebrow: "Precios de referencia",
      title: "Guía de precios mayoristas de referencia",
      copy:
        "Usa estos rangos para planificar presupuesto inicial. La cotización formal sigue la revisión de especificaciones y confirmación de disponibilidad.",
      disclaimer:
        "Los precios son rangos mayoristas de referencia. La cotización final depende de tamaño, color, claridad, corte, certificado, cantidad y requisitos personalizados.",
    },
    capabilities: {
      eyebrow: "Soporte mayorista y personalizado",
      title: "De piedras sueltas a producción de joyería terminada.",
      copy:
        "Xingyue apoya los detalles técnicos que compradores internacionales necesitan antes de aprobar muestras y producción a granel.",
      items: [
        {
          title: "Suministro calibrado y matching",
          copy: "Revisa tamaños en milímetros, tolerancia de matching, pares, lotes y consistencia para pedidos recurrentes.",
        },
        {
          title: "MOQ y planificación a granel",
          copy: "El MOQ se confirma por material, tamaño, corte, color, calibración y volumen de producción.",
        },
        {
          title: "Corte personalizado y sourcing",
          copy: "Comparte CAD, dimensiones de montura o imágenes de referencia para recomendaciones de piedra.",
        },
        {
          title: "Joyería OEM / ODM",
          copy: "Combina piedras sueltas con oro 14K / 18K, S925, engaste, QC y empaque.",
        },
        {
          title: "Opciones de certificado",
          copy: "El soporte de certificado se revisa por tipo de piedra, tamaño, grado, mercado y presupuesto.",
        },
        {
          title: "Entrega mundial",
          copy: "Muestras, lead time, empaque de exportación y envío se confirman antes del pedido.",
        },
      ],
    },
    payment: {
      eyebrow: "Soporte para pedidos B2B",
      title: "Opciones de pago para pedidos confirmados",
      copy:
        "Para pedidos mayoristas o de muestra confirmados podemos ofrecer factura PayPal, enlace seguro de pago con tarjeta, transferencia bancaria o Wise. Los pedidos personalizados grandes normalmente requieren depósito antes de producción y saldo antes del envío.",
      options: [
        "Factura PayPal",
        "Enlace de pago con tarjeta",
        "Transferencia bancaria / T/T",
        "Transferencia Wise",
        "Pago de pedido de muestra",
        "Depósito antes de producción",
        "Saldo antes del envío",
      ],
    },
    closing: {
      eyebrow: "Prepara tu brief de piedras",
      title: "Cuéntanos color, corte, tamaño y cantidad.",
      copy:
        "Añade una piedra al formulario de consulta o envía tu diseño de referencia. Revisaremos disponibilidad, MOQ, calibración, calidad y opciones de producción.",
    },
  },
};

export function getGemstoneCatalogContent(locale: SupportedLocale = "en") {
  return gemstoneCatalogContent[locale];
}
