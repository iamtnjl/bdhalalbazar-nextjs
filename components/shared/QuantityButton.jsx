import { Minus, Plus } from "lucide-react";

import { useCart } from "@/providers/CartProvider";

import TextInputField from "../from/TextInputField";

const QuantityButton = ({ cartItem, product, fromCartPage, refetch }) => {
  const { updateQuantity } = useCart();
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1 border rounded-md bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          updateQuantity(product._id, cartItem.quantity - 1);
        }}
      >
        <Minus size={20} className="text-gray-500" />
      </button>
      <TextInputField
        className="w-[35px] border border-gray-200 px-2 py-[3px] text-center rounded-md focus:ring-primary focus:outline-none text-gray-700 font-bold"
        value={cartItem?.quantity}
        disabled
      />
      <button
        className="p-1 border rounded-md bg-primary"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          updateQuantity(product._id, cartItem.quantity + 1);
        }}
      >
        <Plus size={20} className="text-white" />
      </button>
    </div>
  );
};

export default QuantityButton;
