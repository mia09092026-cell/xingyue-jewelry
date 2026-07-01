"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck } from "lucide-react";
import {
  contactInquiryFieldLabels,
  type ContactInquiry,
  type ContactInquiryField,
  type ContactInquiryFieldErrors,
} from "@/lib/contact-inquiry";
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
  ar: "خدمة الاستفسار قيد الإعداد. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
  es: "El servicio de consultas se está configurando. Por favor contáctanos por WhatsApp o correo electrónico.",
};

export function getLocalizedInquiryErrorMessage(
  locale: SupportedLocale,
  code: string | undefined,
  fallback = localizedDefaultsFallback(locale),
) {
  if (code === "CONFIG_MISSING") {
    return inquiryConfiguringMessages[locale];
  }

  return fallback;
}

type ResolvedContactFormCopy = Omit<ContactFormCopy, "fieldLabels" | "placeholders"> & {
  fieldLabels: Record<ContactInquiryField, string>;
  placeholders: Record<ContactInquiryField, string>;
};

const initialInquiry: ContactInquiry = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  productInterest: "",
  quantity: "",
  customRequirement: "",
  message: "",
};

const inputClassName =
  "mt-2 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]";

const textAreaClassName =
  "mt-2 min-h-36 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]";

const localizedDefaults: Record<SupportedLocale, ResolvedContactFormCopy> = {
  en: {
    introTitle: "Quote-ready inquiry form",
    introCopy:
      "Submit the core project details our team needs before sample discussion: company, email, WhatsApp, country, product interest, quantity and customization requirements.",
    fieldLabels: {
      ...contactInquiryFieldLabels,
    },
    placeholders: {
      name: "Your name",
      company: "Company or brand name",
      email: "name@example.com",
      phone: "Phone, WhatsApp or WeChat",
      country: "Country or region",
      productInterest: "Rings, tennis bracelets, OEM/ODM, loose stones...",
      quantity: "Sample, 100 pieces, 500 pieces...",
      customRequirement: "14K / 18K gold, private label, custom packaging, certificate needs...",
      message:
        "Reference style, stone size, metal, certificate, packaging, timeline and any quality requirements...",
    },
    submitting: "Submitting...",
    submit: "Submit Inquiry",
    email: "Email Your Inquiry",
    successTitle: "Inquiry submitted",
    successMessage: "Thank you. We have received your inquiry and will contact you within 24 hours.",
    errorFallback: "Submission failed. Please contact us by WhatsApp or email.",
    validationPrefix: "Please complete",
  },
  ar: {
    introTitle: "نموذج استفسار جاهز للتسعير",
    introCopy:
      "أرسل تفاصيل مشروعك الأساسية قبل مناقشة العينة: الشركة، البريد الإلكتروني، واتساب، الدولة، المنتج المطلوب، الكمية ومتطلبات التخصيص.",
    fieldLabels: {
      name: "الاسم",
      company: "اسم الشركة",
      email: "البريد الإلكتروني",
      phone: "واتساب / الهاتف",
      country: "الدولة",
      productInterest: "المنتج المطلوب",
      quantity: "الكمية",
      customRequirement: "متطلبات التخصيص",
      message: "الرسالة",
    },
    placeholders: {
      name: "اسمك",
      company: "اسم الشركة أو العلامة",
      email: "name@example.com",
      phone: "رقم واتساب أو الهاتف",
      country: "الدولة أو المنطقة",
      productInterest: "خواتم، أساور تنس، OEM/ODM، أحجار سائبة...",
      quantity: "عينة، 100 قطعة، 500 قطعة...",
      customRequirement: "ذهب 14K / 18K، علامة خاصة، تغليف مخصص، شهادات...",
      message: "النمط المرجعي، حجم الحجر، المعدن، الشهادة، التغليف والجدول الزمني...",
    },
    submitting: "جارٍ الإرسال...",
    submit: "إرسال الاستفسار",
    email: "أرسل عبر البريد",
    successTitle: "تم إرسال الاستفسار",
    successMessage: "شكراً لك. لقد استلمنا استفسارك وسنتواصل معك خلال 24 ساعة.",
    errorFallback: "فشل الإرسال. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.",
    validationPrefix: "يرجى إكمال",
  },
  es: {
    introTitle: "Formulario listo para cotización",
    introCopy:
      "Envía los datos principales antes de discutir muestras: empresa, email, WhatsApp, país, producto, cantidad y requisitos de personalización.",
    fieldLabels: {
      name: "Nombre",
      company: "Empresa",
      email: "Correo electrónico",
      phone: "WhatsApp / Teléfono",
      country: "País",
      productInterest: "Producto de interés",
      quantity: "Cantidad",
      customRequirement: "Requisitos de personalización",
      message: "Mensaje",
    },
    placeholders: {
      name: "Tu nombre",
      company: "Nombre de empresa o marca",
      email: "name@example.com",
      phone: "Teléfono, WhatsApp o WeChat",
      country: "País o región",
      productInterest: "Anillos, pulseras tenis, OEM/ODM, piedras sueltas...",
      quantity: "Muestra, 100 piezas, 500 piezas...",
      customRequirement: "Oro 14K / 18K, marca privada, empaque, certificados...",
      message: "Estilo de referencia, piedra, metal, certificado, empaque y plazo...",
    },
    submitting: "Enviando...",
    submit: "Enviar consulta",
    email: "Enviar por email",
    successTitle: "Consulta enviada",
    successMessage: "Gracias. Hemos recibido tu consulta y nos pondremos en contacto contigo dentro de 24 horas.",
    errorFallback: "No se pudo enviar. Por favor contáctanos por WhatsApp o correo electrónico.",
    validationPrefix: "Por favor completa",
  },
};

