"use client";

import { useCart } from "@/providers/CartProvider";
import {
  HomeIcon,
  LayersIcon,
  ShoppingBag,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const BottomNavbar = () => {
  const pathname = usePathname();
  const { cart } = useCart();
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow-md flex items-center gap-2 justify-between px-4 pb-1 pt-2 z-50">
      <Link
        href="/home"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/home" ? "bg-primary-100" : ""
        }`}
      >
        <HomeIcon
          className={`${
            pathname === "/home" ? "text-primary" : "text-gray-700"
          }`}
        />
        <p
          className={`${
            pathname === "/home" ? "text-primary" : "text-gray-700"
          }`}
        >
          {t("navigation.home")}
        </p>
      </Link>
      <Link
        href="/cart"
        className={`flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md   ${
          pathname === "/cart" ? "bg-primary-100" : ""
        }`}
      >
        <div className="relative">
          <ShoppingCart
            className={pathname === "/cart" ? "text-primary" : "text-gray-700"}
          />
          <p
            className={`${
              pathname === "/cart" ? "text-primary" : "text-gray-700"
            }`}
          >
            {t("navigation.cart")}
          </p>
          {cart?.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>
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
          {t("navigation.categories")}
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
          {t("navigation.products")}
        </p>
      </Link>
      {/* <Link
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
          Account
        </p>
      </Link> */}
    </div>
  );
};

export default BottomNavbar;
