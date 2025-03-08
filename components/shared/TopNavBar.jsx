import Image from "next/image";
import { Bell, MessageSquareText } from "lucide-react";

const TopNavbar = () => {
  return (
    <nav className="px-4 py-3 bg-white  shadow-sm flex items-center justify-between sticky top-0 z-50 rounded-bl-md rounded-br-md">
      <div className="flex gap-2 items-center">
        <Image alt="logo" src={"/logo/logo.png"} width={40} height={40} />
        <p className="text-primary-600 text-[22px] font-bold">Favmine.com</p>
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Bell className="text-gray-700" height={22} width={22} />
        </div>
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <MessageSquareText className="text-gray-700" height={22} width={22} />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
