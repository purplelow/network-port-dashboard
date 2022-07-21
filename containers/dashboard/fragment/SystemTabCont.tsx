import { useState } from "react";
import useMemoryUtilization from "@api/dashBoard/memoryUtilization";
import useStorageUtilization from "@api/dashBoard/storageUtilization";
import { cls } from "@libs/utils";

export default function SystemTabCont({ ABS_URL }: any) {
  const { memoryUtilization } = useMemoryUtilization(ABS_URL);
  const { storageUtilization }: any = useStorageUtilization(ABS_URL);
  const [sysTabIndex, setSysTabIndex] = useState(0);

  return (
    <div className="row-span-2 overflow-hidden">
      <ul className="flex divide-x divide-gray-200 text-center text-sm font-medium text-gray-500">
        <li className="">
          <button
            onClick={() => {
              setSysTabIndex(0);
            }}
            className={cls(
              "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
              sysTabIndex === 0
                ? "bg-blue-800 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            )}
            aria-current="page"
          >
            메모리
          </button>
        </li>
        <li className="">
          <button
            onClick={() => {
              setSysTabIndex(1);
            }}
            className={cls(
              "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
              sysTabIndex === 1
                ? "bg-blue-800 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            )}
          >
            저장공간
          </button>
        </li>
      </ul>
      <div className="relative h-[calc(100%-40px)] overflow-auto rounded-b-lg shadow-md">
        {sysTabIndex === 0 ? (
          <table className="absolute w-full overflow-auto text-right text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 pr-2">TOTAL</th>
                <th className="py-3 pr-2">USED</th>
                <th className="py-3 pr-2">FREE</th>
                <th className="py-3 pr-2">SHARED</th>
                <th className="py-3 pr-2">BUFFERS</th>
                <th className="py-3 pr-4">CACHED</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white">
                <td className="py-4 pr-2">
                  {memoryUtilization?.details.total}
                </td>
                <td className="py-4 pr-2">{memoryUtilization?.details.used}</td>
                <td className="py-4 pr-2">{memoryUtilization?.details.free}</td>
                <td className="py-4 pr-2">
                  {memoryUtilization?.details.shared}
                </td>
                <td className="py-4 pr-2">
                  {memoryUtilization?.details.buffer}
                </td>
                <td className="py-4 pr-4">
                  {memoryUtilization?.details.cached}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="absolute w-full table-fixed overflow-auto text-right text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 pr-2 text-center">DEVICE</th>
                <th className="py-3 pr-2">TOTAL(KB)</th>
                <th className="py-3 pr-2">USED(KB)</th>
                <th className="py-3 pr-2">PERCENT(%)</th>
                <th className="py-3 pr-2">PATH</th>
              </tr>
            </thead>
            <tbody>
              {storageUtilization?.details.map((data: any, i: string) => (
                <tr className="border-b bg-white" key={i}>
                  <td className="py-2 pr-2 text-center">{data.device}</td>
                  <td className="h-2 py-2 pr-2">{data.total}</td>
                  <td className="h-2 py-2 pr-2">{data.used}</td>
                  <td className="h-2 py-2 pr-2">{data.percent}</td>
                  <td className="h-2 py-2 pr-2">{data.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