function localizedDefaultsFallback(locale: SupportedLocale) {
  return localizedDefaults[locale].errorFallback;
}

function resolveContent(content: ContactFormCopy | undefined, locale: SupportedLocale): ResolvedContactFormCopy {
  const defaults = localizedDefaults[locale];

  return {
    ...defaults,
    introTitle: content?.introTitle ?? defaults.introTitle,
    introCopy: content?.introCopy ?? defaults.introCopy,
    fieldLabels: defaults.fieldLabels,
    placeholders: defaults.placeholders,
    submitting: defaults.submitting,
    submit: defaults.submit,
    email: defaults.email,
    successTitle: defaults.successTitle,
    successMessage: defaults.successMessage,
    errorFallback: defaults.errorFallback,
    validationPrefix: defaults.validationPrefix,
  };
}

function FieldLabel({
  field,
  labels,
}: {
  field: ContactInquiryField;
  labels: ResolvedContactFormCopy["fieldLabels"];
}) {
  return <span className="text-sm font-medium text-[#344150]">{labels[field]}</span>;
}

function getBrowserSubmissionMetadata(locale: SupportedLocale, sourcePath: string | undefined) {
  if (typeof window === "undefined") {
    return {
      locale,
      sourcePage: sourcePath ?? "",
      currentUrl: "",
      browserInfo: "",
    };
  }

  const currentUrl = window.location.href;
  const searchParams = new URL(currentUrl).searchParams;

  return {
    locale,
    sourcePage: searchParams.get("source") ?? sourcePath ?? window.location.pathname,
    currentUrl,
    browserInfo: window.navigator.userAgent,
  };
}

