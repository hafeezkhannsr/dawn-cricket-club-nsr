import { NextResponse } from 'next/server';
export async function GET(request: Request) { const q = new URL(request.url).searchParams.get('q'); return NextResponse.json({ ok: true, query: q, results: [] }); }
