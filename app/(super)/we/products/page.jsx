"use client";

import APIKit from "@/common/helpers/APIKit";
import Button from "@/components/shared/Button";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import WeProductCard from "./components/WeProductCard";
import { useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { useFilters } from "@/providers/FiltersProvider";
import { useSelectedData } from "@/common/hooks/useSelectedData";
import Modal from "@/components/shared/Modal";
import AdminProductFilter from "./components/AdminProductFilter";
import AdminProductFilterController from "./components/AdminProductFilterController";

const WeProduct = () => {
  const {
    params,
    filterModal,
    setFilterModal,
    isFilterApplied,
    paramsInURL,
    updateParams,
    removeFilterItems,
    triggerURLUpdate,
  } = useFilters();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/admin-products", paramsInURL],
    queryFn: () =>
      APIKit.we.products.getAllProduct(paramsInURL).then(({ data }) => data),
    keepPreviousData: true,
  });

  const { data: selectedCategories } = useSelectedData({
    queryKey: ["slugs"],
    queryFn: APIKit.tags.getCategoriesList,
    queryValue: params.categories,
  });

  const { data: selectedBrands } = useSelectedData({
    queryKey: ["slugs"],
    queryFn: APIKit.tags.getBrandsList,
    queryValue: params.brands,
  });

  const { data: selectedColors } = useSelectedData({
    queryKey: ["slugs"],
    queryFn: APIKit.tags.getColorList,
    queryValue: params.colors,
  });

  const { data: selectedMaterials } = useSelectedData({
    queryKey: ["slugs"],
    queryFn: APIKit.tags.getMaterialList,
    queryValue: params.materials,
  });

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle title={"Products"} />
        <Button
          onClick={() => router.push("/we/products/add")}
          variant="primary"
        >
          {" "}
          <Plus width={20} height={20} className="text-white" /> Add Product
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <SearchByKey
          placeholders={["Search by Product Name"]}
          value={params.search}
          onChange={(event) => {
            updateParams("search", event.target.value);
          }}
          onReset={() => removeFilterItems("search")}
        />
        <Button
          onClick={() => setFilterModal(true)}
          variant="white"
          extraClassName="py-[10px] flex items-center mt-1"
        >
          <SlidersHorizontal
            height={15}
            width={15}
            className="text-gray-700 mr-2"
          />
          Filters
        </Button>
      </div>
      {isFilterApplied ? (
        <AdminProductFilterController
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          selectedMaterials={selectedMaterials}
        />
      ) : null}
      {!isLoading && data?.count > 0 ? (
        <>
          {data?.results?.map((item, i) => (
            <WeProductCard key={i} item={item} refetch={refetch} />
          ))}
          <Pagination
            setPage={(pageNumber) => {
              updateParams({ page: pageNumber });
              triggerURLUpdate();
            }}
            data={data}
            page={+params.page}
          />
        </>
      ) : (
        <>
          <EmptyState>No products found</EmptyState>
        </>
      )}
      <Modal open={filterModal} setOpen={setFilterModal}>
        <AdminProductFilter
          setFilterModal={setFilterModal}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          selectedMaterials={selectedMaterials}
        />
      </Modal>
    </div>
  );
};

export default WeProduct;
