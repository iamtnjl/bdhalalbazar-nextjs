"use client";

import APIKit from "@/common/helpers/APIKit";
import PasswordInputField from "@/components/from/PasswordInputField";
import AlertBox from "@/components/shared/AlertBox";
import Button from "@/components/shared/Button";
import { object, ref, string } from "yup";
import { useFormik } from "formik";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import toast from "react-hot-toast";
import { setJWTokenAndRedirect } from "@/components/HOC/UserAuthGuard";

const yupSchema = object({
  password: string()
    .required("Please enter a password")
    .min(6, "Password must be minimum 6 characters or more"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password"), null], "Passwords must match"),
});

function formatBDPhone(phone) {
  const cleaned = phone.replace(/\s+/g, "");

  if (/^8801[3-9]\d{8}$/.test(cleaned)) {
    return `+${cleaned}`;
  } else {
    return null;
  }
}

const SetupPasswordForm = () => {
  const [backendErrors, setBackendErrors] = useState({});
  const [initialValues, setInitialValues] = useState({
    confirmPassword: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = ({ data }) => {
        setJWTokenAndRedirect(data.access, () => {
          setBackendErrors({});
          router.push("/me");
        });
      };

      const handleFailure = (error) => {
        setBackendErrors(error);
        setInitialValues(values);
        throw error;
      };

      const payload = {
        phone: formatBDPhone(phone),
        password: values.password,
      };

      const promise = APIKit.auth
        .SetupPassword(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Setting up...",
        success: "Password set successfully!",
        error: "Something Went Wrong!",
      });
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col justify-center gap-10 items-center py-24">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-4xl font-bold">Setup Password</h1>
        </div>
        <form
          className="space-y-1 w-11/12 lg:w-1/2 mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <PasswordInputField
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="phone"
              placeholder="Enter your Password"
            />
            <FormikErrorBox formik={formik} field="password" />
          </div>
          <div>
            <PasswordInputField
              label="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              autoComplete="confirmPassword"
              placeholder="Confirm password"
            />
            <FormikErrorBox formik={formik} field="confirmPassword" />
          </div>

          <div className="pt-2">
            {backendErrors?.response?.data?.message ? (
              <AlertBox message={backendErrors.response.data.message} />
            ) : null}
          </div>
          <Button type="submit" variant="primary" extraClassName="w-full">
            Save & continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetupPasswordForm;
