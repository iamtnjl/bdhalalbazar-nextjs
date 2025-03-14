export default function Payment({
  payment,
  setPaymentMethod,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  return (
    <>
      {payment?.map((item) => (
        <div
          key={item.slug}
          className={
            selectedPaymentMethod === true
              ? "flex items-center px-4 py-3 gap-2 bg-white ring-2 rounded-md border border-primary ring-primary"
              : "flex items-center px-4 py-3 gap-2 bg-white rounded-md border border-grey-300 ring-grey-300"
          }
        >
          <input
            onClick={() => {
              setPaymentMethod(item);
              setSelectedPaymentMethod(true);
            }}
            id="payment-radio-btn"
            type="radio"
            value={item.slug}
            name="payment-radio"
            className="w-4 h-4 text-primary bg-gray-100 ring-primary focus:ring-primary border-primary cursor-pointer"  
          />
          <label
            htmlFor="payment-radio-btn"
            className="w-full text-sm font-medium cursor-pointer"
          >
            {item.name.toUpperCase()}
          </label>
        </div>
      ))}
    </>
  );
}
