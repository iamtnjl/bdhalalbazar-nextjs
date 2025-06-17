"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const InputFieldForSearch = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center gap-4 mt-2 px-2">
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
          size={20}
        />
        <input
          type="text"
          placeholder={t("sectionTitle.homeSearch")}
          className="w-full pl-11 pr-12 py-[9px] rounded-full border-[3px] border-primary text-base text-gray-700 font-semibold focus:outline-none"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            router.push(`/products?search=${value}`);
          }}
          className="absolute top-1/2 -translate-y-1/2 right-0 px-3 py-3 bg-primary rounded-r-full"
        >
          <Search className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputFieldForSearch;
