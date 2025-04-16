"use client";
import { useEffect } from "react";
import { requestFcmToken } from "@/firebase/requestFcmToken";

const NotificationProvider = () => {
  useEffect(() => {
    requestFcmToken();
  }, []);

  return null;
};

export default NotificationProvider;
