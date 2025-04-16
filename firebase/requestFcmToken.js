import { getToken } from "firebase/messaging";
import { messaging } from "./config";
import APIKit from "@/common/helpers/APIKit";

export async function requestFcmToken() {
  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (token) {
      console.log("FCM Token:", token);

      await APIKit.me.postFcmToken({ token });
    } else {
      console.log("No FCM token available. Permission might be required.");
    }
  } catch (error) {
    console.error("Failed to get FCM token", error);
  }
}
