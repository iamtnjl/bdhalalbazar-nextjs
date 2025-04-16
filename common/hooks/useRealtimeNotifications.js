import { database, ref, onValue } from "@/firebase/config";
import { useEffect, useState } from "react";

export const useRealtimeNotifications = (userRole) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationRef = ref(database, "notifications");

    return onValue(notificationRef, (snapshot) => {
      const data = snapshot.val() || {};
      const filtered = Object.entries(data)
        .filter(([_, value]) => value.roles.includes(userRole))
        .map(([id, value]) => ({ id, ...value }));

      setNotifications(filtered.reverse());
    });
  }, [userRole]);

  return notifications;
};
