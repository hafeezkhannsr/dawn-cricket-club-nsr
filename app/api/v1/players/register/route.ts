import { NextResponse } from 'next/server';
export async function POST(r: Request) { const b = await r.json(); return NextResponse.json({ ok: true, message: 'Registration submitted', data: b }); }
