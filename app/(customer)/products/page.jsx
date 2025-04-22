"use client";

import APIKit from "@/common/helpers/APIKit";
import { useProducts } from "@/common/hooks/useProducts";
import { useSelectedData } from "@/common/hooks/useSelectedData";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import FilterController from "@/components/products/FilterController";
import ProductFilters from "@/components/products/ProductFilters";
import Button from "@/components/shared/Button";
import EmptyState from "@/components/shared/EmptyState";
import Modal from "@/components/shared/Modal";
import ProductCard from "@/components/shared/ProductCard";
import SearchByKey from "@/components/shared/SearchByKey";
import SectionTitle from "@/components/shared/SectionTitle";
import { useFilters } from "@/providers/FiltersProvider";
import { ShoppingBasket, SlidersHorizontal } from "lucide-react";
import { useInView } from "react-intersection-observer";

const sortOptions = [
  { label: "Price High", value: "price_asc" },
  { label: "Price Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const ProductContainer = () => {
  const {
    params,
    filterModal,
    setFilterModal,
    isFilterApplied,
    paramsInURL,
    updateParams,
    removeFilterItems,
  } = useFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts(paramsInURL);

  const allProducts = data?.pages.flatMap((page) => page.results) || [];

  // Intersection Observer to trigger fetching the next page
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
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
    <div className="w-full px-2 py-4 flex flex-col gap-6">
      <SearchByKey
        placeholders={[
          "Start Typing....",
          "Search by Product Name",
          "Search By Brand",
          "Start Typing....",
          "Search by Manufacturer",
        ]}
        value={params.search}
        onChange={(event) => {
          updateParams("search", event.target.value);
        }}
        onReset={() => removeFilterItems("search")}
      />
      <div className="flex items-end gap-2 w-full justify-between">
        <SearchAndSelect
          label="Sort by"
          name="sort-by"
          options={sortOptions}
          value={sortOptions.filter((item) => item?.value === params?.sort_by)}
          onChange={(items) => {
            updateParams("sort_by", items?.value);
          }}
          isClearable={params.sort_by}
          placeholder="All Orders"
        />
        <Button
          onClick={() => setFilterModal(true)}
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

      {isFilterApplied ? (
        <FilterController
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          selectedMaterials={selectedMaterials}
        />
      ) : null}

      <div className="flex items-center gap-2">
        <ShoppingBasket height={30} widths={30} className="text-primary" />
        <SectionTitle title="All Products" />
      </div>

      {/* Product Grid */}
      {allProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data?.pages.map((page) =>
            page.results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      ) : (
        <>
          <EmptyState>No products found</EmptyState>
        </>
      )}

      {/* Loading More Indicator */}
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage && <p>Loading more products...</p>}
      </div>
      <Modal open={filterModal} setOpen={setFilterModal}>
        <ProductFilters
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

export default ProductContainer;
