import { formatCurrency } from "@/common/helpers/UtilKit";
import Image from "next/image";

const OrderItemCard = ({ item }) => {
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
      <div className="text-sm font-bold text-gray-600 w-full flex justify-between items-center">
        <div>
          {item?.price === item?.discount_price ? (
            <p className="text-sm font-bold text-gray-600">
              <span>৳ {formatCurrency(item?.price, ",")}</span>
            </p>
          ) : (
            <p className="text-sm font-bold text-gray-600 flex gap-3">
              <span className="line-through">
                ৳ {formatCurrency(item?.product.price, ",")}
              </span>{" "}
              <span className="text-primary font-bold text-sm">
                ৳ {formatCurrency(selling_price, ",")}
              </span>
              {isPriceEdited ? (
                <span className="text-sm font-bold text-gray-600 -ml-2">
                  / {`${item?.product?.weight} ${item?.product?.unit}`}
                </span>
              ) : (
                <span className="text-sm font-bold text-gray-600">
                  x{item?.quantity}
                </span>
              )}
            </p>
          )}
        </div>
        <div>
          <h2 className="text-primary font-bold text-sm self-end">
            ৳ {formatCurrency(item?.total_price, ",")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
