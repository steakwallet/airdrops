import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { capitalise, classNames } from "../utils";
import { Fragment, useState } from "react";

export function SingleValueFilter({
  value,
  setValue,
  allValues,
  defaultText,
  useImg,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {value === null ? defaultText : capitalise(value)}
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item onClick={() => setValue(null)} key="clear">
              <a className="flex items-center px-4 py-2 space-x-4 text-sm group hover:cursor-pointer">
                <Image
                  src={`/images/close.png`}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>Clear</span>
              </a>
            </Menu.Item>
            {allValues.map((v) => (
              <Menu.Item onClick={() => setValue((old) => v)} key={v}>
                {({ active }) => (
                  <a
                    className={classNames(
                      value === v
                        ? "bg-gray-100 text-gray-900 cursor-default"
                        : active
                        ? "bg-gray-100 text-gray-900 hover:cursor-pointer"
                        : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm space-x-4"
                    )}
                  >
                    {useImg && (
                      <Image
                        src={`/images/${v}.png`}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span>{capitalise(v)}</span>
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
