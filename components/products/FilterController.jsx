import React from "react";
import FilterBadge from "./FilterBadge";
import { useFilters } from "@/providers/FiltersProvider";

const FilterController = ({
  selectedCategories,
  selectedBrands,
  selectedColors,
  selectedMaterials,
}) => {
  const { removeFilterItems, resetFilters } = useFilters();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedCategories?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => removeFilterItems("categories", item.value)}
        />
      ))}
      {selectedBrands?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => removeFilterItems("brands", item.value)}
        />
      ))}
      {selectedColors?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => removeFilterItems("colors", item.value)}
        />
      ))}
      {selectedMaterials?.map((item, i) => (
        <FilterBadge
          key={i}
          name={item.label}
          onReset={() => removeFilterItems("materials", item.value)}
        />
      ))}
      <div
        onClick={() => resetFilters()}
        className="flex items-center gap-3 px-3 py-2 bg-red-50 w-fit cursor-pointer rounded-md border"
      >
        <p className="text-sm text-warning font-medium">Reset Filters</p>
      </div>
    </div>
  );
};

export default FilterController;
