"use client";
import SuperAuthGuard from "@/components/HOC/SuperAuthGuard";
import WeNavbar from "@/components/shared/WeNavbar";

const WeLayout = ({ children }) => {
  return (
    <SuperAuthGuard>
      <WeNavbar />
      {children}
    </SuperAuthGuard>
  );
};

export default WeLayout;
