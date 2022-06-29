import Layout from "@components/layout";
import ModelSerial from "./fragment/ModelSerial";
import TimeDateInfo from "./fragment/TimeDate";
import NetworkSetting from "./fragment/NetworkSetting";
import { routerUrl } from "recoil/atom";
import { useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";

const DeviceSetting = () => {
  const ABS_URL = useRecoilValue(routerUrl);
  return (
    <Layout title="장비 기본설정">
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
      <div className="grid h-full grid-rows-6 gap-y-2">
        <ModelSerial ABS_URL={ABS_URL} />

        <TimeDateInfo ABS_URL={ABS_URL} />

        <NetworkSetting ABS_URL={ABS_URL} />
      </div>
    </Layout>
  );
};

export default DeviceSetting;
