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

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleSheetsScope = "https://www.googleapis.com/auth/spreadsheets";

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function getGoogleSheetsConfig(): GoogleSheetsConfig | null {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim();

  if (!clientEmail || !privateKey || !spreadsheetId || !sheetName) {
    return null;
  }

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
    sheetName,
  };
}

export function hasGoogleSheetsConfig() {
  return getGoogleSheetsConfig() !== null;
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
  const signature = signer.sign(config.privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
}

async function getAccessToken(config: GoogleSheetsConfig) {
  const response = await fetch(googleTokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createServiceAccountJwt(config),
    }),
  });
  const payload = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error ?? "Unable to authorize Google Sheets request.");
  }

  return payload.access_token;
}

function sheetRange(config: GoogleSheetsConfig, range: string) {
  const escapedSheetName = config.sheetName.replaceAll("'", "''");
  return encodeURIComponent(`'${escapedSheetName}'!${range}`);
}

async function ensureHeaderRow(config: GoogleSheetsConfig, accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const headerRange = sheetRange(config, "A1:P1");
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${headerRange}`;
  const getResponse = await fetch(getUrl, { headers });

  if (!getResponse.ok) {
    throw new Error("Unable to read Google Sheets header row.");
  }

  const current = (await getResponse.json()) as { values?: string[][] };
  const currentHeader = current.values?.[0] ?? [];
  const needsHeader = inquirySheetHeaders.some((header, index) => currentHeader[index] !== header);

  if (!needsHeader) {
    return;
  }

  const updateResponse = await fetch(`${getUrl}?valueInputOption=RAW`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ values: [inquirySheetHeaders] }),
  });

  if (!updateResponse.ok) {
    throw new Error("Unable to update Google Sheets header row.");
  }
}

export async function appendInquiryToGoogleSheet(record: InquirySheetRecord) {
  const config = getGoogleSheetsConfig();

  if (!config) {
    throw new Error("Google Sheets environment variables are not configured.");
  }

  const accessToken = await getAccessToken(config);
  await ensureHeaderRow(config, accessToken);

  const appendRange = sheetRange(config, "A:P");
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${appendRange}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const response = await fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [inquiryRecordToSheetRow(record)] }),
  });

  if (!response.ok) {
    throw new Error("Unable to append inquiry to Google Sheets.");
  }
}
