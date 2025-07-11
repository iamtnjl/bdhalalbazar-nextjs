"use client";

import { formatCurrency } from "@/common/helpers/UtilKit";
import React from "react";
import { useTranslation } from "react-i18next";

const PaymentBreakdown = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-base text-grey-500 mt-2">
          {t("checkout.orderPriceBreakDown")}
        </h2>
        <div className="flex justify-between items-center text-base font-medium text-grey-700">
          <p>{t("checkout.subTotal")}</p>৳{" "}
          {formatCurrency(data?.sub_total, ", ")}
          {/* <p>৳{formatCurrency(totalPriceWithOutDiscount?.toFixed(2))}</p> */}
        </div>
        <div className="flex justify-between items-center text-base font-medium text-grey-700">
          <p>{t("checkout.discount")}</p>
          <p className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
            ৳ {formatCurrency(data?.discount, ",")}
          </p>
        </div>

        <div className="flex justify-between items-center text-base font-medium text-grey-700">
          <p>{t("checkout.deliveryCharge")}</p>৳{" "}
          {formatCurrency(data?.delivery_charge, ", ")}
        </div>
        <div className="flex justify-between items-center text-base font-medium text-grey-700">
          <p>{t("checkout.platformFee")}</p>৳{" "}
          {formatCurrency(data?.platform_fee, ", ")}
        </div>
        <div className="flex justify-between items-center text-base font-bold text-grey-700">
          <p>{t("checkout.totalCost")}</p>৳{" "}
          {formatCurrency(data?.grand_total, ", ")}
        </div>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
