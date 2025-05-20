'use client';
import { useEffect, useState } from "react";

interface Log {
  url: string;
  time: string;
}

export default function StreamPage() {
  const [logs, setLogs] = useState<Log[]>([]); // State để lưu danh sách logs
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có

  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/log");
        if (!response.ok) {
          const errorText = await response.text(); // Lấy chi tiết lỗi từ API
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data: Log[] = await response.json();
        if (isMounted) {
          setLogs(data); // Cập nhật danh sách logs
          setError(null); // Xóa lỗi nếu fetch thành công
        }
      } catch (err) {
        const error = err as Error;
        if (isMounted) {
          setError(`Failed to fetch logs: ${error.message}`);
          console.error("Error fetching logs:", error);
        }
      }
    };

    fetchLogs();

    // Tự động fetch logs mỗi 5 giây
    const interval = setInterval(fetchLogs, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval); // Dọn dẹp interval khi component unmount
    };
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">All Logged URLs</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : logs.length > 0 ? (
        <div>
          {logs.map((log, index) => (
            <p key={index}>
              {log.time}: {log.url}
            </p>
          ))}
        </div>
      ) : (
        <p>No logs available yet.</p>
      )}
    </div>
  );
}