import useUpPortList from "@api/setting/upPortList";

export default function UpPortSetting() {
  const { upPortList, isLoading, isError }: any = useUpPortList();
  //  console.log("upPort: ", upPortList);

  const statusColor = (status: string) => {
    let result;
    if (status === "ERROR")
      result = "inline-block h-3 w-3 rounded-full bg-[#DE1717]";
    else if (status === "READY")
      result = "inline-block h-3 w-3 rounded-full bg-[#FFAB4A]";
    else if (status === "RUN")
      result = "inline-block h-3 w-3 rounded-full bg-[#319500]";
    else if (status === "DOWN")
      result = "inline-block h-3 w-3 rounded-full bg-[#1694D5]";
    else if (status === "UNUSED")
      result = "inline-block h-3 w-3 rounded-full bg-[#B5B5B5]";
    else result = "";
    return result;
  };

  return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-md border-[1px] border-gray-300 shadow-md">
      <table className="w-full text-left text-sm text-gray-500">
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
            <th scope="col" className="px-6 py-1 text-center">
              Status
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              Serial Port
            </th>
            <th scope="col" className="px-6 py-1 text-center">
              Port
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              T3 (HSMS)
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              T5 (HSMS)
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              T6 (HSMS)
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              T7 (HSMS)
            </th>
            <th scope="col" className="px-6 py-1 text-right">
              T8 (HSMS)
            </th>
          </tr>
        </thead>
        <tbody className="overflow-auto">
          {upPortList?.map((com: any, i: string) => (
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
              <td className="px-6 py-1.5 text-center">
                <span className={statusColor(com.status)}></span>
              </td>
              <td className="px-6 py-1.5 text-right">{com.deviceName}</td>
              <td className="px-6 py-1.5 text-center">
                <input
                  type="text"
                  value={com.port}
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="6001"
                />
              </td>
              <td className="px-6 py-1.5 text-right">{com.t3}</td>
              <td className="px-6 py-1.5 text-right">{com.t5}</td>
              <td className="px-6 py-1.5 text-right">{com.t6}</td>
              <td className="px-6 py-1.5 text-right">{com.t7}</td>
              <td className="px-6 py-1.5 text-right">{com.t8}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
