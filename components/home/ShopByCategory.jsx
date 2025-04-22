import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { FolderKanban, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ShopByCategory = () => {
  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers height={25} width={25} className="text-primary" />
          <SectionTitle title="Categories" />
        </div>
        {/* <Button variant="border-less"> See All </Button> */}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Link
          href={"/products?categories=fish"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2 aspect-auto"
        >
          <Image
            alt="fish-icon"
            src={"/icons/fish.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg text-center font-medium">
            Fish
          </h3>
        </Link>
        <Link
          href={"/products?categories=meat"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2"
        >
          <Image
            alt="fish-icon"
            src={"/icons/meat.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg font-medium">Meat</h3>
        </Link>
        <Link
          href={"/products?categories=vegetable"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2"
        >
          <Image
            alt="fish-icon"
            src={"/icons/vegetable.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg text-center font-medium">
            Vegetable
          </h3>
        </Link>
        <Link
          href={"/products?categories=rice"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2"
        >
          <Image
            alt="fish-icon"
            src={"/icons/rice.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg text-center font-medium">
            Rice
          </h3>
        </Link>
        <Link
          href={"/products?categories=moshla"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2"
        >
          <Image
            alt="fish-icon"
            src={"/icons/moshla.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg text-center font-medium">
            Moshla
          </h3>
        </Link>
        <Link
          href={"/products"}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 w-full px-4 py-2"
        >
          <Image
            alt="fish-icon"
            src={"/icons/all.png"}
            width={50}
            height={50}
          />
          <h3 className="text-gray-800 text-lg text-center font-medium">
            All Items
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default ShopByCategory;
