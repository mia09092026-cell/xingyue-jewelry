import { describe, expect, it } from "vitest";

import { resolveAnalyticsRuntime } from "./analytics-config";

const validInput = {
  environment: "production",
  hostname: "xingyuejewelry.com",
  qaEnabled: "false",
  gaMeasurementId: "G-AB12CD",
  clarityProjectId: "abc123",
} as const;

describe("resolveAnalyticsRuntime", () => {
  it("enables valid analytics services only on the production domain", () => {
    expect(resolveAnalyticsRuntime(validInput)).toEqual({
      enabled: true,
      gaMeasurementId: "G-AB12CD",
      clarityProjectId: "abc123",
    });
  });

  it.each(["preview", "development"])("keeps %s deployments disabled by default", (environment) => {
    expect(resolveAnalyticsRuntime({ ...validInput, environment })).toEqual({
      enabled: false,
      gaMeasurementId: undefined,
      clarityProjectId: undefined,
    });
  });

  it("allows an explicit QA override on a Preview deployment", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        environment: "preview",
        hostname: "xingyue-git-analytics-preview.vercel.app",
        qaEnabled: "true",
      }),
    ).toEqual({
      enabled: true,
      gaMeasurementId: "G-AB12CD",
      clarityProjectId: "abc123",
    });
  });

  it("does not let the QA override bypass the production-domain gate", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        hostname: "www.xingyuejewelry.com",
        qaEnabled: "true",
      }),
    ).toEqual({
      enabled: false,
      gaMeasurementId: undefined,
      clarityProjectId: undefined,
    });
  });

  it("keeps the valid service enabled when the other ID is missing", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        gaMeasurementId: undefined,
      }),
    ).toEqual({
      enabled: true,
      gaMeasurementId: undefined,
      clarityProjectId: "abc123",
    });
  });

  it("disables analytics when both IDs are missing", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        gaMeasurementId: undefined,
        clarityProjectId: undefined,
      }),
    ).toEqual({
      enabled: false,
      gaMeasurementId: undefined,
      clarityProjectId: undefined,
    });
  });

  it("keeps the valid service enabled when the other ID has an invalid format", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        gaMeasurementId: "UA-123456",
      }),
    ).toEqual({
      enabled: true,
      gaMeasurementId: undefined,
      clarityProjectId: "abc123",
    });
  });

  it("disables analytics when both IDs have invalid formats", () => {
    expect(
      resolveAnalyticsRuntime({
        ...validInput,
        gaMeasurementId: "UA-123456",
        clarityProjectId: "ABC123",
      }),
    ).toEqual({
      enabled: false,
      gaMeasurementId: undefined,
      clarityProjectId: undefined,
    });
  });
});
