import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductSlider from "../shared/ProductSlider";

const BestDeals = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionTitle title="Best Deals" />
        <Button variant="border-less"> See All </Button>
      </div>
      <ProductSlider />
    </div>
  );
};

export default BestDeals;
