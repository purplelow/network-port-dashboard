import type { NextPage } from "next";
import BoardTitle from "../../../components/common/BoardTitle";
import StatusInfo from "../../../components/common/StatusInfo";
import Layout from "../../../components/layout";
import UpPortSetting from "./fragment/UpPortSetting";

const PortSetting = () => {
  return (
    <Layout title="포트 설정">
      <div className="grid h-full grid-rows-2 gap-y-2">
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
          <UpPortSetting />
        </div>
      </div>
    </Layout>
  );
};

export default PortSetting;
