import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, settings: {} }); }
export async function PUT(request: Request) { const b = await request.json(); return NextResponse.json({ ok: true, data: b }); }
