import type { NextPage } from "next";
// import SystemManageContainer from "../../containers/management/systemmanage";
import urlBranch from "@libs/absoluteUrl";
import Head from "next/head";
import dynamic from "next/dynamic";

const SystemManageContainer = dynamic(
  () => import("../../containers/management/systemmanage")
);

const SystemManage: NextPage = () => {
  urlBranch();
  return (
    <>
      <Head>
        <title>DIVA888 - 시스템 관리</title>
      </Head>
      <SystemManageContainer />
    </>
  );
};

export default SystemManage;
