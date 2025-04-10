import APIKit from "@/common/helpers/APIKit";
import Toggle from "@/components/shared/Toggle";
import toast from "react-hot-toast";

function ProductStatusToggle({ product, refetch }) {
  const handleToggleStatus = (value) => {
    const promise = APIKit.we.products
      .updateProductVisibility(product._id, { is_published: value })
      .then(() => {
        refetch();
      })
      .catch((e) => {
        throw e;
      });
    return toast.promise(promise, {
      loading: "Updating...",
      success: "Successfully updated.",
      error: "Something went wrong!",
    });
  };

  return (
    <div className="cursor-pointer items-center rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-fit">
      <div className="flex justify-between items-center gap-4">
        <div className="font-medium capitalize">
          {product?.is_published ? "UNPUBLISHED" : "PUBLISHED"}
        </div>
        <div>
          <Toggle
            productEdit={product?.is_published}
            setProductEdit={(value) => handleToggleStatus(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductStatusToggle;
