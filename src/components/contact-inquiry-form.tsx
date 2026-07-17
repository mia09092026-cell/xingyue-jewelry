"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck } from "lucide-react";
import {
  contactInquiryFieldLabels,
  type ContactInquiry,
  type ContactInquiryField,
  type ContactInquiryFieldErrors,
  type ContactInquiryLegacyField,
} from "@/lib/contact-inquiry";
import { productInterestLabel } from "@/lib/contact-links";
import type { ContactFormCopy } from "@/content/i18n";
import type { SupportedLocale } from "@/lib/i18n";

type ContactInquiryFormProps = {
  content?: ContactFormCopy;
  emailHref: string;
  locale?: SupportedLocale;
  sourcePath?: string;
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  reference?: string;
};

const inquiryConfiguringMessages: Record<SupportedLocale, string> = {
  en: "Inquiry service is being configured. Please contact us by WhatsApp or email.",
  es: "El servicio de consultas se está configurando. Contáctanos por WhatsApp o correo electrónico.",
  ar: "يتم إعداد خدمة الاستفسارات. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
};

const defaultErrorMessages: Record<SupportedLocale, Record<string, string>> = {
  en: {
    required: "This field is required.",
    invalid_email: "Please enter a valid email address.",
    invalid_reference_url: "Use an http:// or https:// reference link.",
    too_long: "Please shorten this field.",
    consent_required: "Please confirm that we may use these details to respond.",
    service_unavailable: "Inquiry service is temporarily unavailable. Please contact us by WhatsApp or email.",
    duplicate_submission: "This inquiry appears to have already been submitted.",
    network_error: "We could not connect. Please try again or contact us by WhatsApp or email.",
  },
  es: {
    required: "Este campo es obligatorio.",
    invalid_email: "Introduce un correo electrónico válido.",
    invalid_reference_url: "Usa un enlace de referencia http:// o https://.",
    too_long: "Acorta este campo, por favor.",
    consent_required: "Confirma que podemos usar estos datos para responderte.",
    service_unavailable: "El servicio no está disponible temporalmente. Contáctanos por WhatsApp o correo electrónico.",
    duplicate_submission: "Parece que esta consulta ya fue enviada.",
    network_error: "No pudimos conectar. Inténtalo de nuevo o contáctanos por WhatsApp o correo electrónico.",
  },
  ar: {
    required: "هذا الحقل مطلوب.",
    invalid_email: "يرجى إدخال بريد إلكتروني صحيح.",
    invalid_reference_url: "استخدم رابط مرجعيًا يبدأ بـ http:// أو https://.",
    too_long: "يرجى اختصار هذا الحقل.",
    consent_required: "يرجى تأكيد السماح لنا باستخدام هذه البيانات للرد عليك.",
    service_unavailable: "الخدمة غير متاحة مؤقتًا. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
    duplicate_submission: "يبدو أن هذا الاستفسار أُرسل من قبل.",
    network_error: "تعذر الاتصال. حاول مرة أخرى أو تواصل معنا عبر واتساب أو البريد الإلكتروني.",
  },
};

type ResolvedContactFormCopy = Omit<
  ContactFormCopy,
  "fieldLabels" | "placeholders" | "errorMessages" | "consentLabel" | "consentRequired" | "quantityHelper" | "referenceHelper" | "privacyNotice"
> & {
  fieldLabels: Record<ContactInquiryField, string>;
  placeholders: Record<ContactInquiryField, string>;
  errorMessages: Record<string, string>;
  consentLabel: string;
  consentRequired: string;
  quantityHelper: string;
  referenceHelper: string;
  privacyNotice: string;
};

const initialInquiry: ContactInquiry = {
  name: "",
  email: "",
  companyOrBrand: "",
  whatsapp: "",
  businessType: "",
  productInterest: "",
  targetQuantity: "",
  destinationCountry: "",
  targetMarket: "",
  referenceUrl: "",
  material: "",
  stone: "",
  packagingRequirements: "",
  expectedTiming: "",
  message: "",
};

const inputClassName =
  "mt-2 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]";
const textAreaClassName =
  "mt-2 min-h-36 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]";

