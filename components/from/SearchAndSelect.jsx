import Select from "react-select";

export default function SearchAndSelect({
  value,
  label = "",
  name = "",
  options = [],
  onChange = () => {},
  onInputChange = () => {},
  isClearable = false,
  placeholder = "",
  ...props
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: !state.isFocused
        ? provided.borderColor
        : "#372aac",
      "&:hover": { borderColor: "none" },
      boxShadow: state.isFocused
        ? "0 0 0 1px #372aac"
        : provided.boxShadow,
      paddingTop: "2px",
      paddingBottom: "2px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        (state.isFocused || state.isSelected) && !state.isMulti
          ? "#372aac"
          : provided.backgroundColor,
      color:
        (state.isFocused || state.isSelected) && !state.isMulti
          ? "white"
          : "#333333",
      "&:hover": {
        backgroundColor: "#E1E1E1",
        color: "black",
        cursor: "pointer",
      },
      overflow: "hidden",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#372aac",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    input: (provided) => ({
      ...provided,
      "input:focus": {
        boxShadow: "none",
      },
    }),
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 whitespace-nowrap"
      >
        {label}
      </label>
      <Select
        value={value}
        name={name}
        id={name}
        isClearable={isClearable}
        styles={customStyles}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        noOptionsMessage={() => "No results were found"}
        placeholder={<div>{placeholder}</div>}
        {...(props.defaultValue && { defaultValue: props.defaultValue })}
      />
    </div>
  );
}
