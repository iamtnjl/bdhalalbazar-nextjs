"use client";

import APIKit from "@/common/helpers/APIKit";
import { pick } from "@/common/helpers/UtilKit";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import TextAreaField from "@/components/from/TextAreaField";
import TextInputField from "@/components/from/TextInputField";
import Button from "@/components/shared/Button";
import { useFormik } from "formik";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string } from "yup";

const yupAddressAddSchema = object({
  street: string(),
  city: string(),
  zip: string(),
});

const Addresses = ({ meStore: { me, setMe } }) => {
  const addresses = me?.address[0];
  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: addresses?.street || "",
      city: addresses?.city || "",
      zip: addresses?.zip || "",
    },
    validationSchema: yupAddressAddSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      let payload = pick(values, Object.keys(values));

      const promise = APIKit.me
        .postAddresses({ addressId: addresses?._id, ...payload })
        .then(({ data }) => {
          setMe(data.user);
          router.push("/me");
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Address Saved Successfully!",
        error: "Something went wrong",
      });
    },
  });
  return (
    <form
      className="flex flex-col gap-3 px-2 py-4"
      onSubmit={formik.handleSubmit}
    >
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
      <Button type="submit" extraClassName="w-ful" variant="primary">
        Save Address
      </Button>
    </form>
  );
};

export default inject("meStore")(observer(Addresses));
