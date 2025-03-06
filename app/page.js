import BestDeals from "@/components/home/BestDeals";
import Carousel from "@/components/home/Carousel";
import PopularProducts from "@/components/home/PopularProducts";
import ShopByCategory from "@/components/home/ShopByCategory";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 px-2">
      <Carousel />
      <BestDeals />
      <ShopByCategory />
      <PopularProducts />
    </main>
  );
}
