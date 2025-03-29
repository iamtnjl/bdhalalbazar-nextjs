"use client";

import { ArrowRight, LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

import { inject, observer } from "mobx-react";
import Link from "next/link";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";
import { useRouter } from "next/navigation";

const UserPanel = ({ meStore: { me } }) => {
  const router = useRouter();
  return (
    <div className="px-2 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-6 items-center pt-4">
        <div className="h-[150px] w-[150px] overflow-hidden rounded-full border border-primary">
          <Image
            alt="profile-picture"
            src={me.images.original || "/placeholders/user-placeholder.jpg"}
            height={150}
            width={150}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <p className="text-2xl text-gray-700 font-bold">{me.name}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <p className="text-lg font-bold text-gray-700 pb-1">
            Account Information
          </p>
          <div className="border border-gray-200 w-full" />
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-500 font-medium text-base">Name</label>
          <p className="text-gray-700 font-bold text-lg">{me.name}</p>
        </div>
        {me.email ? (
          <div className="flex flex-col mt-3">
            <label className="text-gray-500 font-medium text-base">Email</label>
            <p className="text-gray-700 font-bold text-lg">{me.email}</p>
          </div>
        ) : null}

        <div className="flex flex-col mt-3">
          <label className="text-gray-500 font-medium text-base">Phone</label>
          <p className="text-gray-700 font-bold text-lg">{me.phone}</p>
        </div>
        {me.address.length > 0 ? (
          <div className="flex flex-col mt-3">
            <label className="text-gray-500 font-medium text-base">
              Address
            </label>
            <p className="text-gray-700 font-bold text-lg">{`${me.address[0].street}, ${me.address[0].city}, ${me.address[0].zip}`}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/me/orders"
          className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
        >
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            My orders
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </Link>
        <Link
          href="/me/edit-profile"
          className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
        >
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Edit Profile
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </Link>
        <Link
          href="/me/addresses"
          className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200"
        >
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Add/Edit Address
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </Link>

        <div
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            router.push("/home");
          }}
          className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-warning"
        >
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Logout
          </p>
          <LogOut height={20} width={20} className="text-warning" />
        </div>
      </div>
    </div>
  );
};

export default inject("meStore")(observer(UserPanel));
