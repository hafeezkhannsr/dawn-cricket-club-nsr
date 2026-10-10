const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const BASE = "https://sheets.googleapis.com/v4/spreadsheets";
export async function readSheet(sheetName: string): Promise<any[]> {
    if (!SHEET_ID || !API_KEY) { return []; }
    try {
        const url = `${BASE}/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        if (!data.values || data.values.length < 2) return [];
        const headers: string[] = data.values[0];
        const rows: any[][] = data.values.slice(1);
        return rows.map((row) => {
            const obj: any = {};
            headers.forEach((h: string, i: number) => { obj[h] = row[i] || ""; });
            return obj;
        });
    } catch (err) { return []; }
}
