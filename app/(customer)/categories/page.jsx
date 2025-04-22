"use client";

import APIKit from "@/common/helpers/APIKit";
import Accordion from "@/components/shared/Accordion";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const dailyEssentials = [
  { label: "Rice", value: "rice" },
  { label: "Ata", value: "ata" },
  { label: "Moyda", value: "moyda" },
  { label: "Salt", value: "salt" },
  { label: "Sugar", value: "sugar" },
  { label: "Tea", value: "tea" },
  { label: "Noodles", value: "noodles" },
  { label: "Biscuit", value: "biscuit" },
  { label: "Bread", value: "bread" },
];

const cookingNeeds = [
  { label: "Oil", value: "oil" },
  { label: "Ada/Rosun", value: "ada-rosun" },
  { label: "Peyaj", value: "peyaj" },
  { label: "Gura & Khati Moshla", value: "moshla" },
];

const fishMeatEggs = [
  { label: "Deshi Fish", value: "fish" },
  { label: "Chasher Fish", value: "fish" },
  { label: "Beef", value: "meat" },
  { label: "Mutton", value: "mutton" },
  { label: "Chicken", value: "chicken" },
];

const fruitsVegetables = [
  { label: "Vegetables", value: "vegetable" },
  { label: "Fruits", value: "fruits" },
  { label: "Seasonal Items", value: "seasonal-items" },
];

const dairyPackaged = [
  { label: "Milk", value: "milk" },
  { label: "Doi", value: "doi" },
  { label: "Ghi", value: "ghi" },
  { label: "Sauce", value: "sauce" },
  { label: "Instant Food", value: "instant-food" },
  { label: "Packaged Food", value: "packaged-food" },
];

const tabsData = [
  {
    label: "All Items",
    value: "all-items",
  },
  {
    label: "Categories",
    value: "categories",
  },
];

const Categories = () => {
  const [tab, setTab] = useState("all-items");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [`/categories-data`],
    queryFn: () => APIKit.tags.getCategoriesList().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-4">
      <Tab.Group>
        <Tab.List className="flex">
          {tabsData.map((tab) => (
            <Tab
              key={tab?.value}
              onClick={() => setTab(tab?.value)}
              className={({ selected }) =>
                classNames(
                  "w-full py-3 px-4 text-sm font-medium leading-5 text-grey-400",
                  "ring-white leading-5 font-semibold focus:outline-none",
                  selected
                    ? ` text-primary transition ease-in-out duration-700 border-b-2 border-primary`
                    : "border-b-2 transition ease-in-out duration-700 border-grey-300"
                )
              }
            >
              {tab?.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      {tab === "all-items" ? (
        <div className="flex flex-col gap-3 px-2">
          <Accordion title="Daily Essentials">
            <div className="flex flex-col gap-3">
              {dailyEssentials.map((item, i) => (
                <div
                  onClick={() => {
                    router.push(`/products?categories=${item.value}`);
                  }}
                  key={i}
                  className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p className="text-base text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <ChevronRightIcon className="text-gray-600 size-5" />
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion title="Cooking Needs">
            <div className="flex flex-col gap-3">
              {cookingNeeds.map((item, i) => (
                <div
                  onClick={() => {
                    router.push(`/products?categories=${item.value}`);
                    setOpen(false);
                  }}
                  key={i}
                  className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p className="text-base text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <ChevronRightIcon className="text-gray-600 size-5" />
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion title="Fish Meat & Eggs">
            <div className="flex flex-col gap-3">
              {fishMeatEggs.map((item, i) => (
                <div
                  onClick={() => {
                    router.push(`/products?categories=${item.value}`);
                    setOpen(false);
                  }}
                  key={i}
                  className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p className="text-base text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <ChevronRightIcon className="text-gray-600 size-5" />
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion title="Fruits & Vegetables">
            <div className="flex flex-col gap-3">
              {fruitsVegetables.map((item, i) => (
                <div
                  onClick={() => {
                    router.push(`/products?categories=${item.value}`);
                    setOpen(false);
                  }}
                  key={i}
                  className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p className="text-base text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <ChevronRightIcon className="text-gray-600 size-5" />
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion title="Dairy & Packaged">
            <div className="flex flex-col gap-3">
              {dairyPackaged.map((item, i) => (
                <div
                  onClick={() => {
                    router.push(`/products?categories=${item.value}`);
                    setOpen(false);
                  }}
                  key={i}
                  className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p className="text-base text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <ChevronRightIcon className="text-gray-600 size-5" />
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-2 pb-32">
          {data?.results.map((item, i) => (
            <div
              onClick={() => {
                router.push(`/products?categories=${item.slug}`);
                setOpen(false);
              }}
              key={i}
              className="flex items-center justify-between w-full pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <p className="text-base text-gray-600 font-medium">{item.name}</p>
              <ChevronRightIcon className="text-gray-600 size-5" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
