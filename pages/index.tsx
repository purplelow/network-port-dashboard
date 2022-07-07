import type { NextPage } from "next";
import DashboardContainer from "../containers/dashboard";
import urlBranch from "@libs/absoluteUrl";

const Dashboard: NextPage = () => {
  urlBranch();

  return <DashboardContainer />;
};

export default Dashboard;
