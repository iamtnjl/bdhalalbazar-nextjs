"use client";
import APIKit from "@/common/helpers/APIKit";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const CustomerDetailsFormCard = ({ address }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`/me`],
    queryFn: () => APIKit.me.getProfile().then(({ data }) => data),
  });

  const { t } = useTranslation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const deliveryAddress =
    address?.street + ", " + address?.city + ", " + address?.zip;

  return (
    <div>
      <div className="sm:bg-white sm:border sm:px-4 sm:py-5 sm:rounded-lg sm:self-start">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-base text-grey-500">
              {t("orderDetails.customerDetail")}
            </h2>
            <div className="rounded-lg border border-gray-300 py-3 px-4 flex flex-col gap-2 text-grey-700">
              <span className="text-base font-bold">{data?.user?.name}</span>
              <span className="text-base">{data?.user?.phone}</span>
              <p className="text-sm text-grey-400">
                {t("orderDetails.customerHelpingText")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customerName"
              className="font-semibold text-base text-grey-500"
            >
              {t("orderDetails.deliveryAddress")}
            </label>
            {Object?.keys(address)?.length > 0 ? (
              <div className="rounded-lg bg-white border px-4 py-3 border-gray-300 flex flex-col">
                <span className="font-bold">{address?.label} </span>
                <span>{deliveryAddress}</span>
              </div>
            ) : (
              <div className="rounded-lg bg-white border px-4 py-3 border-gray-300 flex flex-col">
                <span> No Address Added.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsFormCard;
