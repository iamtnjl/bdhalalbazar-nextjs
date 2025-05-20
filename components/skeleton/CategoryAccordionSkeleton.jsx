import React from "react";

const CategoryAccordionSkeleton = () => {
  const items = Array(5).fill(0);

  return (
    <div className="px-2 py-4 space-y-3 animate-pulse">
      {items.map((_, index) => (
        <div
          key={index}
          className="h-14 bg-gray-100 rounded-md shadow-sm flex items-center px-4"
        >
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="ml-auto h-4 w-4 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordionSkeleton;
