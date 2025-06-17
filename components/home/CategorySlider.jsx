"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import CategorySliderSkeleton from "../skeleton/CategorySliderSkeleton";
import { useTranslation } from "react-i18next";

const CategorySlider = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const categories = [
    {
      name: t("sectionTitle.fish"),
      desc: t("subTitle.fish"),
      icon: "/icons/fish.png",
      href: "fish",
      color: "bg-orange-50",
    },
    {
      name: t("sectionTitle.meat"),
      desc: t("subTitle.meat"),
      icon: "/icons/meat.png",
      href: "beef%2Cchicken%2Cmutton%2Cmeat",
      color: "bg-rose-50",
    },
    {
      name: t("sectionTitle.vegetables"),
      desc: t("subTitle.vegetables"),
      icon: "/icons/vegetable.png",
      href: "vegetable",
      color: "bg-emerald-50",
    },
    {
      name: t("sectionTitle.rice"),
      desc: t("subTitle.rice"),
      icon: "/icons/rice.png",
      href: "rice",
      color: "bg-yellow-50",
    },
    {
      name: t("sectionTitle.spice"),
      desc: t("subTitle.spices"),
      icon: "/icons/moshla.png",
      href: "moshla",
      color: "bg-amber-50",
    },
  ];

  // Simulate loading (or use real data fetch if needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CategorySliderSkeleton />;

  return (
    <div className="relative px-2">
      <Swiper
        spaceBetween={12}
        slidesPerView={3.2}
        allowTouchMove={true}
        className="!pb-6"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/products?categories=${category.href}`}
              className={`${category.color} p-2 rounded-lg flex flex-col gap-4 h-full`}
            >
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-gray-700">
                  {category.name}
                </p>
                <p className="text-xs text-gray-400">{category.desc}</p>
              </div>
              <div className="flex items-center justify-center w-full">
                <Image
                  alt="category-icon"
                  src={category.icon}
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
