import { formatCurrency } from "@/common/helpers/UtilKit";
import Image from "next/image";

const CartProductItem = ({ product }) => {
  const calculateDiscount = (price, discount) =>
    price - (price * discount) / 100;

  const isPriceEdited =
    calculateDiscount(product.product.price, product.product.discount) *
      product.quantity !==
    product.total_price;

  return (
    <div className="border rounded-lg w-full gap-3 border-gray-300 justify-between flex-col flex p-3 bg-white">
      <div className="flex items-start gap-3">
        {/* Image */}
        <Image
          width={500}
          height={500}
          alt="product-image"
          className="w-16 h-16 object-cover rounded-md border-2 border-gray-200"
          src={
            product?.product?.primary_image.original ||
            "https://cdn.discordapp.com/attachments/741231928392286249/1095224501647720459/med-placeholder.webp"
          }
        />
        {/* Description */}
        <div className="w-full">
          <div className="flex flex-shrink">
            <p className="text-base">
              <span className="font-bold text-base">
                {product?.product?.name}
              </span>
            </p>
          </div>

          <p className="text-xs text-gray-500">
            {product.product.categories.map((item) => item.name).join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            {product.product.brand.map((item) => item.name).join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            {`Weight: ${product.weight} ${product.unit}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {!isPriceEdited ? (
          <div>
            {product.discount === 0 ? (
              <p className="text-sm font-bold text-gray-600 flex gap-1">
                <span>৳{formatCurrency(product.product.price, ",")}</span>
                <span className="text-gray-600">X {product.quantity}</span>
              </p>
            ) : (
              <p className="text-sm font-bold text-gray-600 flex gap-3">
                <span className="line-through">
                  ৳ {formatCurrency(product.product.price, ",")}
                </span>{" "}
                <span className="text-primary font-bold text-sm">
                  ৳
                  {formatCurrency(
                    calculateDiscount(
                      product.product.price,
                      product.product.discount
                    ),
                    ","
                  )}
                  <span className="text-grey-500"></span>{" "}
                  <span className="text-gray-600">X {product.quantity}</span>
                </span>
              </p>
            )}
          </div> 
        ) : <></>}

        <div className="text-primary font-semibold ">
          ৳ {formatCurrency(product.total_price, ",")}
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
