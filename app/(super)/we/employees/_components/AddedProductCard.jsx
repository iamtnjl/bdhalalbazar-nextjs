"use client";

import { useTranslation } from "react-i18next";

const AddedProductCard = ({ item }) => {
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
    </div>
  );
};

export default AddedProductCard;
