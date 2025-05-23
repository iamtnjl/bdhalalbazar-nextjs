"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [{ src: "/banners/1.jpg" }, { src: "/banners/2banner.png" }];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  // Pause auto-slide when user interacts
  const handleUserInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {/* Swipe Container with Fixed Height */}
      <div className="w-full h-[30vh] md:h-[40vh] overflow-hidden relative">
        <Swipe
          onSwipeLeft={() => {
            nextSlide();
            handleUserInteraction();
          }}
          onSwipeRight={() => {
            prevSlide();
            handleUserInteraction();
          }}
          className="relative w-full h-full"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative h-[30vh] md:h-[40vh]"
              >
                <Image
                  alt={`Slide ${index}`}
                  src={image.src}
                  fill
                  className="w-full aspect-1 object-center"
                />
              </div>
            ))}
          </div>
        </Swipe>

        {/* Left Arrow - Centered */}
        {/* <ArrowLeft
          height={48}
          width={48}
          onClick={() => {
            prevSlide();
            handleUserInteraction();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 z-20 bg-white/50 p-2 rounded-full hover:text-gray-600 transition"
        /> */}

        {/* Right Arrow - Centered */}
        {/* <ArrowRight
          height={48}
          width={48}
          onClick={() => {
            nextSlide();
            handleUserInteraction();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 z-20 bg-white/50 p-2 rounded-full hover:text-gray-600 transition"
        /> */}
      </div>

      {/* Dots Indicator */}
      <div className="relative flex justify-center p-2 mt-1">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              handleUserInteraction();
            }}
            className={`h-3 w-3 rounded-full mx-2 mb-2 cursor-pointer transition ${
              index === currentSlide ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
