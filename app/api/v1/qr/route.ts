import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data") || "DAWN";
  const size = Math.min(600, Math.max(100, Number(searchParams.get("size")) || 220));
  try {
    const svg = await QRCode.toString(data, {
      type: "svg",
      width: size,
      margin: 1,
      color: { dark: "#0a1f3d", light: "#ffffff" },
      errorCorrectionLevel: "M",
    });
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}