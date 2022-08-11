import { useEffect, useState } from "react";
import BoardTitle from "@components/common/BoardTitle";
import useGetNote from "@api/dashBoard/getNote";
import useSystemInfo from "@api/dashBoard/systemInfo";
import { useForm } from "react-hook-form";
import modifyNote from "@api/dashBoard/modifyNote";
import axios from "axios";

const elapsedTime = (uptime: any) => {
  let days = Math.floor(uptime / (100 * 60 * 60 * 24));
  let hour = String(Math.floor((uptime / (100 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  let minutes = String(Math.floor((uptime / (100 * 60)) % 60)).padStart(2, "0");

  return `${days}일 ${hour}시간 ${minutes}분`;
};
const SYSTEMINFO_API_URL = process.env.NEXT_PUBLIC_SYSTEM_INFO;
export default function SystemInfo({ ABS_URL }: any) {
  const { register, handleSubmit } = useForm();
  const { systemInfoData, isLoading, isError } = useSystemInfo(ABS_URL);
  const [systemInfo, setSystemInfo]: any = useState();
  const { getNoteData } = useGetNote(ABS_URL);
  const userNoteValue = getNoteData?.deviceNote.replaceAll(
    /(\r\n|\n|\\r\\n|\\n)/g,
    "\n"
  );
  const [userNote, setUserNote] = useState(userNoteValue);

  useEffect(() => {
    setUserNote(userNoteValue);
  }, [userNoteValue]);

  useEffect(() => {
    // axios(`${ABS_URL}${SYSTEMINFO_API_URL}`, {
    //   method: "GET",
    // });
    if (systemInfoData) setSystemInfo(systemInfoData);
  }, [systemInfoData]);

  const userNoteJson = {
    deviceNote: userNote ?? userNoteValue,
  };

  const handleModifyNote = () => {
    modifyNote(ABS_URL, userNoteJson);
  };

  return (
    <>
      <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="w-1/5 px-3 py-3">
                펌웨어 버전
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                모델명
              </th>
              <th scope="col" className="w-1/5 px-3 py-3">
                시리얼 넘버
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
            <tr className="h-1/2 border-b bg-white">
              <td className="px-3 py-4">{systemInfo?.system_info.version}</td>
              <td className="px-3 py-4">{systemInfo?.system_info.model}</td>
              <td className="px-3 py-4">{systemInfo?.system_info.serial}</td>
              <td className="px-3 py-4">
                {systemInfo?.system_info.system_date}
              </td>
              <td className="px-3 py-4">
                {elapsedTime(systemInfo?.system_info.uptime)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="h-1/3 pt-2">
        <BoardTitle subTitle="메모" />
        <form onSubmit={handleSubmit(handleModifyNote)}>
          <div className="flex">
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              id="message"
              className="block w-[85%] resize-none whitespace-pre-wrap rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="메모를 작성하세요."
            ></textarea>
            <button
              type="submit"
              className="w-[15%] items-center rounded-lg bg-blue-800 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
