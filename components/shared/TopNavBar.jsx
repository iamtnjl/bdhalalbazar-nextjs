"use client";

import Image from "next/image";
import Link from "next/link";
import RightSideDrawer from "./RightSideDrawer";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import {
  ArrowRight,
  BookCheck,
  ListOrdered,
  LogIn,
  LogOut,
  MapPinHouse,
  Menu,
  UserPen,
  UserPlus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import LogoCartSkeleton from "../skeleton/LogoCartSkeleton";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const TopNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [token, setToken] = useState();
  const router = useRouter();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      setToken(token);
    }
  }, [token]);
  const { data: me, isLoading } = useQuery({
    queryKey: [`/me`, token],
    queryFn: () =>
      APIKit.me.getPublicProfile(token).then(({ data }) => data.user),
    retry: false,
    enabled: !!token,
  });

  if (isLoading) {
    return <LogoCartSkeleton />;
  }
  const changeLanguage = (lang) => {
    if (i18n.language === lang) return;

    i18n.changeLanguage(lang);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="px-4 py-3 bg-white shadow-sm flex items-center justify-between rounded-bl-md rounded-br-md">
        <div className="flex items-center justify-between w-full">
          <Link href={"/home"} className="flex gap-1 items-center">
            <Image alt="logo" src={"/logo/logo.png"} width={40} height={40} />
            <p className="bg-gradient-to-tr from-primary-700 to-cyan-600 bg-clip-text text-transparent text-2xl font-semibold">
              BDHalalBazar
            </p>
          </Link>
          {/* <div className="bg-primary-bg p-2 rounded-full hover:bg-gray-100 cursor-pointer">
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
          </div> */}
          {/* <div className="flex gap-1">
            <TabsInModal
              horizontalTabsOnly={true}
              tabs={languageTabs}
              current={selectedLanguage}
              setTab={setSelectedLanguage}
            />

            <Menu
              onClick={() => setOpenMenu(true)}
              height={32}
              width={32}
              className="text-primary"
            />
          </div> */}
          <div className="flex items-center border border-gray-200 rounded-full p-1 w-fit">
            <button
              onClick={() => changeLanguage("bn")}
              className={clsx(
                "text-sm font-semibold py-1 px-2 rounded-full",
                i18n.language === "bn"
                  ? "text-white bg-primary"
                  : "text-primary bg-transparent"
              )}
            >
              BN
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={clsx(
                "text-sm font-semibold py-1 px-2 rounded-full",
                i18n.language === "en"
                  ? "text-white bg-primary"
                  : "text-primary bg-transparent"
              )}
            >
              EN
            </button>
            <Menu
              onClick={() => setOpenMenu(true)}
              height={22}
              width={22}
              className="text-gray-700 mx-1"
            />
          </div>
        </div>
      </nav>

      <RightSideDrawer open={openMenu} setOpen={setOpenMenu}>
        <div className="border-b border-gray-200 pb-2">
          <SectionTitle
            title={me === undefined ? t("myProfile.menu") : t("myProfile.title")}
          />
        </div>
        <div className="py-4 w-full flex flex-col gap-6">
          {me && (
            <div className="flex flex-col gap-6 items-center pt-4">
              <div className="h-[150px] w-[150px] overflow-hidden rounded-full border border-primary">
                <Image
                  alt="profile-picture"
                  src={
                    me?.images?.original || "/placeholders/user-placeholder.jpg"
                  }
                  height={150}
                  width={150}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-2xl text-gray-700 font-bold">{me.name}</p>
            </div>
          )}

          {me && (
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-lg font-bold text-gray-700 pb-1">
                  {t("myProfile.accountInformation")}
                </p>
                <div className="border border-gray-200 w-full" />
              </div>
              <div className="flex flex-col mt-3">
                <label className="text-gray-500 font-medium text-base">
                  {t("myProfile.name")}
                </label>
                <p className="text-gray-700 font-bold text-lg">{me.name}</p>
              </div>
              {me.email ? (
                <div className="flex flex-col mt-3">
                  <label className="text-gray-500 font-medium text-base">
                    {t("myProfile.email")}
                  </label>
                  <p className="text-gray-700 font-bold text-lg">{me.email}</p>
                </div>
              ) : null}

              <div className="flex flex-col mt-3">
                <label className="text-gray-500 font-medium text-base">
                  {t("myProfile.phone")}
                </label>
                <p className="text-gray-700 font-bold text-lg">{me.phone}</p>
              </div>
              {me.address.length > 0 ? (
                <div className="flex flex-col mt-3">
                  <label className="text-gray-500 font-medium text-base">
                    {t("myProfile.address")}
                  </label>
                  <p className="text-gray-700 font-bold text-lg">{`${me.address[0].street}, ${me.address[0].city}, ${me.address[0].zip}`}</p>
                </div>
              ) : null}
            </div>
          )}

          {me && (
            <div className="flex flex-col gap-2">
              <Link
                onClick={() => setOpenMenu(false)}
                href="/me/orders"
                className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
              >
                <p className="text-lg font-medium  text-primary">
                  {t("myProfile.myOrder")}
                </p>
                <ListOrdered height={20} width={20} className="text-primary" />
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/me/edit-profile"
                className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
              >
                <p className="text-lg font-medium  text-primary">
                  {t("myProfile.editProfile")}
                </p>
                <UserPen height={20} width={20} className="text-primary" />
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/me/addresses"
                className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
              >
                <p className="text-lg font-medium  text-primary">
                  {t("myProfile.addAddress")}
                </p>
                <MapPinHouse height={20} width={20} className="text-primary" />
              </Link>

              {me?.role === "admin" ? (
                <Link
                  onClick={() => setOpenMenu(false)}
                  href="/we"
                  className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
                >
                  <p className="text-lg font-medium  text-primary">
                    {t("myProfile.adminPanel")}
                  </p>
                  <ArrowRight height={20} width={20} className="text-primary" />
                </Link>
              ) : null}

              <div
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN_KEY);
                  setOpenMenu(false);
                  setToken("");
                  router.push("/home");
                }}
                className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-warning"
              >
                <p className="text-lg font-medium  text-warning">
                  {t("myProfile.logOut")}
                </p>
                <LogOut height={20} width={20} className="text-warning" />
              </div>
            </div>
          )}
          <div>
            {!me && (
              <div className="flex flex-col gap-2">
                <Link
                  onClick={() => setOpenMenu(false)}
                  href="/login"
                  className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
                >
                  <p className="text-lg font-medium  text-primary">
                    {t("myProfile.login")}
                  </p>
                  <LogIn height={20} width={20} className="text-primary" />
                </Link>
                <Link
                  onClick={() => setOpenMenu(false)}
                  href="/register"
                  className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
                >
                  <p className="text-lg font-medium  text-primary">
                    {t("myProfile.register")}
                  </p>
                  <UserPlus height={20} width={20} className="text-primary" />
                </Link>
              </div>
            )}
            <Link
              onClick={() => setOpenMenu(false)}
              href="/privacy-policy"
              className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200 mt-2"
            >
              <p className="text-lg font-medium  text-primary">
                {t("myProfile.privacy")}
              </p>
              <BookCheck height={20} width={20} className="text-primary" />
            </Link>
          </div>
        </div>
      </RightSideDrawer>
    </div>
  );
};

export default TopNavbar;
