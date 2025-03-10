"use client";
import { useCart } from "@/providers/CartProvider";
import { HomeIcon, ShoppingBag, ShoppingCart, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const { cart } = useCart();
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow-md flex items-center gap-2 justify-between px-4 pb-1 pt-2 z-50">
      <Link
        href="/home"
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
      <Link
        href={"/cart"}
        className={`relative flex flex-col items-center text-sm font-normal w-full py-2 rounded-md ${
          pathname === "/cart" ? "bg-primary-100" : ""
        }`}
      >
        <div className="relative">
          <ShoppingCart
            className={`${
              pathname === "/cart" ? "text-primary" : "text-gray-700"
            }`}
          />
          {cart?.length > 0 ? (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cart?.length}
            </span>
          ) : null}
        </div>
        <p
          className={`${
            pathname === "/cart" ? "text-primary" : "text-gray-700"
          }`}
        >
          Cart
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
