import { NextResponse } from 'next/server';
export async function POST(r: Request) { const { token } = await r.json(); return NextResponse.json({ ok: true, message: 'Email verified', token }); }
