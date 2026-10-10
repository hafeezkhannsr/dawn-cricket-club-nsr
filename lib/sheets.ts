// Google Sheets Client - Phase 12 mein complete hoga
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
export async function fetchSheet(sheetName: string) {
    if (!SHEET_ID || !API_KEY) return [];
    const url = https://sheets.googleapis.com/v4/spreadsheets/\/values/\?key=\;
    const res = await fetch(url);
    const data = await res.json();
    return data.values || [];
}
