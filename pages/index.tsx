import type { NextPage } from "next";
import DashboardContainer from "../containers/dashboard";
import urlBranch from "@libs/absoluteUrl";
import Head from "next/head";

const Dashboard: NextPage = () => {
  urlBranch();

  return (
    <>
      <Head>
        <title>DIVA 888 - 대시보드</title>
      </Head>
      <DashboardContainer />
    </>
  );
};

export default Dashboard;
