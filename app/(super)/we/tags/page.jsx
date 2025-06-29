"use client";

import APIKit from "@/common/helpers/APIKit";
import Button from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import TagsTable from "./components/TagsTable";

const Tags = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: () => APIKit.we.tags.getTag().then(({ data }) => data),
  });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle title={"Tags"} />
        <Button
          onClick={() => router.push("/we/tags/add")}
          extraClassName="whitespace-nowrap"
          variant="primary"
        >
          Create Tag
        </Button>
      </div>
      <TagsTable data={data} refetch={refetch} />
    </div>
  );
};

export default Tags;
