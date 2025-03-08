import ErrorByFieldName from "./ErrorByFieldName";

const PhoneInputField = (props) => {
  const {
    name,
    label,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    placeholder,
    value,
    errors = {},
  } = props;
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete="none"
          name={name}
          type="text"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 pr-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-sm pl-14"
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
        />
        <span className="text-grey-400 text-sm absolute top-[9px] left-2">
          +880
        </span>
      </div>
      <ErrorByFieldName field={name} errors={errors} />
    </div>
  );
};

export default PhoneInputField;
