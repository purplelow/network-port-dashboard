import urlBranch from "@libs/absoluteUrl";
import type { NextPage } from "next";
import PortSettingContainer from "../../containers/settings/portsetting";

const PortSetting: NextPage = () => {
  urlBranch();
  return <PortSettingContainer />;
};

export default PortSetting;
