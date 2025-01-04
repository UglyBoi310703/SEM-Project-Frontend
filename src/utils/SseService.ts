export default function subscribeToNotifications(
  onMessage: (data: any) => void,
  onError?: (error: Event) => void
): EventSource {
  const eventSource = new EventSource(
    'http://localhost:8080/api/v1/notifications/subscribe' ,{
      withCredentials: true, // Gửi thông tin xác thực nếu cần
    }
  );

  eventSource.onmessage = (event: MessageEvent) => {
    try {
      const parsedData = JSON.parse(event.data);
      onMessage(parsedData);
    } catch (error) {
      console.error("Error parsing SSE message:", error);
    }
  };

  eventSource.onerror = (error: Event) => {
    console.error("SSE connection error:", error);
    if (onError) onError(error);
    eventSource.close(); // Đóng kết nối nếu xảy ra lỗi
  };

  return eventSource;
}
