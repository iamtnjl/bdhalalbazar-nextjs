export default function TextAreaField({
  label,
  name,
  id,
  rows = 2,
  placeholder,
  value,
  onChange = () => {},
  className = "",
  ...rest // Correctly collect additional props
}) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 sm:text-sm ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest} // Correctly pass additional props
        />
      </div>
    </>
  );
}
