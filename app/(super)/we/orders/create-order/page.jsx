"use client";
import AddAddress from "@/app/(customer)/checkout/components/AddAddress";
import APIKit from "@/common/helpers/APIKit";
import { loadOptions } from "@/common/helpers/UtilKit";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import PaginatedSelect from "@/components/from/PaginatedSelect";
import PhoneInputField from "@/components/from/PhoneInputField";
import TextAreaField from "@/components/from/TextAreaField";
import TextInputField from "@/components/from/TextInputField";
import SectionTitle from "@/components/shared/SectionTitle";
import React from "react";

const CreateOrder = () => {
  return (
    <div className="py-4 px-2 flex flex-col gap-4">
      <SectionTitle title={"Create Order"} />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-base text-grey-500 mt-2">
          Customer information
        </h3>
        <div>
          <TextInputField
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            label="Name"
            placeholder="E.g: John Doe"
          />
          {/* <FormikErrorBox formik={formik} field="name" /> */}
        </div>
        <div>
          <TextInputField
            name="email"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            label="Email (Optional)"
            placeholder="someone@example.com"
          />
          {/* <FormikErrorBox formik={formik} field="email" /> */}
        </div>
        <div>
          <PhoneInputField
            label="Phone"
            name="phone"
            // value={formik.values.phone}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            placeholder="E.g: 12345678"
          />
          {/* <FormikErrorBox formik={formik} field="phone" /> */}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="font-semibold text-base text-grey-500">
          Delivery Address
        </h3>
        <div className="flex flex-col gap-2">
          <div>
            <TextAreaField
              label="Street/House"
              name="street"
              id="street"
              placeholder="House Address/Street No"
              //   value={formik.values.street}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
            />
            {/* <FormikErrorBox formik={formik} field="street" /> */}
          </div>
          <div>
            <TextInputField
              label="City"
              name="city"
              id="city"
              placeholder="Type your city name"
              //   value={formik.values.city}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
            />
            {/* <FormikErrorBox formik={formik} field="city" /> */}
          </div>
          <div>
            <TextInputField
              label="Zip/Post code"
              name="zip"
              id="zip"
              placeholder="Street/House number"
              //   value={formik.values.zip}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
            />
            {/* <FormikErrorBox formik={formik} field="zip" /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-base text-grey-500">
          Order Products
        </h3>
        <PaginatedSelect
          label="Select Products"
          isClearable={true}
          placeholder="Select categories"
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.we.products.getAllProduct, "_id")
          }
          additional={{ page: 1 }}
          onChange={(items) => {
            console.log(items);
          }}
          //   value={selectedCategories?.filter((option) =>
          //     params?.categories?.includes(option.value)
          //   )}
        />
      </div>
    </div>
  );
};

export default CreateOrder;
