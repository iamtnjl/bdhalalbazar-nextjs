"use client";
import SuperAuthGuard from "@/components/HOC/SuperAuthGuard";
import WeNavbar from "@/components/shared/WeNavbar";
import dynamic from "next/dynamic";

const NotificationProvider = dynamic(
  () => import("@/providers/NotificationsProvider"),
  { ssr: false }
);

const WeLayout = ({ children }) => {
  return (
    <SuperAuthGuard>
      <WeNavbar />
      {children}
      <NotificationProvider />
    </SuperAuthGuard>
  );
};

export default WeLayout;
