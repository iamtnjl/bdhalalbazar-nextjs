import dynamic from "next/dynamic";

// Dynamically import the FiltersProvider with SSR disabled
const FiltersProvider = dynamic(
  () => import("../../../../providers/FiltersProvider"),
  {
    ssr: false,
  }
);

const ProductsLayout = ({ children }) => {
  return (
    <FiltersProvider
      initialParams={{
        search: "",
        sort_by: "newest",
        categories: [],
        colors: [],
        brands: [],
        materials: [],
        page: 1,
      }}
    >
      {children}
    </FiltersProvider>
  );
};

export default ProductsLayout;
