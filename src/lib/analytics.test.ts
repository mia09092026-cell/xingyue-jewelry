import { afterEach, describe, expect, it } from "vitest";

import {
  classifyFormError,
  trackAnalyticsEvent,
  updateAnalyticsConsent,
} from "./analytics";

afterEach(() => {
  delete window.dataLayer;
  delete window.gtag;
  delete window.clarity;
});

describe("trackAnalyticsEvent", () => {
  it("pushes an approved event as an event payload", () => {
    window.dataLayer = [];

    expect(
      trackAnalyticsEvent("generate_lead", {
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
        inquiry_type: "custom_jewelry",
      }),
    ).toBe(true);

    expect(window.dataLayer).toEqual([
      {
        event: "generate_lead",
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
        inquiry_type: "custom_jewelry",
      },
    ]);
  });

  it("fails safely when the analytics data layer is unavailable", () => {
    expect(
      trackAnalyticsEvent("email_click", {
        page_path: "/contact",
        link_location: "contact_footer",
      }),
    ).toBe(false);
  });

  it("removes unapproved caller fields before pushing an approved event", () => {
    window.dataLayer = [];
    const unsafeParams = {
      form_name: "contact_inquiry",
      page_path: "/contact",
      locale: "en",
      email: "buyer@example.com",
      message: "Please quote this design.",
    };

    expect(trackAnalyticsEvent("generate_lead", unsafeParams)).toBe(true);
    expect(window.dataLayer).toEqual([
      {
        event: "generate_lead",
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
      },
    ]);
  });

  it("rejects an unapproved event name without pushing it", () => {
    window.dataLayer = [];
    const trackUncheckedEvent = trackAnalyticsEvent as (name: string, params: object) => boolean;

    expect(trackUncheckedEvent("page_view", { page_path: "/contact" })).toBe(false);
    expect(window.dataLayer).toEqual([]);
  });
});

describe("classifyFormError", () => {
  it.each([
    ["required", "validation"],
    ["invalid_email", "validation"],
    ["duplicate_submission", "duplicate"],
    ["service_unavailable", "server"],
    ["network_error", "network"],
    ["VALIDATION_ERROR", "validation"],
    ["UNKNOWN_FIELDS", "validation"],
    ["RATE_LIMITED", "rate_limited"],
    ["CONFIG_MISSING", "server"],
    ["SHEETS_WRITE_FAILED", "server"],
    [undefined, "unknown"],
    ["unrecognized_code", "unknown"],
  ] as const)("converts %s into the coarse %s category", (code, expected) => {
    expect(classifyFormError(code)).toBe(expected);
  });
});

describe("updateAnalyticsConsent", () => {
  it("updates available consent APIs with only the granted state", () => {
    const googleCalls: unknown[][] = [];
    const clarityCalls: unknown[][] = [];
    window.gtag = (...args: unknown[]) => googleCalls.push(args);
    window.clarity = (...args: unknown[]) => clarityCalls.push(args);

    updateAnalyticsConsent(true);

    expect(googleCalls).toEqual([
      ["consent", "update", { analytics_storage: "granted" }],
    ]);
    expect(clarityCalls).toEqual([["consent", true]]);
  });

  it("does nothing when consent APIs are unavailable", () => {
    expect(() => updateAnalyticsConsent(false)).not.toThrow();
  });
});
