"use client"

import UserAuthGuard from "@/components/HOC/UserAuthGuard";

const MeLayout = ({ children }) => {
  return (
    <div>
      <UserAuthGuard>{children}</UserAuthGuard>
    </div>
  );
};

export default MeLayout;
