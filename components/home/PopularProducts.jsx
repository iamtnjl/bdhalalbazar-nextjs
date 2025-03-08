import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductCard from "../shared/ProductCard";
import { ChartNoAxesCombined } from "lucide-react";

const PopularProducts = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-fit md:w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default PopularProducts;
