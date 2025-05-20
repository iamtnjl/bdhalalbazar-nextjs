import React from "react";

const LogoCartSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow rounded-md w-full">
      {/* Logo Skeleton */}
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Cart Skeleton */}
      <div className="relative">
        <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-300 rounded-full animate-pulse border-2 border-white" />
      </div>
    </div>
  );
};

export default LogoCartSkeleton;
