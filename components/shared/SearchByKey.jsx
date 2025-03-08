"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

function SearchByKey({ onChange, value, onReset, params, placeholders }) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const typingSpeed = 100;

  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharacterIndex = 0;

    // Check if there are multiple placeholders to animate
    if (placeholders.length > 1) {
      const intervalId = setInterval(() => {
        if (currentCharacterIndex <= placeholders[currentPhraseIndex].length) {
          setCurrentPlaceholder(
            placeholders[currentPhraseIndex].substring(0, currentCharacterIndex)
          );
          currentCharacterIndex++;
        } else {
          currentCharacterIndex = 0;
          currentPhraseIndex = (currentPhraseIndex + 1) % placeholders.length;
        }
      }, typingSpeed);

      return () => clearInterval(intervalId);
    } else {
      // If only one placeholder, set it directly without animation
      setCurrentPlaceholder(placeholders[0]);
    }
  }, [placeholders]);
  return (
    <div className="w-full">
      <div className="relative text-gray-400 focus-within:text-gray-600 mt-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search
            className="h-5 w-5 text-gray-700 font-semibold"
            aria-hidden="true"
          />
        </div>
        <input
          id="search-company"
          autoComplete="false"
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600 sm:text-sm"
          placeholder={currentPlaceholder}
          type="search-company"
          name="search-company"
          value={value}
          onChange={onChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
          {/* {params.search.length > 0 ? ( */}
          <X
            onClick={onReset}
            className="h-5 w-5 text-gray-500 font-semibold"
            aria-hidden="true"
          />
          {/* ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default SearchByKey;
