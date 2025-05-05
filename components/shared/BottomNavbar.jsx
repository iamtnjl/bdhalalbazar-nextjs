"use client";

import { HomeIcon, LayersIcon, ShoppingBag, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow-md flex items-center gap-2 justify-between px-4 pb-1 pt-2 z-50">
      <Link
        href="/home"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/home" ? "bg-primary-100" : ""
        }`}
      >
        <HomeIcon
          className={`${pathname === "/" ? "text-primary" : "text-gray-700"}`}
        />
        <p className={`${pathname === "/" ? "text-primary" : "text-gray-700"}`}>
          Home
        </p>
      </Link>
      <Link
        href={"/categories"}
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/categories" ? "bg-primary-100" : ""
        }`}
      >
        <LayersIcon
          className={`${
            pathname === "/categories" ? "text-primary" : "text-gray-700"
          }`}
        />
        <p
          className={`${
            pathname === "/categories" ? "text-primary" : "text-gray-700"
          }`}
        >
          Categories
        </p>
      </Link>

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
