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

const englishDisclaimer =
  "Prices are reference wholesale ranges only. Final quotation depends on size, color, clarity, cut, certification, quantity and custom requirements.";

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
      disclaimer: englishDisclaimer,
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
      title: "أحجار كريمة مخبرية بالجملة حسب اللون | Xingyue Jewelry",
      description:
        "توريد الياقوت والصفير والزمرد والسبينل والمويسانيت والأحجار الملونة المخبرية بالجملة حسب اللون والمقاس والشكل، مع تصنيع OEM وODM.",
    },
    navLabel: "أحجار كريمة مخبرية",
    eyebrow: "توريد أحجار سائبة للشركات",
    title: "أحجار كريمة مخبرية بالجملة حسب اللون",
    subtitle:
      "كتالوج توريد جاهز للتسعير لعلامات المجوهرات وتجار الجملة وعملاء OEM / ODM.",
    heroNote:
      "تصفح مجموعات الألوان والمقاسات المعايرة والقصات المتنوعة. يتم تأكيد التوريد النهائي حسب المقاس والجودة والكمية ومتطلبات الإنتاج.",
    colors: {
      eyebrow: "التوريد حسب اللون",
      title: "ابدأ بلون يناسب سوقك ومجموعتك.",
      copy:
        "اختر عائلة اللون ثم أكد نوع الحجر والقصة والمقاس بالملليمتر ودرجة المطابقة وكمية الطلب.",
      view: "عرض الأحجار",
      representative: "أحجار مقترحة",
      names: {
        red: "أحمر",
        blue: "أزرق",
        green: "أخضر",
        pink: "وردي",
        purple: "بنفسجي",
        "yellow-champagne": "أصفر / شامبانيا",
        "white-colorless": "أبيض / عديم اللون",
      },
    },
    types: {
      eyebrow: "فئات الأحجار",
      title: "برامج توريد أحجار كريمة للإنتاج المتكرر.",
      copy:
        "اختر المادة المناسبة للعينات أو الدفعات المعايرة أو الأزواج المتطابقة أو تصنيع المجوهرات حسب الطلب.",
      colors: "الألوان المتاحة",
      moq: "الحد الأدنى للطلب",
      fromPrice: "السعر المرجعي",
    },
    catalog: {
      eyebrow: "بطاقات جاهزة للتسعير",
      title: "مواصفات شائعة لمناقشة طلب المشتري.",
      copy:
        "هذه أمثلة للتوريد وليست مخزون تجزئة ثابتاً. أرسل اسم الحجر مع المقاس والكمية والجودة المطلوبة.",
    },
    fields: {
      color: "اللون",
      shape: "الشكل",
      sizeRange: "نطاق المقاس",
      quality: "الجودة",
      moq: "الحد الأدنى",
      referencePrice: "السعر المرجعي",
      availability: "التوفر",
    },
    cta: {
      getWholesalePrice: "اطلب سعر الجملة",
      addInquiry: "أضف إلى الاستفسار",
      whatsapp: "تواصل عبر واتساب",
      email: "استفسار بالبريد",
      sendInquiry: "أرسل استفساراً",
      requestCatalog: "اطلب كتالوج الأحجار",
    },
    pricing: {
      eyebrow: "أسعار مرجعية",
      title: "نطاقات مرجعية لأسعار الجملة",
      copy:
        "استخدم هذه النطاقات للتخطيط الأولي للميزانية. يصدر عرض السعر بعد مراجعة المواصفات والتوفر.",
      disclaimer:
        "الأسعار نطاقات مرجعية للجملة فقط. يعتمد عرض السعر النهائي على المقاس واللون والنقاء والقصة والشهادة والكمية ومتطلبات التخصيص.",
    },
    capabilities: {
      eyebrow: "دعم الجملة والتخصيص",
      title: "من الأحجار السائبة إلى إنتاج المجوهرات النهائية.",
      copy:
        "تدعم Xingyue التفاصيل الفنية التي يحتاجها المشترون الدوليون قبل اعتماد العينات والإنتاج بالجملة.",
      items: [
        {
          title: "توريد معاير ومتطابق",
          copy: "ناقش المقاسات بالملليمتر ودرجة المطابقة والأزواج والدفعات وثبات الطلبات المتكررة.",
        },
        {
          title: "الحد الأدنى والطلبات الكبيرة",
          copy: "يتم تأكيد الحد الأدنى حسب المادة والمقاس والقصة واللون والمعايرة وحجم الإنتاج.",
        },
        {
          title: "قص وتوريد مخصص",
          copy: "أرسل CAD أو أبعاد الترصيع أو الصور المرجعية للحصول على توصية مناسبة.",
        },
        {
          title: "مجوهرات OEM / ODM",
          copy: "اجمع توريد الأحجار مع ذهب 14K / 18K أو فضة S925 والترصيع والفحص والتغليف.",
        },
        {
          title: "خيارات الشهادات",
          copy: "تتم مناقشة الشهادة حسب نوع الحجر والمقاس والدرجة والسوق والميزانية.",
        },
        {
          title: "شحن عالمي",
          copy: "يتم تأكيد العينات ومدة الإنتاج وتغليف التصدير والشحن قبل الطلب.",
        },
      ],
    },
    payment: {
      eyebrow: "دعم طلبات الشركات",
      title: "خيارات الدفع للطلبات المؤكدة",
      copy:
        "للطلبات المؤكدة بالجملة أو العينات، يمكن توفير فاتورة PayPal أو رابط دفع آمن بالبطاقة أو تحويل بنكي أو Wise. تتطلب الطلبات المخصصة الكبيرة عادةً دفعة مقدمة قبل الإنتاج والرصيد قبل الشحن.",
      options: [
        "فاتورة PayPal",
        "رابط دفع بالبطاقة",
        "تحويل بنكي / T/T",
        "تحويل Wise",
        "دفع طلب العينة",
        "دفعة مقدمة قبل الإنتاج",
        "الرصيد قبل الشحن",
      ],
    },
    closing: {
      eyebrow: "جهّز متطلبات الحجر",
      title: "أخبرنا باللون والقصة والمقاس والكمية المطلوبة.",
      copy:
        "أضف الحجر إلى نموذج الاستفسار أو أرسل تصميمك المرجعي لمراجعة التوفر والحد الأدنى والمعايرة والجودة وخيارات الإنتاج.",
    },
  },
  es: {
    seo: {
      title: "Gemas de laboratorio al por mayor por color | Xingyue Jewelry",
      description:
        "Rubí, zafiro, esmeralda, espinela, moissanita y gemas de laboratorio al por mayor por color, tamaño y forma, con fabricación OEM/ODM.",
    },
    navLabel: "Gemas de laboratorio",
    eyebrow: "Abastecimiento B2B de piedras sueltas",
    title: "Gemas de laboratorio al por mayor por color",
    subtitle:
      "Catálogo preparado para cotización dirigido a marcas, mayoristas y compradores OEM / ODM.",
    heroNote:
      "Explora familias de color, medidas calibradas, cortes mixtos y abastecimiento por proyecto. La oferta final se confirma según tamaño, calidad, cantidad y producción.",
    colors: {
      eyebrow: "Buscar por color",
      title: "Construye una dirección de producto para tu mercado.",
      copy:
        "Empieza por una familia de color y confirma piedra, corte, milímetros, tolerancia de selección y cantidad.",
      view: "Ver piedras",
      representative: "Piedras representativas",
      names: {
        red: "Rojo",
        blue: "Azul",
        green: "Verde",
        pink: "Rosa",
        purple: "Morado",
        "yellow-champagne": "Amarillo / Champán",
        "white-colorless": "Blanco / Incoloro",
      },
    },
    types: {
      eyebrow: "Categorías de gemas",
      title: "Programas mayoristas para producción recurrente.",
      copy:
        "Elige material para muestras, lotes calibrados, pares seleccionados o fabricación de joyería personalizada.",
      colors: "Colores disponibles",
      moq: "MOQ",
      fromPrice: "Precio de referencia",
    },
    catalog: {
      eyebrow: "Fichas listas para cotizar",
      title: "Especificaciones populares para conversar con compradores.",
      copy:
        "Son ejemplos de abastecimiento, no inventario minorista fijo. Envía el nombre con tamaño, cantidad y calidad objetivo.",
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
      addInquiry: "Añadir a la consulta",
      whatsapp: "Contactar por WhatsApp",
      email: "Consulta por email",
      sendInquiry: "Enviar consulta",
      requestCatalog: "Pedir catálogo de gemas",
    },
    pricing: {
      eyebrow: "Precios de referencia",
      title: "Guía de precios mayoristas de referencia",
      copy:
        "Usa estos rangos para planificar el presupuesto inicial. La cotización formal sigue a la revisión de especificaciones y disponibilidad.",
      disclaimer:
        "Los precios son rangos mayoristas de referencia. La cotización final depende de tamaño, color, claridad, corte, certificado, cantidad y personalización.",
    },
    capabilities: {
      eyebrow: "Soporte mayorista y personalizado",
      title: "De piedras sueltas a producción de joyería terminada.",
      copy:
        "Xingyue apoya los detalles técnicos que compradores internacionales necesitan antes de aprobar muestras y producción.",
      items: [
        {
          title: "Suministro calibrado y seleccionado",
          copy: "Confirma milímetros, tolerancia de selección, pares, lotes y consistencia de repetición.",
        },
        {
          title: "MOQ y planificación a granel",
          copy: "El MOQ depende de material, tamaño, corte, color, calibración y volumen.",
        },
        {
          title: "Corte y abastecimiento personalizado",
          copy: "Envía CAD, medidas de engaste o referencias para recomendar la piedra.",
        },
        {
          title: "Joyería OEM / ODM",
          copy: "Combina piedras con oro 14K / 18K, plata S925, engaste, QC y empaque.",
        },
        {
          title: "Opciones de certificado",
          copy: "El certificado se revisa según piedra, tamaño, grado, mercado y presupuesto.",
        },
        {
          title: "Envío internacional",
          copy: "Muestras, plazo, empaque de exportación y envío se confirman antes del pedido.",
        },
      ],
    },
    payment: {
      eyebrow: "Soporte de pedidos B2B",
      title: "Opciones de pago para pedidos confirmados",
      copy:
        "Para pedidos mayoristas o muestras confirmadas, podemos ofrecer factura PayPal, enlace seguro para tarjeta, transferencia bancaria o Wise. Los pedidos personalizados grandes suelen requerir depósito antes de producir y saldo antes del envío.",
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
      eyebrow: "Prepara tu solicitud",
      title: "Indica color, corte, tamaño y cantidad.",
      copy:
        "Añade una piedra al formulario o envía tu diseño para revisar disponibilidad, MOQ, calibración, calidad y producción.",
    },
  },
};

export function getGemstoneCatalogContent(locale: SupportedLocale) {
  return gemstoneCatalogContent[locale];
}
