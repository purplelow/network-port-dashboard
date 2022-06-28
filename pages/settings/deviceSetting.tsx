import urlBranch from "@libs/absoluteUrl";
import type { NextPage } from "next";
import DeviceSettingContainer from "../../containers/settings/devicesetting";

const DeviceSetting: NextPage = () => {
  urlBranch();
  return <DeviceSettingContainer />;
};

export default DeviceSetting;
