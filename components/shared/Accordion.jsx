import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border rounded-xl shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
      >
        <span className="font-semibold text-gray-800 text-base truncate">{title}</span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[450px]" : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <div className="p-4 border-t">{children}</div>
      </div>
    </div>
  );
}
