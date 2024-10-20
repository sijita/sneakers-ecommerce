import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function MyDropdown({ title, children, position, menuStyle, btnStyle }) {
  return (
    <Menu as="div" className="relative inline-block w-full lg:w-auto">
      <Menu.Button className={`btn ${btnStyle} btn-sm w-full lg:w-auto`}>
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
          className={`absolute ${position}-0 z-50 mt-2 origin-top-${position} rounded-md bg-base-100 p-2 border border-neutral ${menuStyle}`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
