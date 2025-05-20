"use client";

import APIKit from "@/common/helpers/APIKit";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BackButton from "./components/BackButton";
import { formatDateTime } from "@/common/helpers/UtilKit";
import OrderStatusCard from "./components/OrderStatusCard";
import CustomerDetailsFormCard from "./components/CustomerDetailsFormCard";
import ShoppingCart from "./components/ShoppingCart";
import OrderDetailsSkeleton from "@/components/skeleton/OrderDetailsSkeleton";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["/order-details"],
    queryFn: () => APIKit.me.getOrderDetails(id).then(({ data }) => data),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  return (
    <div className="px-2 py-4">
      <div className="flex flex-col gap-4 -m-4 p-4">
        <BackButton
          buttonText={"All Orders"}
          backToURL={"/me/orders"}
          titleText={data?.order_id}
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="flex flex-col sm:flex-row text-xl text-gray-900">
              {formatDateTime(data?.createdAt, true)}
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full flex flex-col gap-6 lg:w-2/5">
            <OrderStatusCard status={data?.status} />
            <CustomerDetailsFormCard address={data?.address} />
          </div>
          <div className="w-full lg:w-3/5">
            <ShoppingCart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
