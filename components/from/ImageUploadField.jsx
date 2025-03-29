import { TrashIcon } from "@heroicons/react/24/outline";

export default function ImageUploadField({
  image,
  setImage,
  name,
  isMulti = false,
}) {
  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > 0) {
      setImage(
        isMulti ? [...image, ...selectedFiles] : selectedFiles.slice(0, 1)
      );
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.includes("image")
    );

    if (droppedFiles.length > 0) {
      setImage(
        isMulti ? [...image, ...droppedFiles] : droppedFiles.slice(0, 1)
      );
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDelete = (deletedImg) => {
    setImage(image.filter((img) => img !== deletedImg));
  };

  return (
    <div className="mt-1">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        htmlFor={name}
        className="flex justify-center cursor-pointer rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
      >
        <div className="space-y-3 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="font-semibold text-gray-700">
              <span className="text-primary">
                {isMulti ? "Upload images" : "Upload an image"}
              </span>{" "}
              <span>or drag and drop</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            <input
              type="file"
              name={name}
              id={name}
              accept="image/*"
              multiple={isMulti} // ✅ Controlled by `isMulti`
              className="sr-only"
              onChange={handleChange}
            />
          </div>
        </div>
      </label>

      <div className="mt-2 grid grid-cols-2 gap-4">
        {image?.map((img, index) => (
          <div className="relative" key={index}>
            <img
              src={URL.createObjectURL(img)}
              className="inline-flex flex-auto sm:h-52 rounded-lg"
            />
            <button
              onClick={() => handleDelete(img)}
              className="p-2 bg-primary rounded-full absolute top-4 right-4 hover:bg-gray-200 text-white hover:text-warning"
            >
              <TrashIcon className="h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
