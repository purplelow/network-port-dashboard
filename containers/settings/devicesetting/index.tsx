import { routerUrl } from "recoil/atom";
import { useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";

import Layout from "@components/layout";
import ModelSerial from "./fragment/ModelSerial";
import TimeDateInfo from "./fragment/TimeDate";
import NetworkSetting from "./fragment/NetworkSetting";

import "react-toastify/dist/ReactToastify.css";
import MqttWSReactService from "mqtt_ws";

const WS_CLIID = process.env.NEXT_PUBLIC_WS_CLIID;

const DeviceSetting = () => {
  const ABS_URL = useRecoilValue(routerUrl);
  const clientId = `${WS_CLIID}`;
  const { client } = MqttWSReactService(clientId);
  return (
    <Layout title="장비 기본 설정">
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
      <div className="flex flex-col space-y-2 overflow-hidden">
        <ModelSerial ABS_URL={ABS_URL} />

        <TimeDateInfo ABS_URL={ABS_URL} />

        <NetworkSetting ABS_URL={ABS_URL} client={client} />
      </div>
    </Layout>
  );
};

export default DeviceSetting;
