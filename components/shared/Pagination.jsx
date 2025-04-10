import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import Button from "./Button";

export default function Pagination({ setPage, data, page, divide = 40 }) {
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(data?.count / divide);
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;

      return (
        <Button
          key={pageNumber}
          onClick={() => {
            handlePageChange(pageNumber);
          }}
          className={
            pageNumber === page
              ? "bg-teal-500 px-3 py-1 text-white rounded-md text-sm font-medium shadow-sm border border-gray-300 hover:bg-teal-600"
              : "px-3 py-1 text-sm font-medium shadow-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          {pageNumber}
        </Button>
      );
    });
  };

  return (
    <>
      <div className="hidden lg:flex justify-center flex-wrap gap-2 rounded-md">
        <Button
          extraClassName={
            !data?.previous ? "opacity-50 cursor-not-allowed" : ""
          }
          onClick={() => handlePageChange(page - 1)}
          disabled={!data?.previous}
        >
          Previous
        </Button>
        {getPageNumbers()}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data?.next}
          extraClassName={!data?.next ? "opacity-50 cursor-not-allowed" : ""}
        >
          Next
        </Button>
      </div>
      <div className="flex lg:hidden justify-center flex-wrap gap-1 rounded-md">
        <Button
          extraClassName={
            !data?.previous ? "opacity-50 cursor-not-allowed" : ""
          }
          onClick={() => handlePageChange(page - 1)}
          disabled={!data?.previous}
        >
          <ArrowLeftIcon className="w-3" />
        </Button>
        {getPageNumbers()}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data?.next}
          extraClassName={!data?.next ? "opacity-50 cursor-not-allowed" : ""}
        >
          <ArrowRightIcon className="w-3" />
        </Button>
      </div>
    </>
  );
}
