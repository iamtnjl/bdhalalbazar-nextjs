"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import classNames from "classnames";
import { HomeModernIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import Button from "../shared/Button";
import ImageLightbox from "./ImageLightbox";
import { formatCurrency } from "@/common/helpers/UtilKit";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import QuantityButton from "../shared/QuantityButton";
import APIKit from "@/common/helpers/APIKit";
import { useTranslation } from "react-i18next";

export default function ProductDetailsContainer({ data }) {
  // Lightbox states
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const { addToCart, cart } = useCart();
  const { t, i18n } = useTranslation();
  const name = data.name[i18n.language] || data.name;
  const description = data.description[i18n.language] || data.description;

  const pics = data?.images?.map((image) => {
    return {
      src: image.original !== "" ? image.original : placeholderImage,
      loading: "lazy",
      alt: "",
    };
  });

  const isAddedToCart = cart.some((item) => item.productId === data?._id);
  const cartItem = cart.find((item) => item.productId === data?._id);

  return (
    <div>
      <div className="mb-8">
        {/* Image gallery */}
        <Tab.Group as="div" className="flex flex-col-reverse">
          {/* Image selector */}
          <div className="mx-auto mt-4 w-full lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {data?.images.map((image, idx) => (
                <Tab
                  key={idx}
                  className="relative flex cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                >
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{image?.name}</span>
                      <div className="inset-0 overflow-hidden rounded-md">
                        <img
                          src={image?.original}
                          alt={image?.name}
                          className="block w-full h-auto object-cover object-center"
                        />
                      </div>
                      <span
                        className={classNames(
                          selected ? "ring-primary-500" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="aspect-w-1 aspect-h-1 w-full cursor-pointer">
            {data?.images.length > 0 ? (
              <>
                {" "}
                {data?.images.map((image, idx) => (
                  <Tab.Panel key={idx}>
                    <img
                      src={image?.original}
                      alt={image?.name || "public_product_image"}
                      className="h-[350px] md:h-[400px]  w-full object-cover object-center sm:rounded-lg"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setOpen(true);
                      }}
                    />
                  </Tab.Panel>
                ))}
              </>
            ) : (
              <img
                src="/images/placeholders/no-image-square.jpg"
                aria-label="image-options"
                alt="product__image"
                className="w-full object-cover object-center rounded-lg"
              />
            )}
          </Tab.Panels>
        </Tab.Group>

        {/* Product info */}
        {data?.name ? (
          <div className="mt-10 space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {name}
            </h1>
            <h1 className="text-base font-semibold tracking-tight text-gray-600">
              {`${t("productDetail.weight")}: ${data.weight} ${data.unit}`}
            </h1>
            <div className="flex items-end gap-2">
              <h1 className="text-xl font-semibold tracking-tight  text-gray-600">
                ৳
              </h1>
              <h1 className="text-xl font-semibold tracking-tight text-primary">
                {formatCurrency(data.discounted_price, ",")}
              </h1>
              <h1 className="text-base font-semibold tracking-tight line-through text-gray-600">
                {formatCurrency(data.price, ",")}
              </h1>
              <h1 className="text-xl font-semibold tracking-tight  text-gray-600">
                {`(-${data.discount}%)`}
              </h1>
            </div>
            <div className="flex gap-2">
              {!isAddedToCart ? (
                <Button
                  onClick={() => {
                    addToCart(data?._id, 1);
                    return APIKit.facebook.track({ eventName: "Add_to_cart" });
                  }}
                  variant="primary"
                >
                  <ShoppingCart className="w-[18px] h-[18px] mr-2 mb-[3px]" />
                  {t("ctaButton.addToCart")}
                </Button>
              ) : (
                <QuantityButton cartItem={cartItem} product={data} />
              )}
            </div>
            <section>
              <h2 className="text-md text-gray-700 font-semibold">
                {t("productDetail.description")}
              </h2>
              <h2 className="text-sm font-medium text-gray-700">
                {description}
              </h2>
            </section>
            <section>
              {data?.brand.length > 0 ? (
                <>
                  <h2 className="text-md text-gray-700 font-semibold">
                    {t("productDetail.brand")}
                  </h2>
                  <h2 className="text-sm font-medium text-gray-700">
                    {data.brand.map((brand) => brand.name).join(", ")}
                  </h2>
                </>
              ) : null}
            </section>
            <section className="text-sm text-gray-700">
              {data?.categories.length > 0 ? (
                <>
                  <h2 className="text-md text-gray-700 font-semibold">
                    {t("productDetail.category")}
                  </h2>
                  <div className="flex items-center flex-wrap pt-2 gap-1 text-sm ">
                    {data?.categories.map((item, key) => (
                      <div
                        key={key}
                        className="w-fit text-xs bg-gray-200 px-3 py-1 font-semibold md:font-medium rounded-full text-gray-700"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </section>
            <section className="text-sm text-gray-700">
              {data.colors.length > 0 ? (
                <>
                  <h2 className="text-md text-gray-700 font-semibold">
                    {t("productDetail.color")}
                  </h2>
                  <div className="flex items-center flex-wrap pt-2 gap-1 text-sm ">
                    {data?.colors.map((item, key) => (
                      <div
                        key={key}
                        className="w-fit text-xs bg-gray-200 px-3 py-1 font-semibold md:font-medium rounded-full text-gray-700"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </section>
            <section className="text-sm text-gray-700">
              {data?.materials.length > 0 ? (
                <>
                  <h2 className="text-md text-gray-700 font-semibold">
                    {t("productDetail.material")}
                  </h2>
                  <div className="flex items-center flex-wrap pt-2 gap-1 text-sm ">
                    {data?.materials.map((item, key) => (
                      <div
                        key={key}
                        className="w-fit text-xs bg-gray-200 px-3 py-1 font-semibold md:font-medium rounded-full text-gray-700"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </section>
          </div>
        ) : null}
      </div>
      <ImageLightbox
        open={open}
        setOpen={setOpen}
        images={pics}
        currentImageIndex={currentImageIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
