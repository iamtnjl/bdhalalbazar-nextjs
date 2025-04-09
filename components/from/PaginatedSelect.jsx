import { useState } from "react";
import { withAsyncPaginate, AsyncPaginate } from "react-select-async-paginate";
import CreatableSelect from "react-select/creatable";

function PaginatedSelect({
  label,
  loadOptions,
  value,
  onChange,
  onCreateOption,
  ...props
}) {
  const [cacheUniq, setCacheUniq] = useState(Date.now()); // Initial cache key

  const SelectComponent = onCreateOption
    ? withAsyncPaginate(CreatableSelect)
    : AsyncPaginate;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#372aac" : provided.borderColor,
      "&:hover": { borderColor: "none" },
      boxShadow: state.isFocused ? "0 0 0 1px #372aac" : provided.boxShadow,
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

  const handleCreate = async (inputValue) => {
    if (onCreateOption) {
      await onCreateOption(inputValue);
      setCacheUniq(Date.now());
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={label}
        className="block text-sm font-semibold text-gray-700 whitespace-nowrap"
      >
        {label}
      </label>
      <SelectComponent
        cacheOptions
        cacheUniq={cacheUniq}
        debounceTimeout={300}
        styles={customStyles}
        value={value}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        onChange={onChange}
        {...(onCreateOption && { onCreateOption: handleCreate })}
        {...props}
      />
    </div>
  );
}

export default PaginatedSelect;
