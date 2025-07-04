"use client";

import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductCard from "../shared/ProductCard";
import { ChartNoAxesCombined } from "lucide-react";
import { useProducts } from "@/common/hooks/useProducts";
import { useInView } from "react-intersection-observer";
import HomePageSkeleton from "../skeleton/HomePageSkeleton";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

const PopularProducts = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const categories = searchParams.get("category");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProducts({ categories });

  // Intersection Observer to trigger fetching the next page
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return <HomePageSkeleton />;
  }
  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined
            height={25}
            width={25}
            className="text-gray-700"
          />
          <SectionTitle title={t("sectionTitle.trendingProducts")} />
        </div>
        <Button variant="border-less"> {t("subTitle.seeAll")} </Button>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data?.pages.map((page) =>
          page.results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      {/* Loading More Indicator */}
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage && <HomePageSkeleton />}
      </div>
    </div>
  );
};

export default PopularProducts;
