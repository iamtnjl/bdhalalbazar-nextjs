"use client"
import TopNavBar from "@/components/shared/TopNavBar";
import BottomNavbar from "@/components/shared/BottomNavbar";
import { CartProvider } from "@/providers/CartProvider";

export default function RootLayout({ children }) {
  return (
    <div>
      <CartProvider>
        <TopNavBar />
        {children}
        <BottomNavbar />
      </CartProvider>
    </div>
  );
}
