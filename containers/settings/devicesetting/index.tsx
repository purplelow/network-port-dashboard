import Layout from "@components/layout";
import ModelSerial from "./fragment/ModelSerial";
import TimeDateInfo from "./fragment/TimeDate";
import NetworkSetting from "./fragment/NetworkSetting";

const DeviceSetting = () => {
  return (
    <Layout title="장비 기본설정">
      <div className="grid h-full grid-rows-6 gap-y-2">
        <ModelSerial />

        <TimeDateInfo />

        <NetworkSetting />
      </div>
    </Layout>
  );
};

export default DeviceSetting;
