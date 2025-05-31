"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import LogoCartSkeleton from "../skeleton/LogoCartSkeleton";

const TopNavbar = () => {
  const pathname = usePathname();
  const [deviceId, setDeviceId] = useState(false);
  const [isDeviceIdReady, setIsDeviceIdReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDeviceId = localStorage.getItem("deviceId");
      setDeviceId(storedDeviceId);
      setIsDeviceIdReady(true); // mark that deviceId fetching is complete
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["/cart"],
    queryFn: () => APIKit.public.getCart({ deviceId }).then(({ data }) => data),
    enabled: !!deviceId,
    retry: false,
    keepPreviousData: true,
  });

  // Prevent flickering: show skeleton if deviceId isn't ready or data is loading
  if (!isDeviceIdReady || isLoading) {
    return <LogoCartSkeleton />;
  }

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-gray-50 px-2 py-1 w-full flex justify-end">
        <Link href={"/privacy-policy"} className="text-xs text-gray-500 font-semibold self-end underline">
          Privacy & Policy
        </Link>
      </div>
      <nav className="px-4 py-3 bg-white shadow-sm flex items-center justify-between rounded-bl-md rounded-br-md">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 items-center">
            <Image alt="logo" src={"/logo/logo.png"} width={50} height={50} />
            <p className="bg-gradient-to-tr from-primary-700 to-cyan-600 bg-clip-text text-transparent text-3xl font-semibold">
              BDHalalBazar
            </p>
          </div>
          <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <Link href={"/cart"}>
              <div className="relative">
                <ShoppingCart
                  className={
                    pathname === "/cart" ? "text-primary" : "text-gray-700"
                  }
                />
                {data?.cart_products?.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {data.cart_products.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
