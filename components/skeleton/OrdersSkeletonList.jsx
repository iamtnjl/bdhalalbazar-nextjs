export default function OrdersSkeletonList() {
  const items = [1, 2, 3];

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item) => (
        <div
          key={item}
          className="border rounded-md p-4  animate-pulse bg-white w-full"
        >
          {/* Header: Order # */}
          <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>

          {/* Price and status row */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
          </div>

          {/* View Details row */}
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
