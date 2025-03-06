import { Figtree } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/shared/TopNavBar";
import BottomNavbar from "@/components/shared/BottomNavbar";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Favmine.com",
  description: "All Your Need in One Place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} max-w-3xl mx-auto bg-primary-bg pb-[82px]`}
      >
        <TopNavBar />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
