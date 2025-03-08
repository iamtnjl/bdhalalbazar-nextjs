"use client";
import Button from "@/components/shared/Button";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Accordion from "../shared/Accordion";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";

export default function ProductFilterDrawerPanel({ filters, setOpen }) {
  const { data: categoriesData } = useQuery({
    queryKey: ["/categories"],
    queryFn: () => APIKit.tags.getCategoriesList().then(({ data }) => data),
  });

  const { data: brandsData } = useQuery({
    queryKey: ["/brands"],
    queryFn: () => APIKit.tags.getBrandsList().then(({ data }) => data),
  });

  const { data: colorsData } = useQuery({
    queryKey: ["/colors"],
    queryFn: () => APIKit.tags.getColorList().then(({ data }) => data),
  });

  const { data: materialsData, isLoading } = useQuery({
    queryKey: ["/materials"],
    queryFn: () => APIKit.tags.getMaterialList().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }
  return (
    <Dialog.Panel className="pointer-events-auto w-screen h-screen max-w-md ">
      <div className="flex h-full flex-col divide-y divide-gray-200 bg-primary-bg shadow-xl">
        <div className="h-0 flex-1 overflow-y-auto">
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl text-primary font-semibold">
                <p>Filters</p>
              </Dialog.Title>

              <div className="flex h-7 ml-5 items-center">
                <button
                  type="button"
                  className="rounded-md text-primary-700 hover:text-primary-600"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3.0"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 gap-4">
            <Accordion
              title={"Categories"}
              data={categoriesData?.results}
              onChange={(event) => {
                console.log(event);
              }}
            />
            <Accordion
              title={"Brands"}
              data={brandsData?.results}
              onChange={(event) => {
                console.log(event);
              }}
            />
            <Accordion
              title={"Colors"}
              data={colorsData?.results}
              onChange={(event) => {
                console.log(event);
              }}
            />
            <Accordion
              title={"Materials"}
              data={materialsData?.results}
              onChange={(event) => {
                console.log(event);
              }}
            />
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-end px-4 py-4 items-center gap-4">
          <Button variant="white" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Dialog.Panel>
  );
}
