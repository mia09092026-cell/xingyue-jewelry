import { createSign } from "crypto";
import {
  inquiryRecordToSheetRow,
  inquirySheetHeaders,
  type InquirySheetRecord,
} from "@/lib/contact-inquiry";

type GoogleSheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
};

const googleSheetsEnvKeys = [
  "GOOGLE_SHEETS_CLIENT_EMAIL",
  "GOOGLE_SHEETS_PRIVATE_KEY",
  "GOOGLE_SHEETS_SPREADSHEET_ID",
  "GOOGLE_SHEETS_SHEET_NAME",
] as const;

export type GoogleSheetsEnvKey = (typeof googleSheetsEnvKeys)[number];
export type GoogleSheetsEnvStatus = Record<GoogleSheetsEnvKey, boolean>;

export const defaultGoogleSheetsSheetName = "Inquiries";

export type GoogleSheetsOperation =
  | "read_environment"
  | "normalize_private_key"
  | "create_service_account_jwt"
  | "authorize_google_sheets"
  | "open_spreadsheet"
  | "read_header_row"
  | "update_header_row"
  | "append_inquiry";

export type GoogleSheetsErrorCategory =
  | "missing_environment_variables"
  | "invalid_private_key"
  | "spreadsheet_not_found"
  | "sheet_tab_not_found"
  | "permission_denied"
  | "google_sheets_api_error";

export type GoogleSheetsHealthErrorCategory =
  | "permission_denied"
  | "spreadsheet_not_found"
  | "sheet_tab_not_found"
  | "invalid_private_key"
  | "google_api_error";

