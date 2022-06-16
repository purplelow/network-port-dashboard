import Layout from "@components/layout";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineCheckCircle, AiOutlineUpload } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";
import useSystemInfo from "@api/dashBoard/systemInfo";
import FirmwareForm from "./fragment/FirmwareForm";
import BackUp from "./fragment/Backup";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  backUpFailState,
  backUpState,
  restoreFailState,
  restoreState,
} from "recoil/atom";
import RestoreFrom from "./fragment/RestoreForm";
import useRestart from "@api/management/restart";
import AlertAdminReq from "@components/common/AlertAdminReq";

const SystemManage = () => {
  const { systemInfo } = useSystemInfo();
  const backUpStateProp = useRecoilValue(backUpState);
  const backUpFailStateProp = useRecoilValue(backUpFailState);
  const [backUpProp, setBackUpProp] = useRecoilState(backUpState);
  const [backUpFailProp, setBackUpFailProp] = useRecoilState(backUpFailState);

  const restoreStateProp = useRecoilValue(restoreState);
  const restoreFailStateProp = useRecoilValue(restoreFailState);
  const [restoreSuccess, setRestoreSuccess] = useRecoilState(restoreState);
  const [restoreFail, setRestoreFail] = useRecoilState(restoreFailState);

  const [restartAlert, setRestartAlert] = useState(false);

  // useCallback(() => {
  //   setBackUpProp(backUpStateProp);
  //   setRestoreSuccess(restoreStateProp);
  // }, [backUpStateProp, restoreStateProp]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setBackUpProp(false);
      setBackUpFailProp(false);
      setRestoreSuccess(false);
      setRestoreFail(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    backUpStateProp,
    backUpFailStateProp,
    restoreStateProp,
    restoreFailStateProp,
  ]);

  return (
    <Layout title="시스템 관리">
      <div className="space-y-4">
        <div className="flex justify-end space-x-4">
          <button className="flex items-center space-x-2 rounded-sm bg-gray-600 px-4 py-3 text-sm text-white">
            <RiLockPasswordLine className="text-lg" />
            <span>패스워드 변경</span>
          </button>
          <button
            type="submit"
            onClick={() => AlertAdminReq()}
            className="flex items-center space-x-2 rounded-sm bg-gray-900 px-4 py-3 text-sm text-white"
          >
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
                className="absolute top-7 left-1/2 -translate-x-1/2 rounded-b  border-t-4 border-teal-500 bg-teal-100 px-3 py-3 pr-10 text-teal-900 shadow-2xl"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <AiOutlineCheckCircle className="mr-3 fill-current text-3xl text-teal-500" />
                  </div>
                  <div>
                    <p className="py-1 font-bold">다운로드 완료</p>
                    <p className="py-1 text-sm">
                      백업 파일이 다운로드 되었습니다
                    </p>
                  </div>
                </div>
              </div>
            )}
            {backUpFailStateProp && (
              <div
                className="absolute top-7 left-1/2 -translate-x-1/2 rounded-b  border-t-4 border-red-500 bg-red-100 px-3 py-3 pr-10 text-teal-900 shadow-2xl"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <TbFaceIdError className="mr-3 fill-current text-3xl text-red-500" />
                  </div>
                  <div>
                    <p className="py-1 font-bold">다운로드 실패</p>
                    <p className="py-1 text-sm">
                      백업 파일이 다운로드 되지 않았습니다
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">복원</span>
          <RestoreFrom />

          {restoreStateProp && (
            <div
              className="absolute top-7 left-1/2 -translate-x-1/2 rounded-b  border-t-4 border-teal-500 bg-teal-100 px-3 py-3 pr-10 text-teal-900 shadow-2xl"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <AiOutlineCheckCircle className="mr-3 fill-current text-3xl text-teal-500" />
                </div>
                <div>
                  <p className="py-1 font-bold">복원 파일 업로드 완료</p>
                  <p className="py-1 text-sm">설정 복원을 시작합니다</p>
                </div>
              </div>
            </div>
          )}
          {restoreFailStateProp && (
            <div
              className="absolute top-7 left-1/2 -translate-x-1/2 rounded-b  border-t-4 border-red-500 bg-red-100 px-3 py-3 pr-10 text-teal-900 shadow-2xl"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <TbFaceIdError className="mr-3 fill-current text-3xl text-red-500" />
                </div>
                <div>
                  <p className="py-1 font-bold">파일 업로드 실패</p>
                  <p className="py-1 text-sm">
                    설정 복원이 적용되지 않았습니다
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SystemManage;
