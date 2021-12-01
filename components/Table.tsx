import { useState } from "react";
import { MultipleValueFilter, SingleValueFilter } from ".";
import RawAirdrops from "../data/drops.json";
import { capitalise } from "../utils";
import { FallbackImage } from "./FallbackImage";

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

const allNetworks: string[] = [
  ...new Set(
    Object.values(airdrops).reduce(
      (accum: string[], drop) => [...accum, drop.network],
      []
    )
  ),
];

const allEcosystems: string[] = [
  ...new Set(
    Object.values(airdrops).reduce(
      (accum: string[], drop) =>
        drop.ecosystems ? [...accum, ...drop.ecosystems] : accum,
      []
    )
  ),
];

export function Table() {
  const [networks, setNetworks] = useState<string[]>([]);
  const [status, setStatus] = useState([Status.Upcoming, Status.Active]);
  const [ecosystem, setEcosystem] = useState<string>(null);

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
      () => {
        if (!ecosystem) {
          return true;
        }

        return d.ecosystems.includes(ecosystem);
      },
    ];

    return checks.every((fn) => fn());
  });

  return (
    <div className="space-y-4" style={{ minHeight: "50vh" }}>
      <div className="flex justify-end space-x-4">
        <SingleValueFilter
          value={ecosystem}
          setValue={setEcosystem}
          allValues={allEcosystems}
          defaultText="All Ecosystems"
          useImg={true}
        />
        <MultipleValueFilter
          values={networks}
          setValues={setNetworks}
          allValues={allNetworks}
          defaultText="All Networks"
          useImg={true}
        />
        <MultipleValueFilter
          values={status}
          setValues={setStatus}
          allValues={Object.values(Status)}
          defaultText="Select Status"
          useImg={false}
        />
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((drop) => (
                    <tr key={`${drop.network}-${drop.symbol}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-6">
                          <FallbackImage
                            className="w-10 h-10 rounded-full"
                            src={`/images/${drop.symbol.toLowerCase()}.png`}
                            fallbackSrc={`/images/${drop.network}.png`}
                            height={32}
                            width={32}
                          />
                          <div className="flex-col items-center">
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900">
                                {drop.name}
                              </div>
                              <img
                                src={`/images/${drop.network}.png`}
                                className="w-4 h-4 rounded-full"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-500">
                              ${drop.symbol}
                            </span>
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
                      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">
                        {drop.status === Status.Active ? (
                          <a
                            href={drop.claimLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 text-white transition bg-pink-500 rounded hover:bg-pink-600"
                          >
                            <button>Claim now</button>
                          </a>
                        ) : drop.announcementLink ? (
                          <a
                            href={drop.announcementLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-center text-pink-600 hover:text-pink-700"
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
