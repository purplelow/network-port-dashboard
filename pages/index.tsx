import type { NextPage } from "next";
// import DashboardContainer from "../containers/dashboard";
import urlBranch from "@libs/absoluteUrl";
import Head from "next/head";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const DashboardContainer = dynamic(() => import("../containers/dashboard"), {
  ssr: false,
});

const Dashboard: NextPage = () => {
  urlBranch();

  return (
    <>
      <Head>
        <title>DIVA888 - 대시보드</title>
      </Head>
      <DashboardContainer />
    </>
  );
};

export default Dashboard;
