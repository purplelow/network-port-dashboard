import type { NextPage } from "next";
import HistoryContainer from "../../containers/management/history";
import urlBranch from "@libs/absoluteUrl";

const History: NextPage = ({ data }: any) => {
  urlBranch();
  return <HistoryContainer />;
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
