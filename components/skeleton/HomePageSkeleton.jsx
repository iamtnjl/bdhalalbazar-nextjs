import React from "react";

const HomePageSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse px-2 py-4">
      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="border rounded-md p-2 space-y-2 bg-white shadow-sm"
          >
            {/* Product Image */}
            <div className="h-24 bg-gray-200 rounded" />

            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />

            {/* Price */}
            <div className="h-3 w-1/2 bg-gray-200 rounded" />

            {/* Delivery Info */}
            <div className="h-3 w-2/3 bg-gray-200 rounded" />

            {/* Add to Cart Button */}
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSkeleton;
