import Image from "next/image";

import { useCart } from "@/providers/CartProvider";
import { formatCurrency } from "@/common/helpers/UtilKit";

import QuantityButton from "@/components/shared/QuantityButton";

function ProductCartItem({ cartItem }) {
  const { removeFromCart } = useCart();
  const calculateDiscount = (price, discountRate) =>
    price - (price * discountRate) / 100;

  return (
    <div className="border rounded-lg w-full mb-4 bg-white p-3 flex justify-center gap-2 flex-col">
      <div className="flex items-start gap-3">
        {/* Description */}
        <div className="w-full space-y-1">
          <div className="flex">
            <p className="text-base">
              <span className="font-bold text-base">
                {cartItem?.product?.name}
              </span>
            </p>
          </div>
          {cartItem?.product?.colors.length > 0 ? (
            <p className="text-xs md:text-sm text-gray-400">
              {cartItem?.product?.colors.map((item) => item?.name).join(", ")}
            </p>
          ) : null}
          {cartItem?.product?.brand.length > 0 ? (
            <p className="text-xs md:text-sm text-gray-400">
              {cartItem?.product?.brand.map((item) => item?.name).join(", ")}
            </p>
          ) : null}
          {cartItem?.product?.categories.length > 0 ? (
            <p className="text-xs md:text-sm text-gray-400">
              {cartItem?.product?.categories
                .map((item) => item?.name)
                .join(", ")}
            </p>
          ) : null}
          <p className="text-xs md:text-sm text-gray-400">
            {`Weight: ${cartItem?.product?.weight} ${cartItem?.product?.unit}`}
          </p>
          <div className="text-sm font-bold text-gray-600 w-full flex justify-between items-center">
            <div>
              {cartItem?.product?.discount === 0 ? (
                <p className="text-sm font-bold text-gray-600">
                  <span>
                    ৳
                    {formatCurrency(
                      calculateDiscount(
                        cartItem?.product?.price,
                        cartItem?.product?.discount
                      )
                    )}
                  </span>
                </p>
              ) : (
                <p className="text-sm font-bold text-gray-600 flex gap-3">
                  <span className="line-through">
                    ৳{formatCurrency(cartItem?.product?.price)}
                  </span>{" "}
                  <span className="text-primary font-bold text-sm">
                    ৳
                    {formatCurrency(
                      calculateDiscount(
                        cartItem?.product?.price,
                        cartItem?.product?.discount
                      )
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Image */}
        <Image
          height={500}
          width={500}
          className="w-16 h-16 object-cover rounded-md border-2 border-gray-200"
          src={
            cartItem?.product?.primary_image?.original ||
            "/placeholders/image-placeholder.png"
          }
          alt={cartItem?.product?.name}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <div
          onClick={() => {
            removeFromCart(cartItem?.product?._id);
          }}
          className="px-2 bg-gray-100 rounded-md cursor-pointer w-fit "
        >
          <button className="font-bold text-sm mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-8">
          <div className="whitespace-nowrap ml-2">
            <p className="text-primary font-semibold">
              ৳ {formatCurrency(cartItem?.final_price, ",")}
            </p>
          </div>
          <QuantityButton cartItem={cartItem} product={cartItem.product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
