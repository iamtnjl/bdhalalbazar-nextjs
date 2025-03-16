"use client";
import { useState } from "react";

import { inject, observer } from "mobx-react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { object, ref, string } from "yup";
import TextInputField from "@/components/from/TextInputField";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import Button from "@/components/shared/Button";
import APIKit from "@/common/helpers/APIKit";
import { pickDifference } from "@/common/helpers/UtilKit";
import PhoneInputField from "@/components/from/PhoneInputField";
import PasswordInputField from "@/components/from/PasswordInputField";
import { useRouter } from "next/navigation";

const yupSchema = object({
  password: string().min(8, "At least 8 characters"),
  retype_password: string()
    .min(8, "At least 8 characters")
    .oneOf([ref("password")], "Passwords doesn't match"),
});

function EditProfile({ ...props }) {
  const [backendErrors, setBackendErrors] = useState({});
  const router = useRouter();
  const { setMe } = props.meStore;
  const { me } = props.meStore;
  const initialValues = {
    name: me.name || "",
    email: me.email || "",
    phone: me.phone || "",
    phone: me.phone || "",
    password: "",
    retype_password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = ({ data }) => {
        setBackendErrors({});
        setMe(data.user);
        router.push("/me");
      };

      const handleFailure = (error) => {
        console.warn(error?.response);
        setBackendErrors(error?.response?.data);
        throw error;
      };

      const payload = pickDifference(initialValues, values);

      if (Object.keys(payload).length === 0) {
        return toast("Change some information first");
      }

      const promise = APIKit.me
        .patchProfile(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Profile Changed Successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <>
      <form className="px-2 py-4" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <TextInputField
            placeholder="Enter your name"
            label="Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormikErrorBox formik={formik} field="name" />
        </div>

        <div className="mb-4">
          <TextInputField
            placeholder="Enter your email"
            label="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormikErrorBox formik={formik} field="email" />
        </div>
        <div className="mb-4">
          <PhoneInputField
            placeholder="Enter your phone"
            label="Phone"
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          <FormikErrorBox formik={formik} field="phone" />
        </div>
        <div className="mb-4">
          <PasswordInputField
            placeholder="Enter your password"
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <FormikErrorBox formik={formik} field="password" />
        </div>
        <div className="mb-4">
          <PasswordInputField
            placeholder="Enter your password"
            label="Retype Password"
            id="retype_password"
            name="retype_password"
            type="retype_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.retype_password}
          />
          <FormikErrorBox formik={formik} field="retype_password" />
        </div>
        <Button type="submit" extraClassName="w-full mt-9" variant="primary">
          Update
        </Button>
      </form>
    </>
  );
}

export default inject("meStore")(observer(EditProfile));
