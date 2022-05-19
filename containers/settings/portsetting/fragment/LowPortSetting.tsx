export default function LowPortSetting() {
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
          {[...Array(10)].map(() => (
            <tr className="border-b bg-white hover:bg-gray-50">
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
                <span className="inline-block h-3 w-3 rounded-full bg-[#319500]"></span>
              </td>
              <td className="px-2 py-1.5 text-right">COM1</td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="TextValue"
                />
              </td>
              <td className="px-2 py-1.5 text-right">45</td>
              <td className="px-2 py-1.5 text-right">45</td>
              <td className="px-2 py-1.5 text-right">45</td>
              <td className="px-2 py-1.5 text-right">45</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
