import type { NextPage } from "next";
import DashboardContainer from "../containers/dashboard";

import { useEffect } from "react";
import urlBranch from "@libs/absoluteUrl";

// const crrUrl = dynamic(() =>
//   import("next-absolute-url").then((res) => res.origin)
// );

// useEffect(() => {
//   let req;
//   console.log("index 에서 router ? :: ", origin);
// }, []);

const Dashboard: NextPage = () => {
  urlBranch();
  useEffect(() => {
    return () => {};
  }, []);

  return <DashboardContainer />;
};

export default Dashboard;
