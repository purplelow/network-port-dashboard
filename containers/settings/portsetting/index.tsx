import type { NextPage } from "next";
import BoardTitle from "@components/common/BoardTitle";
import StatusInfo from "@components/common/StatusInfo";
import Layout from "@components/layout";
import LowPortSetting from "./fragment/LowPortSetting";
import UpPortSetting from "./fragment/UpPortSetting";
import { useRef } from "react";



const PortSetting = () => {
  const sampleRef = useRef({});


  return (
    <Layout title="포트 설정">
      <div className="absolute top-10 right-4 flex justify-end space-x-4 py-2">
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-sm border border-[#707070] bg-[#707070] p-2 px-8 text-sm font-medium text-white hover:bg-neutral-600 "
        >
          <span>이전 설정 적용</span>
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 px-11 text-sm font-medium text-white hover:bg-blue-800 "
        >
          <span>설정 적용</span>
        </button>
      </div>
      <div className="grid h-full grid-rows-2 gap-y-2 pt-12">
        <div className="relative w-full rounded-md bg-white p-2 shadow-md">
          <BoardTitle subTitle="상위 포트 설정 (HSMS)" />
          <div className="relative -top-6 mr-24">
            <StatusInfo />
          </div>
          <button className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none">
            포트 리셋
          </button>
          <UpPortSetting />
        </div>

        <div className="relative w-full rounded-md bg-white p-2 shadow-md">
          <BoardTitle subTitle="하위 시리얼 포트 설정 (SECS)" />
          <div className="relative -top-6 mr-24">
            <StatusInfo />
          </div>
          <button className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none">
            포트 리셋
          </button>
          <LowPortSetting />
        </div>
      </div>
    </Layout>
  );
};

export default PortSetting;
