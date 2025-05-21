"use client";

import APIKit from "@/common/helpers/APIKit";
import Accordion from "@/components/shared/Accordion";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import SearchByKey from "@/components/shared/SearchByKey";
import CartProduct from "./components/CartProduct";

const CustomerCart = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-cart", params],
    queryFn: () => APIKit.we.carts.getAllCart(params).then(({ data }) => data),
    keepPreviousData: true,
  });

  return (
    <div className="py-4 px-2 flex flex-col gap-4">
      <SectionTitle title="Customer carts" />
      <SearchByKey
        placeholders={["Search by phone number"]}
        value={params.search}
        onChange={(event) => {
          setParams((prevParams) => ({
            ...prevParams,
            search: event.target.value,
          }));
        }}
        onReset={() =>
          setParams((prevParams) => ({
            ...prevParams,
            search: "",
          }))
        }
      />
      {!isLoading &&
        data?.results.map((item) => {
          console.log(item);
          const hasUser = item?.user;
          const title = hasUser
            ? `${item?.user.name} - ${item?.user.phone}`
            : `${item?.deviceId}`;
          return (
            <Accordion key={item?.id} title={title}>
              {item?.cart_products.map((item) => (
                <CartProduct key={item._id} item={item} />
              ))}
            </Accordion>
          );
        })}
      <Pagination
        setPage={(pageNumber) => {
          setParams((prevParams) => ({
            ...prevParams,
            page: pageNumber,
          }));
        }}
        data={data}
        page={+params.page}
      />
    </div>
  );
};

export default CustomerCart;
