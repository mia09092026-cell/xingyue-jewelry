import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsFormErrorType = "validation" | "duplicate" | "rate_limited" | "server" | "network" | "unknown";

export interface AnalyticsEventMap {
  whatsapp_click: {
    page_path: string;
    link_location: string;
    locale: string;
    product_or_context?: string;
  };
  generate_lead: {
    form_name: string;
    page_path: string;
    locale: string;
    inquiry_type?: string;
  };
  form_error: {
    form_name: string;
    error_type: AnalyticsFormErrorType;
    page_path: string;
  };
  email_click: {
    page_path: string;
    link_location: string;
  };
  phone_click: {
    page_path: string;
    link_location: string;
  };
  file_download: {
    file_name: string;
    file_type: string;
    page_path: string;
  };
  resource_view: {
    article_slug: string;
    article_title: string;
    locale: string;
    page_path: string;
  };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

type AnalyticsEventPayload = {
  [Name in AnalyticsEventName]: { event: Name } & AnalyticsEventMap[Name];
}[AnalyticsEventName];

type AnalyticsStorageConsent = "granted" | "denied";

declare global {
  interface Window {
    clarity?: (
      command: "consentv2",
      consent: {
        ad_Storage: AnalyticsStorageConsent;
        analytics_Storage: AnalyticsStorageConsent;
      },
    ) => void;
    gtag?: (
      command: "consent",
      action: "update",
      consent: { analytics_storage: AnalyticsStorageConsent },
    ) => void;
  }
}

const validationCodes = new Set([
  "required",
  "consent_required",
  "invalid_email",
  "invalid_reference_url",
  "too_long",
  "VALIDATION_ERROR",
  "UNKNOWN_FIELDS",
]);

let gaAnalyticsRuntimeEnabled = false;

export function setGaAnalyticsRuntimeEnabled(enabled: boolean): void {
  gaAnalyticsRuntimeEnabled = enabled;
}

function createAnalyticsEvent(
  name: string,
  params: AnalyticsEventMap[AnalyticsEventName],
): AnalyticsEventPayload | undefined {
  switch (name) {
    case "whatsapp_click": {
      const safeParams = params as AnalyticsEventMap["whatsapp_click"];
      return typeof safeParams.product_or_context === "string"
        ? {
            event: "whatsapp_click",
            page_path: safeParams.page_path,
            link_location: safeParams.link_location,
            locale: safeParams.locale,
            product_or_context: safeParams.product_or_context,
          }
        : {
            event: "whatsapp_click",
            page_path: safeParams.page_path,
            link_location: safeParams.link_location,
            locale: safeParams.locale,
          };
    }
    case "generate_lead": {
      const safeParams = params as AnalyticsEventMap["generate_lead"];
      return typeof safeParams.inquiry_type === "string"
        ? {
            event: "generate_lead",
            form_name: safeParams.form_name,
            page_path: safeParams.page_path,
            locale: safeParams.locale,
            inquiry_type: safeParams.inquiry_type,
          }
        : {
            event: "generate_lead",
            form_name: safeParams.form_name,
            page_path: safeParams.page_path,
            locale: safeParams.locale,
          };
    }
    case "form_error": {
      const safeParams = params as AnalyticsEventMap["form_error"];
      return {
        event: "form_error",
        form_name: safeParams.form_name,
        error_type: safeParams.error_type,
        page_path: safeParams.page_path,
      };
    }
    case "email_click": {
      const safeParams = params as AnalyticsEventMap["email_click"];
      return {
        event: "email_click",
        page_path: safeParams.page_path,
        link_location: safeParams.link_location,
      };
    }
    case "phone_click": {
      const safeParams = params as AnalyticsEventMap["phone_click"];
      return {
        event: "phone_click",
        page_path: safeParams.page_path,
        link_location: safeParams.link_location,
      };
    }
    case "file_download": {
      const safeParams = params as AnalyticsEventMap["file_download"];
      return {
        event: "file_download",
        file_name: safeParams.file_name,
        file_type: safeParams.file_type,
        page_path: safeParams.page_path,
      };
    }
    case "resource_view": {
      const safeParams = params as AnalyticsEventMap["resource_view"];
      return {
        event: "resource_view",
        article_slug: safeParams.article_slug,
        article_title: safeParams.article_title,
        locale: safeParams.locale,
        page_path: safeParams.page_path,
      };
    }
    default:
      return undefined;
  }
}

export function trackAnalyticsEvent<K extends AnalyticsEventName>(
  name: K,
  params: AnalyticsEventMap[K],
): boolean {
  if (
    typeof window === "undefined" ||
    !gaAnalyticsRuntimeEnabled ||
    !Array.isArray(window.dataLayer)
  ) {
    return false;
  }

  try {
    const event = createAnalyticsEvent(name, params);
    if (!event) return false;
    const { event: eventName, ...safeParams } = event;
    sendGAEvent("event", eventName, safeParams);
    return true;
  } catch {
    return false;
  }
}

export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;

  const analyticsStorage: AnalyticsStorageConsent = granted ? "granted" : "denied";

  try {
    window.gtag?.("consent", "update", { analytics_storage: analyticsStorage });
  } catch {
    // Consent adapters must not interrupt the caller when a third-party API fails.
  }

  try {
    window.clarity?.("consentv2", {
      ad_Storage: analyticsStorage,
      analytics_Storage: analyticsStorage,
    });
  } catch {
    // Consent adapters must not interrupt the caller when a third-party API fails.
  }
}

export function classifyFormError(code?: string): AnalyticsFormErrorType {
  if (validationCodes.has(code ?? "")) return "validation";
  if (code === "duplicate_submission") return "duplicate";
  if (code === "RATE_LIMITED") return "rate_limited";
  if (code === "CONFIG_MISSING" || code === "SHEETS_WRITE_FAILED") return "server";
  if (code === "service_unavailable") return "server";
  if (code === "network_error") return "network";
  return "unknown";
}
