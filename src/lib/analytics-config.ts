export interface AnalyticsRuntimeInput {
  environment?: string;
  hostname?: string;
  qaEnabled?: string;
  gaMeasurementId?: string;
  clarityProjectId?: string;
}

export interface AnalyticsRuntime {
  enabled: boolean;
  gaMeasurementId?: string;
  clarityProjectId?: string;
}

const isValidGaMeasurementId = (value: string | undefined) =>
  Boolean(value && /^G-[A-Z0-9]+$/.test(value));

const isValidClarityProjectId = (value: string | undefined) =>
  Boolean(value && /^[a-z0-9]+$/.test(value));

export function resolveAnalyticsRuntime(input: AnalyticsRuntimeInput): AnalyticsRuntime {
  const isProductionDomain =
    input.environment === "production" && input.hostname === "xingyuejewelry.com";
  const isQaDeployment =
    (input.environment === "preview" || input.environment === "development") &&
    input.qaEnabled === "true";
  const mayLoadAnalytics = isProductionDomain || isQaDeployment;

  const gaMeasurementId =
    mayLoadAnalytics && isValidGaMeasurementId(input.gaMeasurementId)
      ? input.gaMeasurementId
      : undefined;
  const clarityProjectId =
    mayLoadAnalytics && isValidClarityProjectId(input.clarityProjectId)
      ? input.clarityProjectId
      : undefined;

  return {
    enabled: Boolean(gaMeasurementId || clarityProjectId),
    gaMeasurementId,
    clarityProjectId,
  };
}
