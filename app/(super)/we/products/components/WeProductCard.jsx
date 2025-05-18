"use client";

import { formatCurrency } from "@/common/helpers/UtilKit";
import {
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProductStatusToggle from "./ProductStatusToggle";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import toast from "react-hot-toast";
import APIKit from "@/common/helpers/APIKit";

const WeProductCard = ({ item, refetch }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteProduct = (id) => {
    const promise = APIKit.we.products
      .deleteProduct(item?._id)
      .then(() => {
        refetch();
      })
      .catch((e) => {
        throw e;
      });
    return toast.promise(promise, {
      loading: "Deleting...",
      success: "Successfully deleted.",
      error: "Something went wrong!",
    });
  };
  return (
    <div className="col-span-1 rounded-lg bg-white shadow border">
      {/* Product Details */}
      <div className="flex w-full justify-between space-x-4 p-4">
        <div className="flex-1 truncate space-y-2">
          <p className="truncate text-sm font-medium text-gray-900">
            {item.name}
          </p>
          <div className="flex items-center space-x-3 mt-1">
            <h3 className="truncate text-sm text-grey-500">
              {item.categories.map((item) => item?.name).join(", ")}
            </h3>
            {item.brand.length > 0 ? (
              <h3 className="truncate text-sm text-grey-500">
                {item.brand.map((item) => item?.name).join(", ")}
              </h3>
            ) : null}
          </div>
          <ProductStatusToggle product={item} refetch={refetch} />
        </div>
        <img
          className="h-16 w-16 flex-shrink-0 rounded-md"
          src={item?.primary_image?.original}
          alt={item.name}
        />
      </div>
      {/* Prices and stocks */}
      <div className="pt-2 pb-4 px-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="truncate">
            <h3 className="truncate text-sm font-medium text-gray-500">
              Price
            </h3>
            <div className="mt-1 truncate font-semibold text-sm text-gray-900">
              <span>৳ {formatCurrency(item?.price, ",")}</span>
            </div>
          </div>
          <div className="truncate">
            <h3 className="truncate text-sm font-medium text-gray-500 ">
              Weight
            </h3>
            <div className="mt-1 truncate text-sm font-semibold text-gray-900 flex gap-2 items-center">
              <span>{item?.weight || "N/A"}</span>
              <span>{item?.unit || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="truncate">
            <h3 className="truncate text-sm font-medium text-gray-500 ">
              Discount %
            </h3>
            <div className="mt-1 truncate text-sm font-semibold text-gray-900">
              <span>{item?.discount}%</span>
            </div>
          </div>

          <div className="truncate">
            <h3 className="truncate text-sm font-medium text-gray-500">
              Final Price
            </h3>
            <div className="mt-1 truncate text-sm font-semibold text-gray-900">
              <span>৳ {formatCurrency(item?.discounted_price, ",")}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="-ml-px flex w-0 flex-1">
            <button
              className={`flex justify-start items-center w-full px-4 py-3 text-sm font-medium text-gray-700 gap-2 border-t`}
              onClick={() => {
                router.push(`/we/products/edit?id=${item?._id}`);
              }}
            >
              <PencilSquareIcon className="h-5 w-5 text-gray-400" />
              Edit
            </button>
          </div>
          <div className="flex w-0 flex-1">
            <button
              className="flex justify-start items-center w-full px-4 py-3 text-sm font-medium text-gray-700 gap-2 border-t"
              onClick={() => {
                setIsConfirmationModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <p className="mt-[3px]">Delete</p>
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title="Are you sure?"
        message={`Are you sure to delete product ${item?.name}?`}
        closeModal={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
};

export default WeProductCard;
