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

function formatChangeValue(value, field) {
  // If it’s an array
  if (Array.isArray(value)) {
    if (value.length === 0) return "Empty";
    if (typeof value[0] === "object" && value[0] !== null) {
      return (
        <div className="flex gap-1">
          {value.map((img, idx) => (
            <img
              key={img._id || idx}
              src={img.thumbnail || img.original || ""}
              alt=""
              className="inline-block h-8 w-8 rounded border"
            />
          ))}
        </div>
      );
    }
    return value.join(", ");
  }

  // If the value is a single object (rare here)
  if (typeof value === "object" && value !== null) {
    return <code>{JSON.stringify(value)}</code>;
  }

  // ✅ Special: If the field is an image path and value is a URL → render as image
  if (
    typeof value === "string" &&
    field.startsWith("primary_image") &&
    value.startsWith("http")
  ) {
    return (
      <img src={value} alt="" className="inline-block h-8 w-8 rounded border" />
    );
  }

  // ✅ Special: If the field is `is_published` → map boolean to label
  if (field === "is_published") {
    return value ? "Published" : "Unpublished";
  }

  return value !== undefined && value !== null ? String(value) : "N/A";
}
const UpdateProductCard = ({ item }) => {
  const { i18n } = useTranslation();
  const name = item.name[i18n.language] || item.name;

  console.log(item);

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
          ?.map((change, i) => {
            const oldVal = formatChangeValue(change.oldValue, change.field);
            const newVal = formatChangeValue(change.newValue, change.field);
            const hasOld =
              change.oldValue !== undefined &&
              change.oldValue !== null &&
              change.oldValue !== "";

            return (
              <div key={i} className="text-sm font-medium text-gray-500">
                <span className="font-bold capitalize">
                  {getReadableFieldName(change.field)}
                </span>{" "}
                {hasOld ? (
                  <>
                    changed from <span className="font-bold">{oldVal}</span> to{" "}
                    <span className="font-bold text-primary">{newVal}</span>
                  </>
                ) : (
                  <>
                    set to{" "}
                    <span className="font-bold text-primary">{newVal}</span>.
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UpdateProductCard;
