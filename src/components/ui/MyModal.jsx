import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

export default function MyModal({ title, children, isOpen, closeModal }) {
  const t = useTranslations("Close");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl p-8 max-[315px]:mt-96 mt-52 min-[550px]:mt-40 mb-20 bg-primary border border-neutral rounded-md relative transform overflow-hidden transition-all">
                <Dialog.Title
                  as="h2"
                  className="font-bold text-2xl text-center uppercase mb-8"
                >
                  {title}
                </Dialog.Title>
                {children}
                <div className="mt-8">
                  <button
                    type="button"
                    className="btn btn-secondary w-full font-bold text-base"
                    onClick={closeModal}
                  >
                    {t("text")}
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
