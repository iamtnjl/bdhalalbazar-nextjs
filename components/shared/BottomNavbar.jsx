import {
  FileCheck,
  HomeIcon,
  ShoppingBag,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow-md flex items-center gap-2 justify-between px-4 pb-1 pt-2 z-50">
      <Link
        href="/"
        className="flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md  bg-primary-100"
      >
        <HomeIcon className="text-primary"/>
        <p className="text-primary">Home</p>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md  active:bg-primary-100"
      >
        <ShoppingCart />
        <p>Cart</p>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md  active:bg-primary-100"
      >
        <ShoppingBag />
        <p>Product</p>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center  text-sm font-normal w-full py-2 rounded-md  active:bg-primary-100"
      >
        <UserCog />
        <p>My Account</p>
      </Link>
    </div>
  );
};

export default BottomNavbar;
