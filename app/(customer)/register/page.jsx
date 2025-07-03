"use client";

import APIKit from "@/common/helpers/APIKit";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import PasswordInputField from "@/components/from/PasswordInputField";
import PhoneInputField from "@/components/from/PhoneInputField";
import TextInputField from "@/components/from/TextInputField";
import AlertBox from "@/components/shared/AlertBox";
import Button from "@/components/shared/Button";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { object, ref, string } from "yup";

const yupSchema = object({
  name: string().required("Name is required."),
  phone: string().required("Please enter your phone number"),
  email: string().email("Please enter a valid Email"),
  password: string()
    .required("Password is required")
    .min(6, "At least 6 characters"),
  retype_password: string()
    .required("Password is required.")
    .min(6, "At least 6 characters")
    .oneOf([ref("password")], "Passwords doesn't match"),
});

const Register = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [backendErrors, setBackendErrors] = useState({});
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    retype_password: "",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = () => {
        setBackendErrors({});
        router.push("/login");
      };

      const handleFailure = (error) => {
        setInitialValues(values);
        setBackendErrors(error.response.data);
        throw error;
      };

      let phoneNumber = "";
      if (values.phone.charAt(0) === "0") {
        phoneNumber = "+880" + values.phone.substring(1);
      } else {
        phoneNumber = "+880" + values.phone;
      }
      // Delete phone from values
      delete values.phone;

      const payload = {
        phone: phoneNumber,
        ...values,
      };

      const promise = APIKit.auth
        .register(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Registration Successful!",
        error: "Could Not Register",
      });
    },
  });
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col justify-center gap-10 items-center py-6">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-4xl font-bold">
            {t("register.title")}
          </h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-3 w-11/12 lg:w-1/2 mx-auto"
        >
          <div>
            <TextInputField
              label={t("register.name")}
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              autoComplete="name"
              placeholder={t("register.namePlaceholder")}
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="name" />
          </div>
          <div>
            <PhoneInputField
              label={t("register.phone")}
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="e.g. 48XXXXXXXXX"
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="phone" />
          </div>

          <div>
            <TextInputField
              label={t("register.email")}
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="email"
              placeholder={t("register.emailPlaceholder")}
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="email" />
          </div>
          <div>
            <PasswordInputField
              label={t("register.password")}
              name="password"
              placeholder={t("register.passwordPlaceholder")}
              onChange={formik.handleChange}
              value={formik.values.password}
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="password" />
          </div>
          <div>
            <PasswordInputField
              label={t("register.retypePassword")}
              name="retype_password"
              placeholder={t("register.retypePassword")}
              onChange={formik.handleChange}
              value={formik.values.retype_password}
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="retype_password" />
          </div>

          <div>
            {backendErrors?.message ? (
              <AlertBox message={backendErrors.message} />
            ) : null}
          </div>

          <Button type="submit" variant="primary" extraClassName="w-full">
            {t("ctaButton.signUp")}
          </Button>
          <p>
            {t("register.hasAccount")}?{" "}
            <Link href="/login" className="text-primary font-semibold ml-2">
              {t("register.login")}
            </Link>
          </p>
        </form>{" "}
      </div>
    </div>
  );
};

export default Register;