export function ContactInquiryForm({
  content,
  emailHref,
  locale = "en",
  sourcePath,
}: ContactInquiryFormProps) {
  const effectiveContent = useMemo(() => resolveContent(content, locale), [content, locale]);
  const [formData, setFormData] = useState<ContactInquiry>(() => {
    if (typeof window === "undefined") {
      return initialInquiry;
    }

    const interest = new URL(window.location.href).searchParams.get("interest");

    return interest ? { ...initialInquiry, productInterest: interest } : initialInquiry;
  });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactInquiryFieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const emailWithSubject = useMemo(() => {
    if (emailHref.includes("?subject=")) {
      return emailHref;
    }

    const querySeparator = emailHref.includes("?") ? "&" : "?";
    const subject = encodeURIComponent("XINGYUE Wholesale Jewelry Inquiry");
    const body = encodeURIComponent(
      [
        `${effectiveContent.fieldLabels.name}: ${formData.name}`,
        `${effectiveContent.fieldLabels.company}: ${formData.company}`,
        `${effectiveContent.fieldLabels.email}: ${formData.email}`,
        `${effectiveContent.fieldLabels.phone}: ${formData.phone}`,
        `${effectiveContent.fieldLabels.country}: ${formData.country}`,
        `${effectiveContent.fieldLabels.productInterest}: ${formData.productInterest}`,
        `${effectiveContent.fieldLabels.quantity}: ${formData.quantity}`,
        `${effectiveContent.fieldLabels.customRequirement}: ${formData.customRequirement}`,
        "",
        `${effectiveContent.fieldLabels.message}:`,
        formData.message,
      ].join("\n"),
    );

    return `${emailHref}${querySeparator}subject=${subject}&body=${body}`;
  }, [effectiveContent.fieldLabels, emailHref, formData]);

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
          website: honeypot,
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
          message: getLocalizedInquiryErrorMessage(locale, payload.code, effectiveContent.errorFallback),
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: effectiveContent.successMessage,
        reference: payload.reference,
      });
    } catch {
      setSubmitState({
        status: "error",
        message: effectiveContent.errorFallback,
      });
    }
  }

  const displayedFieldErrors = Object.keys(fieldErrors).map((field) => {
    const contactField = field as ContactInquiryField;
    return effectiveContent.fieldLabels[contactField] ?? fieldErrors[contactField];
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 rounded-md border border-[#eadfca] bg-[#fbfaf7] p-4 text-sm leading-6 text-[#596575]">
        <div className="mb-2 flex items-center gap-2 font-semibold text-[#17202a]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#a98945]" />
          {effectiveContent.introTitle}
        </div>
        {effectiveContent.introCopy}
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input
            autoComplete="off"
            name="website"
            tabIndex={-1}
            type="text"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <FieldLabel field="name" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="name"
            placeholder={effectiveContent.placeholders.name}
            type="text"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="company" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="company"
            placeholder={effectiveContent.placeholders.company}
            type="text"
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="email" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="email"
            placeholder={effectiveContent.placeholders.email}
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="phone" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="phone"
            placeholder={effectiveContent.placeholders.phone}
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="country" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="country"
            placeholder={effectiveContent.placeholders.country}
            type="text"
            value={formData.country}
            onChange={(event) => updateField("country", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="productInterest" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="productInterest"
            placeholder={effectiveContent.placeholders.productInterest}
            type="text"
            value={formData.productInterest}
            onChange={(event) => updateField("productInterest", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="quantity" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="quantity"
            placeholder={effectiveContent.placeholders.quantity}
            type="text"
            value={formData.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="customRequirement" labels={effectiveContent.fieldLabels} />
          <input
            className={inputClassName}
            name="customRequirement"
            placeholder={effectiveContent.placeholders.customRequirement}
            type="text"
            value={formData.customRequirement}
            onChange={(event) => updateField("customRequirement", event.target.value)}
            required
          />
        </label>
      </div>

      <label className="mt-5 block">
        <FieldLabel field="message" labels={effectiveContent.fieldLabels} />
        <textarea
          className={textAreaClassName}
          name="message"
          placeholder={effectiveContent.placeholders.message}
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
        />
      </label>

      {Object.keys(fieldErrors).length > 0 ? (
        <div className="mt-5 rounded-md border border-[#e8c6ba] bg-[#fff7f3] p-4 text-sm text-[#8a3f2c]">
          {effectiveContent.validationPrefix}: {displayedFieldErrors.join(", ")}.
        </div>
      ) : null}

      <div aria-live="polite" className="mt-5">
        {submitState.status === "success" ? (
          <div className="rounded-md border border-[#c8dfc6] bg-[#f5fbf4] p-4 text-sm leading-6 text-[#28552d]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              {effectiveContent.successTitle}
            </div>
            <p className="mt-1">{submitState.message}</p>
            {submitState.reference ? (
              <p className="mt-1">Reference: {submitState.reference}</p>
            ) : null}
          </div>
        ) : null}
        {submitState.status === "error" ? (
          <div className="rounded-md border border-[#e8c6ba] bg-[#fff7f3] p-4 text-sm text-[#8a3f2c]">
            {submitState.message}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542] disabled:cursor-not-allowed disabled:bg-[#596575]"
        >
          {submitState.status === "submitting" ? effectiveContent.submitting : effectiveContent.submit}
          <Send aria-hidden="true" className="h-4 w-4" />
        </button>
        <a
          href={emailWithSubject}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8c28a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f4efe3]"
        >
          {effectiveContent.email}
          <Mail aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </form>
  );
}
