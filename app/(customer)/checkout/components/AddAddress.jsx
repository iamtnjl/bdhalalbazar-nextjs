import { useState } from "react";
import TextInputField from "@/components/from/TextInputField";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import Button from "@/components/shared/Button";
import SearchAndSelect from "@/components/from/SearchAndSelect";
import TextAreaField from "@/components/from/TextAreaField";

function AddAddress({ formik, setShowForm, Cancel, setShowAddress }) {
  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div>
        <TextAreaField
          label="Street/House"
          name="street"
          id="street"
          placeholder="House Address/Street No"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="street" />
      </div>
      <div>
        <TextInputField
          label="City"
          name="city"
          id="city"
          placeholder="Type your city name"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="city" />
      </div>
      <div>
        <TextInputField
          label="Zip/Post code"
          name="zip"
          id="zip"
          placeholder="Street/House number"
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
