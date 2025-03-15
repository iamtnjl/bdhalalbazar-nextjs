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
import { object, ref, string } from "yup";

const yupSchema = object({
  name: string().required("Name is required."),
  phone: string().required("Please enter your phone number"),
  email: string().email("Please enter a valid Email"),
  password: string()
    .required("Password is required")
    .min(8, "At least 8 characters"),
  retype_password: string()
    .required("Password is required.")
    .min(8, "At least 8 characters")
    .oneOf([ref("password")], "Passwords doesn't match"),
});

const Register = () => {
  const router = useRouter();
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

      const promise = APIKit.auth
        .register(values)
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
          <h1 className="text-center text-4xl font-bold">Register</h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-3 w-11/12 lg:w-1/2 mx-auto"
        >
          <div>
            <TextInputField
              label="Name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              autoComplete="name"
              placeholder="Enter your Name"
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="name" />
          </div>
          <div>
            <PhoneInputField
              label="Phone Number"
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
              label="Email (Optional)"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="email"
              placeholder="Enter your Email"
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="email" />
          </div>
          <div>
            <PasswordInputField
              label="Password"
              name="password"
              placeholder="Minimum 8 characters"
              onChange={formik.handleChange}
              value={formik.values.password}
              errors={backendErrors}
            />
            <FormikErrorBox formik={formik} field="password" />
          </div>
          <div>
            <PasswordInputField
              label="Retype Password"
              name="retype_password"
              placeholder="Retype the password"
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
            Register
          </Button>
          <p>
            Have an Account?{" "}
            <Link href="/login" className="text-primary font-semibold ml-2">
              Login Instead
            </Link>
          </p>
        </form>{" "}
      </div>
    </div>
  );
};

export default Register;
