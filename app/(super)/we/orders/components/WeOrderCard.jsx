import { inject, observer } from "mobx-react";
import { toast } from "react-hot-toast";
import { formatCurrency, formatDateTime, pick } from "@/common/helpers/UtilKit";
import APIKit from "@/common/helpers/APIKit";
import { useRouter } from "next/navigation";

const WeOrderCard = ({ data, refetch }) => {
  const router = useRouter();
  const handleOrderStatusChange = (event) => {
    let values = {
      newStatus: event.target.value,
    };
    let payload = pick(values, Object.keys(values));
    const handleSuccess = () => {
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };

    const promise = APIKit.we.orders
      .updateOrderStatus(data?._id, payload)
      .then(handleSuccess)
      .catch(handleFailure);

    return toast.promise(promise, {
      loading: "Loading...",
      success: "Order status changed successfully!",
      error: (error) => {
        console.log(error);
        if (error?.response?.data) {
          const [errorKey] = Object.keys(error.response?.data);
          return error.response.data[errorKey][0];
        } else {
          return "Something went wrong";
        }
      },
    });
  };

  const ongoingStatus = data?.status.find((item) => item.stage === "current");

  return (
    <div className="bg-white text-sm font-normal flex flex-col lg:flex-row justify-between gap-4 border border-grey-300 p-4 rounded-lg mx-[1.5px]">
      {/* Order details */}
      <div className="flex-1 space-y-2">
        <div className="text-xs text-grey-500 space-x-2 flex items-center justify-between lg:justify-start">
          <span className="font-bold text-base">Order #{data?.order_id}</span>
          <span className="hidden lg:inline">-</span>
          <span className="text-sm font-normal ">
            {formatDateTime(data?.createdAt, true)}
          </span>
        </div>
        <div className="text-grey-700 flex items-center gap-4 justify-between lg:justify-start">
          <p className="text-primary text-base lg:text-lg font-bold">
            <span className="text-primary text-base lg:text-lg font-bold">
              &#2547;
            </span>
            {formatCurrency(data?.grand_total, ",")}
          </p>
          <p className="text-sm font-normal text-grey-500 ">
            {data?.items.length} Items
          </p>
        </div>
      </div>
      {/* Customer details */}
      <div className="flex-1 flex flex-col space-y-2">
        <div className="text-xs text-grey-500 font-bold">
          <span>Delivery Details</span>
        </div>
        <div className="text-grey-700 flex flex-col lg:flex-row items-start lg:items-center lg:gap-4">
          <p className="font-bold text-base">{data?.name}</p>
          <p>{data?.phone}</p>
        </div>
        <div className="text-grey-700">
          <address className="text-sm whitespace-pre-wrap">
            {`${data?.address.street}, ${data?.address.city}, ${data?.address.zip}`}
          </address>
        </div>
        <div className="text-grey-700">
          <address className="text-sm whitespace-pre-wrap">
            Profit:{" "}
            <span className="text-primary">
              &#2547; {Number(data?.profit).toFixed(2)}
            </span>
          </address>
        </div>
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <div className="w-full md:w-full flex flex-col lg:flex-row gap-2">
          <div className="flex gap-2 w-full">
            <button
              className="w-full rounded-md border-2 border-primary py-2 px-3 text-sm font-semibold hover:text-white text-primary shadow-sm hover:bg-primary"
              onClick={() => {
                router.push(`/we/orders/${data?._id}`);
              }}
            >
              View Order
            </button>
            <button
              className="w-full rounded-md border-2 border-gray-200 py-2 px-3 text-sm font-semibold  text-gray-800 shadow-sm hover:bg-gray-50"
              onClick={() => {
                router.push(`/we/orders/edit?id=${data?._id}`);
              }}
            >
              Edit Order
            </button>
          </div>
          <div className="w-full flex flex-col gap-1 mt-1 cursor-pointer">
            <select
              className="bg-white text-black rounded-md border border-grey-300 py-2 pl-4 pr-8 text-sm font-medium focus:border-primary focus:outline-none focus:ring-primary grow"
              onChange={(e) => handleOrderStatusChange(e)}
              value={ongoingStatus?.slug}
            >
              {data?.status.map((status) => (
                <option
                  className="text-lg"
                  key={status.slug}
                  value={status.slug}
                >
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("meStore")(observer(WeOrderCard));
