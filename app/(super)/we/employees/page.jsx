"use client";

import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import EmployeeTable from "./_components/EmployeeTable";

const Employees = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/admin-users"],
    queryFn: () =>
      APIKit.we.employees.getAllEmployees().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-4 px-2 py-4">
      <SectionTitle title={"Employees"} />
      <EmployeeTable data={data?.data} />
    </div>
  );
};

export default Employees;
