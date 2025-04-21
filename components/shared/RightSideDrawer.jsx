import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

function RightSideDrawer({
  open,
  setOpen,
  children,
  title,
  btnName,
  ...props
}) {
  const handleDrawerClose = () => {
    if (props.isEditing) {
      const canClose = confirm(
        "Are you sure you want to close without saving?"
      );

      if (canClose) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={handleDrawerClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={"div"}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen h-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-primary-bg shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="p-4">{children}</div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4 gap-4">
                        <Button variant="light" onClick={handleDrawerClose}>
                          Cancel
                        </Button>
                        {btnName && (
                          <Button
                            type="submit"
                            variant="teal"
                            extraClassName="ml-3"
                          >
                            {btnName}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default RightSideDrawer;
