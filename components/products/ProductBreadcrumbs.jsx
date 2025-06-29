"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ProductBreadcrumbs({ productName }) {
  const { t } = useTranslation();

  return (
    <div>
      <ul className="flex items-center gap-1">
        <li>
          <Link
            href={`/`}
            className="text-sm text-gray-700 hover:text-primary-500  font-medium"
          >
            {t("navigation.home")}
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link
            href={"/products"}
            className="text-sm text-gray-700 hover:text-primary-500 font-medium"
          >
            {t("navigation.products")}
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link href={`#`} className="text-sm font-medium text-primary-500">
            {productName}
          </Link>
        </li>
      </ul>
    </div>
  );
}
