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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// ✅ transformPayload with multilingual name & description
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
          acc[key] = value?.value || "";
          break;
        case "subCategory":
          acc[key] = value?.value || "";
          break;
        case "tags":
          if (Array.isArray(value)) {
            acc[key] = value.map((item) => item.value).join(", ");
          } else if (value?.value) {
            acc[key] = value.value;
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

const transformOption = (data, field = "slug") => {
  if (!data) return undefined;
  if (Array.isArray(data)) {
    return data.map((item) => ({
      label: item?.name,
      value: item?.[field],
    }));
  }
  return { label: data?.name, value: data?.slug };
};

const AdminProductEditForm = ({ data, refetch }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [primaryImage, setPrimaryImage] = useState([]);
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: {
        en: data?.name?.en || "",
        bn: data?.name?.bn || "",
      },
      description: {
        en: data?.description?.en || "",
        bn: data?.description?.bn || "",
      },
      price: data?.price || "",
      discount: data?.discount || "",
      weight: data?.weight || "",
      unit: data?.unit || "kg",
      manufacturer: data?.manufacturer || "",
      searchTerms: data?.searchTerms?.join(", ") || "",
      categories: transformOption(data?.categories?.[0]) || {},
      subCategory: transformOption(data?.subCategory) || {},
      brand: transformOption(data?.brand) || [],
      colors: transformOption(data?.colors) || [],
      materials: transformOption(data?.materials) || [],
      tags: transformOption(data?.tags, "_id")[0] || {},
      mrp_price: data?.mrp_price || "",
    },
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

      const handleRedirect = () => {
        const current = new URLSearchParams(searchParams.toString());
        current.delete("id");
        router.push(`/we/products?${current.toString()}`);
      };

      const promise = APIKit.we.products
        .updateProduct(id, formData)
        .then(() => {
          refetch();
          handleRedirect();
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });

      toast.promise(promise, {
        loading: "Editing product...",
        success: "Product edited successfully",
        error: "Something went wrong!",
      });
    },
  });

  console.log(formik?.values?.tags?.label);

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

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      {/* Multilingual Name */}
      <TextInputField
        label="Product Name (English)"
        name="name.en"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name.en}
        placeholder="Product name in English"
      />
      <FormikErrorBox formik={formik} field="name.en" />

      <TextInputField
        label="Product Name (Bangla)"
        name="name.bn"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name.bn}
        placeholder="Product name in Bangla"
      />
      <FormikErrorBox formik={formik} field="name.bn" />

      <TextInputField
        label="Price"
        name="price"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
        placeholder="Product price"
      />

      <TextInputField
        label="Discount %"
        name="discount"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.discount}
        placeholder="Discount %"
      />

      <PaginatedSelect
        label="Category"
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
        label="Subcategory"
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
          createTag(
            { name: item, categorySlug: formik.values.categories?.value },
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

      <PaginatedSelect
        label="Brands"
        placeholder="Select brands"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getBrandsList)
        }
        additional={{ page: 1 }}
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createBrand)}
        onChange={(items) => formik.setFieldValue("brand", items)}
        value={formik.values.brand}
      />

      <PaginatedSelect
        label="Tags"
        placeholder="Select tags"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getTags, "value")
        }
        additional={{ page: 1 }}
        onCreateOption={(item) => createTag(item, APIKit.tags.createTag)}
        onChange={(items) => formik.setFieldValue("tags", items)}
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

      <PaginatedSelect
        label="Colors"
        placeholder="Select colors"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getColorList)
        }
        additional={{ page: 1 }}
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createColor)}
        onChange={(items) => formik.setFieldValue("colors", items)}
        value={formik.values.colors}
      />

      <PaginatedSelect
        label="Materials"
        placeholder="Select materials"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getMaterialList)
        }
        additional={{ page: 1 }}
        isMulti
        onCreateOption={(item) => createTag(item, APIKit.tags.createMaterial)}
        onChange={(items) => formik.setFieldValue("materials", items)}
        value={formik.values.materials}
      />

      <TextInputField
        label="Weight"
        name="weight"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.weight}
        placeholder="Weight"
      />

      <SearchAndSelect
        label="Unit"
        options={[
          { label: "KG", value: "kg" },
          { label: "Gram", value: "gram" },
          { label: "Litre", value: "litre" },
          { label: "Piece", value: "piece" },
        ]}
        onChange={(item) => formik.setFieldValue("unit", item.value)}
        value={{
          label: formik.values.unit.toUpperCase(),
          value: formik.values.unit,
        }}
      />

      <TextInputField
        label="Manufacturer"
        name="manufacturer"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.manufacturer}
        placeholder="Manufacturer"
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
          label="Search Terms"
          name="searchTerms"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Comma separated"
          value={formik.values.searchTerms}
        />
      </div>

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

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary">
          Edit Product
        </Button>
        <Button onClick={() => router.back()} variant="light">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminProductEditForm;
