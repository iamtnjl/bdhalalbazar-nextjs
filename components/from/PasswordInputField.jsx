"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import ErrorByFieldName from "./ErrorByFieldName";
import { useState } from "react";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-700";
const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm";

function PasswordInputField(props) {
  const {
    name = "",
    label = "",
    labelClassName = defaultLabelClassNames,
    placeholder = "",
    className = defaultClassNames,
    value = "",
    onChange = () => {},
    onBlur = () => {},
    errors = {},
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete="new-password"
          type={`${showPassword ? "text" : "password"}`}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-6 text-primary absolute top-[10px] right-3" />
          ) : (
            <EyeIcon className="h-5 w-6 text-primary absolute top-[10px] right-3" />
          )}
        </div>
      </div>
      <ErrorByFieldName field={name} errors={errors} />
    </div>
  );
}
export default PasswordInputField;
