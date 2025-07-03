"use client";

import React, { useEffect, useState } from "react";
import InputFieldForSearch from "./InputFieldForSearch";
import Image from "next/image";
import CategorySlider from "./CategorySlider";
import { Layers } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathname, useRouter } from "next/navigation";

const SearchAndCategories = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathName = usePathname();

  const getCategoriesData = () => [
    {
      name: t("sectionTitle.fish"),
      desc: t("subTitle.fish"),
      icon: "/icons/fish.jpg",
      href: "fish",
      color: "bg-orange-700", // matches seafood tone
    },
    {
      name: t("sectionTitle.meat"),
      desc: t("subTitle.meat"),
      icon: "/icons/meat.jpg",
      href: "meat",
      color: "bg-rose-700", // rich, heavy tone for meat
    },
    {
      name: t("sectionTitle.vegetables"),
      desc: t("subTitle.vegetables"),
      icon: "/icons/veg.jpg",
      href: "vegetables",
      color: "bg-lime-700", // green tone for fresh veggies
    },
    {
      name: t("sectionTitle.oil"),
      desc: t("subTitle.oil"),
      icon: "/icons/oil.jpg",
      href: "oil",
      color: "bg-amber-700", // golden oil tone
    },
    {
      name: t("sectionTitle.rice"),
      desc: t("subTitle.rice"),
      icon: "/icons/rice.jpg",
      href: "rice",
      color: "bg-yellow-700", // warm rice/yellow tone
    },
    {
      name: t("sectionTitle.spice"),
      desc: t("subTitle.spices"),
      icon: "/icons/spice.png",
      href: "spices",
      color: "bg-red-700", // bold spicy tone, distinct from amber
    },
  ];

  const getBabyCategoriesData = () => [
    {
      name: t("sectionTitle.babyFood"),
      desc: t("subTitle.fish"),
      icon: "/icons/baby-food.webp",
      href: "baby-food",
      color: "bg-amber-700",
    },
    {
      name: t("sectionTitle.babyCare"),
      desc: t("subTitle.meat"),
      icon: "/icons/baby-carex.jpg",
      href: "baby-care",
      color: "bg-lime-700",
    },
  ];

  const getEssentialsCategoriesData = () => [
    {
      name: t("sectionTitle.bread"),
      desc: t("subTitle.bread"),
      icon: "/icons/bread.png",
      href: "bread-and-buns",
      color: "bg-yellow-700",
    },
    {
      name: t("sectionTitle.biscuits"),
      desc: t("subTitle.biscuits"),
      icon: "/icons/cookies.jpg",
      href: "biscuit-and-cookies",
      color: "bg-orange-700",
    },
    {
      name: t("sectionTitle.snacks"),
      desc: t("subTitle.snacks"),
      icon: "/icons/snacks.jpg",
      href: "snacks-and-chips",
      color: "bg-red-700",
    },
    {
      name: t("sectionTitle.drinks"),
      desc: t("subTitle.drinks"),
      icon: "/icons/drinks.jpg",
      href: "soft-drinks",
      color: "bg-cyan-700",
    },
    {
      name: t("sectionTitle.tea"),
      desc: t("subTitle.tea"),
      icon: "/icons/tea.jpg",
      href: "tea-and-coffee",
      color: "bg-green-700",
    },
    {
      name: t("sectionTitle.dairy"),
      desc: t("subTitle.dairy"),
      icon: "/icons/milk.jpg",
      href: "milk-and-dairy",
      color: "bg-indigo-700",
    },
    {
      name: t("sectionTitle.instant"),
      desc: t("subTitle.instant"),
      icon: "/icons/instant.jpg",
      href: "instant-foods",
      color: "bg-pink-700",
    },
    {
      name: t("sectionTitle.butter"),
      desc: t("subTitle.butter"),
      icon: "/icons/ghee.png",
      href: "ghee-and-butter",
      color: "bg-fuchsia-700",
    },
    {
      name: t("sectionTitle.sauces"),
      desc: t("subTitle.sauces"),
      icon: "/icons/sauce.webp",
      href: "sauce-and-ketchup",
      color: "bg-rose-700",
    },
    {
      name: t("sectionTitle.condensed"),
      desc: t("subTitle.condensed"),
      icon: "/icons/milk.png",
      href: "condensed-and-powder-milk",
      color: "bg-sky-700",
    },
  ];

  const getSweetCategoriesData = () => [
    {
      name: t("sectionTitle.paradise"),
      desc: t("subTitle.fish"),
      icon: "/icons/paradise.jpg",
      href: "paradise-sweets",
      color: "bg-amber-700",
    },
    {
      name: t("sectionTitle.lakshmi"),
      desc: t("subTitle.meat"),
      icon: "/icons/lakshmi.jpg",
      href: "paradise-sweets",
      color: "bg-red-700",
    },
  ];

  const getCategories = () => [
    {
      label: t("sectionTitle.grocery"),
      key: "grocery",
      icon: "/icons/veg.jpg",
      tabs: getCategoriesData(),
      bg: "bg-lime-50",
    },
    {
      label: t("sectionTitle.baby"),
      key: "baby-items",
      icon: "/icons/baby.jpg",
      tabs: getBabyCategoriesData(),
      bg: "bg-pink-50",
    },
    {
      label: t("sectionTitle.daily"),
      key: "essentials",
      icon: "/icons/essential.webp",
      tabs: getEssentialsCategoriesData(),
      bg: "bg-amber-50",
    },
    {
      label: t("sectionTitle.gas"),
      key: "gas-cylinder",
      icon: "/icons/gas.jpg",
      tabs: [],
      bg: "bg-rose-50",
    },
    {
      label: t("sectionTitle.fruits"),
      key: "fruits",
      icon: "/icons/fruits.jpg",
      tabs: [],
      bg: "bg-lime-50",
    },
    {
      label: t("sectionTitle.cosmetics"),
      key: "cosmetics",
      icon: "/icons/cosmetics.jpg",
      tabs: [],
      bg: "bg-amber-50",
    },
    {
      label: t("sectionTitle.sweet"),
      key: "sweet",
      icon: "/icons/sweet.jpg",
      tabs: getSweetCategoriesData(),
      bg: "bg-orange-50",
    },
    {
      label: t("sectionTitle.stationary"),
      key: "stationary",
      icon: "/icons/stationary.jpg",
      tabs: [],
      bg: "bg-purple-50",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(getCategories()[0]);

  // Update selected category when language changes
  useEffect(() => {
    setSelectedCategory(getCategories()[0]);
    router.push(`${pathName}?category=${getCategories()[0].key}`);
  }, [i18n.language]);

  const categories = getCategories(); // always fresh per render

  const changeCategory = (item) => {
    if (item.tabs.length > 0) {
      setSelectedCategory(item);
      router.push(`${pathName}?category=${item.key}`);
    } else {
      router.push(`/products?categories=${item.key}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      <InputFieldForSearch />
      <div className="flex flex-col gap-4">
        <div className="px-2">
          <div className="h-[130px]">
            {" "}
            {/* force consistent height */}
            <Swiper
              spaceBetween={12}
              slidesPerView={3.3}
              allowTouchMove={true}
              className="h-full"
            >
              {categories.map((item) => (
                <SwiperSlide key={item.key} className="h-full">
                  <div
                    onClick={() => changeCategory(item)}
                    className={`h-full flex flex-col gap-2 px-4 py-2 items-center justify-center border rounded-md cursor-pointer ${
                      item.bg
                    } ${
                      selectedCategory.key === item.key
                        ? "border-primary text-primary "
                        : "border-gray-200 shadow-sm text-gray-700"
                    }`}
                  >
                    <Image
                      alt="category-icon"
                      src={item.icon}
                      width={600}
                      height={600}
                      className="object-cover object-center h-[60px] w-[60px] rounded-full bg-white p-2"
                    />
                    <p className="text-base font-semibold text-center leading-tight">
                      {item.label}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Layers height={25} width={25} className="text-gray-600" />
            <SectionTitle title={t("sectionTitle.categories")} />
          </div>
          <Link href={"/categories"}>
            <Button variant="border-less">{t("subTitle.seeAll")}</Button>
          </Link>
        </div>
        <div className="pl-2">
          <CategorySlider categories={selectedCategory.tabs} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategories;
