import dynamic from "next/dynamic";

const FiltersProvider = dynamic(
  () => import("../../../../providers/FiltersProvider"),
  {
    ssr: false,
  }
);

const OrdersSummaryLayout = ({ children }) => {
  return (
    <div>
      <FiltersProvider
        initialParams={{
          search: "",
          status: "",
          page: 1,
        }}
      >
        {children}
      </FiltersProvider>
    </div>
  );
};

export default OrdersSummaryLayout;
