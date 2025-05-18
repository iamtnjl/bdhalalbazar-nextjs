"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/common/helpers/UtilKit";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import TextInputField from "@/components/from/TextInputField";
import Image from "next/image";
import Button from "@/components/shared/Button";
import { useRouter, useSearchParams } from "next/navigation";
import APIKit from "@/common/helpers/APIKit";
import toast from "react-hot-toast";

const unitOptions = [
  { label: "KG", value: "kg" },
  { label: "Gram", value: "gram" },
  { label: "Litre", value: "litre" },
  { label: "Piece", value: "piece" },
];

const OrderItemEditCard = ({ item, refetch }) => {
  const [isEdited, setIsEdited] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const initialValues = {
    product_id: item.product._id || "",
    weight: item.weight || "",
    unit: item.unit || "",
    total_price: item?.total_price || "",
    purchase_price: item.purchase_price || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const promise = APIKit.we.orders
        .editOrder(params.get("id"), values)
        .then(({}) => {
          refetch();
        })
        .catch((error) => {
          throw error;
        });

      return toast.promise(promise, {
        loading: "Updating order items...",
        success: "Order items updated successfully!",
        error: (error) => {
          if (error?.response?.data) {
            const [errorKey] = Object.keys(error.response?.data);
            return error.response.data[errorKey][0];
          } else {
            return "Something went wrong";
          }
        },
      });
    },
  });

  useEffect(() => {
    const productWeight = parseFloat(item?.product?.weight || "1");
    const selectedWeight = parseFloat(formik.values.weight);
    const quantity = parseInt(item?.quantity || "1", 10);
    const price = parseFloat(item?.product?.price || "0");
    const discount = parseFloat(item?.product?.discount || "0");
    const sellingPrice = parseFloat(price - (price * discount) / 100);

    if (!isNaN(selectedWeight) && !isNaN(price) && !isNaN(quantity)) {
      let actualUnitPrice;

      const pricePerUnit = sellingPrice / productWeight;
      if (productWeight !== selectedWeight) {
        actualUnitPrice = pricePerUnit * selectedWeight;
      } else {
        actualUnitPrice = pricePerUnit * selectedWeight * item.quantity;
      }

      formik.setFieldValue("total_price", actualUnitPrice.toFixed(2));
    } else {
      formik.setFieldValue("total_price", "");
    }
  }, [formik.values.weight, formik.values.quantity, item?.product?.price]);

  useEffect(() => {
    const isFormChanged = Object.keys(formik.initialValues)
      .filter((key) => key !== "total_price")
      .some((key) => formik.values[key] !== formik.initialValues[key]);
    setIsEdited(isFormChanged);
  }, [formik.values, formik.initialValues]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white border border-gray-300 p-2 rounded-lg flex flex-col gap-3 mb-2">
        <div className="flex flex-row-reverse items-start gap-2">
          <img
            className="w-12 h-12 object-cover rounded-md border-2 border-gray-200"
            src={item?.product?.primary_image.original}
            alt={item.product.name}
          />

          <div className="w-full space-y-1">
            <div className="flex flex-shrink text-gray-900">
              <p className="text-sm font-bold">{item?.product?.name}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              Categories:{" "}
              {item?.product?.categories.map((cat) => cat.name).join(", ")}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Categories:{" "}
              {item?.product?.brand.map((cat) => cat.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2">
            <TextInputField
              label="Weight"
              name="weight"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.weight}
              autoComplete="weight"
              placeholder="Enter Product Weight"
            />
          </div>
          <div className="w-1/2">
            <TextInputField
              label="Unit"
              disabled
              value={
                unitOptions.find((data) => data.value === item.unit)?.label
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full">
            <TextInputField
              disabled={true}
              label="Price"
              name="total_price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.total_price}
              autoComplete="total_price"
            />
          </div>
          <div className="w-full">
            <TextInputField
              label="Purchase Price"
              name="purchase_price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.purchase_price}
              autoComplete="purchase-price"
              placeholder="Enter Product Purchase Price"
            />
          </div>
        </div>

        {isEdited && (
          <div className="flex justify-end mt-2">
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default OrderItemEditCard;