export type GoogleSheetsWriteProbeResult = {
  canConnectGoogle: boolean;
  canOpenSpreadsheet: boolean;
  canFindSheetTab: boolean;
  canWriteTestRow: boolean;
  errorCategory: GoogleSheetsHealthErrorCategory | null;
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleSheetsHealthStatus = {
  ready: boolean;
  variables: GoogleSheetsEnvStatus;
  privateKey: {
    present: boolean;
    validFormat: boolean;
    hasBegin: boolean;
    hasEnd: boolean;
  };
  sheetName: {
    configured: boolean;
    defaulted: boolean;
    defaultName: string;
  };
};

export type GoogleSheetsSafeErrorResponse = {
  category: GoogleSheetsErrorCategory;
  operation?: GoogleSheetsOperation;
  status: number;
};

const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleSheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const privateKeyBeginMarker = "-----BEGIN PRIVATE KEY-----";
const privateKeyEndMarker = "-----END PRIVATE KEY-----";

export class GoogleSheetsSafeError extends Error {
  category: GoogleSheetsErrorCategory;
  operation?: GoogleSheetsOperation;
  status?: number;

  constructor(
    category: GoogleSheetsErrorCategory,
    message: string,
    options: { operation?: GoogleSheetsOperation; status?: number; cause?: unknown } = {},
  ) {
    super(message);
    this.name = "GoogleSheetsSafeError";
    this.category = category;
    this.operation = options.operation;
    this.status = options.status;

    if ("cause" in options) {
      (this as Error & { cause?: unknown }).cause = options.cause;
    }
  }
}

export function isGoogleSheetsSafeError(error: unknown): error is GoogleSheetsSafeError {
  return (
    error instanceof GoogleSheetsSafeError ||
    (error instanceof Error &&
      error.name === "GoogleSheetsSafeError" &&
      "category" in error &&
      typeof (error as { category?: unknown }).category === "string")
  );
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function readGoogleSheetsEnv(key: GoogleSheetsEnvKey) {
  const value = process.env[key]?.trim();
  return value ? value : "";
}

function stripMatchingOuterQuotes(value: string) {
  let nextValue = value.trim();

  for (let index = 0; index < 2; index += 1) {
    const first = nextValue.at(0);
    const last = nextValue.at(-1);

    if ((first === `"` || first === `'`) && first === last) {
      nextValue = nextValue.slice(1, -1).trim();
    }
  }

  return nextValue;
}

function inspectPrivateKey(rawPrivateKey: string) {
  const stripped = stripMatchingOuterQuotes(rawPrivateKey)
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  return {
    normalized: stripped,
    hasBegin: stripped.includes(privateKeyBeginMarker),
    hasEnd: stripped.includes(privateKeyEndMarker),
  };
}

export function normalizeGooglePrivateKey(rawPrivateKey: string) {
  const { normalized, hasBegin, hasEnd } = inspectPrivateKey(rawPrivateKey);

  if (!normalized || !hasBegin || !hasEnd) {
    throw new GoogleSheetsSafeError(
      "invalid_private_key",
      "Google Sheets private key format is invalid.",
      { operation: "normalize_private_key" },
    );
  }

  return normalized;
}

export function getGoogleSheetsEnvStatus(): GoogleSheetsEnvStatus {
  return {
    GOOGLE_SHEETS_CLIENT_EMAIL: Boolean(readGoogleSheetsEnv("GOOGLE_SHEETS_CLIENT_EMAIL")),
    GOOGLE_SHEETS_PRIVATE_KEY: Boolean(readGoogleSheetsEnv("GOOGLE_SHEETS_PRIVATE_KEY")),
    GOOGLE_SHEETS_SPREADSHEET_ID: Boolean(readGoogleSheetsEnv("GOOGLE_SHEETS_SPREADSHEET_ID")),
    GOOGLE_SHEETS_SHEET_NAME: Boolean(readGoogleSheetsEnv("GOOGLE_SHEETS_SHEET_NAME")),
  };
}

export function getGoogleSheetsHealthStatus(): GoogleSheetsHealthStatus {
  const variables = getGoogleSheetsEnvStatus();
  const rawPrivateKey = readGoogleSheetsEnv("GOOGLE_SHEETS_PRIVATE_KEY");
  const privateKeyInspection = rawPrivateKey
    ? inspectPrivateKey(rawPrivateKey)
    : { normalized: "", hasBegin: false, hasEnd: false };
  const validFormat = Boolean(
    rawPrivateKey && privateKeyInspection.normalized && privateKeyInspection.hasBegin && privateKeyInspection.hasEnd,
  );

  return {
    ready: Boolean(
      variables.GOOGLE_SHEETS_CLIENT_EMAIL &&
        variables.GOOGLE_SHEETS_PRIVATE_KEY &&
        variables.GOOGLE_SHEETS_SPREADSHEET_ID &&
        validFormat,
    ),
    variables,
    privateKey: {
      present: variables.GOOGLE_SHEETS_PRIVATE_KEY,
      validFormat,
      hasBegin: privateKeyInspection.hasBegin,
      hasEnd: privateKeyInspection.hasEnd,
    },
    sheetName: {
      configured: variables.GOOGLE_SHEETS_SHEET_NAME,
      defaulted: !variables.GOOGLE_SHEETS_SHEET_NAME,
      defaultName: defaultGoogleSheetsSheetName,
    },
  };
}

function resolveGoogleSheetsConfig(): GoogleSheetsConfig {
  const clientEmail = readGoogleSheetsEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const rawPrivateKey = readGoogleSheetsEnv("GOOGLE_SHEETS_PRIVATE_KEY");
  const spreadsheetId = readGoogleSheetsEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = readGoogleSheetsEnv("GOOGLE_SHEETS_SHEET_NAME") || defaultGoogleSheetsSheetName;

  if (!clientEmail || !rawPrivateKey || !spreadsheetId) {
    throw new GoogleSheetsSafeError(
      "missing_environment_variables",
      "Google Sheets environment variables are not configured.",
      { operation: "read_environment", status: 503 },
    );
  }

  return {
    clientEmail,
    privateKey: normalizeGooglePrivateKey(rawPrivateKey),
    spreadsheetId,
    sheetName,
  };
}

export function hasGoogleSheetsConfig() {
  return getGoogleSheetsHealthStatus().ready;
}

export function canRunGoogleSheetsTestWrite(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const configuredToken = process.env.INQUIRY_TEST_TOKEN?.trim();
  const requestToken = request.headers.get("x-inquiry-test-token")?.trim();

  return Boolean(configuredToken && requestToken && configuredToken === requestToken);
}

function createServiceAccountJwt(config: GoogleSheetsConfig, nowInSeconds = Math.floor(Date.now() / 1000)) {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claimSet = {
    iss: config.clientEmail,
    scope: googleSheetsScope,
    aud: googleTokenUrl,
    exp: nowInSeconds + 3600,
    iat: nowInSeconds,
  };
  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claimSet))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  try {
    const signature = signer.sign(config.privateKey);
    return `${unsignedToken}.${base64Url(signature)}`;
  } catch (error) {
    throw new GoogleSheetsSafeError(
      "invalid_private_key",
      "Google Sheets private key could not sign the service account request.",
      { operation: "create_service_account_jwt", cause: error },
    );
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getGoogleErrorText(bodyText: string) {
  const parsed = parseJson(bodyText);
  const parts: string[] = [bodyText];

  if (parsed && typeof parsed === "object") {
    const payload = parsed as {
      error?: string | { message?: string; status?: string; code?: number; errors?: Array<{ reason?: string }> };
      error_description?: string;
    };

    if (typeof payload.error === "string") {
      parts.push(payload.error);
    } else if (payload.error) {
      parts.push(payload.error.message ?? "");
      parts.push(payload.error.status ?? "");
      parts.push(String(payload.error.code ?? ""));
      for (const nestedError of payload.error.errors ?? []) {
        parts.push(nestedError.reason ?? "");
      }
    }

    parts.push(payload.error_description ?? "");
  }

  return parts.join(" ").toLowerCase();
}

export function classifyGoogleSheetsApiError(
  status: number,
  bodyText: string,
  operation: GoogleSheetsOperation,
) {
  const errorText = getGoogleErrorText(bodyText);

  if (
    operation === "authorize_google_sheets" &&
    (status === 400 ||
      status === 401 ||
      errorText.includes("invalid_grant") ||
      errorText.includes("invalid jwt") ||
      errorText.includes("invalid_client"))
  ) {
    return new GoogleSheetsSafeError(
      "invalid_private_key",
      "Google Sheets service account authorization failed.",
      { operation, status },
    );
  }

  if (
    errorText.includes("accessnotconfigured") ||
    errorText.includes("service_disabled") ||
    errorText.includes("api has not been used") ||
    errorText.includes("api is disabled")
  ) {
    return new GoogleSheetsSafeError(
      "google_sheets_api_error",
      "Google Sheets API is unavailable.",
      { operation, status },
    );
  }

  if (
    errorText.includes("unable to parse range") ||
    errorText.includes("range not found") ||
    errorText.includes("sheet not found")
  ) {
    return new GoogleSheetsSafeError(
      "sheet_tab_not_found",
      "Google Sheets tab could not be found.",
      { operation, status },
    );
  }

  if (status === 403 || errorText.includes("permission_denied") || errorText.includes("forbidden")) {
    return new GoogleSheetsSafeError(
      "permission_denied",
      "Google Sheets permission was denied.",
      { operation, status },
    );
  }

  if (status === 404 || errorText.includes("not_found")) {
    return new GoogleSheetsSafeError(
      "spreadsheet_not_found",
      "Google Sheets spreadsheet could not be found.",
      { operation, status },
    );
  }

  return new GoogleSheetsSafeError(
    "google_sheets_api_error",
    "Google Sheets API request failed.",
    { operation, status },
  );
}

function googleSheetsCategoryToHttpStatus(category: GoogleSheetsErrorCategory) {
  switch (category) {
    case "missing_environment_variables":
      return 503;
    case "permission_denied":
      return 403;
    case "spreadsheet_not_found":
    case "sheet_tab_not_found":
      return 404;
    case "invalid_private_key":
      return 500;
    case "google_sheets_api_error":
    default:
      return 502;
  }
}

export function googleSheetsErrorToResponse(error: unknown): GoogleSheetsSafeErrorResponse {
  if (isGoogleSheetsSafeError(error)) {
    const status = error.status ?? googleSheetsCategoryToHttpStatus(error.category);

    return {
      category: error.category,
      operation: error.operation,
      status: googleSheetsCategoryToHttpStatus(error.category) === 502 ? status : googleSheetsCategoryToHttpStatus(error.category),
    };
  }

  return {
    category: "google_sheets_api_error",
    status: 502,
  };
}

async function readGoogleErrorBody(response: Response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

async function getAccessToken(config: GoogleSheetsConfig) {
  const assertion = createServiceAccountJwt(config);
  let response: Response;

  try {
    response = await fetch(googleTokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
    });
  } catch (error) {
    throw new GoogleSheetsSafeError(
      "google_sheets_api_error",
      "Google Sheets authorization request could not be completed.",
      { operation: "authorize_google_sheets", cause: error },
    );
  }

  const bodyText = await readGoogleErrorBody(response);
  const payload = parseJson(bodyText) as GoogleTokenResponse | null;

  if (!response.ok || !payload?.access_token) {
    throw classifyGoogleSheetsApiError(response.status, bodyText, "authorize_google_sheets");
  }

  return payload.access_token;
}

function sheetRange(config: GoogleSheetsConfig, range: string) {
  const simpleSheetName = /^[A-Za-z_][A-Za-z0-9_]*$/.test(config.sheetName);
  const sheetName = simpleSheetName
    ? config.sheetName
    : `'${config.sheetName.replaceAll("'", "''")}'`;

  return encodeURIComponent(`${sheetName}!${range}`);
}

async function safeFetch(url: string, init: RequestInit, operation: GoogleSheetsOperation) {
  try {
    return await fetch(url, init);
  } catch (error) {
    throw new GoogleSheetsSafeError(
      "google_sheets_api_error",
      "Google Sheets API request could not be completed.",
      { operation, cause: error },
    );
  }
}

async function ensureHeaderRow(config: GoogleSheetsConfig, accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const headerRange = sheetRange(config, "A1:P1");
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${headerRange}`;
  const getResponse = await safeFetch(getUrl, { headers }, "read_header_row");

  if (!getResponse.ok) {
    throw classifyGoogleSheetsApiError(
      getResponse.status,
      await readGoogleErrorBody(getResponse),
      "read_header_row",
    );
  }

  const current = (parseJson(await getResponse.text()) ?? {}) as { values?: string[][] };
  const currentHeader = current.values?.[0] ?? [];
  const needsHeader = inquirySheetHeaders.some((header, index) => currentHeader[index] !== header);

  if (!needsHeader) {
    return;
  }

  const updateResponse = await safeFetch(
    `${getUrl}?valueInputOption=RAW`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ values: [inquirySheetHeaders] }),
    },
    "update_header_row",
  );

  if (!updateResponse.ok) {
    throw classifyGoogleSheetsApiError(
      updateResponse.status,
      await readGoogleErrorBody(updateResponse),
      "update_header_row",
    );
  }
}

async function appendInquiryWithConfig(
  config: GoogleSheetsConfig,
  accessToken: string,
  record: InquirySheetRecord,
) {
  await ensureHeaderRow(config, accessToken);
  const appendRange = sheetRange(config, "A:P");
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${appendRange}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const response = await safeFetch(
    appendUrl,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [inquiryRecordToSheetRow(record)] }),
    },
    "append_inquiry",
  );

  if (!response.ok) {
    throw classifyGoogleSheetsApiError(
      response.status,
      await readGoogleErrorBody(response),
      "append_inquiry",
    );
  }
}

export async function appendInquiryToGoogleSheet(record: InquirySheetRecord) {
  const config = resolveGoogleSheetsConfig();
  const accessToken = await getAccessToken(config);
  await appendInquiryWithConfig(config, accessToken, record);
}

function toHealthErrorCategory(error: unknown): GoogleSheetsHealthErrorCategory {
  if (!isGoogleSheetsSafeError(error)) {
    return "google_api_error";
  }

  switch (error.category) {
    case "invalid_private_key":
    case "permission_denied":
    case "spreadsheet_not_found":
    case "sheet_tab_not_found":
      return error.category;
    case "missing_environment_variables":
    case "google_sheets_api_error":
    default:
      return "google_api_error";
  }
}

async function getSpreadsheetTabTitles(config: GoogleSheetsConfig, accessToken: string) {
  const response = await safeFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}?fields=sheets.properties.title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    "open_spreadsheet",
  );
  const bodyText = await readGoogleErrorBody(response);

  if (!response.ok) {
    throw classifyGoogleSheetsApiError(response.status, bodyText, "open_spreadsheet");
  }

  const payload = parseJson(bodyText) as
    | { sheets?: Array<{ properties?: { title?: string } }> }
    | null;

  return (payload?.sheets ?? [])
    .map((sheet) => sheet.properties?.title)
    .filter((title): title is string => Boolean(title));
}

export async function probeGoogleSheetsWrite(
  record: InquirySheetRecord,
): Promise<GoogleSheetsWriteProbeResult> {
  const result: GoogleSheetsWriteProbeResult = {
    canConnectGoogle: false,
    canOpenSpreadsheet: false,
    canFindSheetTab: false,
    canWriteTestRow: false,
    errorCategory: null,
  };

  let config: GoogleSheetsConfig;

  try {
    config = resolveGoogleSheetsConfig();
  } catch (error) {
    return { ...result, errorCategory: toHealthErrorCategory(error) };
  }

  let accessToken: string;

  try {
    accessToken = await getAccessToken(config);
    result.canConnectGoogle = true;
  } catch (error) {
    return { ...result, errorCategory: toHealthErrorCategory(error) };
  }

  let tabTitles: string[];

  try {
    tabTitles = await getSpreadsheetTabTitles(config, accessToken);
    result.canOpenSpreadsheet = true;
  } catch (error) {
    return { ...result, errorCategory: toHealthErrorCategory(error) };
  }

  if (!tabTitles.includes(config.sheetName)) {
    return { ...result, errorCategory: "sheet_tab_not_found" };
  }

  result.canFindSheetTab = true;

  try {
    await appendInquiryWithConfig(config, accessToken, record);
    result.canWriteTestRow = true;
    return result;
  } catch (error) {
    return { ...result, errorCategory: toHealthErrorCategory(error) };
  }
}
