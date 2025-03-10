"use client";

import ErrorByFieldName from "./ErrorByFieldName";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-700";
const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm";

export default function TextInputField(props) {
  const {
    type = "text",
    name = "",
    label = "",
    labelClassName = defaultLabelClassNames,
    placeholder = "",
    className = defaultClassNames,
    value = "",
    onChange = () => {},
    errors = {},
  } = props;
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        {...props}
      />
      <ErrorByFieldName field={name} errors={errors} />
    </div>
  );
}
