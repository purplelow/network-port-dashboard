import type { NextPage } from "next";
import SystemManageContainer from "../../containers/management/systemmanage";
import urlBranch from "@libs/absoluteUrl";
import Head from "next/head";

const SystemManage: NextPage = () => {
  urlBranch();
  return (
    <>
      <Head>
        <title>DIVA 888 - 시스템 관리</title>
      </Head>
      <SystemManageContainer />
    </>
  );
};

export default SystemManage;
