"use client";
import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import UpdateProductCard from "../_components/UpdateProductCard";
import AddedProductCard from "../_components/AddedProductCard";

const tabsData = [
  {
    label: "Updated Product",
    value: "updated_product",
  },
  {
    label: "Added Product",
    value: "added-product",
  },
];

const UserActivity = () => {
  const [tab, setTab] = useState("updated_product");
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-users"],
    queryFn: () =>
      APIKit.we.employees.getAllEmployeeActivity(id).then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  console.log(data);
  return (
    <div className="flex flex-col gap-4 px-2 py-4">
      <SectionTitle title={"Activities"} />
      <div className="bg-white w-full border border-gray-300 rounded-md px-3 py-2 flex flex-col gap-3">
        <p className="text-lg font-semibold text-gray-700">Overview</p>
        <div className="flex items-center justify-between divide-x w-full">
          <div className="w-full">
            <p className="text-3xl text-gray-600 font-bold">
              {data?.totalUpdatedCount}
            </p>
            <p className="text-base text-gray-500 font-medium">
              Product updated
            </p>
          </div>
          <div className="w-full px-3">
            <p className="text-3xl text-gray-600 font-bold">
              {data?.totalAddedCount}
            </p>
            <p className="text-base text-gray-500 font-medium">Product added</p>
          </div>
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex">
          {tabsData.map((tab) => (
            <Tab
              key={tab?.value}
              onClick={() => setTab(tab?.value)}
              className={({ selected }) =>
                classNames(
                  "w-full py-3 px-4 text-sm font-medium leading-5 text-grey-400",
                  "ring-white leading-5 font-semibold focus:outline-none",
                  selected
                    ? ` text-primary transition ease-in-out duration-700 border-b-2 border-primary`
                    : "border-b-2 transition ease-in-out duration-700 border-grey-300"
                )
              }
            >
              {tab?.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      {tab === "updated_product" ? (
        <div>
          {data?.updated?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data?.updated?.map((item) => (
                <UpdateProductCard key={item?._id} item={item} />
              ))}
            </div>
          ) : (
            <p>No product updated</p>
          )}
        </div>
      ) : (
        <div>
          {data?.added?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data?.added?.map((item) => (
                <AddedProductCard key={item?._id} item={item} />
              ))}
            </div>
          ) : (
            <p>No product added</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserActivity;
