"use client";
import TopNavBar from "@/components/shared/TopNavBar";
import BottomNavbar from "@/components/shared/BottomNavbar";
import { CartProvider } from "@/providers/CartProvider";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartProvider>
        <TopNavBar />
        {children}
        <BottomNavbar />
      </CartProvider>
    </Suspense>
  );
}
