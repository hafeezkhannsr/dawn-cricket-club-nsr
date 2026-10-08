import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const APPS_SCRIPT = `/**
 * DAWN Cricket Club — Google Sheets Sync (v2)
 * -------------------------------------------
 * SETUP (one time):
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Delete existing code, paste this entire file
 * 4. Change SHARED_SECRET to a long random string
 * 5. Deploy → New deployment → Web app
 * 6. Execute as: Me · Who has access: Anyone
 * 7. Copy Web app URL
 * 8. Create .env.local in project with:
 *    GOOGLE_SHEETS_WEBHOOK_URL=<paste URL here>
 *    GOOGLE_SHEETS_SECRET=<the same secret>
 *
 * Supports:
 *   - action: "append"  → adds rows (idempotent by RegistrationNumber)
 *   - action: "delete"  → removes row(s) matching RegistrationNumber
 *   - action: "sync"    → replaces the entire sheet with provided rows
 */
const SHARED_SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";
const SHEET_NAME    = "Registrations";
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}
function findColumnIndex_(sheet, headerName) {
  const lastCol = sheet.getLastColumn();
  if (lastCol < 1) return -1;
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return headers.indexOf(headerName);
}
function deleteByRegistrationNumber_(sheet, regNumber) {
  const col = findColumnIndex_(sheet, "RegistrationNumber");
  if (col < 0) return 0;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const values = sheet.getRange(2, col + 1, lastRow - 1, 1).getValues();
  let removed = 0;
  for (let i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]) === String(regNumber)) {
      sheet.deleteRow(i + 2);
      removed++;
    }
  }
  return removed;
}
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SHARED_SECRET) {
      return json_({ ok: false, error: "Invalid secret" });
    }
    const sheet = getSheet_();
    const action = body.action || "append";
    if (action === "delete") {
      const removed = deleteByRegistrationNumber_(sheet, body.registrationNumber);
      return json_({ ok: true, action: "delete", removed });
    }
    if (action === "sync") {
      sheet.clear();
      if (body.columns) sheet.appendRow(body.columns);
      if (body.rows && body.rows.length) {
        sheet.getRange(sheet.getLastRow() + 1, 1, body.rows.length, body.rows[0].length).setValues(body.rows);
      }
      return json_({ ok: true, action: "sync", rows: (body.rows || []).length });
    }
    // default: append
    if (sheet.getLastRow() === 0 && body.columns) {
      sheet.appendRow(body.columns);
    }
    const rows = body.rows || [];
    if (rows.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    return json_({ ok: true, action: "append", appended: rows.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  return ContentService.createTextOutput("DAWN Sheets endpoint v2 is live");
}
`;
export async function GET() {
  return new NextResponse(APPS_SCRIPT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="dawn-sheets-sync-v2.gs"',
      "Cache-Control": "no-store",
    },
  });
}