"use client";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/common/helpers/UtilKit";
import { ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import QuantityButton from "./QuantityButton";
import APIKit from "@/common/helpers/APIKit";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { t } = useTranslation();
  const cartItem = cart.find((item) => item.productId === product._id);

  return (
    <div className="bg-white p-2 rounded-md shadow-sm">
      <div className="group flex flex-col gap-2 justify-between h-full">
        <Link
          href={`/products/${product._id}`}
          className="group flex flex-col gap-2 justify-between h-full"
        >
          <img
            className="cursor-pointer group-hover:scale-[1.01] group-hover:opacity-75 rounded-md w-full  object-cover object-center"
            src={
              product?.primary_image.original ||
              "/placeholders/no-image-square.jpg"
            }
            alt="popular-product"
          />
          <div className="flex flex-col pointer-events-none whitespace-nowrap">
            <h3 className="font-medium text-gray-900 truncate">
              {product?.name}
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-lg text-gray-600 line-through">৳</p>
              <p className="text-lg text-primary font-bold ">
                {formatCurrency(product?.discounted_price, ",")}
              </p>
              <p className="text-base text-gray-600 line-through">
                {formatCurrency(product?.price, ",")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-normal text-gray-600">
                Weight: {`${product?.weight} ${product?.unit}` || "N/A"}
              </h3>
              <h3 className="flex items-center gap-1 text-xs font-normal text-gray-600">
                <Truck height={12} width={12} className="text-gray-500" />
                {"1 Hour (Pabna Pourosava)"}
              </h3>
            </div>
          </div>
        </Link>
        {!cartItem ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product._id, 1);
              return APIKit.facebook.track({ eventName: "Add_to_cart" });
            }}
            variant="primary"
            extraClassName="w-full"
          >
            <ShoppingCart className="w-[18px] h-[18px] mr-2 mb-[3px] whitespace-nowrap" />
            {t("ctaButton.addToCart")}
          </Button>
        ) : (
          <QuantityButton cartItem={cartItem} product={product} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
