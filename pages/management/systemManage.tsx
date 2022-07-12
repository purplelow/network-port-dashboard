import type { NextPage } from "next";
import SystemManageContainer from "../../containers/management/systemmanage";
import urlBranch from "@libs/absoluteUrl";

const SystemManage: NextPage = () => {
  urlBranch();
  return <SystemManageContainer />;
};

export default SystemManage;
