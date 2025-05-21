const CartProduct = ({ item }) => {
  const selling_price =
    item?.price - (item?.product?.price * item?.product?.discount) / 100;

  const isPriceEdited = selling_price * item?.quantity !== item?.total_price;

  return (
    <div className="bg-white border border-gray-300 p-2 rounded-lg flex flex-col gap-3 mb-2">
      <div className="flex flex-row-reverse items-start gap-2">
        {/* Image */}
        <img
          className="w-12 h-12 object-cover rounded-md border-2 border-gray-200"
          src={item?.product?.primary_image.original}
          alt={item?.product?.name}
        />

        {/* Description */}
        <div className="w-full space-y-1">
          <div className="flex flex-shrink text-gray-900">
            <p className="text-sm">
              <span className="font-bold text-sm">{item?.product?.name}</span>{" "}
            </p>
          </div>
          <p className="text-xs md:text-sm text-gray-500">
            Categories:{" "}
            {item?.product?.categories.map((item) => item.name).join(", ")}
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            {`Weight: ${item?.weight} ${item?.unit}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
