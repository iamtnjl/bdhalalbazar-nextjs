"use client";

import { formatCurrency } from "@/common/helpers/UtilKit";
import { Transition } from "@headlessui/react";
import Image from "next/image";

const CheckoutProductCard = ({ product, expand, animate }) => {
  const calculateDiscount = (price, discount) =>
    price - (price * discount) / 100;

  return (
    <Transition.Root show={true}>
      <Transition
        show={animate}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div>
          <div
            className={
              expand
                ? `w-full rounded-md border border-gray-300 justify-between flex flex-col p-3 gap-3 bg-white`
                : `w-full`
            }
          >
            <div className="flex items-start gap-3">
              {/* Image */}
              {expand && (
                <img
                  alt="product-image"
                  className="w-16 h-16 object-cover rounded-md border-2 border-gray-200"
                  src={product?.product?.primary_image?.original || ""}
                />
              )}

              {/* Description */}
              <div className="w-full">
                {expand && (
                  <div className="flex flex-shrink">
                    <p className="text-base">
                      <span className="font-bold text-base">
                        {product?.product?.name}
                      </span>
                    </p>
                  </div>
                )}
                {expand && (
                  <p className="text-xs md:text-xs text-gray-400">
                    {product?.product?.materials
                      .map((item) => item.name)
                      .join(", ")}
                  </p>
                )}
                {expand && (
                  <p className="text-xs md:text-xs text-gray-400">
                    {product?.product?.categories
                      .map((item) => item.name)
                      .join(", ")}
                  </p>
                )}
                {expand && (
                  <p className="text-xs md:text-xs text-gray-400">
                    {product?.product?.colors
                      .map((item) => item.name)
                      .join(", ")}
                  </p>
                )}
                {expand && (
                  <p className="text-xs md:text-xs text-gray-400">
                    {`Weight: ${product?.product?.weight} ${product?.product?.unit}`}
                  </p>
                )}
              </div>
            </div>
            {expand && (
              <div className="flex items-center justify-between gap-2 w-full">
                <div>
                  {product?.product?.discount === 0 ? (
                    <p className="text-sm font-bold text-gray-600">
                      <span>
                        ৳{formatCurrency(product?.product?.price, ",")}
                      </span>
                      <span className="text-grey-500">
                        {" "}
                        x {product?.quantity}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-gray-600 flex gap-3">
                      <span className="line-through">
                        ৳{formatCurrency(product?.product?.price, ",")}
                      </span>
                      <span className="text-primary font-bold text-sm">
                        ৳
                        {formatCurrency(
                          calculateDiscount(
                            product?.product?.price,
                            product?.product?.discount
                          ),
                          ","
                        )}
                        <span className="text-grey-500">
                          {" "}
                          x {product?.quantity}
                        </span>
                      </span>
                    </p>
                  )}
                </div>
                <p className="text-primary font-semibold">
                  ৳{formatCurrency(product?.final_price, ",")}
                </p>
              </div>
            )}
          </div>
        </div>
      </Transition>
      <Transition
        show={!animate}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div>
          {!expand && (
            <>
              <hr />
              <div className="flex items-center justify-between gap-2 mt-3">
                <div className="flex flex-shrink">
                  <p className="text-base">
                    <span className="font-bold text-base">
                      {product?.product?.name}
                    </span>
                    <span className="text-base font-semibold text-grey-500 ml-4">
                      x {product?.quantity}
                    </span>
                  </p>
                </div>
                <span className="text-primary font-semibold">
                  ৳{formatCurrency(product?.final_price, ",")}
                </span>
              </div>
            </>
          )}
        </div>
      </Transition>
    </Transition.Root>
  );
};

export default CheckoutProductCard;
