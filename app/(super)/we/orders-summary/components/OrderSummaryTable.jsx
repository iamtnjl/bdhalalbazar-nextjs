import { formatDateTime } from "@/common/helpers/UtilKit";
import React from "react";

const OrderSummaryTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto rounded-md">
        <thead className="bg-teal-50 text-teal-800">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const ongoingStatus = item?.status?.find(
              (item) => item.stage === "current"
            );
            return (
              <tr key={item.order_id} className="border-b">
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  {item?.order_id}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <div>
                    <p>{formatDateTime(item?.createdAt, false)}</p>
                    <p>{ongoingStatus.name}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700 ">
                  <div>
                    <p>Order: ৳ {item?.grand_total}</p>
                    <p>Purchase: ৳ {item?.total_purchase_price}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  {item.total_purchase_price > 0 ? (
                    <>
                      ৳
                      {(item?.grand_total - item.total_purchase_price).toFixed(
                        2
                      )}
                    </>
                  ) : (
                    <>{"N/A"}</>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummaryTable;
