import Head from "next/head";
import BestDeals from "@/components/home/BestDeals";
import Carousel from "@/components/home/Carousel";
import PopularProducts from "@/components/home/PopularProducts";
import SearchAndCategories from "@/components/home/SearchAndCategories";
// import ShopByCategory from "@/components/home/ShopByCategory";

export default function Home() {
  return (
    <>
      <Head>
        <title>BD Halal Bazar | Online Halal Grocery Shop in Pabna</title>
        <meta
          name="description"
          content="Buy fresh halal groceries online in Pabna. 1 Hour delivery, best prices and quality products from BDHalalBazar."
        />
        <meta
          name="keywords"
          content="halal grocery, online grocery, bdhalalbazar, halal bazar, online shop pabna, halal food, pabna grocery shop, pabna online market, online market pabna, online grocery shop pabna"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://bdhalalbazar.com/" />
      </Head>

      <main className="flex flex-col gap-4">
        <SearchAndCategories />
        <BestDeals />
        <Carousel />
        {/* <ShopByCategory /> */}
        <PopularProducts />
      </main>
    </>
  );
}