const localizedDefaults: Record<SupportedLocale, ResolvedContactFormCopy> = {
  en: {
    introTitle: "Share your project details",
    introCopy: "Tell us what you are planning so we can review product direction, materials, sampling and packaging with you.",
    fieldLabels: {
      name: "Name",
      email: "Email",
      companyOrBrand: "Company",
      whatsapp: "WhatsApp / Phone",
      businessType: "Business Type",
      productInterest: "Product Interest",
      targetQuantity: "Target Quantity or Range",
      destinationCountry: "Country",
      targetMarket: "Target Market",
      referenceUrl: "Reference Image / Design",
      material: "Material",
      stone: "Stone",
      packagingRequirements: "Custom Requirement",
      expectedTiming: "Expected Timing",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "name@example.com",
      companyOrBrand: "Company or brand name",
      whatsapp: "Phone or WhatsApp number",
      businessType: "Emerging brand, boutique store, designer...",
      productInterest: "Rings, tennis jewelry, loose stones...",
      targetQuantity: "Your estimated quantity or range",
      destinationCountry: "Country where the order will be delivered",
      targetMarket: "Your customer market or sales region",
      referenceUrl: "Link to an image, moodboard or design brief",
      material: "Gold, silver or another material",
      stone: "Stone type or preference",
      packagingRequirements: "Private label, packaging or presentation needs",
      expectedTiming: "Your target launch or planning timing",
      message: "Share the design direction, questions or other requirements...",
    },
    submitting: "Submitting...",
    submit: "Submit Inquiry",
    email: "Email Your Inquiry",
    successTitle: "Inquiry submitted",
    successMessage: "Your inquiry has been received. We'll review the project details and respond as soon as possible.",
    referenceLabel: "Reference",
    errorFallback: "Submission failed. Please contact us by WhatsApp or email.",
    validationPrefix: "Please review",
    errorMessages: defaultErrorMessages.en,
    consentLabel: "I agree that Xingyue may use these details to respond to my inquiry.",
    consentRequired: "Consent is required before sending.",
    quantityHelper: "Availability and MOQ depend on the product, material, process and project scope.",
    referenceHelper: "A public link is optional. You can also describe the reference in your message.",
    privacyNotice: "We use these details only to review your project and respond. Please do not include payment details or other sensitive personal information.",
  },
  es: {
    introTitle: "Comparte los detalles de tu proyecto",
    introCopy: "Cuéntanos qué estás planificando para revisar contigo la dirección del producto, los materiales, las muestras y el empaque.",
    fieldLabels: {
      name: "Nombre",
      email: "Correo electrónico",
      companyOrBrand: "Empresa / Marca",
      whatsapp: "WhatsApp",
      businessType: "Tipo de negocio",
      productInterest: "Producto de interés",
      targetQuantity: "Cantidad prevista o rango",
      destinationCountry: "País de destino",
      targetMarket: "Mercado objetivo",
      referenceUrl: "Imagen / Diseño de referencia",
      material: "Material",
      stone: "Piedra",
      packagingRequirements: "Requisitos de empaque",
      expectedTiming: "Tiempo esperado",
      message: "Mensaje",
    },
    placeholders: {
      name: "Tu nombre",
      email: "nombre@ejemplo.com",
      companyOrBrand: "Nombre de tu empresa o marca",
      whatsapp: "Teléfono o número de WhatsApp",
      businessType: "Marca emergente, boutique, diseñador...",
      productInterest: "Anillos, joyería tennis, piedras sueltas...",
      targetQuantity: "Tu cantidad o rango estimado",
      destinationCountry: "País donde se entregará el pedido",
      targetMarket: "Mercado de clientes o región de venta",
      referenceUrl: "Enlace a imagen, moodboard o brief",
      material: "Oro, plata u otro material",
      stone: "Tipo o preferencia de piedra",
      packagingRequirements: "Marca privada, empaque o presentación",
      expectedTiming: "Tu fecha objetivo de lanzamiento o planificación",
      message: "Comparte la dirección del diseño, preguntas u otros requisitos...",
    },
    submitting: "Enviando...",
    submit: "Enviar consulta",
    email: "Enviar por email",
    successTitle: "Consulta enviada",
    successMessage: "Hemos recibido tu consulta. Revisaremos los detalles del proyecto y responderemos lo antes posible.",
    referenceLabel: "Referencia",
    errorFallback: "No se pudo enviar. Contáctanos por WhatsApp o correo electrónico.",
    validationPrefix: "Revisa estos campos",
    errorMessages: defaultErrorMessages.es,
    consentLabel: "Acepto que Xingyue use estos datos para responder a mi consulta.",
    consentRequired: "Debes aceptar antes de enviar.",
    quantityHelper: "La disponibilidad y el MOQ dependen del producto, material, proceso y alcance del proyecto.",
    referenceHelper: "El enlace público es opcional. También puedes describir la referencia en el mensaje.",
    privacyNotice: "Usamos estos datos solo para revisar tu proyecto y responder. No incluyas datos de pago ni otra información personal sensible.",
  },
  ar: {
    introTitle: "شارك تفاصيل مشروعك",
    introCopy: "أخبرنا بما تخطط له لنراجع معك اتجاه المنتج والمواد والعينات والتغليف.",
    fieldLabels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      companyOrBrand: "الشركة / العلامة التجارية",
      whatsapp: "واتساب",
      businessType: "نوع النشاط",
      productInterest: "المنتج المطلوب",
      targetQuantity: "الكمية المستهدفة أو نطاقها",
      destinationCountry: "بلد الوجهة",
      targetMarket: "السوق المستهدف",
      referenceUrl: "صورة / تصميم مرجعي",
      material: "المادة",
      stone: "الحجر",
      packagingRequirements: "متطلبات التغليف",
      expectedTiming: "التوقيت المتوقع",
      message: "الرسالة",
    },
    placeholders: {
      name: "اسمك",
      email: "name@example.com",
      companyOrBrand: "اسم الشركة أو العلامة التجارية",
      whatsapp: "رقم الهاتف أو واتساب",
      businessType: "علامة ناشئة، متجر، مصمم...",
      productInterest: "خواتم، مجوهرات تنس، أحجار مفردة...",
      targetQuantity: "الكمية أو النطاق التقريبي",
      destinationCountry: "البلد الذي سيُسلّم إليه الطلب",
      targetMarket: "سوق العملاء أو منطقة البيع",
      referenceUrl: "رابط لصورة أو لوحة إلهام أو موجز تصميم",
      material: "ذهب أو فضة أو مادة أخرى",
      stone: "نوع الحجر أو تفضيلك",
      packagingRequirements: "علامة خاصة أو متطلبات التغليف والعرض",
      expectedTiming: "موعد الإطلاق أو التخطيط المستهدف",
      message: "شارك اتجاه التصميم أو الأسئلة أو المتطلبات الأخرى...",
    },
    submitting: "جارٍ الإرسال...",
    submit: "إرسال الاستفسار",
    email: "إرسال عبر البريد",
    successTitle: "تم إرسال الاستفسار",
    successMessage: "تم استلام استفسارك. سنراجع تفاصيل المشروع ونرد في أقرب وقت ممكن.",
    referenceLabel: "المرجع",
    errorFallback: "تعذر الإرسال. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
    validationPrefix: "يرجى مراجعة الحقول",
    errorMessages: defaultErrorMessages.ar,
    consentLabel: "أوافق على استخدام Xingyue لهذه البيانات للرد على استفساري.",
    consentRequired: "الموافقة مطلوبة قبل الإرسال.",
    quantityHelper: "يعتمد التوفر والحد الأدنى على المنتج والمادة وطريقة التنفيذ ونطاق المشروع.",
    referenceHelper: "الرابط العام اختياري. يمكنك أيضًا وصف المرجع في الرسالة.",
    privacyNotice: "نستخدم هذه البيانات فقط لمراجعة مشروعك والرد. يرجى عدم إدخال بيانات الدفع أو معلومات شخصية حساسة أخرى.",
  },
};

