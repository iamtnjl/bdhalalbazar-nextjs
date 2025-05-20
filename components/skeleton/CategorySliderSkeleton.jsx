import React from "react";

const CategorySliderSkeleton = () => {
  return (
    <div className="relative px-2 animate-pulse">
      <div className="flex space-x-3 overflow-x-auto pb-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex-shrink-0 w-28 h-28 bg-gray-200 rounded-lg p-2"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-3 w-1/2 bg-gray-300 rounded" />
              </div>
              <div className="h-10 w-10 bg-gray-300 rounded mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySliderSkeleton;
