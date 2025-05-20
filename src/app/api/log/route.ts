import { NextResponse } from "next/server";

interface Log {
  url: string;
  time: string;
}

let latestLog: Log | null = null; // Lưu trữ URL mới nhất

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token"); // Lấy token từ query parameter

    if (token) {
      // Cập nhật URL mới nhất
      latestLog = { url: token, time: new Date().toISOString() };
      console.log(`[LOG] New URL logged: ${token}`);
    }

    // Trả về URL mới nhất (hoặc null nếu chưa có request nào)
    return NextResponse.json(latestLog || { message: "No new URL logged yet" });
  } catch (error) {
    console.error("Error in API /api/log:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}