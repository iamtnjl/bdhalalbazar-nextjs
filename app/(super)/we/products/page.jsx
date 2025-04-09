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

const WeProduct = () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-products", searchKey],
    queryFn: () =>
      APIKit.we.products
        .getAllProduct({ search: searchKey })
        .then(({ data }) => data),
    keepPreviousData: true,
  });

  console.log(searchKey);

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
        value={searchKey}
        onChange={(event) => {
          setSearchKey(event.target.value);
        }}
        onReset={() => setSearchKey()}
      />
      {!isLoading && (
        <>
          {data?.results?.map((item, i) => (
            <WeProductCard key={i} item={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default WeProduct;
