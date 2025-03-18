"use client";

import APIKit from "@/common/helpers/APIKit";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ViewOrderDetails from "./components/ViewOrderDetails";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-order-detail"],
    queryFn: () =>
      APIKit.we.orders.getOrderDetails(params.id).then(({ data }) => data),
    keepPreviousData: true,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="px-2 py-4">
      <ViewOrderDetails data={data} refetch={refetch} />
    </div>
  );
};

export default OrderDetails;
