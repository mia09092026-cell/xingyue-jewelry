import { mkdir, readFile, stat, writeFile } from "fs/promises";
import path from "path";
import {
  inquiryRecordToSheetRow,
  inquirySheetHeaders,
  type InquirySheetRecord,
} from "@/lib/contact-inquiry";
import { appendInquiryToGoogleSheet, GoogleSheetsSafeError, hasGoogleSheetsConfig } from "@/lib/google-sheets";

const devCsvPath = path.join(process.cwd(), "data", "inquiries-dev.csv");

export class MissingGoogleSheetsConfigError extends GoogleSheetsSafeError {
  constructor() {
    super("missing_environment_variables", "Google Sheets environment variables are not configured.", {
      operation: "read_environment",
      status: 503,
    });
    this.name = "MissingGoogleSheetsConfigError";
  }
}

function escapeCsvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function appendInquiryToDevCsv(record: InquirySheetRecord) {
  await mkdir(path.dirname(devCsvPath), { recursive: true });
  const exists = await fileExists(devCsvPath);
  const currentContent = exists ? await readFile(devCsvPath, "utf8") : "";
  const headerLine = inquirySheetHeaders.map(escapeCsvCell).join(",");
  const rowLine = inquiryRecordToSheetRow(record).map(escapeCsvCell).join(",");
  const nextContent = [
    currentContent.trimEnd(),
    currentContent.trim() ? "" : headerLine,
    rowLine,
  ]
    .filter(Boolean)
    .join("\n");

  await writeFile(devCsvPath, `${nextContent}\n`, "utf8");
}

export async function saveInquiryRecord(record: InquirySheetRecord) {
  if (process.env.NODE_ENV === "production") {
    await appendInquiryToGoogleSheet(record);
    return;
  }

  if (hasGoogleSheetsConfig()) {
    await appendInquiryToGoogleSheet(record);
    return;
  }

  await appendInquiryToDevCsv(record);
}
