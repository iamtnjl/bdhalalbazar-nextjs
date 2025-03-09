import { XMarkIcon } from "@heroicons/react/20/solid";
import { FiX } from "react-icons/fi";

function FilterBadge({ name, onReset }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white w-fit rounded-md border border-gray-200">
      <p className="text-sm text-primary font-medium">{name}</p>
      <XMarkIcon
        onClick={onReset}
        className="h-5 w-5 text-warning cursor-pointer"
      />
    </div>
  );
}

export default FilterBadge;
