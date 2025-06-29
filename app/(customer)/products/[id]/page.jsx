"use client";

import APIKit from "@/common/helpers/APIKit";
import ProductBreadcrumbs from "@/components/products/ProductBreadcrumbs";
import ProductDetailsContainer from "@/components/products/ProductDetailsContainer";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
// import ProductDetailsContainer from "@/components/products/ProductDetailsContainer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const ProductDetails = ({ params }) => {
  const { id } = useParams();
  const { i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["/product-details"],
    queryFn: () => APIKit.public.getProductDetails(id).then(({ data }) => data),
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }
  const name = data?.name[i18n.language] || data?.name;
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <ProductBreadcrumbs productName={name} />
      <ProductDetailsContainer data={data} />
    </div>
  );
};

export default ProductDetails;
