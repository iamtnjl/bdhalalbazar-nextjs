import React from "react";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
  return (
    <div className="bg-white p-2 rounded-md shadow-sm">
      <Link href="/register" className="group">
        <Image
          className="cursor-pointer group-hover:scale-[1.01] group-hover:opacity-75 rounded-md"
          width={600}
          height={600}
          src={"/images/img-1.jpg"}
          loading="lazy"
          decoding="async"
          alt="popular-product"
        />
        <div className="flex flex-col items-start pt-3 w-full">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col truncate pointer-events-none">
                <h3 className="font-medium text-gray-900 truncate">
                  Product Name
                </h3>
                <h3 className="text-xs font-normal text-gray-600">
                  Manufacturer Name
                </h3>

                <h3 className="text-xs font-normal text-gray-600">
                  Color: Black
                </h3>
                <h3 className="text-xs font-normal text-gray-600">
                  {"Delivery: 24H (Dhaka)"}
                </h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-gray-600 line-through">$100</p>
                  <p className="text-lg text-primary font-bold ">$85</p>
                </div>
                <Button variant="teal">Order Now!</Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
