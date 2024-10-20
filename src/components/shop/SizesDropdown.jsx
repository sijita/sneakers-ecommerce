import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import useFilters from "@/hooks/useFilters";

export default function SizesDropdown({ tallas, title }) {
  const { setSize } = useFilters();

  return (
    <Menu as="div" className="relative inline-block text-left w-full lg:w-auto">
      <Menu.Button className="btn btn-outline border-neutral btn-sm w-full lg:w-auto">
        {title}
        <HiChevronDown className="text-gray-400" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute left-0 z-50 mt-2 origin-top-left rounded-md bg-base-100 p-2 border border-neutral w-full lg:w-max`}
        >
          <div className="py-1 grid grid-cols-3 gap-2">
            {tallas.map((talla, i) => (
              <Menu.Item key={i} className="rounded cursor-pointer">
                {({ active }) => (
                  <button
                    onClick={() => setSize(talla)}
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-secondary text-primary" : "text-secondary"
                    }`}
                  >
                    {talla}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
