"use client"
import { useQuery } from "@tanstack/react-query";

import { arrayToParams, formatFilterOptions } from "@/common/helpers/UtilKit";

export function useSelectedData({
  queryKey,
  queryFn,
  queryValue,
  label = ["name"],
  fieldName = "alias",
}) {
  // Defines the function to fetch data, transforms the results, and handles promises.
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [...queryKey, queryValue],
    queryFn: () =>
      queryFn({ [queryKey]: arrayToParams(queryValue) }).then(({ data }) =>
        formatFilterOptions(data.results)
      ),
    keepPreviousData: true,
    // Activates the query only if queryValue has items, preventing unnecessary requests.
    enabled: queryValue?.length > 0,
  });

  return { data, isLoading, error, isError };
}

/**
 * Custom hook for fetching and formatting selected data based on provided query parameters.
 * Requirements:
 * - Accepts `queryKey`, `queryFn`, and `queryValue` to customize the fetch request.
 * - Formats the API response into `{ label, value }` pairs for use in select components.
 * - Returns `error` and `isError` to handle errors effectively in the component using this hook.
 * - Exposes `isLoading` to indicate whether the data is currently being fetched.
 * - Utilizes `keepPreviousData` to retain the previous data during the loading state for a smoother user experience.
 */
