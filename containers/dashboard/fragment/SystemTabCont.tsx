interface SysTabProp {
  sysTabIndex: number;
}

export default function SystemTabCont({ sysTabIndex }: SysTabProp) {
  return (
    <div className="relative h-2/3 shadow-md">
      {sysTabIndex === 0 ? (
        <table className="w-full overflow-x-auto text-right text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 pr-2"></th>
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
              <th className="py-4 pr-2 text-center font-medium text-gray-900">
                Mem
              </th>
              <td className="py-4 pr-2">1.7G</td>
              <td className="py-4 pr-2">221M</td>
              <td className="py-4 pr-2">1.3G</td>
              <td className="py-4 pr-2">30M</td>
              <td className="py-4 pr-2">219M</td>
              <td className="py-4 pr-4">1.3G</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full overflow-x-auto text-right text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 pr-2"></th>
              <th className="py-3 pr-2">TOTAL</th>
              <th className="py-3 pr-2">USED</th>
              <th className="py-3 pr-2">PATH</th>
              <th className="py-3 pr-2">DEVICE</th>
              <th className="py-3 pr-4">PERCENT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
            <tr className="border-b bg-white">
              <td className="py-2 pr-2 text-center font-medium text-gray-900">
                Mem
              </td>
              <td className="h-2 py-2 pr-2">12</td>
              <td className="h-2 py-2 pr-2">34</td>
              <td className="h-2 py-2 pr-2">156</td>
              <td className="h-2 py-2 pr-2">67</td>
              <td className="h-2 py-2 pr-4">89</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
