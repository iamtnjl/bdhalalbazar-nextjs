"use client";

import APIKit from "@/common/helpers/APIKit";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useFilters } from "@/providers/FiltersProvider";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrderSummaryTable from "./components/OrderSummaryTable";
import Pagination from "@/components/shared/Pagination";

const successStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Ready to Deliver", value: "ready-to-deliver" },
  { label: "On the Way", value: "on-the-way" },
  { label: "Delivered", value: "delivered" },
];

const OrderSummary = () => {
  const { params, paramsInURL, updateParams, removeFilterItems } = useFilters();
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-orders", paramsInURL],
    queryFn: () =>
      APIKit.we.orders.getOrders(paramsInURL).then(({ data }) => data),
    keepPreviousData: true,
  });

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Orders Summary"} />
      <div className="flex items-end w-full flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 pt-2 lg:pt-0">
          <SearchByKey
            placeholders={["Search by phone number or order id"]}
            value={params.search}
            onChange={(event) => {
              updateParams("search", event.target.value);
            }}
            onReset={() => removeFilterItems("search")}
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
        </div>
      </div>
      <OrderSummaryTable data={data?.results} />
      <Pagination
        setPage={(pageNumber) => {
          updateParams("page", pageNumber);
        }}
        data={data}
        page={+paramsInURL.page}
      />
    </div>
  );
};

export default OrderSummary;
