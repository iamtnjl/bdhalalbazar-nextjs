"use client";

import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import ProductCard from "./ProductCard";

const ProductSlider = () => {
  const [cardHeight, setCardHeight] = useState(0);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const resizeObserver = useRef(null);

  useEffect(() => {
    const calculateCardHeight = () => {
      const swiperSlide = document.querySelector(".swiper-slide");
      if (swiperSlide) {
        setCardHeight(swiperSlide.clientHeight + 5);
      }
    };

    calculateCardHeight();

    resizeObserver.current = new ResizeObserver(calculateCardHeight);
    if (containerRef.current) {
      resizeObserver.current.observe(containerRef.current);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, []);

  const { data: productsData } = useQuery({
    queryKey: ["/products"],
    queryFn: () => APIKit.public.getProducts().then(({ data }) => data),
  });

  const handleClick = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  return (
    <div ref={containerRef} onClick={handleClick}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Virtual, Autoplay, Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
          dynamicBullets: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1210: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        navigation={{
          prevEl: ".review-swiper-button-prev",
          nextEl: ".review-swiper-button-next",
        }}
        className="mySwiper !pt-6 !pb-8 [&>.swiper-pagination-bullets]:lg:hidden relative h-full"
        Virtual
      >
        {productsData?.results.map((item, i) => (
          <SwiperSlide  key={i}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
        <div
          style={{ height: cardHeight }}
          className="absolute z-10 hidden px-6 transition-all transform -translate-x-4 -translate-y-full opacity-0 cursor-pointer group lg:flex lg:items-center hover:opacity-100 duration-400 hover:bg-gradient-to-r hover:from-black/60 hover:via-black/20 hover:to-transparent review-swiper-button-prev"
        />
        <div
          style={{ height: cardHeight }}
          className="absolute right-0 z-10 hidden px-6 transition-all transform translate-x-4 -translate-y-full opacity-0 cursor-pointer group lg:flex lg:items-center hover:opacity-100 duration-400 hover:bg-gradient-to-l hover:from-black/60 hover:via-black/20 hover:to-transparent review-swiper-button-next"
        />
      </Swiper>
    </div>
  );
};

export default ProductSlider;
