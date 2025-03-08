import React from "react";
import ProductFilterDrawerPanel from "./ProductFilterDrawerPanel";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import Button from "../shared/Button";
import SearchAndSelect from "../from/SearchAndSelect";
import { formatFilterOptions } from "@/common/helpers/UtilKit";

const ProductFilters = ({ setFilerModal }) => {
  const { data: categoriesData } = useQuery({
    queryKey: ["/categories"],
    queryFn: () => APIKit.tags.getCategoriesList().then(({ data }) => data),
  });

  const { data: brandsData } = useQuery({
    queryKey: ["/brands"],
    queryFn: () => APIKit.tags.getBrandsList().then(({ data }) => data),
  });

  const { data: colorsData } = useQuery({
    queryKey: ["/colors"],
    queryFn: () => APIKit.tags.getColorList().then(({ data }) => data),
  });

  const { data: materialsData, isLoading } = useQuery({
    queryKey: ["/materials"],
    queryFn: () => APIKit.tags.getMaterialList().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <Dialog.Title className="text-xl text-primary font-semibold">
          <p>Filters</p>
        </Dialog.Title>

        <div className="flex h-7 ml-5 items-center">
          <button
            type="button"
            className="rounded-md text-gray-700 hover:text-gray-600"
            onClick={() => setFilerModal(false)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.0"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4 pb-8">
        <SearchAndSelect
          label="Select Categories"
          name="status-filter"
          options={formatFilterOptions(categoriesData?.results)}
          // onChange={(selectedOption) => {
          //   setParams((prevParams) => ({
          //     ...prevParams,
          //     status: selectedOption?.value,
          //   }));
          // }}
          // isClearable={params.status}
          placeholder="Select your desired categories"
        />
        <SearchAndSelect
          label="Select Brands"
          name="status-filter"
          options={formatFilterOptions(brandsData?.results)}
          // onChange={(selectedOption) => {
          //   setParams((prevParams) => ({
          //     ...prevParams,
          //     status: selectedOption?.value,
          //   }));
          // }}
          // isClearable={params.status}
          placeholder="Select your favourite brands"
        />
        <SearchAndSelect
          label="Select Colors"
          name="status-filter"
          options={formatFilterOptions(colorsData?.results)}
          // onChange={(selectedOption) => {
          //   setParams((prevParams) => ({
          //     ...prevParams,
          //     status: selectedOption?.value,
          //   }));
          // }}
          // isClearable={params.status}
          placeholder="Choose your favourite colors"
        />
        <SearchAndSelect
          label="Select Materials"
          name="status-filter"
          options={formatFilterOptions(materialsData?.results)}
          // onChange={(selectedOption) => {
          //   setParams((prevParams) => ({
          //     ...prevParams,
          //     status: selectedOption?.value,
          //   }));
          // }}
          // isClearable={params.status}
          placeholder="Select you essential materials"
        />
      </div>

      <div className="flex flex-shrink-0 justify-end border-t border-gray-200 pt-4 items-center gap-4">
        <Button variant="white" onClick={() => setFilerModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => setFilerModal(false)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
