import Link from "next/link";

export default function ProductBreadcrumbs({productName}) {
    
  return (
    <div>
      <ul className="flex items-center gap-1">
        <li>
          <Link
            href={`/`}
            className="text-sm text-gray-700 hover:text-primary-500  font-medium"
          >
            Home
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link
            href={"/products"}
            className="text-sm text-gray-700 hover:text-primary-500 font-medium"
          >
            Products
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
