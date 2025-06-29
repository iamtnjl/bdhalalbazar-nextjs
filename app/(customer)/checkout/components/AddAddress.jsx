"use client";

import { useState } from "react";
import TextInputField from "@/components/from/TextInputField";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import Button from "@/components/shared/Button";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import TextAreaField from "@/components/from/TextAreaField";
import { useTranslation } from "react-i18next";

function AddAddress({ formik, setShowForm, Cancel, setShowAddress }) {
  const { t } = useTranslation();
  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div>
        <TextAreaField
          label={t("checkout.streetHouse")}
          name="street"
          id="street"
          placeholder={t("checkout.houseAddressPlaceholder")}
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="street" />
      </div>
      <div>
        <TextInputField
          label={t("checkout.city")}
          name="city"
          id="city"
          placeholder={t("checkout.cityPlaceholder")}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="city" />
      </div>
      <div>
        <TextInputField
          label={t("checkout.zipCode")}
          name="zip"
          id="zip"
          placeholder="6600"
          value={formik.values.zip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="zip" />
      </div>

      <div className="flex justify-end gap-2">
        {Cancel && (
          <>
            <Button
              variant="light"
              extraClassName="w-full justify-center"
              onClick={() => {
                setShowForm(false);
                setShowAddress(false);
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default AddAddress;
