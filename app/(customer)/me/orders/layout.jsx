import dynamic from "next/dynamic";

const FiltersProvider = dynamic(() => import("../../../../providers/FiltersProvider"), {
  ssr: false,
});

const OrderLayout = ({ children }) => {
  return (
    <div>
      <FiltersProvider
        initialParams={{
          order_id: "",
          status: "",
        }}
      >
        {children}
      </FiltersProvider>
    </div>
  );
};

export default OrderLayout;
