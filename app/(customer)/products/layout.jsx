import dynamic from "next/dynamic";

// Dynamically import the FiltersProvider with SSR disabled
const FiltersProvider = dynamic(
  () => import("../../../providers/FiltersProvider"),
  {
    ssr: false,
  }
);

const ProductsLayout = ({ children }) => {
  return (
    <FiltersProvider
      initialParams={{
        search: "",
        sort_by: "",
        categories: [],
        colors: [],
        brands: [],
        materials: [],
        subCategory: [],
      }}
    >
      {children}
    </FiltersProvider>
  );
};

export default ProductsLayout;
