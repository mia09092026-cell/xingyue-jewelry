import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendGAEventMock = vi.hoisted(() => vi.fn());

vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: sendGAEventMock,
}));

import {
  classifyFormError,
  setGaAnalyticsRuntimeEnabled,
  trackAnalyticsEvent,
  updateAnalyticsConsent,
} from "./analytics";

afterEach(() => {
  setGaAnalyticsRuntimeEnabled(false);
  delete window.dataLayer;
  delete window.gtag;
  delete window.clarity;
});

beforeEach(() => {
  sendGAEventMock.mockReset();
  setGaAnalyticsRuntimeEnabled(true);
});

describe("trackAnalyticsEvent", () => {
  it("sends an approved event through the official GA event transport", () => {
    window.dataLayer = [];

    expect(
      trackAnalyticsEvent("generate_lead", {
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
        inquiry_type: "custom_jewelry",
      }),
    ).toBe(true);

    expect(sendGAEventMock).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      {
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
        inquiry_type: "custom_jewelry",
      },
    );
  });

  it("fails safely when the analytics data layer is unavailable", () => {
    expect(
      trackAnalyticsEvent("email_click", {
        page_path: "/contact",
        link_location: "contact_footer",
      }),
    ).toBe(false);
    expect(sendGAEventMock).not.toHaveBeenCalled();
  });

  it("rejects events when the application GA runtime is disabled despite a pre-existing data layer", () => {
    window.dataLayer = [];
    setGaAnalyticsRuntimeEnabled(false);

    expect(
      trackAnalyticsEvent("email_click", {
        page_path: "/contact",
        link_location: "contact_footer",
      }),
    ).toBe(false);
    expect(sendGAEventMock).not.toHaveBeenCalled();
  });

  it("removes unapproved caller fields before invoking the official sender", () => {
    window.dataLayer = [];
    const unsafeParams = {
      form_name: "contact_inquiry",
      page_path: "/contact",
      locale: "en",
      email: "buyer@example.com",
      message: "Please quote this design.",
    };

    expect(trackAnalyticsEvent("generate_lead", unsafeParams)).toBe(true);
    expect(sendGAEventMock).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      {
        form_name: "contact_inquiry",
        page_path: "/contact",
        locale: "en",
      },
    );
    expect(JSON.stringify(sendGAEventMock.mock.calls)).not.toContain(
      "buyer@example.com",
    );
    expect(JSON.stringify(sendGAEventMock.mock.calls)).not.toContain(
      "Please quote this design.",
    );
  });

  it("rejects unknown and page_view events before invoking the official sender", () => {
    window.dataLayer = [];
    const trackUncheckedEvent = trackAnalyticsEvent as (
      name: string,
      params: object,
    ) => boolean;

    expect(trackUncheckedEvent("page_view", { page_path: "/contact" })).toBe(false);
    expect(trackUncheckedEvent("unknown_event", { email: "buyer@example.com" })).toBe(
      false,
    );
    expect(sendGAEventMock).not.toHaveBeenCalled();
  });

  it("returns false when the official sender throws", () => {
    window.dataLayer = [];
    sendGAEventMock.mockImplementationOnce(() => {
      throw new Error("blocked");
    });

    expect(
      trackAnalyticsEvent("email_click", {
        page_path: "/contact",
        link_location: "contact_footer",
      }),
    ).toBe(false);
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
  it.each([
    {
      granted: true,
      storage: "granted",
    },
    {
      granted: false,
      storage: "denied",
    },
  ] as const)("updates Google consent and Clarity Consent V2 when granted is $granted", ({
    granted,
    storage,
  }) => {
    const googleCalls: unknown[][] = [];
    const clarityCalls: unknown[][] = [];
    window.gtag = (...args: unknown[]) => googleCalls.push(args);
    window.clarity = (...args: unknown[]) => clarityCalls.push(args);

    updateAnalyticsConsent(granted);

    expect(googleCalls).toEqual([
      ["consent", "update", { analytics_storage: storage }],
    ]);
    expect(clarityCalls).toEqual([
      [
        "consentv2",
        {
          ad_Storage: storage,
          analytics_Storage: storage,
        },
      ],
    ]);
  });

  it("does nothing when consent APIs are unavailable", () => {
    expect(() => updateAnalyticsConsent(false)).not.toThrow();
  });

  it("does not expose failures thrown by third-party consent APIs", () => {
    window.gtag = () => {
      throw new Error("Google consent unavailable");
    };
    window.clarity = () => {
      throw new Error("Clarity consent unavailable");
    };

    expect(() => updateAnalyticsConsent(true)).not.toThrow();
  });
});
