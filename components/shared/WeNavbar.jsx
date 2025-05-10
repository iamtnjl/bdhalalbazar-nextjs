"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Bars4Icon,
  ClipboardDocumentListIcon,
  CubeIcon,
  DocumentChartBarIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";
import LeftSideDrawer from "./LeftSideDrawer";
import Image from "next/image";
import { Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/we" },
  {
    name: "Customers",
    icon: UserGroupIcon,
    href: "/we/customers",
  },
  {
    name: "Orders",
    icon: ClipboardDocumentListIcon,
    href: "/we/orders",
  },
  {
    name: "Orders Summary",
    icon: DocumentChartBarIcon,
    href: "/we/orders-summary",
  },
  {
    name: "All Products",
    icon: CubeIcon,
    href: "/we/products",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/we/settings",
  },
];

function NavListWithIcons({ setOpen }) {
  const activeRoute = usePathname();
  const isActiveRoute = (activeNavLink) => activeRoute === activeNavLink;

  return (
    <nav className="space-y-2" aria-label="Sidebar">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            isActiveRoute(item.href) &&
            "bg-primary-100 hover:bg-primary-100 text-primary hover:text-primary"
          }`}
          aria-current={item.current ? "page" : undefined}
        >
          <item.icon
            className={`text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${
              isActiveRoute(item.href) && "text-primary"
            }`}
            aria-hidden="true"
          />
          <h2 className="truncate font-normal text-sm">{item.name}</h2>
        </Link>
      ))}
    </nav>
  );
}

function WeNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile menu */}
      <nav className="sticky inset-0 top-0 z-50" aria-label="Top">
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <div className="mx-auto w-full px-4">
              <div className="flex py-2 min-h-16 items-center justify-start">
                <div className="w-full">
                  <div className="flex gap-2 items-center">
                    <div className="cursor-pointer">
                      <Button onClick={() => setDrawerOpen(true)}>
                        <Bars4Icon
                          className="block h-7 w-7"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 justify-between w-full">
                      <div className="flex gap-1 items-center">
                        <Image
                          alt="logo"
                          src={"/logo/logo.png"}
                          width={50}
                          height={50}
                        />
                        <p className="bg-gradient-to-tr from-indigo-700 to-cyan-600 bg-clip-text text-transparent text-3xl font-semibold tracking-wide font-vibes italic">
                          HalalBazar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawers */}
      <LeftSideDrawer open={drawerOpen} setOpen={setDrawerOpen}>
        <NavListWithIcons setOpen={setDrawerOpen} />
      </LeftSideDrawer>
    </>
  );
}

export default WeNavbar;
