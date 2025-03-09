"use client";

import { FiltersProvider } from "@/providers/FiltersProvider";

const ProductsLayout = ({ children }) => {
  return (
    <>
      <FiltersProvider
        initialParams={{
          search: "",
          sort_by: "",
          categories: [],
          colors: [],
          brands: [],
          materials: [],
        }}
      >
        {children}
      </FiltersProvider>
    </>
  );
};

export default ProductsLayout;
