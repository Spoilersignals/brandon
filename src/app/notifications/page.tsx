"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Archive, Trash2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "READ" }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "TASK_ASSIGNED":
        return "📋";
      case "PROJECT_ASSIGNED":
        return "📁";
      case "PERFORMANCE_REVIEW":
        return "⭐";
      case "APPROVAL_REQUIRED":
        return "✅";
      default:
        return "🔔";
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.status === "UNREAD";
    if (filter === "read") return n.status === "READ";
    return true;
  });

  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </Button>
        <Button
          variant={filter === "read" ? "default" : "outline"}
          onClick={() => setFilter("read")}
        >
          Read ({notifications.length - unreadCount})
        </Button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all ${
              notification.status === "UNREAD"
                ? "border-l-4 border-l-blue-500 bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-medium ${notification.status === "UNREAD" ? "text-blue-900" : ""}`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.status === "UNREAD" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          notification.status === "UNREAD"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.status === "UNREAD" ? "New" : "Read"}
                      </span>
                    </div>
                  </div>
                  {notification.metadata && (
                    <div className="mt-2 p-2 bg-white rounded text-sm">
                      <pre className="text-xs text-gray-600">
                        {JSON.stringify(notification.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-center text-gray-500">
                {filter === "unread"
                  ? "No unread notifications"
                  : filter === "read"
                  ? "No read notifications"
                  : "No notifications yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
