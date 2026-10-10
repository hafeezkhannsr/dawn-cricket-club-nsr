import { NextResponse } from 'next/server';
export async function GET(r: Request) { const q = new URL(r.url).searchParams.get('q'); return NextResponse.json({ ok: true, query: q, results: [] }); }
