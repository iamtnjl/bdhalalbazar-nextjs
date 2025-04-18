"use client";
import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/common/helpers/UtilKit";
import { Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import TextInputField from "../from/TextInputField";
import QuantityButton from "./QuantityButton";

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const cartItem = cart.find((item) => item.productId === product._id);

  return (
    <div className="bg-white p-2 rounded-md shadow-sm">
      <Link href={`/products/${product._id}`} className="group">
        <Image
          className="cursor-pointer group-hover:scale-[1.01] group-hover:opacity-75 rounded-md w-full h-[350px] object-cover object-center"
          width={600}
          height={600}
          src={
            product?.primary_image.original ||
            "/placeholders/no-image-square.jpg"
          }
          loading="lazy"
          decoding="async"
          alt="popular-product"
        />
        <div className="flex flex-col items-start pt-3 w-full">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col pointer-events-none whitespace-nowrap">
                <h3 className="font-medium text-gray-900 text-wrap">
                  {product?.name}
                </h3>
                <h3 className="text-xs font-normal text-gray-600">
                  Weight: {`${product?.weight} ${product?.unit}` || "N/A"}
                </h3>

                <h3 className="text-xs font-normal text-gray-600">
                  Brand: {product?.brand.map((item) => item.name).join(", ")}
                </h3>
              </div>
              <div className="flex flex-col items-end gap-2 w-full">
                <div className="flex items-end gap-2">
                  <p className="text-lg text-gray-600 line-through">৳</p>
                  <p className="text-lg text-primary font-bold ">
                    {formatCurrency(product?.discounted_price, ",")}
                  </p>
                  <p className="text-base text-gray-600 line-through">
                    {formatCurrency(product?.price, ",")}
                  </p>
                </div>
                {!cartItem ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addToCart(product._id, 1);
                    }}
                    variant="primary"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] mr-2 mb-[3px] whitespace-nowrap" />
                    Add to Cart
                  </Button>
                ) : (
                  <QuantityButton cartItem={cartItem} product={product} />
                )}
              </div>
            </div>
          </div>
          <h3 className="flex items-center gap-1 text-xs font-normal text-gray-600">
            <Truck hanging={15} width={15} className="text-gray-500" />
            {"1 Hour (Pabna Sadar)"}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
