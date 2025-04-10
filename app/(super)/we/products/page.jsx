"use client";

import APIKit from "@/common/helpers/APIKit";
import Button from "@/components/shared/Button";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import WeProductCard from "./components/WeProductCard";
import { useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";

const WeProduct = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    sort_by: "newest",
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-products", params],
    queryFn: () =>
      APIKit.we.products.getAllProduct(params).then(({ data }) => data),
    keepPreviousData: true,
  });

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle title={"Products"} />
        <Button
          onClick={() => router.push("/we/products/add")}
          variant="primary"
        >
          {" "}
          <Plus width={20} height={20} className="text-white" /> Add Product
        </Button>
      </div>
      <SearchByKey
        placeholders={["Search by Product Name"]}
        value={params.search}
        onChange={(event) => {
          setParams((prevParams) => ({
            ...prevParams,
            search: event.target.value,
            page: 1,
          }));
        }}
        onReset={() => {
          setParams((prevParams) => ({
            ...prevParams,
            search: "",
            page: 1,
          }));
        }}
      />
      {!isLoading && data?.count > 0 ? (
        <>
          {data?.results?.map((item, i) => (
            <WeProductCard key={i} item={item} refetch={refetch} />
          ))}
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
        </>
      ) : (
        <>
          <EmptyState>No products found</EmptyState>
        </>
      )}
    </div>
  );
};

export default WeProduct;
