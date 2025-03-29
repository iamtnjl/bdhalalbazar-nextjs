"use client";

import APIKit from "@/common/helpers/APIKit";
import { loadOptions } from "@/common/helpers/UtilKit";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import ImageUploadField from "@/components/from/ImageUploadField";
import PaginatedSelect from "@/components/from/PaginatedSelect";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import TextAreaField from "@/components/from/TextAreaField";
import TextInputField from "@/components/from/TextInputField";
import Button from "@/components/shared/Button";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { number, object, string } from "yup";

const transformPayload = (payload) => {
  const transformedData = Object.entries(payload).reduce(
    (acc, [key, value]) => {
      switch (key) {
        case "brand":
        case "colors":
        case "materials":
          acc[key] = value.map((item) => item.value).join(", ");
          break;
        case "categories":
          acc[key] = value.value;
          break;
        case "primary_image":
          acc[key] = value;
          break;
        case "images":
          acc[key] = JSON.stringify(value);
          break;
        default:
          acc[key] = value;
          break;
      }
      return acc;
    },
    {}
  );

  return transformedData;
};

const validationSchema = object({
  name: string().required("Product name is required"),
  price: number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  discount: number().min(0, "Discount cannot be negative"),
  weight: number().min(0, "Weight cannot be negative"),
  unit: string().oneOf(["piece", "litre", "kg", "gram"], "Invalid unit"),
  manufacturer: string(),
  description: string(),
});

const AddProductForm = () => {
  const [primaryImage, setPrimaryImage] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discount: "",
      weight: "",
      unit: "kg",
      manufacturer: "",
      description: "",
      categories: {},
      brand: [],
      colors: [],
      materials: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        primary_image: primaryImage,
        images,
        ...transformPayload(values),
      };
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (Array.isArray(payload[key])) {
          payload[key].forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, payload[key]);
        }
      });
      const promise = APIKit.we.products
        .createProduct(formData)
        .then((data) => {
          router.push("/we/products")
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });

      return toast.promise(promise, {
        loading: "Adding product...",
        success: "Product added successfully",
        error: "Something went wrong!",
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      <div>
        <TextInputField
          label="Product Name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          autoComplete="name"
          placeholder="Enter Product Name"
        />
        <FormikErrorBox formik={formik} field="name" />
      </div>
      <div>
        <TextInputField
          label="Product Price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          autoComplete="price"
          placeholder="Enter Product Price"
          //   errors={backendErrors}
        />
        <FormikErrorBox formik={formik} field="price" />
      </div>
      <div>
        <TextInputField
          label="Discount %"
          name="discount"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.discount}
          autoComplete="discount"
          placeholder="Enter Discount %"
          //   errors={backendErrors}
        />
        <FormikErrorBox formik={formik} field="discount" />
      </div>
      <PaginatedSelect
        label="Select Categories"
        placeholder="Select categories"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getCategoriesList)
        }
        additional={{ page: 1 }}
        onCreateOption={(item) => console.log(item, "inside")}
        onChange={(items) => {
          formik.setFieldValue("categories", items);
        }}
        value={formik.values.categories}
      />
      <PaginatedSelect
        label="Select Brands"
        placeholder="Select brands"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getBrandsList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        onCreateOption={(item) => console.log(item, "inside")}
        onChange={(items) => {
          formik.setFieldValue("brand", items);
        }}
        value={formik.values.brand}
      />
      <PaginatedSelect
        label="Select Colors"
        placeholder="Select colors"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getColorList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        onCreateOption={(item) => console.log(item, "inside")}
        onChange={(items) => {
          formik.setFieldValue("colors", items);
        }}
        value={formik.values.colors}
      />
      <PaginatedSelect
        label="Select Materials"
        placeholder="Select materials"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getMaterialList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        onCreateOption={(item) => console.log(item, "inside")}
        onChange={(items) => {
          formik.setFieldValue("materials", items);
        }}
        value={formik.values.materials}
      />
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-full">
          <TextInputField
            label="Weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            autoComplete="name"
            placeholder="Enter Product Weight"
          />
        </div>
        <div className="w-fit">
          <SearchAndSelect
            label="Select Unit"
            options={[
              { label: "KG", value: "kg" },
              { label: "Gram", value: "gram" },
              { label: "Litre", value: "litre" },
              { label: "Piece", value: "piece" },
            ]}
            onChange={(items) => {
              formik.setFieldValue("unit", items.value);
            }}
            // value={selectedMaterials?.filter((option) =>
            //   params?.materials?.includes(option.value)
            // )}
          />
        </div>
      </div>
      <div>
        <TextAreaField
          label={"Description"}
          onChange={formik.handleChange}
          name={"description"}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Primary Image
        </label>
        <ImageUploadField
          name={"primaryImage"}
          id={"primaryImage"}
          image={primaryImage}
          setImage={setPrimaryImage}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Images
        </label>
        <ImageUploadField
          name={"images"}
          id={"images"}
          image={images}
          setImage={setImages}
          isMulti={true}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary">
          Add Product
        </Button>
        <Button type="submit" variant="light">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
