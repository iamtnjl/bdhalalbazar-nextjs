"use client";

import APIKit from "@/common/helpers/APIKit";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CustomerTable from "./components/CustomerTable";
import SectionTitle from "@/components/shared/SectionTitle";
import SearchByKey from "@/components/shared/SearchByKey";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";

const Customer = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["customers", params],
    queryFn: () =>
      APIKit.we.customers.getAllCustomers(params).then((data) => data.data),
  });

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title="Customers" />
      <SearchByKey
        placeholders={["Search by phone number"]}
        value={params.search}
        onChange={(event) => {
          setParams((prevParams) => ({
            ...prevParams,
            search: event.target.value,
          }));
        }}
        onReset={() => {
          setParams((prevParams) => ({
            ...prevParams,
            search: "",
          }));
        }}
      />
      {data?.count > 0 ? (
        <>
          {!isLoading ? (
            <CustomerTable tableData={data?.results} />
          ) : (
            "Loading..."
          )}
        </>
      ) : (
        <EmptyState> No customer Found </EmptyState>
      )}

      <Pagination
        setPage={(pageNumber) => {
          setParams((prevParams) => ({
            ...prevParams,
            page: pageNumber,
          }));
        }}
        data={data}
        page={+params.page}
      />
    </div>
  );
};

export default Customer;
