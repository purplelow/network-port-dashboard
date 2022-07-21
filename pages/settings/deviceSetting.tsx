import urlBranch from "@libs/absoluteUrl";
import type { NextPage } from "next";
import Head from "next/head";
import DeviceSettingContainer from "../../containers/settings/devicesetting";

const DeviceSetting: NextPage = () => {
  urlBranch();
  return (
    <>
      <Head>
        <title>DIVA 888 - 장비설정</title>
      </Head>
      <DeviceSettingContainer />;
    </>
  );
};

export default DeviceSetting;
