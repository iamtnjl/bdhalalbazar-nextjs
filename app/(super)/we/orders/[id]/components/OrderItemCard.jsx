import { formatCurrency } from "@/common/helpers/UtilKit";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const OrderItemCard = ({ item }) => {
  const isPriceEdited = item?.weight !== item?.product?.weight;
  const { i18n } = useTranslation();
  const name = item?.product?.name[i18n.language] || item?.product?.name;
  const profit = item?.total_price - item?.purchase_price;

  return (
    <div className="bg-white border border-gray-300 p-2 rounded-lg flex flex-col gap-3 mb-2">
      <div className="flex flex-row-reverse items-start gap-2">
        {/* Image */}
        <img
          className="w-12 h-12 object-cover rounded-md border-2 border-gray-200"
          src={item?.product?.primary_image.original}
          alt={name}
        />

        {/* Description */}
        <div className="w-full space-y-1">
          <div className="flex flex-shrink text-gray-900">
            <p className="text-sm">{name} </p>
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
          {item?.selling_price === item?.discounted_price ? (
            <p className="text-sm font-bold text-gray-600">
              <span>৳ {formatCurrency(item?.selling_price, ",")}</span>
            </p>
          ) : (
            <p className="text-sm font-bold text-gray-600 flex gap-3">
              <span className="line-through">
                ৳ {formatCurrency(item?.selling_price, ",")}
              </span>{" "}
              <span className="text-primary font-bold text-sm">
                ৳ {formatCurrency(item?.discounted_price, ",")}
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
            ৳ {formatCurrency(item?.total_price, ",")} /{" "}
            {formatCurrency(profit, ",")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
