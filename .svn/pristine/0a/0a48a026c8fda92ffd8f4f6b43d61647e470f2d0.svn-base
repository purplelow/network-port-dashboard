export default function UpPortSetting() {
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
        <tbody className="h-full overflow-auto">
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
              <td className="px-6 py-1.5 text-center">
                <span className="inline-block h-3 w-3 rounded-full bg-[#319500]"></span>
              </td>
              <td className="px-6 py-1.5 text-right">COM1</td>
              <td className="px-6 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  placeholder="6001"
                />
              </td>
              <td className="px-6 py-1.5 text-right">45</td>
              <td className="px-6 py-1.5 text-right">45</td>
              <td className="px-6 py-1.5 text-right">45</td>
              <td className="px-6 py-1.5 text-right">45</td>
              <td className="px-6 py-1.5 text-right">45</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
