import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ConfirmationModal({
  isOpen,
  closeModal,
  title = "Confirmation",
  message = "Are you sure to perform this action?",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden text-center align-middle transition-all transform bg-white rounded-lg shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="p-4 text-lg font-semibold text-gray-600"
                >
                  {title}
                </Dialog.Title>

                <div className="px-4 pt-0 pb-6">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>

                <div className="flex border-t divide-x">
                  <button
                    onClick={() => {
                      onCancel();
                      closeModal();
                    }}
                    className="w-full p-4 font-semibold text-gray-600 transition-colors appearance-none hover:bg-primary-100 focus-visible:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      closeModal();
                    }}
                    className="w-full p-4 font-semibold text-gray-600 transition-colors appearance-none hover:bg-primary-100 focus-visible:outline-none"
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
