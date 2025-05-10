"use client";

import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-orders"],
    queryFn: () => APIKit.we.orders.getDashboard().then(({ data }) => data),
  });
  console.log(data);
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title="Dashboard" />
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">Order Placed</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalOrdersPlaced}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalPendingOrders}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">
            Completed Orders
          </p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalCompletedOrders}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">Order Amount</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalOrderAmount}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">Purchase Amount</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalPurchaseAmount}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">User Created</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.totalUserCreated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
