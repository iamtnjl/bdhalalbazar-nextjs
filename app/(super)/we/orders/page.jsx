"use client";

import APIKit from "@/common/helpers/APIKit";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import WeOrderCard from "./components/WeOrderCard";
import EmptyState from "@/components/shared/EmptyState";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import { useFilters } from "@/providers/FiltersProvider";
import Pagination from "@/components/shared/Pagination";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

const successStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Ready to Deliver", value: "ready-to-deliver" },
  { label: "On the Way", value: "on-the-way" },
  { label: "Delivered", value: "delivered" },
];

const WeOrders = () => {
  const router = useRouter();
  const { params, paramsInURL, updateParams, removeFilterItems } = useFilters();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-orders", paramsInURL],
    queryFn: () =>
      APIKit.we.orders.getOrders(paramsInURL).then(({ data }) => data),
    keepPreviousData: true,
  });

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Orders"} />
      <div className="flex items-end w-full flex-col md:flex-row gap-4">
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
        <div className="w-full flex items-end gap-4 md:w-1/4">
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
          <Button
            onClick={() => router.push("/we/orders/create-order")}
            extraClassName="whitespace-nowrap"
            variant="primary"
          >
            Create Order
          </Button>
        </div>
      </div>
      {data?.count > 0 && !isLoading ? (
        <>
          {data?.results.map((item, key) => (
            <WeOrderCard data={item} key={key} refetch={refetch} />
          ))}
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
          <EmptyState>No orders found.</EmptyState>
        </>
      )}
    </div>
  );
};

export default WeOrders;
