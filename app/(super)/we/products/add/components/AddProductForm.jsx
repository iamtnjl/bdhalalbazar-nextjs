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

        case "subCategory":
          acc[key] = value?.value || "";
          break;

        case "tags":
          if (Array.isArray(value)) {
            acc[key] = value.map((item) => item.value).join(", ");
          } else if (value?.value) {
            acc[key] = value.value; // single tag slug or name
          } else {
            acc[key] = "";
          }
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
  name: object({
    en: string().required("English name is required"),
    bn: string().required("Bangla name is required"),
  }),
  description: object({
    en: string(),
    bn: string(),
  }),
  price: number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  discount: number().min(0, "Discount cannot be negative"),
  weight: number().min(0, "Weight cannot be negative"),
  unit: string().oneOf(["piece", "litre", "kg", "gram"], "Invalid unit"),
  manufacturer: string(),
});

const AddProductForm = () => {
  const [primaryImage, setPrimaryImage] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: { en: "", bn: "" },
      description: { en: "", bn: "" },
      price: "",
      discount: "",
      weight: "",
      unit: "kg",
      manufacturer: "",
      searchTerms: "",
      categories: {},
      subCategory: {},
      brand: [],
      colors: [],
      materials: [],
      tags: {},
      mrp_price: "",
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
        } else if (typeof payload[key] === "object") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      });

      const promise = APIKit.we.products
        .createProduct(formData)
        .then(() => router.push("/we/products"))
        .catch((err) => {
          console.error(err);
          throw err;
        });

      toast.promise(promise, {
        loading: "Adding product...",
        success: "Product added successfully",
        error: "Something went wrong!",
      });
    },
  });

  const createTag = (data, promise) => {
    const apiFunc = promise({ name: data })
      .then((data) => data)
      .catch((error) => {
        throw error;
      });

    return toast.promise(apiFunc, {
      loading: "Creating...",
      success: "Created Successfully",
      error: "Something went wrong!",
    });
  };
  const createSubCategories = (data, promise) => {
    const apiFunc = promise(data)
      .then((data) => data)
      .catch((error) => {
        throw error;
      });

    return toast.promise(apiFunc, {
      loading: "Creating...",
      success: "Created Successfully",
      error: "Something went wrong!",
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      {/* Product Name (Multilingual) */}
      <TextInputField
        label="Product Name (English)"
        name="name.en"
        value={formik.values.name.en}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter Product Name in English"
      />
      <FormikErrorBox formik={formik} field="name.en" />

      <TextInputField
        label="Product Name (Bangla)"
        name="name.bn"
        value={formik.values.name.bn}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="বাংলা নাম লিখুন"
      />
      <FormikErrorBox formik={formik} field="name.bn" />

      {/* Price & Discount */}
      <TextInputField
        label="Purchase Price"
        name="price"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
        placeholder="Enter Product Purchase Price"
      />
      <FormikErrorBox formik={formik} field="price" />

      <TextInputField
        label="Discount %"
        name="discount"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.discount}
        placeholder="Enter Discount %"
      />
      <FormikErrorBox formik={formik} field="discount" />

      {/* Category and Subcategory */}
      <PaginatedSelect
        label="Select Category"
        placeholder="Select category"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getCategoriesList)
        }
        additional={{ page: 1 }}
        onCreateOption={(item) => createTag(item, APIKit.tags.createCategory)}
        onChange={(item) => {
          formik.setFieldValue("categories", item);
          formik.setFieldValue("subCategory", {});
        }}
        value={formik.values.categories}
      />

      <PaginatedSelect
        label="Select Subcategory"
        placeholder="Select subcategory"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, (params) =>
            APIKit.tags.getSubCategoriesList({
              ...params,
              category: formik.values.categories?.value,
            })
          )
        }
        onCreateOption={(item) =>
          createSubCategories(
            { name: item, categorySlug: formik.values.categories.value },
            APIKit.tags.createSubCategory
          )
        }
        additional={{ page: 1 }}
        isDisabled={!formik.values.categories?.value}
        onChange={(item) => {
          formik.setFieldValue("subCategory", item);
        }}
        value={formik.values.subCategory}
      />

      {/* Brands */}
      <PaginatedSelect
        label="Select Brands"
        placeholder="Select brands"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getBrandsList)
        }
        additional={{ page: 1 }}
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createBrand)}
        onChange={(items) => {
          formik.setFieldValue("brand", items);
        }}
        value={formik.values.brand}
      />

      {/* Tags */}
      <PaginatedSelect
        label="Select Tags"
        placeholder="Select or create tags"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getTags, "value")
        }
        additional={{ page: 1 }}
        onChange={(items) => {
          formik.setFieldValue("tags", items);
        }}
        value={formik.values.tags}
      />

      {formik?.values?.tags?.label === "MRP" && (
        <div>
          <TextInputField
            label="MRP Price"
            name="mrp_price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mrp_price}
            placeholder="MRP Price"
          />
        </div>
      )}

      {/* Colors & Materials */}
      <PaginatedSelect
        label="Select Colors"
        placeholder="Select colors"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getColorList)
        }
        additional={{ page: 1 }}
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createColor)}
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
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createMaterial)}
        onChange={(items) => {
          formik.setFieldValue("materials", items);
        }}
        value={formik.values.materials}
      />

      {/* Weight and Unit */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-full">
          <TextInputField
            label="Weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            placeholder="Enter Product Weight"
          />
        </div>
        <div className="w-fit">
          <SearchAndSelect
            label="Unit"
            options={[
              { label: "KG", value: "kg" },
              { label: "Gram", value: "gram" },
              { label: "Litre", value: "litre" },
              { label: "Piece", value: "piece" },
            ]}
            onChange={(item) => {
              formik.setFieldValue("unit", item.value);
            }}
            value={{
              label: formik.values.unit.toUpperCase(),
              value: formik.values.unit,
            }}
          />
        </div>
      </div>

      {/* Manufacturer */}
      <TextInputField
        label="Manufacturer"
        name="manufacturer"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.manufacturer}
        placeholder="Enter Manufacturer"
      />

      {/* Multilingual Description */}
      <div>
        <TextAreaField
          label="Description (English)"
          name="description.en"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description.en}
        />
      </div>
      <div>
        <TextAreaField
          label="Description (Bangla)"
          name="description.bn"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description.bn}
        />
      </div>
      <div>
        <TextAreaField
          label="Search Term"
          name="searchTerms"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={"(,) Comma Separated Value - (CSV)"}
          value={formik.values.searchTerms}
        />
      </div>

      {/* Primary Image */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Primary Image
        </label>
        <ImageUploadField
          name="primaryImage"
          id="primaryImage"
          image={primaryImage}
          setImage={setPrimaryImage}
        />
      </div>

      {/* Multiple Images */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Images
        </label>
        <ImageUploadField
          name="images"
          id="images"
          image={images}
          setImage={setImages}
          isMulti
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary">
          Add Product
        </Button>
        <Button onClick={() => router.push("/we/products")} variant="light">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
