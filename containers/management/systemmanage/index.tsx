import Layout from "@components/layout";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineUpload } from "react-icons/ai";
import useSystemInfo from "@api/dashBoard/systemInfo";
import FirmwareForm from "./fragment/FirmwareForm";

const SystemManage = () => {
  const { systemInfo } = useSystemInfo();
  return (
    <Layout title="시스템 관리">
      <div className="space-y-4">
        <div className="flex justify-end space-x-4">
          <button className="flex items-center space-x-2 rounded-sm bg-gray-600 px-4 py-3 text-sm text-white">
            <RiLockPasswordLine className="text-lg" />
            <span>패스워드 변경</span>
          </button>
          <button className="flex items-center space-x-2 rounded-sm bg-gray-900 px-4 py-3 text-sm text-white">
            <VscDebugRestart className="text-lg" />
            <span>재부팅 시작</span>
          </button>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">
            펌웨어 업데이트
          </span>
          <div className="flex w-[80%] items-center justify-end space-x-4">
            <span className="relative text-sm text-gray-500">
              현재 버전 : {systemInfo?.system_info.version}
            </span>

            <FirmwareForm />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">백업</span>
          <div className="flex w-[80%] items-center justify-end space-x-4">
            <button
              type="submit"
              className="min-w-[280px] rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
            >
              백업
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">복원</span>
          <div className="flex w-[80%] items-center justify-end space-x-4">
            <label
              htmlFor="bFileUp"
              className="relative -right-11 cursor-pointer text-blue-700"
            >
              <AiOutlineUpload />
            </label>
            <input
              id="bFileUp"
              type="file"
              className="min-w-[350px] cursor-pointer border-[1px] border-gray-200 text-sm text-slate-500
                file:mr-4 file:cursor-pointer file:border-0
                file:bg-violet-50 file:py-2
                file:px-8 file:text-sm
                file:font-semibold file:text-blue-700
              "
            />
            <button
              type="submit"
              className="min-w-[280px] rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
            >
              복원
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SystemManage;
