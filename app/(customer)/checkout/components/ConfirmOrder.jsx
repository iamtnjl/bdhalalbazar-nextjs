import { InformationCircleIcon } from "@heroicons/react/24/solid";

function ConfirmOrder({ addresses, paymentMethod, handlePlaceOrder }) {
  if (!paymentMethod?.slug) {
    return (
      <div className="flex flex-col gap-2">
        {!paymentMethod?.slug && (
          <div className="flex justify-start items-center gap-2 bg-red-50 border-red-300 border p-2 rounded-md">
            <InformationCircleIcon className="w-6 text-warning" />
            <p className="text-warning text-sm">
              Please select Payment Method before placing an order.
            </p>
          </div>
        )}

        <button
          disabled
          className="w-full flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-semibold text-white shadow-sm cursor-not-allowed"
        >
          PLACE ORDER
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="sticky">
        <button
          onClick={() => {
            handlePlaceOrder();
          }}
          className="w-full flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
        >
          PLACE ORDER
        </button>
      </div>
    </>
  );
}

export default ConfirmOrder;
