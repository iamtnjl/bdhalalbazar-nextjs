"use client";

import { formatCurrency } from "@/common/helpers/UtilKit";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const CartProductItem = ({ product }) => {
  const calculateDiscount = (price, discount) =>
    price - (price * discount) / 100;

  const isPriceEdited = product.product.weight !== product.weight;

  const { i18n } = useTranslation();
  const name = product?.product?.name[i18n.language] || product?.product?.name;

  return (
    <div className="border rounded-lg w-full gap-3 border-gray-300 justify-between flex-col flex p-3 bg-white">
      <div className="flex items-start gap-3">
        {/* Image */}
        <img
          alt="product-image"
          className="w-16 h-16 object-cover rounded-md border-2 border-gray-200"
          src={product?.product?.primary_image.original}
        />
        {/* Description */}
        <div className="w-full">
          <div className="flex flex-shrink">
            <p className="text-base">
              <span className="font-bold text-base">{name}</span>
            </p>
          </div>

          <p className="text-xs text-gray-500">
            {product.product.categories.map((item) => item.name).join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            {product.product.brand.map((item) => item.name).join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            {`Weight: ${product.weight} ${product.unit}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {product.discount === 0 ? (
            <p className="text-sm font-bold text-gray-600 flex gap-1">
              <span>
                ৳
                {formatCurrency(
                  product.selling_price || product.product.price,
                  ","
                )}
              </span>
              <span className="text-gray-600">X {product.quantity}</span>
            </p>
          ) : (
            <p className="text-sm font-bold text-gray-600 flex gap-3">
              <span className="line-through">
                ৳{" "}
                {formatCurrency(
                  product.selling_price || product.product.price,
                  ","
                )}
              </span>{" "}
              <span className="text-primary font-bold text-sm">
                ৳
                {formatCurrency(
                  product.discounted_price ||
                    calculateDiscount(
                      product.product.price,
                      product.product.discount
                    ),
                  ","
                )}
                <span className="text-grey-500"></span>{" "}
                {isPriceEdited ? (
                  <span className="text-sm font-bold text-gray-600">
                    / {`${product?.product?.weight} ${product?.product?.unit}`}
                  </span>
                ) : (
                  <span className="text-sm font-bold text-gray-600">
                    x{product?.quantity}
                  </span>
                )}
              </span>
            </p>
          )}
        </div>

        <div className="text-primary font-semibold ">
          ৳ {formatCurrency(product.total_price, ",")}
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
