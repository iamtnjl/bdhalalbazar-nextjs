"use client";

import APIKit from "@/common/helpers/APIKit";
import { formatCurrency, formatDateTime, pick } from "@/common/helpers/UtilKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import OrderItemEditCard from "./components/OrderItemEditCard";

const EditOrder = () => {
  const params = useSearchParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-order-detail"],
    queryFn: () =>
      APIKit.we.orders
        .getOrderDetails(params.get("id"))
        .then(({ data }) => data),
    keepPreviousData: true,
  });

  if (isLoading) {
    return "Loading...";
  }

  const handleOrderStatusChange = (event) => {
    let values = {
      newStatus: event.target.value,
    };
    let payload = pick(values, Object.keys(values));
    const handleSuccess = () => {
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };

    const promise = APIKit.we.orders
      .updateOrderStatus(data?._id, payload)
      .then(handleSuccess)
      .catch(handleFailure);

    return toast.promise(promise, {
      loading: "Loading...",
      success: "Order status changed successfully!",
      error: (error) => {
        if (error?.response?.data) {
          const [errorKey] = Object.keys(error.response?.data);
          return error.response.data[errorKey][0];
        } else {
          return "Something went wrong";
        }
      },
    });
  };

  const ongoingStatus = data?.status?.find((item) => item.stage === "current");

  return (
    <div className="px-2 py-4 flex flex-col gap-6">
      <SectionTitle title={"Edit Order"} />
      <div>
        <div className="flex gap-4">
          <select
            className="rounded-md border-2 w-full py-2 pl-4 pr-8 text-sm font-medium  border-primary  focus:border-primary focus:ring-0"
            onChange={(e) => handleOrderStatusChange(e)}
            value={ongoingStatus?.slug}
          >
            {data?.status?.map((status) => (
              <option className="text-lg" key={status.slug} value={status.slug}>
                {status?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className="text-xs text-grey-500 font-semibold text-left flex justify-between lg:text-right mt-2">
          <span className="font-semibold text-gray-600 mb-1">
            Order #{data?.order_id}
          </span>
          <span>{formatDateTime(data?.createdAt, true)}</span>
        </div>
        <div className="text-grey-700 flex items-center gap-4">
          <p className="text-primary text-2xl font-bold">
            <span className="text-primary text-md">&#2547;</span>
            {formatCurrency(data?.grand_total, ",")}
          </p>
        </div>
      </div>
      <div className="text-xs text-grey-500 font-semibold">
        <h2 className="block text-base font-medium text-gray-800 mb-1">
          Customer Details
        </h2>
        <div className="text-grey-700 flex flex-col gap-1 bg-white border border-gray-300 p-2 rounded-lg cursor-not-allowed">
          <p className="font-bold  text-sm">{data?.name}</p>
          <p className="font-normal text-sm">{data?.phone}</p>
        </div>
      </div>
      <div className="text-xs text-grey-500 font-semibold">
        <span className="block text-base font-medium text-gray-800">
          Delivery Address
        </span>
        <div className="text-grey-700">
          {`${data?.address?.street}, ${data?.address?.city}, ${data?.address?.zip}`}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-base text-gray-800 mb-1">
          Order Products
        </h3>
        {data?.products.map((item, i) => (
          <OrderItemEditCard key={i} item={item} refetch={refetch} />
        ))}
      </div>
      <div className="text-xs text-grey-500 font-semibold mt-5">
        <h2 className="mb-1 font-medium text-base text-gray-800">
          Payment Breakdown
        </h2>
        {!data?.isPriceEdited ? (
          <div className="flex flex-col gap-[1px]">
            <div className="font-semibold flex justify-between items-center text-sm">
              <p className="text-gray-700">Sub Total:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.sub_total, ",")}
              </h2>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="font-normal text-gray-600">Discount:</p>
              <div className="flex items-center gap-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-grey-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H6"
                    />
                  </svg>
                </span>
                <h2 className="font-semibold text-grey-700">
                  <span className="font-semibold mr-1 text-sm text-grey-700">
                    &#2547;
                  </span>
                  {formatCurrency(data?.discount, ",")}
                </h2>
              </div>
            </div>
            <div className="font-medium flex justify-between items-center text-sm">
              <p className="text-gray-700">Delivery Charge:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.delivery_charge, ",")}
              </h2>
            </div>
            <div className="font-medium flex justify-between items-center text-sm">
              <p className="text-gray-700">Platform Fee:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.platform_fee, ",")}
              </h2>
            </div>

            <div className="font-bold flex justify-between items-center text-sm">
              <p className="font-bold text-gray-600">Total Order Price:</p>
              <h2 className="font-bold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.grand_total, ",")}
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[1px]">
            <div className="font-semibold flex justify-between items-center text-sm">
              <p className="text-gray-700">Sub Total:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.calculated_total_price, ",")}
              </h2>
            </div>
            <div className="font-medium flex justify-between items-center text-sm">
              <p className="text-gray-700">Delivery Charge:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.delivery_charge, ",")}
              </h2>
            </div>
            <div className="font-medium flex justify-between items-center text-sm">
              <p className="text-gray-700">Platform Fee:</p>
              <h2 className="font-semibold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.platform_fee, ",")}
              </h2>
            </div>

            <div className="font-bold flex justify-between items-center text-sm">
              <p className="font-bold text-gray-600">Total Order Price:</p>
              <h2 className="font-bold text-grey-700">
                <span className="text-grey-700 font-semibold mr-1 text-sm">
                  &#2547;
                </span>
                {formatCurrency(data?.grand_total, ",")}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditOrder;
