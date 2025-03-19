import { formatCurrency } from "@/common/helpers/UtilKit";
import {
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const WeProductCard = ({ item }) => {
  return (
    <div className="col-span-1 rounded-lg bg-white shadow border">
      {/* Product Details */}
      <div className="flex w-full justify-between space-x-4 p-4">
        <div className="flex-1 truncate">
          <p className="truncate text-sm font-medium text-gray-900">
            {item.name}
            {item?.unit && <span>-</span>}
            <span className="text-base">{`${item.unit || ""}` || ""}</span>
          </p>
          <div className="flex items-center space-x-3 mt-1">
            <h3 className="truncate text-sm text-grey-500">
              {item.colors.map((item) => item?.name).join(", ")}
            </h3>
            <h3 className="truncate text-sm text-grey-500">
              {item.categories.map((item) => item?.name).join(", ")}
            </h3>
            <h3 className="truncate text-sm text-grey-500">
              {item.materials.map((item) => item?.name).join(", ")}
            </h3>
          </div>
        </div>
        <Image
          width={500}
          height={500}
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
              <span>{formatCurrency(item?.price, ",")}</span>
            </div>
          </div>
          <div className="truncate">
            <h3 className="truncate text-sm font-medium text-gray-500 ">
              Weight
            </h3>
            <div className="mt-1 truncate text-sm font-semibold text-gray-900">
              <span>{item?.weight || "N/A"}</span>
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
              <span>{formatCurrency(item?.discounted_price, ",")}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              className="flex justify-start items-center w-full px-4 py-3 text-sm font-medium text-gray-700 gap-2 border-t"
              onClick={() => {
                //   viewProductOnClick(product);
              }}
            >
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              View Product
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              className={`flex justify-start items-center w-full px-4 py-3 text-sm font-medium text-gray-700 gap-2 border-t`}
              //   onClick={() => {
              //     editProductOnClick(product);
              //   }}
            >
              <PencilSquareIcon className="h-5 w-5 text-gray-400" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeProductCard;
