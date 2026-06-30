"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck } from "lucide-react";
import {
  contactBudgetRanges,
  contactInquiryFieldLabels,
  contactProjectTypes,
  type ContactInquiry,
  type ContactInquiryField,
  type ContactInquiryFieldErrors,
} from "@/lib/contact-inquiry";
import type { ContactFormCopy } from "@/content/i18n";

type ContactInquiryFormProps = {
  content?: ContactFormCopy;
  emailHref: string;
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  reference?: string;
};

const initialInquiry: ContactInquiry = {
  contactName: "",
  phone: "",
  companyBrand: "",
  projectType: "",
  estimatedQuantity: "",
  deliveryCity: "",
  budgetRange: "",
  requirements: "",
};

const inputClassName =
  "mt-2 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]";

const defaultContactFormCopy: ContactFormCopy = {
  introTitle: "Quote-ready inquiry form",
  introCopy:
    "Submit the core project details our team needs before sample discussion: contact, quantity, delivery city, budget and production requirements.",
  fieldLabels: {
    contactName: contactInquiryFieldLabels.contactName,
    phone: contactInquiryFieldLabels.phone,
    companyBrand: contactInquiryFieldLabels.companyBrand,
    projectType: contactInquiryFieldLabels.projectType,
    estimatedQuantity: contactInquiryFieldLabels.estimatedQuantity,
    deliveryCity: contactInquiryFieldLabels.deliveryCity,
    budgetRange: contactInquiryFieldLabels.budgetRange,
    requirements: contactInquiryFieldLabels.requirements,
  },
  placeholders: {
    contactName: "Your name",
    phone: "Phone, WhatsApp or WeChat",
    companyBrand: "Company or brand name",
    projectType: "Select project type",
    estimatedQuantity: "Sample, 100 pieces, 500 pieces...",
    deliveryCity: "City and country",
    budgetRange: "Select budget range",
    requirements:
      "Reference style, stone size, metal, certificate, packaging, timeline and any quality requirements...",
  },
  projectTypes: [...contactProjectTypes],
  budgetRanges: [...contactBudgetRanges],
  submitting: "Submitting...",
  submit: "Submit Inquiry",
  email: "Email Your Inquiry",
  successTitle: "Inquiry submitted",
  successMessage: "Inquiry submitted.",
  errorFallback: "The inquiry could not be submitted. Please email us directly.",
  validationPrefix: "Please complete",
};

function FieldLabel({
  field,
  labels,
}: {
  field: ContactInquiryField;
  labels: ContactFormCopy["fieldLabels"];
}) {
  return <span className="text-sm font-medium text-[#344150]">{labels[field]}</span>;
}

