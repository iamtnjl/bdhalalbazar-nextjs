"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import CheckoutProductCard from "./CheckoutProdcutCard";

function ExpandAbleProductCardList({ cart }) {
  const router = useRouter();
  const [expand, setExpand] = useState(false);
  const [animate, setAnimation] = useState(false);

  if (cart?.cart_products?.length === 0) return router.push("/products");

  return (
    <div className="sm:bg-white sm:border sm:px-4 sm:py-5 sm:rounded-lg sm:self-start flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base text-grey-500">Shopping Cart</h3>
        <div
          onClick={() => {
            setExpand(!expand);
            setAnimation(!animate);
          }}
          className="text-primary cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-5 h-5 transition duration-500 transform ${
                expand ? "rotate-[0deg]" : "rotate-[180deg]"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
            <span className="text-sm font-medium">
              {expand ? "Collapse" : "Expand"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {cart?.cart_products?.map((product, i) => (
          <CheckoutProductCard
            key={i}
            product={product}
            animate={animate}
            expand={expand}
          />
        ))}
        {!expand && <hr className="sm:hidden" />}
      </div>
    </div>
  );
}

export default ExpandAbleProductCardList;
