import BestDeals from "@/components/home/BestDeals";
import Carousel from "@/components/home/Carousel";
import PopularProducts from "@/components/home/PopularProducts";
import SearchAndCategories from "@/components/home/SearchAndCategories";
import ShopByCategory from "@/components/home/ShopByCategory";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <SearchAndCategories />
      <BestDeals />
      <Carousel />
      {/* <ShopByCategory /> */}
      <PopularProducts />
    </main>
  );
}
