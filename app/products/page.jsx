"use client";

import SearchAndSelect from "@/components/from/SearchAndSelect";
import ProductFilters from "@/components/products/ProductFilters";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import ProductCard from "@/components/shared/ProductCard";
import RightSideDrawer from "@/components/shared/RightSideDrawer";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { ShoppingBasket, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const PublicProducts = () => {
  const [filterModal, setFilerModal] = useState(false);
  return (
    <div className="w-full px-2 py-4 flex flex-col gap-6">
      <SearchByKey
        placeholders={[
          "Start Typing....",
          "Search by Product Name",
          "Search By Brand",
          "Start Typing....",
          "Search by Manufacturer",
        ]}
      />
      <div className="flex items-end gap-2 w-full justify-between">
        <SearchAndSelect
          label="Sort by"
          name="status-filter"
          options={[
            { label: "Price High", value: "high" },
            { label: "Price Low", value: "Low" },
          ]}
          // onChange={(selectedOption) => {
          //   setParams((prevParams) => ({
          //     ...prevParams,
          //     status: selectedOption?.value,
          //   }));
          // }}
          // isClearable={params.status}
          placeholder="All Orders"
        />
        <Button
          onClick={() => setFilerModal(true)}
          variant="white"
          extraClassName="py-[10px] flex items-center"
        >
          <SlidersHorizontal
            height={15}
            width={15}
            className="text-gray-700 mr-2"
          />
          Filters
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingBasket height={30} widths={30} className="text-primary" />
        <SectionTitle title="All Products" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Modal open={filterModal} setOpen={setFilerModal}>
        <ProductFilters setFilerModal={setFilerModal}/>
      </Modal>
    </div>
  );
};

export default PublicProducts;
