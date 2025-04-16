import { useEffect } from "react";

import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase/config";

const useFcmNotifications = () => {
  useEffect(() => {
    // Request permission
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          requestFcmToken(); // get and send token if needed
        }
      });
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration);
        })
        .catch((err) => {
          console.error("❌ Service Worker registration failed:", err);
        });
    }

    // Foreground notification listener
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔔 Foreground FCM message received:", payload);

      const { title, body } = payload.notification || {};

      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/logo/logo.png",
        });
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useFcmNotifications;
