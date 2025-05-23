"use client";
import APIKit from "@/common/helpers/APIKit";
import { formatDateTime } from "@/common/helpers/UtilKit";
import TextInputField from "@/components/from/TextInputField";
import Button from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const [editMode, setEditMode] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/settings"],
    queryFn: () => APIKit.we.settings.getSettings().then(({ data }) => data),
    keepPreviousData: true,
  });
  const formik = useFormik({
    initialValues: {
      delivery_charge: data?.delivery_charge || "",
      platform_fee: data?.platform_fee || "",
      profit_margin: data?.profit_margin || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const promise = APIKit.we.settings
        .updateSettings(values)
        .then(() => {
          refetch();
          setEditMode(false);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });

      return toast.promise(promise, {
        loading: "Updating Setting...",
        success: "Settings updated successfully",
        error: "Something went wrong!",
      });
    },
  });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="px-2 py-4 flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <SectionTitle title={"Settings"} />
        <Button
          onClick={() => setEditMode(true)}
          variant="primary"
          extraClassName="flex items-center gap-2"
        >
          <PencilSquareIcon className="h-5 w-5 text-white" />
          Edit
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <TextInputField
          label="Delivery Charge"
          name="delivery_charge"
          id="delivery_charge"
          value={formik.values.delivery_charge}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editMode}
        />
        <TextInputField
          label="Platform Fee"
          name="platform_fee"
          id="platform_fee"
          value={formik.values.platform_fee}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editMode}
        />
        <TextInputField
          label="Profit Margin (%)"
          name="profit_margin"
          id="profit_margin"
          value={formik.values.profit_margin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editMode}
        />
      </div>
      {editMode ? (
        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button onClick={() => setEditMode(false)} variant="white">
            Cancel
          </Button>
        </div>
      ) : (
        <p className="text-gray-500">
          Updated at: {formatDateTime(data?.updatedAt, true)}
        </p>
      )}
    </form>
  );
};

export default Settings;
