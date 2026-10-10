import { NextResponse } from 'next/server';
export async function POST(r: Request) { const { code } = await r.json(); return NextResponse.json({ ok: true, verified: true, code }); }
