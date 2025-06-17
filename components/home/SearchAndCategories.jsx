"use client";
import React from "react";
import InputFieldForSearch from "./InputFieldForSearch";
import Image from "next/image";
import CategorySlider from "./CategorySlider";
import { Layers } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const SearchAndCategories = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <InputFieldForSearch />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Layers height={25} width={25} className="text-primary" />
            <SectionTitle title={t("sectionTitle.categories")} />
          </div>
          <Link href={"/categories"}>
            <Button variant="border-less"> {t("subTitle.seeAll")} </Button>
          </Link>
        </div>
        <div className="pl-2">
          <CategorySlider />
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategories;
