"use client";

import APIKit from "@/common/helpers/APIKit";
import TextInputField from "@/components/from/TextInputField";
import Button from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Tag name is required")
    .max(50, "Tag name should not exceed 50 characters"),
  margin: Yup.number()
    .required("Margin is required")
    .typeError("Margin must be a number")
    .min(0, "Margin cannot be negative")
    .max(100, "Margin cannot exceed 100%"),
});

const EditTags = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-tags-detail", searchParams.get("id")],
    queryFn: () =>
      APIKit.we.tags
        .getTagDetail(searchParams.get("id"))
        .then(({ data }) => data),
  });

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      margin: data?.margin || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const promise = APIKit.we.tags
        .updateTag(searchParams.get("id"), values)
        .then(() => {
          router.push("/we/tags");
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });

      return toast.promise(promise, {
        loading: "Editing Tag...",
        success: "Tag edited successfully",
        error: (error) => error.message,
      });
    },
  });
  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Edit tag"} />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <TextInputField
          label="Tag Name"
          name="name"
          id="delivery_charge"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.errors}
        />
        <TextInputField
          label="Tag Margin"
          name="margin"
          id="margin"
          value={formik.values.margin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.errors}
        />
        <Button type="submit" variant="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditTags;
