"use client";

import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-orders"],
    queryFn: () => APIKit.we.orders.getDashboard().then(({ data }) => data),
  });
  if (isLoading) {
    return "Loading....";
  }
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title="Dashboard" />
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">Gross Profit</p>
          <p className="text-2xl font-bold text-gray-700">
            {Number(data?.orders?.grossProfit).toFixed(2)}
          </p>
        </div>
        <div className="p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-base font-medium text-gray-500">New users</p>
          <p className="text-2xl font-bold text-gray-700">
            {data?.users?.activeCreatedInRange}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-gray-700">Products summary</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">
              Total products
            </p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.products?.total}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">Updated today</p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.products?.updatedInRange}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-gray-700">Orders summary</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">Order Placed</p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.orders?.total}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">
              Pending Orders
            </p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.orders?.totalPendingOrders}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">
              Completed Orders
            </p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.orders?.totalCompletedOrders}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">
              Canceled Orders
            </p>
            <p className="text-2xl font-bold text-gray-700">
              {data?.orders?.canceledCount}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">Order Amount</p>
            <p className="text-2xl font-bold text-gray-700">
              {Number(data?.orders?.totalAmount).toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <p className="text-base font-medium text-gray-500">
              Purchase Amount
            </p>
            <p className="text-2xl font-bold text-gray-700">
              {Number(data?.orders?.totalPurchaseAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
