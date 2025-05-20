import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="px-2 py-4 rounded shadow animate-pulse w-full">
      {/* Breadcrumb */}
      <div className="h-4 w-48 bg-gray-300 rounded mb-4 "></div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-300 rounded mb-4"></div>

      {/* Thumbnail */}
      <div className="flex space-x-2 mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded"></div>
      </div>

      {/* Product Title */}
      <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>

      {/* Weight */}
      <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>

      {/* Price */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <div className="h-4 w-10 bg-gray-300 rounded"></div>
      </div>

      {/* Add to Cart Button */}
      <div className="h-10 w-32 bg-gray-300 rounded mb-4"></div>

      {/* Description label */}
      <div className="h-5 w-28 bg-gray-300 rounded mb-1"></div>
      {/* Description text */}
      <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>

      {/* Brand label */}
      <div className="h-5 w-20 bg-gray-300 rounded mb-1"></div>
      {/* Brand text */}
      <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>

      {/* Categories label */}
      <div className="h-5 w-24 bg-gray-300 rounded mb-1"></div>
      {/* Categories text */}
      <div className="h-4 w-20 bg-gray-300 rounded"></div>
    </div>
  );
}
