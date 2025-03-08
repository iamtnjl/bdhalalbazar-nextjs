"use client";
import { HomeIcon, ShoppingBag, ShoppingCart, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow-md flex items-center gap-2 justify-between px-4 pb-1 pt-2 z-50">
      <Link
        href="/"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/" ? "bg-primary-100" : ""
        }`}
      >
        <HomeIcon
          className={`${pathname === "/" ? "text-primary" : "text-gray-700"}`}
        />
        <p className={`${pathname === "/" ? "text-primary" : "text-gray-700"}`}>
          Home
        </p>
      </Link>
      <div
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/cart" ? "bg-primary-100" : ""
        }`}
      >
        <ShoppingCart
          className={`${
            pathname === "/cart" ? "text-primary" : "text-gray-700"
          }`}
        />
        <p
          className={`${
            pathname === "/cart" ? "text-primary" : "text-gray-700"
          }`}
        >
          Cart
        </p>
      </div>
      <Link
        href="/products"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/products" ? "bg-primary-100" : ""
        }`}
      >
        <ShoppingBag
          className={`${
            pathname === "/products" ? "text-primary" : "text-gray-700"
          }`}
        />
        <p
          className={`${
            pathname === "/products" ? "text-primary" : "text-gray-700"
          }`}
        >
          Product
        </p>
      </Link>
      <Link
        href="/me"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/me" ? "bg-primary-100" : ""
        }`}
      >
        <UserCog
          className={`${pathname === "/me" ? "text-primary" : "text-gray-700"}`}
        />
        <p
          className={`${pathname === "/me" ? "text-primary" : "text-gray-700"}`}
        >
          My Account
        </p>
      </Link>
    </div>
  );
};

export default BottomNavbar;
