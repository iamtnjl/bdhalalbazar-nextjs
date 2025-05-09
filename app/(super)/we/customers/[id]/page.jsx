"use client";

import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

const CustomerDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["customer-details"],
    queryFn: () =>
      APIKit.we.customers
        .getCustomerDetails(params.id)
        .then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  console.log(data);
  return (
    <Suspense fallback={<div>{"Loading..."}</div>}>
      <div className="px-2 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full">
          <div className="h-[150px] w-[150px] overflow-hidden rounded-full border border-primary">
            <Image
              alt="profile-picture"
              src={
                data?.images?.original || "/placeholders/user-placeholder.jpg"
              }
              height={150}
              width={150}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <SectionTitle title={data?.name} />

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-lg font-bold text-gray-700 pb-1">
              Account Information
            </p>
            <div className="border border-gray-200 w-full" />
          </div>

          {data?.email ? (
            <div className="flex flex-col mt-3">
              <label className="text-gray-500 font-medium text-base">
                Email
              </label>
              <p className="text-gray-700 font-bold text-lg">{data?.email}</p>
            </div>
          ) : null}

          <div className="flex flex-col mt-3">
            <label className="text-gray-500 font-medium text-base">Phone</label>
            <p className="text-gray-700 font-bold text-lg">{data?.phone}</p>
          </div>
          {data?.address.length > 0 ? (
            <div className="flex flex-col mt-3">
              <label className="text-gray-500 font-medium text-base">
                Address
              </label>
              <p className="text-gray-700 font-bold text-lg">{`${data?.address[0].street}, ${data?.address[0].city}, ${data?.address[0].zip}`}</p>
            </div>
          ) : null}
        </div>
      </div>
    </Suspense>
  );
};

export default CustomerDetails;
