import { formatCurrency } from "@/common/helpers/UtilKit";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

function CustomerTable({ tableData }) {
  const router = useRouter();

  const balanceStyle = {
    green: "text-primary",
    red: "text-warning",
    default: "text-gray-700",
  };

  const balanceStyeCheck = (balance) => {
    return balance == 0
      ? balanceStyle.default
      : balance < 0
      ? balanceStyle.red
      : balanceStyle.green;
  };

  return (
    <div>
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-300 border border-gray-300 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <thead className="bg-primary-100">
          <tr className="p-4">
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Customer Name
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Phone
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
            >
              Total Orders
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tableData?.map((item) => (
            <tr className="cursor-pointer" key={item._id}>
              <td className="w-full sm:min-w-[200px] truncate py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                {item.name || ""}
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Order Amount</dt>
                  <dd className="mt-1 truncate">
                    <span>
                      Order amount:{" "}
                      <span
                        className={`${balanceStyeCheck(item?.total_amount)}`}
                      >
                        {Number(item?.total_amount).toFixed(2)}
                      </span>
                    </span>
                  </dd>
                  <dt className="sr-only sm:hidden">Orders</dt>
                  <dd className="mt-1 truncate text-gray-500 md:hidden">
                    Orders count: {item.total_orders}
                  </dd>
                  <dt className="sr-only sm:hidden">[thFour]</dt>
                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                    {item.phone}
                  </dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {item.phone}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                {item.total_orders}
              </td>
              <td className="hidden px-3 py-4 text-right lg:table-cell">
                <span
                  className={`text-sm ${balanceStyeCheck(item?.total_amount)}`}
                >
                  {item?.total_amount < 0 ? "-" : ""}
                  {formatCurrency(item?.total_amount, ",")}
                </span>
              </td>
              <td className="py-4 px-3 text-center">
                <Button
                  variant="white"
                  onClick={(event) => {
                    if (event.stopPropagation) event.stopPropagation();
                    router.push(`/we/customers/${item?._id}`);
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
