import urlBranch from "@libs/absoluteUrl";
import type { NextPage } from "next";
import Head from "next/head";
import PortSettingContainer from "../../containers/settings/portsetting";

const PortSetting: NextPage = () => {
  urlBranch();
  return (
    <>
      <Head>
        <title>DIVA 888 - 포트설정</title>
      </Head>
      <PortSettingContainer />
    </>
  );
};

export default PortSetting;
