"use client";

import APIKit from "@/common/helpers/APIKit";
import { loadOptions } from "@/common/helpers/UtilKit";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import PaginatedSelect from "@/components/from/PaginatedSelect";
import TextInputField from "@/components/from/TextInputField";
import React from "react";

const AddProductForm = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <TextInputField
          label="Product Name"
          name="name"
          type="text"
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
          //   value={formik.values.first_name}
          autoComplete="name"
          placeholder="Enter Product Name"
          //   errors={backendErrors}
        />
        {/* <FormikErrorBox formik={formik} field="name" /> */}
      </div>
      <div>
        <TextInputField
          label="Product Price"
          name="price"
          type="number"
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
          //   value={formik.values.first_name}
          autoComplete="price"
          placeholder="Enter Product Price"
          //   errors={backendErrors}
        />
        {/* <FormikErrorBox formik={formik} field="price" /> */}
      </div>
      <div>
        <TextInputField
          label="Discount %"
          name="discount"
          type="number"
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
          //   value={formik.values.first_name}
          autoComplete="discount"
          placeholder="Enter Discount %"
          //   errors={backendErrors}
        />
        {/* <FormikErrorBox formik={formik} field="name" /> */}
      </div>
      <PaginatedSelect
        label="Select Categories"
        placeholder="Select categories"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getCategoriesList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        // onChange={(items) => updateParams("categories", items)}
        // value={selectedCategories?.filter((option) =>
        //   params?.categories?.includes(option.value)
        // )}
      />
      <PaginatedSelect
        label="Select Brands"
        placeholder="Select brands"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getBrandsList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        // onChange={(items) => updateParams("brands", items)}
        // value={selectedBrands?.filter((option) =>
        //   params?.brands?.includes(option.value)
        // )}
      />
      <PaginatedSelect
        label="Select Colors"
        placeholder="Select colors"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getColorList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        // onChange={(items) => updateParams("colors", items)}
        // value={selectedColors?.filter((option) =>
        //   params?.colors?.includes(option.value)
        // )}
      />
      <PaginatedSelect
        label="Select Materials"
        placeholder="Select materials"
        loadOptions={(inputValue, _, page) =>
          loadOptions(inputValue, _, page, APIKit.tags.getMaterialList)
        }
        additional={{ page: 1 }}
        isMulti={true}
        // onChange={(items) => updateParams("materials", items)}
        // value={selectedMaterials?.filter((option) =>
        //   params?.materials?.includes(option.value)
        // )}
      />
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-full">
          <TextInputField
            label="Weight"
            name="weight"
            type="number"
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   value={formik.values.first_name}
            autoComplete="name"
            placeholder="Enter Product Weight"
            //   errors={backendErrors}
          />
        </div>
        <div className="w-fit">
          <PaginatedSelect
            label="Select Unit"
            loadOptions={{
              options: [
                { label: "KG", value: "kg" },
                { label: "Gram", value: "gram" },
                { label: "Litre", value: "litre" },
                { label: "Piece", value: "piece" },
              ],
              hasMore: false,
            }}
            additional={{ page: 1 }}
            isMulti={false}
            // onChange={(items) => updateParams("materials", items)}
            // value={selectedMaterials?.filter((option) =>
            //   params?.materials?.includes(option.value)
            // )}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
