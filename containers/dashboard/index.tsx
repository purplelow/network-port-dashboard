import { useRecoilValue } from "recoil";
import { mqttUrl, routerUrl } from "recoil/atom";
import { ToastContainer } from "react-toastify";

import Layout from "@components/layout";
import BoardTitle from "@components/common/BoardTitle";
import StatusInfo from "@components/common/StatusInfo";
import CpuChart from "./fragment/Chart/CpuChart";
import HDDChart from "./fragment/Chart/HDDChart";
import MemoryChart from "./fragment/Chart/MemoryChart";
import StorageChart from "./fragment/Chart/StorageChart";
import NetworkTabCont from "./fragment/NetworkTabCont";
import SystemTabCont from "./fragment/SystemTabCont";
import UpCom from "./fragment/UpCom";
import LowCom from "./fragment/LowCom";
import SystemInfo from "./fragment/SystemInfo";
import MqttWSReactService from "mqtt_ws/index";

import "react-toastify/dist/ReactToastify.css";

const WS_CLIID = process.env.NEXT_PUBLIC_WS_CLIID;

const Dashboard = () => {
  const ABS_URL = useRecoilValue(routerUrl);
  const clientId = `${WS_CLIID}`;
  const { client }: any = MqttWSReactService(clientId);

  return (
    <Layout title="대시보드">
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

      <div className="h-full gap-x-2 xl:grid xl:grid-cols-7">
        <div className="col-span-3 grid w-full grid-flow-row grid-rows-4 gap-2">
          <div className="row-span-2 h-full rounded-md bg-white p-2 shadow-md">
            <BoardTitle subTitle="네트워크 정보" />
            <NetworkTabCont ABS_URL={ABS_URL} client={client} />
          </div>

          <div className="relative h-full rounded-md bg-white p-2 shadow-md">
            <BoardTitle subTitle="상위 통신" />
            <span className="block pl-2 text-sm text-gray-400">
              TCP/IP 통신
            </span>
            <StatusInfo />
            <UpCom ABS_URL={ABS_URL} client={client} />
          </div>

          <div className="h-full rounded-md bg-white p-2 shadow-md">
            <BoardTitle subTitle="하위 통신" />
            <span className="block pl-2 text-sm text-gray-400">
              시리얼 통신
            </span>
            <LowCom ABS_URL={ABS_URL} client={client} />
          </div>
        </div>

        <div className="col-span-4 grid w-full grid-flow-row grid-rows-3 gap-2">
          <div className="row-span-2 h-full w-full rounded-md bg-white p-2 shadow-md">
            <div className="relative grid h-full grid-flow-row grid-rows-3">
              <div className="absolute top-0 left-0">
                <BoardTitle subTitle="시스템" />
              </div>
              <div className=" row-span-1">
                <div className="flex h-full ">
                  <div className="flex h-full w-1/4 items-end">
                    <CpuChart ABS_URL={ABS_URL} client={client} />
                  </div>
                  <div className="flex h-full w-1/4 items-end">
                    <MemoryChart ABS_URL={ABS_URL} client={client} />
                  </div>
                  <div className="flex h-full w-1/4 items-end">
                    <StorageChart ABS_URL={ABS_URL} />
                  </div>
                  <div className="flex h-full w-1/4 items-end">
                    <HDDChart ABS_URL={ABS_URL} />
                  </div>
                </div>
              </div>

              <SystemTabCont ABS_URL={ABS_URL} />
            </div>
          </div>

          <div className="h-full w-full rounded-md bg-white p-2 shadow-md">
            <BoardTitle subTitle="시스템 정보" />
            <SystemInfo ABS_URL={ABS_URL} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
