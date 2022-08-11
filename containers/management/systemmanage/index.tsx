import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";
import Layout from "@components/layout";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";
import useSystemInfo from "@api/dashBoard/systemInfo";
import FirmwareForm from "./fragment/FirmwareForm";
import BackUp from "./fragment/Backup";
import {
  backUpFailState,
  backUpState,
  restoreFailState,
  restoreState,
  routerUrl,
} from "recoil/atom";
import RestoreFrom from "./fragment/RestoreForm";
import AlertAdminReq from "containers/management/systemmanage/fragment/AlertAdminReq";

import AlertModifyPw from "./fragment/AlertModifyPw";
import "react-toastify/dist/ReactToastify.css";

const SystemManage = () => {
  const ABS_URL = useRecoilValue(routerUrl);
  const { systemInfoData } = useSystemInfo(ABS_URL);

  // const [backUpSuccess, setBackUpSuccess] = useRecoilState(backUpState);
  // const [backUpFail, setBackUpFail] = useRecoilState(backUpFailState);

  // const [restoreSuccess, setRestoreSuccess] = useRecoilState(restoreState);
  // const [restoreFail, setRestoreFail] = useRecoilState(restoreFailState);

  const [modalOpen, setModalOpen] = useState(false);

  const openPwModal = () => {
    setModalOpen(true);
  };
  const closePwModal = () => {
    setModalOpen(false);
  };

  // =================customizing Alert -> toastify
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setBackUpSuccess(false);
  //     setBackUpFail(false);
  //     setRestoreSuccess(false);
  //     setRestoreFail(false);
  //   }, 2500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [backUpSuccess, backUpFail, restoreSuccess, restoreFail]);

  return (
    <Layout title="시스템 관리">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {modalOpen && (
        <AlertModifyPw
          ABS_URL={ABS_URL}
          open={modalOpen}
          close={closePwModal}
          header={"비밀번호 변경"}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center space-x-2 rounded-sm bg-gray-600 px-4 py-3 text-sm text-white"
          >
            <RiLockPasswordLine className="text-lg" />
            <span>비밀번호 변경</span>
          </button>

          <button
            onClick={() => AlertAdminReq(ABS_URL, "reboot", "")}
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
              현재 버전 : {systemInfoData?.system_info.version}
            </span>
            <FirmwareForm ABS_URL={ABS_URL} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">백업</span>
          <div className="flex w-[80%] items-center justify-end space-x-4">
            <BackUp ABS_URL={ABS_URL} />
            {/* {backUpSuccess && (
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
            {backUpFail && (
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
            )} */}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-white p-8 shadow-md">
          <span className="text-xl font-bold text-gray-700">복원</span>
          <RestoreFrom ABS_URL={ABS_URL} />

          {/* {restoreSuccess && (
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
          {restoreFail && (
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
          )} */}
        </div>
      </div>
    </Layout>
  );
};

export default SystemManage;