export function ContactInquiryForm({ content = defaultContactFormCopy, emailHref }: ContactInquiryFormProps) {
  const [formData, setFormData] = useState<ContactInquiry>(initialInquiry);
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
        `${content.fieldLabels.contactName}: ${formData.contactName}`,
        `${content.fieldLabels.phone}: ${formData.phone}`,
        `${content.fieldLabels.companyBrand}: ${formData.companyBrand}`,
        `${content.fieldLabels.projectType}: ${formData.projectType}`,
        `${content.fieldLabels.estimatedQuantity}: ${formData.estimatedQuantity}`,
        `${content.fieldLabels.deliveryCity}: ${formData.deliveryCity}`,
        `${content.fieldLabels.budgetRange}: ${formData.budgetRange}`,
        "",
        `${content.fieldLabels.requirements}:`,
        formData.requirements,
      ].join("\n"),
    );

    return `${emailHref}${querySeparator}subject=${subject}&body=${body}`;
  }, [content.fieldLabels, emailHref, formData]);

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
    setSubmitState({ status: "submitting", message: content.submitting });
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        reference?: string;
        fieldErrors?: ContactInquiryFieldErrors;
      };

      if (!response.ok || !payload.ok) {
        setFieldErrors(payload.fieldErrors ?? {});
        setSubmitState({
          status: "error",
          message: payload.message ?? `${content.validationPrefix}.`,
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: payload.message ?? content.successMessage,
        reference: payload.reference,
      });
    } catch {
      setSubmitState({
        status: "error",
        message: content.errorFallback,
      });
    }
  }

  const displayedFieldErrors = Object.keys(fieldErrors).map((field) => {
    const contactField = field as ContactInquiryField;
    return content.fieldLabels[contactField] ?? fieldErrors[contactField];
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[#e3dbcb] bg-white/86 p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 rounded-md border border-[#eadfca] bg-[#fbfaf7] p-4 text-sm leading-6 text-[#596575]">
        <div className="mb-2 flex items-center gap-2 font-semibold text-[#17202a]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#a98945]" />
          {content.introTitle}
        </div>
        {content.introCopy}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <FieldLabel field="contactName" labels={content.fieldLabels} />
          <input
            className={inputClassName}
            name="contactName"
            placeholder={content.placeholders.contactName}
            type="text"
            value={formData.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="phone" labels={content.fieldLabels} />
          <input
            className={inputClassName}
            name="phone"
            placeholder={content.placeholders.phone}
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="companyBrand" labels={content.fieldLabels} />
          <input
            className={inputClassName}
            name="companyBrand"
            placeholder={content.placeholders.companyBrand}
            type="text"
            value={formData.companyBrand}
            onChange={(event) => updateField("companyBrand", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="projectType" labels={content.fieldLabels} />
          <select
            name="projectType"
            className={inputClassName}
            value={formData.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            required
          >
            <option value="">{content.placeholders.projectType}</option>
            {content.projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <FieldLabel field="estimatedQuantity" labels={content.fieldLabels} />
          <input
            className={inputClassName}
            name="estimatedQuantity"
            placeholder={content.placeholders.estimatedQuantity}
            type="text"
            value={formData.estimatedQuantity}
            onChange={(event) => updateField("estimatedQuantity", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <FieldLabel field="deliveryCity" labels={content.fieldLabels} />
          <input
            className={inputClassName}
            name="deliveryCity"
            placeholder={content.placeholders.deliveryCity}
            type="text"
            value={formData.deliveryCity}
            onChange={(event) => updateField("deliveryCity", event.target.value)}
            required
          />
        </label>
        <label className="block md:col-span-2">
          <FieldLabel field="budgetRange" labels={content.fieldLabels} />
          <select
            name="budgetRange"
            className={inputClassName}
            value={formData.budgetRange}
            onChange={(event) => updateField("budgetRange", event.target.value)}
            required
          >
            <option value="">{content.placeholders.budgetRange}</option>
            {content.budgetRanges.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <FieldLabel field="requirements" labels={content.fieldLabels} />
        <textarea
          className="mt-2 min-h-44 w-full rounded-md border border-[#d8cfbc] bg-[#fbfaf7] px-4 py-3 outline-none transition focus:border-[#a98945]"
          name="requirements"
          placeholder={content.placeholders.requirements}
          value={formData.requirements}
          onChange={(event) => updateField("requirements", event.target.value)}
          required
        />
      </label>

      {Object.keys(fieldErrors).length > 0 ? (
        <div className="mt-5 rounded-md border border-[#e8c6ba] bg-[#fff7f3] p-4 text-sm text-[#8a3f2c]">
          {content.validationPrefix}: {displayedFieldErrors.join(", ")}.
        </div>
      ) : null}

      <div aria-live="polite" className="mt-5">
        {submitState.status === "success" ? (
          <div className="rounded-md border border-[#c8dfc6] bg-[#f5fbf4] p-4 text-sm leading-6 text-[#28552d]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              {content.successTitle}
            </div>
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
          {submitState.status === "submitting" ? content.submitting : content.submit}
          <Send aria-hidden="true" className="h-4 w-4" />
        </button>
        <a
          href={emailWithSubject}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d8c28a] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f4efe3]"
        >
          {content.email}
          <Mail aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </form>
  );
}
