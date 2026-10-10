import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, registrations: [] }); }
export async function POST(r: Request) { const b = await r.json(); return NextResponse.json({ ok: true, data: b }); }
