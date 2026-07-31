export type AnalyticsFormErrorType = "validation" | "duplicate" | "server" | "network" | "unknown";

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
    clarity?: (command: "consent", granted: boolean) => void;
    dataLayer?: AnalyticsEventPayload[];
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
]);

export function trackAnalyticsEvent<K extends AnalyticsEventName>(
  name: K,
  params: AnalyticsEventMap[K],
): boolean {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return false;

  try {
    window.dataLayer.push({ event: name, ...params } as AnalyticsEventPayload);
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
    window.clarity?.("consent", granted);
  } catch {
    // Consent adapters must not interrupt the caller when a third-party API fails.
  }
}

export function classifyFormError(code?: string): AnalyticsFormErrorType {
  if (validationCodes.has(code ?? "")) return "validation";
  if (code === "duplicate_submission") return "duplicate";
  if (code === "service_unavailable") return "server";
  if (code === "network_error") return "network";
  return "unknown";
}
