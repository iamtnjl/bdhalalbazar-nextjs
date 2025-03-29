"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import { useSearchParams } from "next/navigation";
import React from "react";
import AdminProductEditForm from "./components/AdminProductEditForm";

const AdminEditProduct = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Edit product"} />
      <AdminProductEditForm />
    </div>
  );
};

export default AdminEditProduct;
