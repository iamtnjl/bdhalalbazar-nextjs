import React from "react";

export default function OrderDetailsSkeleton() {
  return (
    <div className="max-w-md p-4 space-y-6 border rounded-md shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-gray-300 rounded"></div>
        <div className="h-5 w-8 bg-gray-300 rounded"></div>
      </div>

      {/* Date and time */}
      <div className="h-4 w-40 bg-gray-300 rounded"></div>

      {/* Order Status Section */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="ml-auto h-4 w-12 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Customer Details Section */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-5 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-1">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="h-6 w-full bg-gray-300 rounded"></div>
      </div>

      {/* Products Section */}
      <div className="space-y-3">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="flex space-x-4">
          <div className="h-16 w-16 bg-gray-300 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-36 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 w-20 bg-gray-300 rounded self-start"></div>
        </div>
      </div>

      {/* Order Price Breakdown */}
      <div className="space-y-1">
        <div className="h-4 w-44 bg-gray-300 rounded"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
