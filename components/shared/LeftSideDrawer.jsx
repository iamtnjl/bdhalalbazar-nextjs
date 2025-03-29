import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";

export default function LeftSideDrawer({ open, setOpen, children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/super-login");
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
              <div className="overflow-y-auto">
                <div className="flex justify-between px-4 py-4 items-center border-b bg-white text-primary">
                  <div className="flex-shrink-0">
                    <div className="flex gap-1 items-center">
                      <Image
                        alt="logo"
                        src={"/logo/logo.png"}
                        width={50}
                        height={50}
                      />
                      <p className="bg-gradient-to-tr from-indigo-700 to-cyan-600 bg-clip-text text-transparent text-3xl font-semibold tracking-wide font-vibes italic">
                        HalalBazar
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 w-full mx-auto mb-16">{children}</div>
              </div>
              <div className="flex flex-shrink-0v gap-4 w-[320px] border-t-2 border-gray-200 justify-end px-4 py-4 bg-white fixed bottom-0 ">
                <Button onClick={() => handleLogout()} variant="light">
                  Logout
                </Button>
                <Button onClick={() => setOpen(false)} variant="light">
                  Close
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
