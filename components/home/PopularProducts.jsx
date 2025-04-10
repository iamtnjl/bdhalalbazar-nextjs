"use client";

import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductCard from "../shared/ProductCard";
import { ChartNoAxesCombined } from "lucide-react";
import { useProducts } from "@/common/hooks/useProducts";
import { useInView } from "react-intersection-observer";

const PopularProducts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();

  // Intersection Observer to trigger fetching the next page
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });
  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined
            height={25}
            width={25}
            className="text-primary"
          />
          <SectionTitle title="Trending Products" />
        </div>
        <Button variant="border-less"> See All </Button>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.pages.map((page) =>
          page.results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      {/* Loading More Indicator */}
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage && <p>Loading more products...</p>}
      </div>
    </div>
  );
};

export default PopularProducts;
