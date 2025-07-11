"use client";

import APIKit from "@/common/helpers/APIKit";
import PasswordInputField from "@/components/from/PasswordInputField";
import PhoneInputField from "@/components/from/PhoneInputField";
import AlertBox from "@/components/shared/AlertBox";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { object, string } from "yup";
import { useFormik } from "formik";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import toast from "react-hot-toast";
import { setJWTokenAndRedirect } from "@/components/HOC/UserAuthGuard";
import { useTranslation } from "react-i18next";

const yupSchema = object({
  phone: string().required("Please enter your phone number"),
  password: string()
    .required("Please enter a password")
    .min(6, "Password must be minimum 6 characters or more"),
});

const LoginForm = () => {
  const [backendErrors, setBackendErrors] = useState({});
  const [initialValues, setInitialValues] = useState({
    user_id: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const previousURL = searchParams.get("next");
  const router = useRouter();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = ({ data }) => {
        setJWTokenAndRedirect(data.access, () => {
          setBackendErrors({});
          return APIKit.me
            .getProfile()
            .then(({ data }) => {
              if (data.user.role === "user") {
                if (previousURL) {
                  router.push(previousURL);
                } else {
                  router.push("/me");
                }
              } else {
                router.push("/we");
              }
            })
            .catch((error) => {
              throw error;
            });
        });
      };

      const handleFailure = (error) => {
        setBackendErrors(error);
        setInitialValues(values);
        throw error;
      };

      let phoneNumber = "";
      if (values.phone.charAt(0) === "0") {
        phoneNumber = "+880" + values.phone.substring(1);
      } else {
        phoneNumber = "+880" + values.phone;
      }

      const payload = {
        user_id: phoneNumber,
        password: values.password,
      };

      const promise = APIKit.auth
        .login(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Something Went Wrong!",
      });
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col justify-center gap-10 items-center py-24">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-4xl font-bold">{t("login.title")}</h1>
        </div>
        <form
          className="space-y-1 w-11/12 lg:w-1/2 mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <PhoneInputField
              label={t("login.phone")}
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="e.g. 01xxxxxxxxx"
            />
            <FormikErrorBox formik={formik} field="phone" />
          </div>
          <div>
            <PasswordInputField
              label={t("login.password")}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="phone"
              placeholder={t("login.passwordPlaceholder")}
            />
            <FormikErrorBox formik={formik} field="password" />
          </div>

          <div className="pt-2">
            {backendErrors?.response?.data?.message ? (
              <AlertBox message={backendErrors.response.data.message} />
            ) : null}
          </div>

          {/* <div className="flex justify-end items-start pb-6">
            <Link href="#" className="text-primary font-bold">
              Forgot password?
            </Link>
          </div> */}

          <Button type="submit" variant="primary" extraClassName="w-full">
            {t("ctaButton.signIn")}
          </Button>
        </form>
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-gray text-sm">{t("login.noAccount")}?</p>
          <Link href="/register" className="text-primary font-semibold">
            {t("login.createAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
