"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const InputFieldForSearch = () => {
  const [value, setValue] = useState();
  const router = useRouter();
  return (
    <div className=" w-full flex items-center gap-4 mt-2 px-2">
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
          size={20}
        />
        <input
          type="text"
          placeholder="Search any products"
          className="w-full pl-11 pr-5 py-2 rounded-full border-2 border-primary text-base text-gray-700 font-semibold focus:outline-none "
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          onClick={() => {
            router.push(`/products?search=${value}`);
          }}
          className="p-[11px] rounded-full bg-primary w-fit right-[1px] absolute top-[1px]"
        >
          <Search className="text-white" size={20} />
        </div>
      </div>
    </div>
  );
};

export default InputFieldForSearch;
