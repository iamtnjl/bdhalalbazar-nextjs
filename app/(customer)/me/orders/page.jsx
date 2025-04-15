"use client";

import APIKit from "@/common/helpers/APIKit";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import OrderItemCard from "./components/OrderItemCard";
import { useFilters } from "@/providers/FiltersProvider";
import { sanitizeParams } from "@/common/helpers/UtilKit";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";

const successStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Ready to Deliver", value: "ready-to-deliver" },
  { label: "On the Way", value: "on-the-way" },
  { label: "Delivered", value: "delivered" },
];

const Orders = () => {
  const { params, paramsInURL, updateParams, removeFilterItems } = useFilters();

  const { data, isLoading } = useQuery({
    queryKey: ["/orders", paramsInURL],
    queryFn: () =>
      APIKit.me.getOrders(sanitizeParams(paramsInURL)).then(({ data }) => data),
    keepPreviousData: true,
    retry: false,
  });

  return (
    <div className="px-2 py-4">
      <SectionTitle title={"My Orders"} />
      <div className="flex items-end w-full flex-col md:flex-row bg-primary-bg sticky pt-4 pb-5 top-10 sm:top-14 lg:top-[60px] gap-4">
        <div className="w-full md:w-3/4 pt-2 lg:pt-0">
          <SearchByKey
            placeholders={["Search by ID"]}
            value={params.order_id}
            onChange={(event) => {
              updateParams("order_id", event.target.value);
            }}
            onReset={() => removeFilterItems("order_id")}
          />
        </div>
        <div className="w-full md:w-1/4">
          <SearchAndSelect
            className="pt-4"
            label="Filter by Status"
            name="status-filter"
            value={successStatusOptions.find(
              (item) => item.value === params.status
            )}
            options={successStatusOptions}
            onChange={(items) => {
              updateParams("status", items?.value);
            }}
            isClearable={params.status}
            placeholder="All Orders"
          />
        </div>
      </div>
      {data?.count > 0 && !isLoading ? (
        <>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5 mb-14">
            {data?.results.map((order) => (
              <OrderItemCard key={order.order_id} order={order} />
            ))}
          </div>
          <Pagination
            setPage={(pageNumber) => {
              updateParams("page", pageNumber);
            }}
            data={data}
            page={+paramsInURL.page}
          />
        </>
      ) : (
        <>
          <EmptyState>No orders found</EmptyState>
        </>
      )}
    </div>
  );
};

export default Orders;
