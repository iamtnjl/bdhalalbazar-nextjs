import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductSlider from "../shared/ProductSlider";
import { BadgePercent } from "lucide-react";

const BestDeals = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgePercent height={30} widths={30} className="text-primary" />
          <SectionTitle title="Good Discounts" />
        </div>
        <Button variant="border-less"> See All </Button>
      </div>
      <ProductSlider />
    </div>
  );
};

export default BestDeals;
