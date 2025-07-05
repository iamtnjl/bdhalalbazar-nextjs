"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TextInputField from "@/components/from/TextInputField";
import Button from "@/components/shared/Button";
import { useSearchParams } from "next/navigation";
import APIKit from "@/common/helpers/APIKit";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const unitOptions = [
  { label: "KG", value: "kg" },
  { label: "Gram", value: "gram" },
  { label: "Litre", value: "litre" },
  { label: "Piece", value: "piece" },
];

const OrderItemEditCard = ({ item, refetch }) => {
  const [isEdited, setIsEdited] = useState(false);
  const params = useSearchParams();
  const { i18n } = useTranslation();
  const name = item?.product?.name[i18n.language] || item?.product?.name;

  const initialValues = {
    product_id: item.product._id || "",
    quantity: item.quantity || 1,
    weight: item.weight || item.product.weight || 1,
    unit: item.unit || item.product.unit || "",
    total_price: item.total_price || "",
    purchase_price: item.purchase_price || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const promise = APIKit.we.orders
        .editOrder(params.get("id"), values)
        .then(() => {
          refetch();
        })
        .catch((error) => {
          throw error;
        });

      return toast.promise(promise, {
        loading: "Updating order item...",
        success: "Order item updated!",
        error: (error) => {
          if (error?.response?.data) {
            const [key] = Object.keys(error.response.data);
            return error.response.data[key][0];
          }
          return "Something went wrong.";
        },
      });
    },
  });

  console.log(item);

  useEffect(() => {
    const quantity = parseFloat(formik.values.quantity) || 1;
    const weight = parseFloat(formik.values.weight) || 1;

    const productWeight = parseFloat(item.product.weight) || 1;
    const discountedPrice = parseFloat(item.discounted_price) || 0;
    const basePrice = parseFloat(item.base_price) || 0;

    // Unit prices per product weight
    const sellingUnitPricePerWeight = discountedPrice / productWeight;
    const baseUnitPricePerWeight = basePrice / productWeight;

    // Totals
    const totalPrice = sellingUnitPricePerWeight * weight * quantity;
    const purchasePrice = baseUnitPricePerWeight * weight * quantity;

    formik.setFieldValue("total_price", totalPrice.toFixed(2));
    formik.setFieldValue("purchase_price", purchasePrice.toFixed(2));
  }, [formik.values.quantity, formik.values.weight]);

  useEffect(() => {
    const isFormChanged = Object.keys(formik.initialValues)
      .filter((key) => key !== "total_price" && key !== "purchase_price")
      .some(
        (key) =>
          String(formik.values[key]) !== String(formik.initialValues[key])
      );
    setIsEdited(isFormChanged);
  }, [formik.values, formik.initialValues]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white border border-gray-300 p-3 rounded-lg flex flex-col gap-3 mb-4">
        <div className="flex items-start gap-3">
          <img
            className="w-12 h-12 object-cover rounded-md border"
            src={item?.product?.primary_image?.original}
            alt={name}
          />
          <div className="flex-1 space-y-1">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-gray-500">
              Categories:{" "}
              {item?.product?.categories?.map((c) => c.name).join(", ")}
            </p>
            <p className="text-xs text-gray-500">
              Brand: {item?.product?.brand?.map((b) => b.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full">
          <TextInputField
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          <TextInputField
            label="Weight"
            name="weight"
            type="number"
            min="0"
            onChange={formik.handleChange}
            value={formik.values.weight}
          />
          <TextInputField
            label="Unit"
            value={
              unitOptions.find((u) => u.value === formik.values.unit)?.label ||
              formik.values.unit
            }
            disabled
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full">
          <TextInputField
            label="Total Price"
            name="total_price"
            type="number"
            value={formik.values.total_price}
            disabled
          />
          <TextInputField
            label="Purchase Price"
            name="purchase_price"
            type="number"
            value={formik.values.purchase_price}
            disabled
          />
        </div>

        {isEdited && (
          <div className="flex justify-end">
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
