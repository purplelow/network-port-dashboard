import urlBranch from "@libs/absoluteUrl";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import HistoryContainer from "../../containers/management/history";

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
