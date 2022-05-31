import useDownPortList from "@api/setting/downPortList";
import { chmod } from "fs";

export default function DownPortSetting() {
  const { downPortList, isLoading, isError }: any = useDownPortList();
     console.log("downPort: ", downPortList);

    const statusColor = (status: string) => {
      let result;
      if(status === "ERROR") result = "inline-block h-3 w-3 rounded-full bg-[#DE1717]";
      else if(status === "READY") result = "inline-block h-3 w-3 rounded-full bg-[#FFAB4A]";
      else if(status === "RUN") result = "inline-block h-3 w-3 rounded-full bg-[#319500]";
      else if(status === "DOWN") result = "inline-block h-3 w-3 rounded-full bg-[#1694D5]";
      else if(status === "UNUSED") result = "inline-block h-3 w-3 rounded-full bg-[#B5B5B5]";
      else result = "";
      return result;
    }
  
    return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-md border-[1px] border-gray-300 shadow-md">
      <table className="h-full w-full text-left text-sm text-gray-500">
        <thead className="bg-blue-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Status
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              Port
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Name
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Model
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Type
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Baud Rate
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Parity
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Data Bits
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Stop Bits
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Device ID
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T1 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T2 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T3 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T4 (SECS)
            </th>
          </tr>
        </thead>
        <tbody className="input-w-s h-full overflow-auto">
          {downPortList?.map((com: any, i: string) => (
            <tr className="border-b bg-white hover:bg-gray-50" key={i}>
              <td className="w-4 px-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-2 py-1.5 text-center">
                <span className={statusColor(com.status)}></span>
              </td>
              <td className="px-2 py-1.5 text-right">{com.deviceName}</td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.name}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.model}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.type}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.baudrate}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.parity}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.databits}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.stopbits}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  value={com.id}
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-right">{com.t1}</td>
              <td className="px-2 py-1.5 text-right">{com.t2}</td>
              <td className="px-2 py-1.5 text-right">{com.t3}</td>
              <td className="px-2 py-1.5 text-right">{com.t4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