const legacyAliases: Record<ContactInquiryField, ContactInquiryLegacyField | undefined> = {
  name: undefined,
  email: undefined,
  companyOrBrand: "company",
  whatsapp: "phone",
  businessType: undefined,
  productInterest: undefined,
  targetQuantity: "quantity",
  destinationCountry: "country",
  targetMarket: undefined,
  referenceUrl: undefined,
  material: undefined,
  stone: undefined,
  packagingRequirements: "customRequirement",
  expectedTiming: undefined,
  message: undefined,
};

function localizedDefaultsFallback(locale: SupportedLocale) {
  return localizedDefaults[locale].errorFallback;
}

export function getLocalizedInquiryErrorMessage(
  locale: SupportedLocale,
  code: string | undefined,
  fallback = localizedDefaultsFallback(locale),
) {
  if (code === "CONFIG_MISSING" || code === "SERVICE_UNAVAILABLE") {
    return inquiryConfiguringMessages[locale];
  }

  return fallback;
}

function resolveContent(content: ContactFormCopy | undefined, locale: SupportedLocale): ResolvedContactFormCopy {
  const defaults = localizedDefaults[locale];
  const fieldLabels = { ...defaults.fieldLabels };
  const placeholders = { ...defaults.placeholders };

  for (const field of Object.keys(legacyAliases) as ContactInquiryField[]) {
    const legacy = legacyAliases[field];
    if (legacy && content?.fieldLabels?.[legacy]) fieldLabels[field] = content.fieldLabels[legacy]!;
    if (legacy && content?.placeholders?.[legacy]) placeholders[field] = content.placeholders[legacy]!;
  }
  Object.assign(fieldLabels, content?.fieldLabels);
  Object.assign(placeholders, content?.placeholders);

  if (/\b(?:100|500)\b/.test(placeholders.targetQuantity)) {
    placeholders.targetQuantity = defaults.placeholders.targetQuantity;
  }

  const successMessage = content?.successMessage && !/\b24\b/.test(content.successMessage)
    ? content.successMessage
    : defaults.successMessage;

  return {
    ...defaults,
    introTitle: content?.introTitle ?? defaults.introTitle,
    introCopy: content?.introCopy ?? defaults.introCopy,
    fieldLabels,
    placeholders,
    submitting: content?.submitting ?? defaults.submitting,
    submit: content?.submit ?? defaults.submit,
    email: content?.email ?? defaults.email,
    successTitle: content?.successTitle ?? defaults.successTitle,
    successMessage,
    referenceLabel: content?.referenceLabel ?? defaults.referenceLabel,
    errorFallback: content?.errorFallback ?? defaults.errorFallback,
    validationPrefix: content?.validationPrefix ?? defaults.validationPrefix,
    errorMessages: { ...defaults.errorMessages, ...content?.errorMessages },
    consentLabel: content?.consentLabel ?? defaults.consentLabel,
    consentRequired: content?.consentRequired ?? defaults.consentRequired,
    quantityHelper: content?.quantityHelper ?? defaults.quantityHelper,
    referenceHelper: content?.referenceHelper ?? defaults.referenceHelper,
    privacyNotice: content?.privacyNotice ?? defaults.privacyNotice,
  };
}

