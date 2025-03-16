"use client";

import APIKit from "@/common/helpers/APIKit";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProductCartItem from "./components/ProductCartItem";
import { formatCurrency } from "@/common/helpers/UtilKit";
import { useCart } from "@/providers/CartProvider";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

const deviceId =
  typeof window !== undefined && localStorage.getItem("deviceId");

const Cart = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/cart"],
    queryFn: () => APIKit.public.getCart({ deviceId }).then(({ data }) => data),
    keepPreviousData: true,
  });

  const router = useRouter();

  if (isLoading) {
    return "Loading....";
  }

  return (
    <div className="px-2 py-4">
      {data?.cart_products?.length > 0 ? (
        <div>
          {data?.products?.length === 1 ? (
            <h2 className="text-sm font-bold text-gray-700 mb-2">
              {data?.products?.length} Product added
            </h2>
          ) : (
            <h2 className="text-sm font-bold text-gray-700 mb-2">
              {data?.products?.length} Products added
            </h2>
          )}
          <div>
            {data?.cart_products?.map((product) => (
              <ProductCartItem
                key={product._id}
                cartItem={product}
                refetch={refetch}
              />
            ))}
          </div>

          <hr className="my-2" />

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-gray-700">
              Payment Break Down{" "}
            </h2>
            <div className="flex justify-between items-center text-sm font-medium text-grey-700">
              <p>Sub Total</p>
              <p>৳ {formatCurrency(data?.sub_total, ",")}</p>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-grey-700">
              <p>Discount</p>
              <p className="flex items-center gap-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H6"
                    />
                  </svg>
                </span>
                ৳ {formatCurrency(data?.discount, ",")}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-grey-700">
              <p>Total Cost</p>
              <p>৳ {formatCurrency(data?.grand_total, ",")}</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/checkout")}
            variant="primary"
            extraClassName="w-full mt-10"
          >
            Checkout Now!
          </Button>
        </div>
      ) : (
        <div className="text-red-400 flex flex-col items-center justify-center font-bold gap-8">
          <h2 className="text-center">
            {" "}
            Your Cart is Empty
            <br /> Please Add Products to the Cart
          </h2>
          <Link
            href="/products"
            className="inline-flex gap-2  justify-center rounded-md border-2 border-primary p-2 text-sm font-medium hover:text-white text-primary shadow-sm hover:bg-primary"
          >
            <SquaresPlusIcon className="h-5" />
            Go to All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
