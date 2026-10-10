import { NextResponse } from 'next/server';
export async function GET(r: Request) { const t = new URL(r.url).searchParams.get('type'); return NextResponse.json({ ok: true, type: t, url: '/exports/file.csv' }); }
