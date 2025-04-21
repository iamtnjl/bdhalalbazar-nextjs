"use client";
import Image from "next/image";
import { Bell, MessageSquareText } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import RightSideDrawer from "./RightSideDrawer";
import MenuContent from "./MenuContent";

const TopNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="px-4 py-3 bg-white  shadow-sm flex items-center justify-between sticky top-0 z-50 rounded-bl-md rounded-br-md">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-1 items-center">
          <Image alt="logo" src={"/logo/logo.png"} width={50} height={50} />
          <p className="bg-gradient-to-tr from-primary-700 to-cyan-600 bg-clip-text text-transparent text-3xl font-semibold">
            BDHalalBazar
          </p>
        </div>
        <Bars3Icon
          onClick={() => setOpen(true)}
          className="text-gray-800 size-8 cursor-pointer"
        />
      </div>
      {/* <div className="flex items-start gap-4">
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Bell className="text-gray-700" height={22} width={22} />
        </div>
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <MessageSquareText className="text-gray-700" height={22} width={22} />
        </div>
      </div> */}
      <RightSideDrawer open={open} setOpen={setOpen}>
        <MenuContent setOpen={setOpen} />
      </RightSideDrawer>
    </nav>
  );
};

export default TopNavbar;
