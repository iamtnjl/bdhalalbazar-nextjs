"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { formatCurrency, formatDateTime } from "@/common/helpers/UtilKit";
import Button from "@/components/shared/Button";
import { useTranslation } from "react-i18next";

const OrderItemCard = ({ order }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div
      onClick={() => router.push(`/me/orders/${order?._id}`)}
      className="border border-neutral-200 bg-white rounded-md cursor-pointer"
      title={`View Order #${order?._id} details`}
    >
      <div className="divide-y">
        <div className="p-4">
          <h2 className="text-base font-bold mb-2 text-grey-700">
            {t("orders.order")} #{order?.order_id}
          </h2>
          <p className="py-1 font-semibold text-gray-400">
            {formatDateTime(order?.created_at, true)}
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-primary">
              <span className="mr-1 text-sm">&#2547;</span>
              {formatCurrency(order?.grand_total, ",")}
            </h2>
            <span
              className={
                order?.status === "pending"
                  ? "text-xs font-medium text-yellow-800 bg-yellow-200 px-2 py-1 rounded-lg"
                  : order?.status === "PROCESSING"
                  ? "text-xs font-medium text-blue-800 bg-blue-200 px-2 py-1 rounded-lg"
                  : order?.status === "PACKAGING"
                  ? "text-xs font-medium text-orange-800 bg-orange-200 px-2 py-1 rounded-lg"
                  : order?.status === "WAITING_FOR_DELIVERER"
                  ? "text-xs font-medium text-purple-800 bg-purple-200 px-2 py-1 rounded-lg"
                  : order?.status === "ON_THE_WAY"
                  ? "text-xs font-medium text-indigo-800 bg-indigo-200 px-2 py-1 rounded-lg"
                  : order?.status === "CANCELED"
                  ? "text-xs font-medium text-red-800 bg-red-200 px-2 py-1 rounded-lg"
                  : order?.status === "REACHED"
                  ? "text-xs font-medium text-cyan-800 bg-cyan-200 px-2 py-1 rounded-lg"
                  : order?.status === "COMPLETED"
                  ? "text-xs font-medium text-green-800 bg-green-200 px-2 py-1 rounded-lg"
                  : order?.status === "RETURNED"
                  ? "text-xs font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded-lg"
                  : "text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg"
              }
            >
              {order?.status}
            </span>
          </div>
        </div>
        <div className="px-4 py-3">
          <Link href={`/me/orders/${order?.uid}`}>
            <Button extraClassName="flex items-center gap-3 text-base font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
             {t("orders.orderDetails")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
