"use client";

import { formatCurrency } from "@/common/helpers/UtilKit";
import CartProductItem from "./CartProductItem";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="sm:bg-white sm:border sm:px-4 sm:py-5 sm:rounded-lg sm:self-start flex flex-col gap-2">
      <h2 className="font-semibold text-base text-grey-500">
        {t("orderDetails.products")}
      </h2>
      <div className="flex flex-col gap-4">
        {data?.products ? (
          <>
            {data.products.map((product, i) => (
              <CartProductItem key={i} product={product} />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-sm font-bold">
            No products to be delivered.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-base text-grey-500 mt-4">
            {t("orderDetails.orderPriceBreakDown")}
          </p>
          {!data?.isPriceEdited ? (
            <div className="flex flex-col gap-3">
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">{t("orderDetails.subTotal")}:</h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.sub_total, ",")}
                  </span>
                </p>
              </div>
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">{t("orderDetails.discount")}:</h2>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H6"
                    />
                  </svg>

                  <h2 className="font-medium">
                    <span className="text-gray-900 font-medium mr-1 text-sm">
                      &#2547;
                    </span>
                    <span className="text-gray-600">
                      {formatCurrency(data?.discount, ",")}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">
                  {t("orderDetails.deliveryCharge")}:
                </h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.delivery_charge, ",")}
                  </span>
                </p>
              </div>
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">{t("orderDetails.platformFee")}:</h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.platform_fee, ",")}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium text-gray-900">
                  {t("orderDetails.totalCost")}:
                </h2>
                <h2 className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.grand_total)}
                  </span>
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">Sub Total:</h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.calculated_total_price, ",")}
                  </span>
                </p>
              </div>
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">Delivery Charge:</h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.delivery_charge, ",")}
                  </span>
                </p>
              </div>
              <div className="font-medium flex justify-between items-center">
                <h2 className="text-base">Platform fee:</h2>
                <p className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.platform_fee, ",")}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium text-gray-900">
                  Total Order Price:
                </h2>
                <h2 className="font-medium">
                  <span className="text-gray-900 font-medium mr-1 text-sm">
                    &#2547;
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(data?.grand_total)}
                  </span>
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
