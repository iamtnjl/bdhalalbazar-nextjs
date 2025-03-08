"use client";

import PasswordInputField from "@/components/from/PasswordInputField";
import PhoneInputField from "@/components/from/PhoneInputField";
import TextInputField from "@/components/from/TextInputField";
import AlertBox from "@/components/shared/AlertBox";
import Button from "@/components/shared/Button";
import Link from "next/link";
import React from "react";


const Register = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col justify-center gap-10 items-center py-6">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-4xl font-bold">Register</h1>
        </div>
        {/* onSubmit={formik.handleSubmit} */}
        <form className="space-y-3 w-11/12 lg:w-1/2 mx-auto">
          <div>
            <TextInputField
              label="Name"
              name="name"
              type="text"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.first_name}
              autoComplete="name"
              placeholder="Enter your Name"
              // errors={backendErrors}
            />
            {/* <FormikErrorBox formik={formik} field="first_name" /> */}
          </div>
          <div>
            <PhoneInputField
              label="Phone Number"
              name="phone"
              type="text"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.phone}
              placeholder="e.g. 01xxxxxxxxx"
              // errors={backendErrors}
            />
            {/* <FormikErrorBox formik={formik} field="phone" /> */}
          </div>

          <div>
            <TextInputField
              label="Email (Optional)"
              name="email"
              type="email"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.email}
              autoComplete="email"
              placeholder="Enter your Email"
              // errors={backendErrors}
            />
            {/* <FormikErrorBox formik={formik} field="email" /> */}
          </div>
          <div>
            <PasswordInputField
              label="Password"
              name="password"
              placeholder="Minimum 8 characters"
              // onChange={formik.handleChange}
              // value={formik.values.password}
              // errors={backendErrors}
            />
            {/* <FormikErrorBox formik={formik} field="password" /> */}
          </div>
          <div>
            <PasswordInputField
              label="Retype Password"
              name="retype_password"
              placeholder="Retype the password"
              // onChange={formik.handleChange}
              // value={formik.values.retype_password}
              // errors={backendErrors}
            />
            {/* <FormikErrorBox formik={formik} field="retype_password" /> */}
          </div>

          <div>
            {/* {backendErrors?.non_field_errors ? (
            <AlertBox message={backendErrors.non_field_errors} />
          ) : null} */}
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
