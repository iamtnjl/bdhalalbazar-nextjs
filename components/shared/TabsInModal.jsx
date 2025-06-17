import Image from "next/image";
import i18n from "i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabsInModal({
  horizontalTabsOnly,
  label,
  tabs,
  current,
  setTab = () => {},
}) {
  return (
    <div>
      <div className={horizontalTabsOnly ? "hidden" : "lg:hidden"}>
        {label ? (
          <label htmlFor="tabs" className="font-medium">
            {label}
          </label>
        ) : (
          ""
        )}
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
          value={tabs.find((tab) => tab.key === current).key}
          onChange={(e) => setTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className={horizontalTabsOnly ? "block" : "hidden lg:block"}>
        <div className="w-full border-b border-gray-100">
          {/* Tab items */}
          <nav className="flex justify-evenly" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={classNames(
                  tab.key === current
                    ? "border-primary-600 text-gray-700"
                    : "border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-200",
                  "whitespace-nowrap flex p-[3.4px] w-1/2 border-b-2 justify-center"
                )}
                aria-current={tab.key === current ? "page" : undefined}
                onClick={() => {
                  setTab(tab.key);
                  i18n.changeLanguage(tab.key);
                }}
              >
                {tab?.flag?.length > 0 ? (
                  <div className="flex items-center">
                    <Image
                      height={29}
                      width={29}
                      src={tab.flag}
                      alt={tab.key}
                      className="rounded-sm"
                    />
                    <h3
                      className={`${
                        tab.key === current ? "font-semibold" : "font-normal"
                      } text-sm`}
                    >
                      {tab.name}
                    </h3>
                  </div>
                ) : (
                  <h3
                    className={
                      tab.key === current ? "font-semibold" : "font-normal"
                    }
                  >
                    {tab.name}
                  </h3>
                )}

                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current
                        ? "bg-sky-100 text-sky-600"
                        : "bg-rose-600 text-white",
                      "hidden ml-3 p-1 px-2 rounded-full text-xs font-medium md:inline-block"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
