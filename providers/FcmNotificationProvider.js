"use client";
import useFcmNotifications from "@/common/hooks/useFcmNotifications";

const FcmNotificationProvider = () => {
  useFcmNotifications();
  return null;
};

export default FcmNotificationProvider;
