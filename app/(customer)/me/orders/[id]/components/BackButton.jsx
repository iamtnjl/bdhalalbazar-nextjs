"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ buttonText, backToURL, titleText }) {
  const router = useRouter();

  return (
    <nav className="flex font-semibold flex-wrap gap-2 text-gray-600 text-sm">
      <button
        className="text-primary mr-2 px-3 py-2 rounded-lg bg-white hover:bg-primary-100  cursor-pointer"
        onClick={() => router.push(backToURL)}
      >
        {buttonText}
      </button>
      <div className="flex">
        <p className="py-2">/</p>
        <p className="pl-3 py-2">{titleText}</p>
      </div>
    </nav>
  );
}
