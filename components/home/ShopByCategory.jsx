import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { BedDouble, CookingPot, Footprints, Gem, Plug2, Shirt } from "lucide-react";
import Button from "../shared/Button";

const ShopByCategory = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionTitle title="Shop by Category" />
        <Button variant="border-less"> See All </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <BedDouble height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg text-center font-medium">Bed Room</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <CookingPot height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg font-medium">Kitchen</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <Shirt height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg text-center font-medium">Cloths</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <Plug2 height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg text-center font-medium">Electronics</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <Footprints height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg text-center font-medium">Shoes</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2">
          <Gem height={40} width={40} className="text-gray-600" />
          <h3 className="text-gray-800 text-lg text-center font-medium">Jewellery</h3>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
