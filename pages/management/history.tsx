import type { NextPage } from "next";
import HistoryContainer from "../../containers/management/history";
import urlBranch from "@libs/absoluteUrl";
import Head from "next/head";

const History: NextPage = ({ data }: any) => {
  urlBranch();
  return (
    <>
      <Head>
        <title>DIVA 888 - 히스토리</title>
      </Head>
      <HistoryContainer />
    </>
  );
};

export default History;

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(`${ABS_URL}${LOGFILELIST_API_URL}`);
//   const data = await res.json();
//   return {
//     props: {
//       data: data,
//     },
//   };
// };
