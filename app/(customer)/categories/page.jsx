"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const pathName = usePathname();
  const allCategories = [
    // Subcategories
    {
      name: t("sectionTitle.fish"),
      desc: "Fresh fish for daily cooking",
      icon: "/icons/fish.jpg",
      href: "fish",
      color: "bg-orange-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.meat"),
      desc: "Quality meat for tasty meals",
      icon: "/icons/meat.jpg",
      href: "meat",
      color: "bg-rose-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.vegetables"),
      desc: "Fresh vegetables for healthy living",
      icon: "/icons/veg.jpg",
      href: "vegetables",
      color: "bg-lime-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.oil"),
      desc: "Pure oils for daily cooking",
      icon: "/icons/oil.jpg",
      href: "oil",
      color: "bg-amber-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.gas"),
      desc: "Safe gas cylinders for cooking",
      icon: "/icons/gas.jpg",
      href: "gas-cylinder",
      color: "bg-rose-50",
      type: "category",
    },
    {
      name: t("sectionTitle.cosmetics"),
      desc: "Cosmetic items for daily care",
      icon: "/icons/cosmetics.jpg",
      href: "cosmetics",
      color: "bg-amber-50",
      type: "category",
    },
    {
      name: t("sectionTitle.stationary"),
      desc: "Stationary for school and office",
      icon: "/icons/stationary.jpg",
      href: "stationary",
      color: "bg-purple-50",
      type: "category",
    },
    {
      name: t("sectionTitle.rice"),
      desc: "Premium rice for every meal",
      icon: "/icons/rice.jpg",
      href: "rice",
      color: "bg-yellow-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.spice"),
      desc: "Aromatic spices for your recipes",
      icon: "/icons/spice.png",
      href: "spices",
      color: "bg-red-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.babyFood"),
      desc: "Nutritious baby food essentials",
      icon: "/icons/baby-food.webp",
      href: "baby-food",
      color: "bg-amber-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.babyCare"),
      desc: "Daily baby care products range",
      icon: "/icons/baby-carex.jpg",
      href: "baby-care",
      color: "bg-lime-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.bread"),
      desc: "Fresh breads and tasty buns",
      icon: "/icons/bread.png",
      href: "bread-and-buns",
      color: "bg-yellow-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.biscuits"),
      desc: "Biscuits and cookies for snacks",
      icon: "/icons/cookies.jpg",
      href: "biscuit-and-cookies",
      color: "bg-orange-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.snacks"),
      desc: "Quick snacks and crispy treats",
      icon: "/icons/snacks.jpg",
      href: "snacks-and-chips",
      color: "bg-red-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.drinks"),
      desc: "Refreshing soft drinks selection",
      icon: "/icons/drinks.jpg",
      href: "soft-drinks",
      color: "bg-cyan-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.tea"),
      desc: "Tea and coffee essentials",
      icon: "/icons/tea.jpg",
      href: "tea-and-coffee",
      color: "bg-green-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.dairy"),
      desc: "Milk and dairy everyday needs",
      icon: "/icons/milk.jpg",
      href: "milk-and-dairy",
      color: "bg-indigo-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.instant"),
      desc: "Instant foods for busy days",
      icon: "/icons/instant.jpg",
      href: "instant-foods",
      color: "bg-pink-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.butter"),
      desc: "Ghee and butter for rich taste",
      icon: "/icons/ghee.png",
      href: "ghee-and-butter",
      color: "bg-fuchsia-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.sauces"),
      desc: "Sauces and ketchup for flavor",
      icon: "/icons/sauce.webp",
      href: "sauce-and-ketchup",
      color: "bg-rose-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.condensed"),
      desc: "Condensed and powder milk options",
      icon: "/icons/milk.png",
      href: "condensed-and-powder-milk",
      color: "bg-sky-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.paradise"),
      desc: "Paradise sweets special collection",
      icon: "/icons/paradise.jpg",
      href: "paradise-sweets",
      color: "bg-amber-50",
      type: "subcategory",
    },
    {
      name: t("sectionTitle.lakshmi"),
      desc: "Lakshmi sweets crafted carefully",
      icon: "/icons/lakshmi.jpg",
      href: "paradise-sweets",
      color: "bg-red-50",
      type: "subcategory",
    },

    // Parent categories
    {
      name: t("sectionTitle.grocery"),
      desc: "All your grocery items here",
      icon: "/icons/veg.jpg",
      href: "grocery",
      color: "bg-lime-50",
      type: "category",
    },
    {
      name: t("sectionTitle.baby"),
      desc: "Everything for your little ones",
      icon: "/icons/baby.jpg",
      href: "baby-items",
      color: "bg-pink-50",
      type: "category",
    },
    {
      name: t("sectionTitle.daily"),
      desc: "Daily essentials for your home",
      icon: "/icons/essential.webp",
      href: "essentials",
      color: "bg-amber-50",
      type: "category",
    },

    {
      name: t("sectionTitle.fruits"),
      desc: "Seasonal fresh fruits selection",
      icon: "/icons/fruits.jpg",
      href: "fruits",
      color: "bg-lime-50",
      type: "category",
    },

    {
      name: t("sectionTitle.sweet"),
      desc: "Traditional sweets and desserts",
      icon: "/icons/sweet.jpg",
      href: "sweet",
      color: "bg-orange-50",
      type: "category",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-2 py-4">
      {allCategories.map((category, index) => (
        <Link
          href={
            category.type === "category"
              ? `/products?category=${category.href}`
              : `/products?subCategory=${category.href}`
          }
          key={index}
          className={`${category.color} py-2 px-2 rounded-md flex items-center justify-between gap-2 h-full w-full`}
        >
          <div>
            <p className="text-base font-medium  text-gray-700 mr-4">
              {category.name}
            </p>
            <p className="text-xs font-medium  text-gray-500 mr-4">
              {category.desc}
            </p>
          </div>
          <Image
            alt="category-icon"
            src={category.icon}
            width={600}
            height={600}
            className="object-cover object-center rounded-full h-[50px] w-[50px] bg-white p-2"
          />
        </Link>
      ))}
    </div>
  );
};

export default Categories;
