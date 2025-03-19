import SectionTitle from "@/components/shared/SectionTitle";
import AddProductForm from "./components/AddProductForm";

const AddProduct = () => {
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <SectionTitle title={"Add Products"} />
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
