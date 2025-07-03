"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { createUrlSearchParams, isEqual } from "../common/helpers/UtilKit.js";

const FiltersParamsContext = createContext();

export default function FiltersProvider({ children, initialParams = {} }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchDebounceRef = useRef(null);

  // Extracts query params from the URL.
  const getParamsFromURL = () => Object.fromEntries(searchParams.entries());

  const paramsInURL = getParamsFromURL();
  const [filterModal, setFilterModal] = useState(false);
  const [params, setParams] = useState(() => {
    return {
      ...initialParams,
      ...Object.keys(initialParams).reduce((acc, key) => {
        acc[key] =
          Array.isArray(initialParams[key]) && paramsInURL[key]
            ? paramsInURL[key].split(",")
            : paramsInURL[key] || initialParams[key];
        return acc;
      }, {}),
    };
  });

  // Push initialParams to the URL if they are not already there
  useEffect(() => {
    const mergedParams = Object.keys(initialParams).reduce((acc, key) => {
      const initialValue = initialParams[key];

      if (
        (Array.isArray(initialValue) && initialValue.length > 0) ||
        (!Array.isArray(initialValue) &&
          initialValue !== undefined &&
          initialValue !== null &&
          initialValue !== "")
      ) {
        acc[key] = initialValue;
      }

      return acc;
    }, {});

    const shouldPush = Object.entries(mergedParams).some(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          !paramsInURL[key] ||
          paramsInURL[key].split(",").sort().join(",") !==
            value.sort().join(",")
        );
      } else {
        return paramsInURL[key] !== String(value);
      }
    });

    if (shouldPush) {
      const finalURL = `${pathName}?${createUrlSearchParams(mergedParams)}`;
      router.replace(finalURL); // replace to avoid history pollution
    }
  }, []);

  // Sync params with URL whenever searchParams changes
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      ...Object.keys(initialParams).reduce((acc, key) => {
        acc[key] =
          Array.isArray(initialParams[key]) && paramsInURL[key]
            ? paramsInURL[key].split(",")
            : paramsInURL[key] || initialParams[key];
        return acc;
      }, {}),
    }));
  }, [searchParams]);

  const closeFilterModal = () => {
    // Check if paramsInURL and params are not the same using lodash isEqual
    const isParamsDiffer = !isEqual(paramsInURL, params);

    if (isParamsDiffer) {
      setParams((prevParams) => ({
        ...prevParams,
        ...Object.keys(initialParams).reduce((acc, key) => {
          acc[key] =
            Array.isArray(initialParams[key]) && paramsInURL[key]
              ? paramsInURL[key].split(",")
              : paramsInURL[key] || initialParams[key];
          return acc;
        }, {}),
      }));
    }
    setFilterModal(false);
  };

  const isFilterApplied = () => {
    return Object.entries(paramsInURL).some(([fieldName, value]) => {
      // Skip checking the 'key' field
      if (
        fieldName === "search" ||
        fieldName === "sort_by" ||
        fieldName === "page"
      )
        return false;

      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined && value !== "";
    });
  };

  const triggerURLUpdate = (updatedParams) => {
    const finalURL = `${pathName}?${createUrlSearchParams(
      updatedParams || params
    )}`;
    router.push(finalURL);
    setFilterModal(false);
  };

  const updateParams = (fieldNameOrFields, items) => {
    setParams((prev) => {
      if (typeof fieldNameOrFields === "string") {
        const newParams = {
          ...prev,
          [fieldNameOrFields]: Array.isArray(items)
            ? items.map((item) =>
                typeof item === "object" ? item.value : item
              )
            : items,
        };

        if (
          fieldNameOrFields === "sort_by" ||
          fieldNameOrFields === "status" ||
          fieldNameOrFields === "page"
        ) {
          // Immediately update URL for sort_by
          triggerURLUpdate(newParams);
        } else if (
          fieldNameOrFields === "search" ||
          fieldNameOrFields === "order_id"
        ) {
          if (searchDebounceRef.current)
            clearTimeout(searchDebounceRef.current);

          searchDebounceRef.current = setTimeout(() => {
            triggerURLUpdate(newParams);
          }, 500);
        }

        return newParams;
      }

      const updatedFields = Object.entries(fieldNameOrFields).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Array.isArray(value)
            ? value.map((item) =>
                typeof item === "object" ? item.value : item
              )
            : value,
        }),
        {}
      );

      const newParams = { ...prev, ...updatedFields };

      if ("sort_by" in fieldNameOrFields) {
        triggerURLUpdate(newParams);
      }

      if ("search" in fieldNameOrFields) {
        if (window.searchTimeout) clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
          triggerURLUpdate(newParams);
        }, 300);
      }

      return newParams;
    });
  };

  const resetFilters = () => {
    setParams(initialParams);
    triggerURLUpdate(initialParams);
  };

  const removeFilterItems = (field, valueToRemove) => {
    setParams((prevParams) => {
      const updatedParams = { ...prevParams };

      if (Array.isArray(updatedParams[field])) {
        updatedParams[field] = updatedParams[field].filter(
          (item) => item !== valueToRemove
        );

        if (updatedParams[field].length === 0) {
          updatedParams[field] = initialParams[field];
        }
      } else {
        updatedParams[field] = initialParams[field];
      }

      triggerURLUpdate(updatedParams);

      return updatedParams;
    });
  };

  return (
    <FiltersParamsContext.Provider
      value={{
        params,
        setParams,
        updateParams,
        triggerURLUpdate,
        resetFilters,
        removeFilterItems,
        paramsInURL,
        isFilterApplied: isFilterApplied(), // Expose the computed value
        closeFilterModal,
        filterModal,
        setFilterModal,
      }}
    >
      {children}
    </FiltersParamsContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FiltersParamsContext);
  if (!context) {
    throw new Error(
      "useFiltersParams must be used within a FiltersParamsProvider"
    );
  }
  return context;
};
