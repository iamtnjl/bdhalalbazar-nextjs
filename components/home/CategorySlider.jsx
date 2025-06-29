"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import CategorySliderSkeleton from "../skeleton/CategorySliderSkeleton";
import { useTranslation } from "react-i18next";

const CategorySlider = ({ categories }) => {
  const [loading, setLoading] = useState(true);

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
        slidesPerView="auto" // changed from 3.2 to auto
        allowTouchMove={true}
        className="!pb-6"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="!w-auto">
            {" "}
            {/* Make slide take content width */}
            <Link
              href={`/products?categories=${category.href}`}
              className={`${category.color} py-2 px-2 rounded-full flex items-center gap-2 h-full w-full whitespace-nowrap`} // prevent wrapping
            >
              <Image
                alt="category-icon"
                src={category.icon}
                width={600}
                height={600}
                className="object-cover object-center rounded-full h-[50px] w-[50px] bg-white p-2"
              />
              <p className="text-lg font-medium  text-white whitespace-nowrap mr-4">
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
