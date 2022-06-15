import Layout from "@components/layout";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineCheckCircle, AiOutlineUpload } from "react-icons/ai";
import useSystemInfo from "@api/dashBoard/systemInfo";
import FirmwareForm from "./fragment/FirmwareForm";
import BackUp from "./fragment/Backup";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { backUpState } from "recoil/atom";
import RestoreFrom from "./fragment/RestoreForm";

const SystemManage = () => {
  const backUpStateProp = useRecoilValue(backUpState);
  const [backUpProp, setBackUpProp] = useRecoilState(backUpState);
  const { systemInfo } = useSystemInfo();

  useCallback(() => {
    setBackUpProp(backUpStateProp);
  }, [backUpStateProp]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setBackUpProp(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [backUpStateProp]);

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
            <BackUp />
            {backUpStateProp && (
              <div
                className="absolute top-5 left-[calc(50%-160px)] w-80 rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-3 text-teal-900 shadow-2xl"
                role="alert"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="py-1 text-4xl">
                    <AiOutlineCheckCircle />
                  </div>
                  <div>
                    <p className="font-bold">
                      백업 파일이 다운로드 되었습니다.
                    </p>
                    {/* <p className="text-sm">백업 파일이 다운로드 되었습니다.</p> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">복원</span>
          <RestoreFrom />
        </div>
      </div>
    </Layout>
  );
};

export default SystemManage;
