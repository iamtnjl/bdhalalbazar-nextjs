import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase/config";

const useFcmNotifications = () => {
  const isFcmSupported = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return false;

    const ua = navigator.userAgent || navigator.vendor || "";

    // Skip for known in-app browsers
    const isInApp = /FBAN|FBAV|Instagram|Messenger|Line|Snapchat|TikTok/.test(
      ua
    );

    // Skip if key APIs are missing
    const hasRequiredApis =
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    return !isInApp && hasRequiredApis;
  };
  useEffect(() => {
    if (!isFcmSupported()) {
      console.warn("🔕 FCM not supported in this browser.");
      return;
    }
    // ✅ Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          requestFcmToken(); // implement your token logic here
        }
      });
    }

    // ✅ Register service worker
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("✅ Service Worker registered:", registration);
      })
      .catch((err) => {
        console.error("❌ Service Worker registration failed:", err);
      });

    // ✅ Listen for foreground messages
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

// 🔍 Detect in-app browsers like Facebook, Instagram, Messenger, etc.
function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || "";
  return /FBAN|FBAV|Instagram|Messenger|Line|Snapchat|TikTok/.test(ua);
}

export default useFcmNotifications;
