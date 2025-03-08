"use client";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
function Accordion({ params, data, title }) {
  return (
    <div>
      <div className="mx-auto">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <dl className="space-y-4 divide-y divide-gray-900/10">
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-sm font-semibold leading-7">
                        {title}
                      </span>
                      <span className="flex h-7 items-center">
                        {open ? (
                          <MinusSmallIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusSmallIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  {data?.map((item) => (
                    <Disclosure.Panel
                      as="dd"
                      className="mt-2 pr-12"
                      key={item.slug}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={item.slug}
                          name={item.slug}
                          className="rounded-md"
                          // onChange={(event) => {
                          //   setParams((prevParams) => {
                          //     const colors = event.target.name;
                          //     const newColors = prevParams.colors.includes(
                          //       colors
                          //     )
                          //       ? prevParams.colors.filter((b) => b !== colors)
                          //       : [...prevParams.colors, colors];

                          //     return {
                          //       ...prevParams,
                          //       colors: newColors,
                          //       page: 1,
                          //     };
                          //   });
                          // }}
                          onChange={(e) => onChange(e)}
                          // checked={params?.includes(item.slug)}
                          // value={params?.includes(item.slug)}
                        />

                        <label
                          htmlFor={item.slug}
                          className="text-sm font-medium leading-7 text-gray-600"
                        >
                          {item.name}
                        </label>
                      </div>
                    </Disclosure.Panel>
                  ))}
                </>
              )}
            </Disclosure>
            <hr />
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
