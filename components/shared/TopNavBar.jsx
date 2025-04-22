"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";

const TopNavbar = () => {
  const pathname = usePathname();
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedDeviceId = localStorage.getItem("deviceId");

      setDeviceId(storedDeviceId);
    }
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["/cart"],
    queryFn: () => APIKit.public.getCart({ deviceId }).then(({ data }) => data),
    keepPreviousData: true,
    enabled: !!deviceId,
    retry: false,
  });

  if (isLoading) {
    return "Loading...";
  }
  return (
    <nav className="px-4 py-3 bg-white  shadow-sm flex items-center justify-between sticky top-0 z-50 rounded-bl-md rounded-br-md">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-1 items-center">
          <Image alt="logo" src={"/logo/logo.png"} width={50} height={50} />
          <p className="bg-gradient-to-tr from-primary-700 to-cyan-600 bg-clip-text text-transparent text-3xl font-semibold">
            BDHalalBazar
          </p>
        </div>
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Link href={"/cart"} className={`relative `}>
            <div className="relative">
              <ShoppingCart
                className={`${
                  pathname === "/cart" ? "text-primary" : "text-gray-700"
                }`}
              />
              {data?.cart_products?.length > 0 ? (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {data?.cart_products?.length}
                </span>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="flex items-start gap-4">
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Bell className="text-gray-700" height={22} width={22} />
        </div>
        <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <MessageSquareText className="text-gray-700" height={22} width={22} />
        </div>
      </div> */}
    </nav>
  );
};

export default TopNavbar;
