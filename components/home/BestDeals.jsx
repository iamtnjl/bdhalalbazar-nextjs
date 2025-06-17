"use client";
import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ProductSlider from "../shared/ProductSlider";
import { BadgePercent } from "lucide-react";
import { useTranslation } from "react-i18next";

const BestDeals = () => {
  const { t } = useTranslation();
  return (
    <div className="px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgePercent height={30} widths={30} className="text-primary" />
          <SectionTitle title={t("sectionTitle.goodDiscount")} />
        </div>
        <Button variant="border-less"> {t("subTitle.seeAll")} </Button>
      </div>
      <ProductSlider />
    </div>
  );
};

export default BestDeals;
