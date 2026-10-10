const SID = process.env.GOOGLE_SHEET_ID; const AK = process.env.GOOGLE_API_KEY;
export async function readSheet(name: string) { if (!SID||!AK) return []; try { const u = 'https://sheets.googleapis.com/v4/spreadsheets/'+SID+'/values/'+name+'?key='+AK; const r = await fetch(u); const d = await r.json(); return d.values||[]; } catch { return []; } }
