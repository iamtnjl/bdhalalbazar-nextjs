"use client";

import APIKit from "@/common/helpers/APIKit";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import WeOrderCard from "./components/WeOrderCard";
import EmptyState from "@/components/shared/EmptyState";

const WeOrders = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-orders"],
    queryFn: () => APIKit.we.orders.getOrders().then(({ data }) => data),
    keepPreviousData: true,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Orders"} />
      <SearchByKey
        placeholders={["Search by Order ID"]}
        // value={params.search}
        // onChange={(event) => {
        //   updateParams("search", event.target.value);
        // }}
        // onReset={() => removeFilterItems("search")}
      />
      {data.count > 0 ? (
        <>
          {data?.results.map((item, key) => (
            <WeOrderCard data={item} key={key} refetch={refetch} />
          ))}
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
