import React, { useEffect, useState } from "react";

const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Tạo kết nối tới API
    const eventSource = new EventSource('http://localhost:8080/api/v1/notifications/subscribe',{
        withCredentials:true
    });

    // Lắng nghe dữ liệu
    eventSource.onmessage = (event: MessageEvent) => {
      console.log("Received:", event.data);
      try {
        const parsedData = JSON.parse(event.data);
        setNotifications((prev) => [...prev, parsedData.message]);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    };

    // Lắng nghe lỗi
    eventSource.onerror = (error: Event) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    // Đóng kết nối khi component bị unmount
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;