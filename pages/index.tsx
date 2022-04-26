import type { NextPage } from "next";
import Layout from "../components/layout/layout";

const Home: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="h-full bg-white py-10">네트워크 정보</div>
        <div className="h-full bg-white py-10">시스템</div>
        <div className="h-full bg-white py-10">상위 통신</div>
        <div className="h-full bg-white py-10">하위 통신</div>
        <div className="row-span-2 h-full bg-white py-10">시스템 정보</div>
      </div>
    </Layout>
  );
};

export default Home;
//
