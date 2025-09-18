import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // 便于调试：GET 直接返回固定 JSON
  return NextResponse.json(
    { ok: true, msg: "Hello API" },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  // 接收前端提交的 JSON 并原样回显
  const data = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, received: data });
}
