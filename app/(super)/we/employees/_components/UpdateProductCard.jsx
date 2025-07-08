"use client";

import { useTranslation } from "react-i18next";

function getReadableFieldName(field) {
  const map = {
    "name.en": "Product Name (English)",
    "name.bn": "Product Name (Bangla)",
    "description.en": "Description (English)",
    "description.bn": "Description (Bangla)",
    price: "Price",
    mrp_price: "MRP Price",
    discount: "Discount",
    brand: "Brand",
    materials: "Materials",
    categories: "Categories",
    subCategory: "Subcategory",
    tags: "Tags",
    colors: "Colors",
    status: "Status",
    is_published: "Published Status",
    stock: "Stock",
    orderable_stock: "Orderable Stock",
    weight: "Weight",
    unit: "Unit",
    ad_pixel_id: "Ad Pixel ID",
    manufacturer: "Manufacturer",
    primary_image: "Primary Image",
    images: "Images",
  };

  return map[field] || field; // fallback to field itself if no mapping found
}

const UpdateProductCard = ({ item }) => {
  const { i18n } = useTranslation();
  const name = item.name[i18n.language] || item.name;

  return (
    <div className="col-span-1 rounded-lg bg-white shadow border">
      {/* Product Details */}
      <div className="flex w-full justify-between space-x-4 p-4">
        <div className="flex-1 truncate space-y-2">
          <div className="flex items-center gap-4">
            <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <h3 className="truncate text-sm text-grey-500">
              {item.categories.map((item) => item?.name).join(", ")}
            </h3>
            <p>•</p>
            {item.subCategory?.name.length > 0 ? (
              <h3 className="truncate text-sm text-grey-500">
                {item.subCategory?.name}
              </h3>
            ) : (
              <h3 className="truncate text-sm text-grey-500">N/A</h3>
            )}
          </div>
        </div>
        <img
          className="h-16 w-16 flex-shrink-0 rounded-md"
          src={item?.primary_image?.original}
          alt={item.name}
        />
      </div>
      <div className="px-4 pb-4 flex flex-col gap-1">
        {item?.changes
          ?.filter((change) => change.field !== "updatedBy")
          ?.map((change, i) => (
            <p key={i} className="text-sm font-medium text-gray-500">
              <span className="font-bold capitalize">
                {getReadableFieldName(change.field)}
              </span>{" "}
              has been changed to{" "}
              <span className="font-bold text-primary">{change?.newValue}</span>{" "}
              from <span className="font-bold">{change?.oldValue}</span>.
            </p>
          ))}
      </div>
    </div>
  );
};

export default UpdateProductCard;
