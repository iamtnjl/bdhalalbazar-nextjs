import { ArrowRight, LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserPanel = () => {
  return (
    <div className="px-2 w-full h-screen flex flex-col gap-4 md:mb-32">
      <div className="flex flex-col gap-6 items-center px-10 py-6">
        <Image
          alt="profile-picture"
          src={"/images/placeholder-pp.png"}
          height={150}
          width={150}
          className="rounded-full border border-primary"
        />
        <p className="text-2xl text-gray-700 font-bold">The full user name</p>
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
          <p className="text-gray-700 font-bold text-lg">User Name</p>
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-500 font-medium text-base">Email</label>
          <p className="text-gray-700 font-bold text-lg">someone@example.com</p>
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-500 font-medium text-base">Phone</label>
          <p className="text-gray-700 font-bold text-lg">+880123456789</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <div className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200">
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Edit Profile
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </div>
        <div className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200">
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Saved Address
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </div>
        <div className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-gray-200">
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            My orders
          </p>
          <ArrowRight height={20} width={20} className="text-primary" />
        </div>
        <div className=" px-4 py-2 cursor-pointer bg-white rounded-md w-full hover:text-primary  flex items-center justify-between border border-warning">
          <p className="text-lg font-medium  text-gray-700 hover:text-primary">
            Logout
          </p>
          <LogOut height={20} width={20} className="text-warning" />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
