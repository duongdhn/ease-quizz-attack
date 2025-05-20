import { NextResponse } from "next/server";

interface Log {
  url: string;
  time: string;
}

const logs: Log[] = []; // Lưu trữ toàn bộ URL

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token"); // Lấy token từ query parameter

  if (token) {
    logs.push({ url: token, time: new Date().toISOString() }); // Lưu token vào logs
  }

  return NextResponse.json(logs); // Trả về danh sách logs dưới dạng JSON
}