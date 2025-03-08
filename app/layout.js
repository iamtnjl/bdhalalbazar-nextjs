import { Figtree } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/shared/TopNavBar";
import BottomNavbar from "@/components/shared/BottomNavbar";
import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "@/TanstackQuery/TanstackQueryhProvider";

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
        <TanstackQueryProvider>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #ddd",
                padding: "8px",
                color: "#333",
              },
            }}
          />
          <TopNavBar />
          {children}
          <BottomNavbar />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
