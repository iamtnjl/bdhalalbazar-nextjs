import React from "react";
import { useFilters } from "@/providers/FiltersProvider";
import FilterBadge from "@/components/products/FilterBadge";

const AdminProductFilterController = ({
  selectedCategories,
  selectedBrands,
  selectedColors,
  selectedMaterials,
}) => {
  const { removeFilterItems, resetFilters, updateParams } = useFilters();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedCategories?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => {
            removeFilterItems("categories", item.value);
            updateParams({ page: 1 });
          }}
        />
      ))}
      {selectedBrands?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => {
            removeFilterItems("brands", item.value);
            updateParams({ page: 1 });
          }}
        />
      ))}
      {selectedColors?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => {
            removeFilterItems("colors", item.value);
            updateParams({ page: 1 });
          }}
        />
      ))}
      {selectedMaterials?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => {
            removeFilterItems("materials", item.value);
            updateParams({ page: 1 });
          }}
        />
      ))}
      <div
        onClick={() => {
          resetFilters();
          updateParams({ page: 1 });
        }}
        className="flex items-center gap-3 px-3 py-2 bg-red-50 w-fit cursor-pointer rounded-md border"
      >
        <p className="text-sm text-warning font-medium">Reset Filters</p>
      </div>
    </div>
  );
};

export default AdminProductFilterController;
