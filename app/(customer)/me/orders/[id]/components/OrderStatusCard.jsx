import StatusProgress from "./StatusProgress";

const OrderStatusCard = ({ status }) => {
  return (
    <div>
      <div className="sm:bg-white sm:border sm:px-4 sm:py-5 sm:rounded-lg sm:self-start flex flex-col gap-2">
        <h2 className="font-semibold text-base text-grey-500">Order Status</h2>
        <div className="flex flex-col gap-2">
          {status
            ?.filter((item) => item?.slug !== "completed")
            .map((item) => (
              <StatusProgress key={item.slug} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;
