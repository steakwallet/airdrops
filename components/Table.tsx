import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Fragment, useState } from "react";
import RawAirdrops from "../data/drops.json";
import { capitalise, classNames } from "../utils";

const now = Date.now();

enum Status {
  Active = "active",
  Inactive = "Inactive",
  Upcoming = "Upcoming",
}

const getStatus = (startDate?: string, endDate?: string) => {
  if (!startDate) {
    return Status.Upcoming;
  }

  const start = new Date(startDate);
  if (start.getTime() > now) {
    return Status.Upcoming;
  }

  const end = endDate ? new Date(endDate) : undefined;
  if (end && end.getTime() < now) {
    return Status.Inactive;
  }

  return Status.Active;
};

const airdrops = RawAirdrops.map((d) => ({
  ...d,
  startDate: d.startDate ? new Date(d.startDate) : undefined,
  endDate: d.endDate ? new Date(d.endDate) : undefined,
  status: getStatus(d.startDate, d.endDate),
})).sort(
  (a, b) =>
    (a.startDate?.getTime() || Infinity) - (b.startDate?.getTime() || Infinity)
);

console.log(airdrops.map((a) => a.startDate));

const allNetworks: string[] = [
  ...new Set(
    Object.values(airdrops).reduce(
      (accum: string[], drop) => [...accum, drop.network],
      []
    )
  ),
];

export function Table() {
  const [networks, setNetworks] = useState<string[]>([]);
  const [status, setStatus] = useState([Status.Upcoming, Status.Active]);

  const filtered = airdrops.filter((d) => {
    const checks = [
      () => {
        return status.includes(d.status);
      },
      () => {
        if (networks.length === 0) {
          return true;
        }

        return networks.includes(d.network);
      },
    ];

    return checks.every((fn) => fn());
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-4">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {status.map(capitalise).join(", ")}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div className="py-1">
                {Object.values(Status).map((s) => (
                  <Menu.Item
                    onClick={() =>
                      setStatus((old) =>
                        old.includes(s)
                          ? old.filter((x) => x !== s)
                          : [...old, s]
                      )
                    }
                    key={s}
                  >
                    {({ active }) => (
                      <a
                        className={classNames(
                          status.includes(s)
                            ? "bg-gray-100 text-gray-900 cursor-default"
                            : active
                            ? "bg-gray-100 text-gray-900 hover:cursor-pointer"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        {capitalise(s)}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
              {/* <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm"
                      )}
                    >
                      <TrashIcon
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </div> */}
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {networks.length === 0
                ? "All Networks"
                : networks.map(capitalise).join(", ")}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div className="py-1">
                {allNetworks.map((n) => (
                  <Menu.Item
                    onClick={() =>
                      setNetworks((old) =>
                        old.includes(n)
                          ? old.filter((x) => x !== n)
                          : [...old, n]
                      )
                    }
                    key={n}
                  >
                    {({ active }) => (
                      <a
                        className={classNames(
                          networks.includes(n)
                            ? "bg-gray-100 text-gray-900 cursor-default"
                            : active
                            ? "bg-gray-100 text-gray-900 hover:cursor-pointer"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm space-x-4"
                        )}
                      >
                        <Image
                          src={`/images/${n}.png`}
                          width={20}
                          height={20}
                        />
                        <span>{capitalise(n)}</span>
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((drop) => (
                    <tr key={`${drop.network}-${drop.symbol}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`/images/${drop.network}.png`}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-col items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {drop.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${drop.symbol}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            drop.status === Status.Active &&
                            "bg-green-100 text-green-800"
                          } ${
                            drop.status === Status.Inactive &&
                            "bg-red-100 text-red-800"
                          } ${
                            drop.status === Status.Upcoming &&
                            "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {capitalise(drop.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {drop.startDate
                            ? drop.startDate.toDateString()
                            : "Announced"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center ">
                        {drop.status === Status.Active ? (
                          <a
                            href={drop.claimLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-pink-500 hover:bg-pink-600 transition text-white rounded px-4 py-2"
                          >
                            <button>Claim now</button>
                          </a>
                        ) : drop.announcementLink ? (
                          <a
                            href={drop.announcementLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-600 hover:text-pink-700 text-center"
                          >
                            See more
                          </a>
                        ) : (
                          <a
                            href={drop.homeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-center"
                          >
                            Coming soon
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
