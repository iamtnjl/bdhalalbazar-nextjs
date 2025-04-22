"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const CategorySlider = () => {
  const categories = [
    {
      name: "Fish",
      desc: "Fish Items",
      icon: "/icons/fish.png",
      href: "fish",
      color: "bg-orange-50",
    },
    {
      name: "Meat",
      desc: "Meat Items",
      icon: "/icons/meat.png",
      href: "meat",
      color: "bg-rose-50",
    },
    {
      name: "Vegetable",
      desc: "Fresh Vegetable",
      icon: "/icons/vegetable.png",
      href: "vegetable",
      color: "bg-emerald-50",
    },
    {
      name: "Rice",
      desc: "Premium Rice",
      icon: "/icons/rice.png",
      href: "rice",
      color: "bg-yellow-50",
    },
    {
      name: "Moshla",
      desc: "Pure Moshla",
      icon: "/icons/moshla.png",
      href: "moshla",
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="relative px-2">
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={3.2}
        allowTouchMove={true}
        pagination={{ clickable: true }}
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

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }
        .swiper-pagination-bullet {
          background-color: #d1d5db; /* Tailwind's gray-300 */
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #0f766e; /* Tailwind's emerald-700 */
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

export default CategorySlider;