const emailLabels: Record<SupportedLocale, Record<ContactInquiryField, string>> = {
  en: localizedDefaults.en.fieldLabels,
  es: localizedDefaults.es.fieldLabels,
  ar: localizedDefaults.ar.fieldLabels,
};

export function buildInquiryEmailHref({
  emailHref,
  locale,
  inquiry,
}: {
  emailHref: string;
  locale: SupportedLocale;
  inquiry: ContactInquiry;
}) {
  const subjects: Record<SupportedLocale, string> = {
    en: "Jewelry Project Inquiry",
    es: "Consulta de proyecto de joyería",
    ar: "استفسار عن مشروع مجوهرات",
  };
  const labelSet = emailLabels[locale];
  const lines = (Object.keys(labelSet) as ContactInquiryField[])
    .filter((field) => inquiry[field])
    .map((field) => `${labelSet[field]}: ${inquiry[field]}`);
  const suffix = inquiry.companyOrBrand || inquiry.name;
  if (lines.length === 0) return emailHref;
  const existingSubject = new URLSearchParams(emailHref.split("?")[1] ?? "").get("subject");
  const subject = suffix ? `${subjects[locale]} - ${suffix}` : existingSubject ?? subjects[locale];
  const base = emailHref.split("?")[0];
  return `${base}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function getBrowserSubmissionMetadata(locale: SupportedLocale, sourcePath: string | undefined) {
  if (typeof window === "undefined") return { locale, source: sourcePath ?? "" };
  const url = new URL(window.location.href);
  return {
    locale,
    source: url.searchParams.get("source") ?? sourcePath ?? window.location.pathname,
  };
}

const formFields: Array<{ field: ContactInquiryField; required?: boolean; dir?: "ltr" }> = [
  { field: "name", required: true },
  { field: "email", required: true, dir: "ltr" },
  { field: "companyOrBrand" },
  { field: "whatsapp", dir: "ltr" },
  { field: "businessType", required: true },
  { field: "productInterest", required: true },
  { field: "targetQuantity", required: true, dir: "ltr" },
  { field: "destinationCountry", required: true },
  { field: "targetMarket" },
  { field: "referenceUrl", dir: "ltr" },
  { field: "material" },
  { field: "stone" },
  { field: "packagingRequirements" },
  { field: "expectedTiming" },
];

export function ContactInquiryForm({ content, emailHref, locale = "en", sourcePath }: ContactInquiryFormProps) {
  const effectiveContent = useMemo(() => resolveContent(content, locale), [content, locale]);
  const [formData, setFormData] = useState<ContactInquiry>(() => {
    if (typeof window === "undefined") return initialInquiry;
    const code = new URL(window.location.href).searchParams.get("interest") ?? "";
    const localizedInterest = productInterestLabel(locale, code);
    return localizedInterest ? { ...initialInquiry, productInterest: localizedInterest } : initialInquiry;
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactInquiryFieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const emailHrefWithBody = useMemo(
    () => buildInquiryEmailHref({ emailHref, locale, inquiry: formData }),
    [emailHref, formData, locale],
  );

  const updateField = (field: ContactInquiryField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting", message: effectiveContent.submitting });
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...getBrowserSubmissionMetadata(locale, sourcePath),
          consent,
          honeypot,
        }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        code?: string;
        reference?: string;
        fieldErrors?: ContactInquiryFieldErrors;
      };

      if (!response.ok || !payload.ok) {
        setFieldErrors(payload.fieldErrors ?? {});
        setSubmitState({
          status: "error",
          message:
            effectiveContent.errorMessages[payload.code ?? ""] ??
            getLocalizedInquiryErrorMessage(locale, payload.code, effectiveContent.errorFallback),
        });
        window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
        return;
      }

      setSubmitState({ status: "success", message: effectiveContent.successMessage, reference: payload.reference });
    } catch {
      setSubmitState({ status: "error", message: effectiveContent.errorMessages.network_error });
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  }

  const errorMessage = (field: ContactInquiryField | "consent") => {
    const code = fieldErrors[field];
    if (!code) return "";
    if (field === "consent" && (code === "required" || code === "consent_required")) return effectiveContent.consentRequired;
    return effectiveContent.errorMessages[code] ?? effectiveContent.errorFallback;
  };
  const errorFields = Object.keys(fieldErrors) as Array<ContactInquiryField | "consent">;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm md:p-8">
      <div className="mb-6 rounded-md border border-[#eadfca] bg-[#fbfaf7] p-4 text-sm leading-6 text-[#596575]">
        <div className="mb-2 flex items-center gap-2 font-semibold text-[#17202a]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#a98945]" />
          {effectiveContent.introTitle}
        </div>
        {effectiveContent.introCopy}
        <p className="mt-2 text-xs">{effectiveContent.privacyNotice}</p>
      </div>

      <div aria-hidden="true" className="sr-only">
        <label>
          Website
          <input autoComplete="off" name="website" tabIndex={-1} type="text" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {formFields.map(({ field, required, dir }) => {
          const id = `inquiry-${field}`;
          const errorId = `field-error-${field}`;
          const hasError = Boolean(fieldErrors[field]);
          const helper = field === "targetQuantity" ? effectiveContent.quantityHelper : field === "referenceUrl" ? effectiveContent.referenceHelper : "";
          return (
            <label className="block" htmlFor={id} key={field}>
              <span className="text-sm font-medium text-[#344150]">{effectiveContent.fieldLabels[field]}{required ? " *" : ""}</span>
              <input
                aria-describedby={`${helper ? `${id}-help ` : ""}${hasError ? errorId : ""}`.trim() || undefined}
                aria-invalid={hasError || undefined}
                aria-label={effectiveContent.fieldLabels[field]}
                autoComplete={field === "name" ? "name" : field === "email" ? "email" : field === "companyOrBrand" ? "organization" : undefined}
                className={`${inputClassName} ${dir === "ltr" ? "text-left" : ""}`}
                dir={dir}
                id={id}
                name={field}
                placeholder={effectiveContent.placeholders[field]}
                required={required}
                type={field === "email" ? "email" : field === "referenceUrl" ? "url" : field === "whatsapp" ? "tel" : "text"}
                value={formData[field]}
                onChange={(event) => updateField(field, event.target.value)}
              />
              {helper ? <span className="mt-1 block text-xs text-[#596575]" id={`${id}-help`}>{helper}</span> : null}
              {hasError ? <span className="mt-1 block text-xs text-[#8a3f2c]" id={errorId} role="alert">{errorMessage(field)}</span> : null}
            </label>
          );
        })}
      </div>

      <label className="mt-5 block" htmlFor="inquiry-message">
        <span className="text-sm font-medium text-[#344150]">{effectiveContent.fieldLabels.message} *</span>
        <textarea
          aria-label={effectiveContent.fieldLabels.message}
          aria-describedby={fieldErrors.message ? "field-error-message" : undefined}
          aria-invalid={fieldErrors.message ? true : undefined}
          className={textAreaClassName}
          id="inquiry-message"
          name="message"
          placeholder={effectiveContent.placeholders.message}
          required
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {fieldErrors.message ? <span className="mt-1 block text-xs text-[#8a3f2c]" id="field-error-message" role="alert">{errorMessage("message")}</span> : null}
      </label>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#344150]" htmlFor="inquiry-consent">
        <input
          aria-describedby={fieldErrors.consent ? "field-error-consent" : undefined}
          aria-invalid={fieldErrors.consent ? true : undefined}
          className="mt-1 h-4 w-4 rounded border-[#d8cfbc] text-[#17202a]"
          id="inquiry-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setFieldErrors((current) => {
              const next = { ...current };
              delete next.consent;
              return next;
            });
          }}
          required
        />
        <span>{effectiveContent.consentLabel} *</span>
      </label>
      {fieldErrors.consent ? <p className="mt-1 text-xs text-[#8a3f2c]" id="field-error-consent" role="alert">{errorMessage("consent")}</p> : null}

      {errorFields.length > 0 ? (
        <div ref={errorSummaryRef} aria-live="assertive" aria-atomic="true" className="mt-5 rounded-md border border-[#e8c6ba] bg-[#fff7f3] p-4 text-sm text-[#8a3f2c]" role="alert" tabIndex={-1}>
          {effectiveContent.validationPrefix}: {errorFields.map((field) => effectiveContent.fieldLabels[field as ContactInquiryField] ?? effectiveContent.consentLabel).join(", ")}.
        </div>
      ) : null}

      <div aria-live="polite" className="mt-5">
        {submitState.status === "success" ? (
          <div className="rounded-md border border-[#c8dfc6] bg-[#f5fbf4] p-4 text-sm leading-6 text-[#28552d]" role="status">
            <div className="flex items-center gap-2 font-semibold"><CheckCircle2 aria-hidden="true" className="h-4 w-4" />{effectiveContent.successTitle}</div>
            <p className="mt-1">{submitState.message}</p>
            {submitState.reference ? <p className="mt-1">{effectiveContent.referenceLabel}: <bdi dir="ltr">{submitState.reference}</bdi></p> : null}
          </div>
        ) : null}
        {submitState.status === "error" ? <div className="rounded-md border border-[#e8c6ba] bg-[#fff7f3] p-4 text-sm text-[#8a3f2c]" role="alert">{submitState.message}</div> : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitState.status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542] disabled:cursor-not-allowed disabled:bg-[#596575]">
          {submitState.status === "submitting" ? effectiveContent.submitting : effectiveContent.submit}<Send aria-hidden="true" className="h-4 w-4" />
        </button>
        <a href={emailHrefWithBody} className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8c28a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f4efe3]">
          {effectiveContent.email}<Mail aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </form>
  );
}
