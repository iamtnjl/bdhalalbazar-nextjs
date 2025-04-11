"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import { useSearchParams } from "next/navigation";
import React from "react";
import AdminProductEditForm from "./components/AdminProductEditForm";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";

const AdminEditProduct = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-product-details", id],
    queryFn: () =>
      APIKit.we.products.getProductDetails(id).then(({ data }) => data),
    keepPreviousData: true,
  });
  if (isLoading) {
    return "Loading...";
  }
  console.log(data);
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Edit product"} />
      <AdminProductEditForm data={data} refetch={refetch} />
    </div>
  );
};

export default AdminEditProduct;
