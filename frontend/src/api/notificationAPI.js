// src/api/notificationAPI.js

import { authFetch } from "./authFetch";

const API_URL = "http://127.0.0.1:8000/client_portal/api/v1/";

/**
 * Fetches all notifications.
 * @returns {Promise<Array>} - Array of notification objects.
 */
export const fetchNotifications = async () => {
  try {
    console.log("Fetching all notifications...");

    const data = await authFetch(`${API_URL}notifications/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Notifications fetched:", data);
    return data.map((notification) => ({
      id: notification.notification_id,
      message: notification.message,
      type: notification.type,
      createdAt: notification.created_at,
      read: notification.read,
      // Add other fields as needed
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};