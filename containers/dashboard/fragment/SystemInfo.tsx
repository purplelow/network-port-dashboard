import axios from "axios";
import BoardTitle from "../../../components/common/BoardTitle";
import useSystemInfo from "../../../pages/api/systemInfo";

export default function SystemInfo() {
  const { systemInfo, isLoading, isError } = useSystemInfo();
  return (
    <>
      <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-auto text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-1/5 px-3 py-3">
                펌웨어 버전
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                모델명
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                시리얼넘버
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                로컬 시간
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                가동시간
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-1/2 border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-3 py-4">{systemInfo?.system_info.version}</td>
              <td className="px-3 py-4">{systemInfo?.system_info.model}</td>
              <td className="px-3 py-4">{systemInfo?.system_info.serial}</td>
              <td className="px-3 py-4">
                {systemInfo?.system_info.system_date}
              </td>
              <td className="px-3 py-4">{systemInfo?.system_info.uptime}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="h-1/3 pt-2">
        <BoardTitle subTitle="메모" />
        <div className="flex">
          <textarea
            id="message"
            // rows="4"
            className="block w-[85%] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="메모를 작성하세요."
          ></textarea>
          <button
            type="submit"
            className="w-[15%] items-center rounded-lg bg-blue-800 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
