"use client";

import React from "react";

const CategorySliderSkeleton = () => {
  const skeletons = Array(5).fill(null); // Create 5 placeholder items

  return (
    <div className="flex gap-3 px-2">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-center gap-2 rounded-full px-4 py-2"
          style={{ backgroundColor: "#f3f3f3", minWidth: "100px" }}
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};

export default CategorySliderSkeleton;
