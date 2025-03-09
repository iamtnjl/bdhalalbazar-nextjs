import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Lightbox from "react-spring-lightbox";

export default function ImageLightbox({
  open,
  setOpen,
  images,
  currentImageIndex,
  setCurrentIndex,
}) {
  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const CustomLeftArrowButton = () => {
    const gotoPrevious = (event) => {
      event.stopPropagation();
      if (currentImageIndex > 0) {
        setCurrentIndex(currentImageIndex - 1);
      }
    };

    return (
      <button
        onClick={gotoPrevious}
        className={`${
          currentImageIndex < 1 && "hidden"
        } lightbox-arrow-button lightbox-left-arrow-button bg-white rounded-full p-2 shadow-lg absolute left-6 top-1/2 transform -translate-y-1/2 transition duration-300 hover:bg-gray-200 focus:outline-none cursor-pointer z-10`}
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
      </button>
    );
  };

  const CustomRightArrowButton = () => {
    return (
      <button
        onClick={gotoNext}
        className={`${
          currentImageIndex === images.length - 1 && "hidden"
        } lightbox-arrow-button lightbox-right-arrow-button bg-white rounded-full p-2 shadow-lg absolute right-6 top-1/2 transform -translate-y-1/2 transition duration-300 hover:bg-gray-200 focus:outline-none`}
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
      </button>
    );
  };

  const CustomCloseButton = () => {
    return (
      <button
        onClick={() => setOpen(false)}
        className="bg-white absolute top-5 right-5 shadow-lg hover:scale-105 transition-transform rounded-full p-2"
      >
        <XMarkIcon className="w-5 h-5 text-grey-600" />
      </button>
    );
  };

  return (
    <>
      <Lightbox
        isOpen={open}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={images}
        currentIndex={currentImageIndex}
        renderPrevButton={() => <CustomLeftArrowButton />}
        renderNextButton={() => <CustomRightArrowButton />}
        renderImageOverlay={() => <CustomCloseButton />}
        className={"bg-gray-900 relative"}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
