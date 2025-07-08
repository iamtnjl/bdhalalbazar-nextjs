"use client";
import { formatDateTime } from "@/common/helpers/UtilKit";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import React from "react";

const EmployeeTable = ({ data }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto rounded-md">
        <thead className="bg-teal-50 text-teal-800">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Last login</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2 text-sm font-medium text-gray-700 flex flex-col gap-1">
                  <span>{item?.name}</span>
                  <span>{item?.phone}</span>
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <div>
                    <p>{formatDateTime(item?.lastLogin, false)}</p>
                  </div>
                </td>

                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <div>
                    <Button
                      onClick={() => router.push(`/we/employees/${item._id}`)}
                      variant="light"
                    >
                      Activity
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
