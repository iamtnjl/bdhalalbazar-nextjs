"use client";

import APIKit from "@/common/helpers/APIKit";
import { formatDateTime } from "@/common/helpers/UtilKit";
import Button from "@/components/shared/Button";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TagsTable = ({ data, refetch }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const router = useRouter();
  const handleDeleteTag = () => {
    const promise = APIKit.we.tags
      .deleteTag(selectedData?._id)
      .then(() => {
        refetch();
      })
      .catch((e) => {
        throw e;
      });
    return toast.promise(promise, {
      loading: "Deleting...",
      success: "Successfully deleted.",
      error: "Something went wrong!",
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto rounded-md">
        <thead className="bg-teal-50 text-teal-800">
          <tr>
            <th className="px-4 py-2 text-left">Tag Name</th>
            <th className="px-4 py-2 text-left">Margin (%)</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <div>
                    <p>{item.name}</p>
                    <p>{formatDateTime(item?.createdAt, false)}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <p>{item.margin}%</p>
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  <div className="flex items-start gap-2">
                    <Button
                      onClick={() =>
                        router.push(`/we/tags/edit?id=${item?._id}`)
                      }
                      variant="light"
                      extraClassName="text-gray-700 flex items-center gap-2"
                    >
                      <PencilSquareIcon className="-mt-1 h-5 w-5 text-gray-700" />
                    </Button>
                    <Button
                      onClick={() => {
                        setIsConfirmationModalOpen(true);
                        setSelectedData(item);
                      }}
                      variant="light"
                      extraClassName="border-red-600"
                    >
                      <Trash2Icon className="-mt-1 h-5 w-5 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title="Are you sure?"
        message={`Are you sure to delete this tag?`}
        closeModal={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteTag}
      />
    </div>
  );
};

export default TagsTable;
