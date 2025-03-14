import { useState } from "react";
import TextInputField from "@/components/from/TextInputField";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import Button from "@/components/shared/Button";
import SearchAndSelect from "@/components/from/SearchAndSelect";

function AddAddress({ formik, setShowForm, Cancel, refetch, setShowAddress }) {
  const [backendErrors, setBackendErrors] = useState({});

  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div>
        <TextInputField
          label="Label"
          name="label"
          id="label"
          placeholder="Enter Label"
          value={formik.values.label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="label" />
      </div>
      <div>
        <TextInputField
          label="Street"
          name="street"
          id="street"
          placeholder="House Address"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="street" />
      </div>
      <div>
        <SearchAndSelect
          label="Division"
          name="division"
          id="division"
          options={[
            { label: "Dhaka", value: "dhaka" },
            { label: "Rajshahi", value: "rajshahi" },
            { label: "Khulna", value: "khulna" },
            { label: "Barishal", value: "barishal" },
            { label: "Sylhet", value: "sylhet" },
            { label: "Chittagong", value: "chittagong" },
          ]}
          placeholder="Select division"
          onChange={(selectedValue) => {
            formik.setFieldValue("division", selectedValue.label);
          }}
          onBlur={formik.handleBlur}
        />
        <FormikErrorBox formik={formik} field="division" />
      </div>
      <div>
        <SearchAndSelect
          label="District"
          name="district"
          id="district"
          options={[
            { label: "Pabna", value: "pabna" },
            { label: "Natore", value: "natore" },
            { label: "Bogra", value: "bogra" },
            { label: "Chapai", value: "chapai" },
            { label: "Sunamganj", value: "sunamganj" },
            { label: "Bagerhat", value: "bagerhat" },
          ]}
          onBlur={formik.handleBlur}
          placeholder="Select district"
          onChange={(selectedValue) => {
            formik.setFieldValue("district", selectedValue.label);
          }}
        />
        <FormikErrorBox formik={formik} field="district" />
      </div>

      <div>
        <SearchAndSelect
          label="Area/Thana"
          name="aria"
          id="aria"
          options={[
            { label: "Ullapara", value: "ullapara" },
            { label: "Bera", value: "bera" },
            { label: "Sujanagar", value: "sujanagar" },
            { label: "Tekerghat", value: "takerghat" },
            { label: "Chatak", value: "chatak" },
            { label: "Sathia", value: "sathia" },
          ]}
          onBlur={formik.handleBlur}
          placeholder="Select area"
          onChange={(selectedValue) => {
            formik.setFieldValue("area", selectedValue.label);
          }}
        />
        <FormikErrorBox formik={formik} field="area" />
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
