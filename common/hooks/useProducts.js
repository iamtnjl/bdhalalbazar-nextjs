"use client"
import { useInfiniteQuery } from "@tanstack/react-query";

import APIKit from "../helpers/APIKit";

const fetchProducts = async ({ pageParam = 1, queryParams }) => {
  const { data } = await APIKit.public.getProducts({
    ...queryParams,
    page: pageParam,
  });
  return data;
};

export const useProducts = (queryParams) => {
  return useInfiniteQuery({
    queryKey: ["products", queryParams],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, queryParams }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const urlParams = new URL(lastPage.next).searchParams;
        const nextPage = parseInt(urlParams.get("page"), 10);
        return nextPage;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
