import { NextResponse } from 'next/server';
export async function POST(r: Request) { return NextResponse.json({ ok: true, message: 'Password changed' }); }
