import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import API_BASE from '../config/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notifications/`);
      console.log("Fetched notifications:", res.data);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE}/notifications/${id}/read/`);
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ color: "#f8fafc" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>Notifications</h3>

      {notifications.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No notifications yet.</p>
      ) : (
        notifications.map(notification => (
          <div
            key={notification.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              backgroundColor: notification.is_read
                ? "#1e293b"
                : "#0f172a",
              border: notification.is_read
                ? "1px solid #1e293b"
                : "1px solid #2563eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => !notification.is_read && markAsRead(notification.id)}
          >
            <div>
              <p style={{ margin: 0 }}>{notification.message}</p>
              <small style={{ opacity: 0.6 }}>
                {new Date(notification.created_at).toLocaleString()}
              </small>
            </div>

            {!notification.is_read && (
              <CheckCircle size={18} color="#22c55e" />
            )}
          </div>
        ))
      )}
    </div>
  );
}