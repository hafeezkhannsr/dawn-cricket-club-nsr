import { NextResponse } from 'next/server';
export async function POST(request: Request) { try { const b = await request.json(); return NextResponse.json({ ok: true, message: 'Registration successful', data: { id: Date.now().toString(), ...b } }); } catch { return NextResponse.json({ ok: false, message: 'Registration failed' }, { status: 500 }); } }
