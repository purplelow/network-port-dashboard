import urlBranch from "@libs/absoluteUrl";
import type { NextPage } from "next";
import SystemManageContainer from "../../containers/management/systemmanage";

const SystemManage: NextPage = () => {
  urlBranch();
  return <SystemManageContainer />;
};

export default SystemManage;
