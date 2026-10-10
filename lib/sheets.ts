const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const BASE = "https://sheets.googleapis.com/v4/spreadsheets";
export async function readSheet(sheetName) {
    if (!SHEET_ID || !API_KEY) { return []; }
    try {
        const url = BASE + "/" + SHEET_ID + "/values/" + sheetName + "?key=" + API_KEY;
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        if (!data.values || data.values.length < 2) return [];
        const headers = data.values[0];
        const rows = data.values.slice(1);
        return rows.map(function(row) {
            const obj = {};
            headers.forEach(function(h, i) { obj[h] = row[i] || ""; });
            return obj;
        });
    } catch (err) { return []; }
}
