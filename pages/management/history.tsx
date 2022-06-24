import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import HistoryContainer from "../../containers/management/history";

const History: NextPage = ({ data }: any) => {
  return <HistoryContainer data={data} />;
};

export default History;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `http://192.168.123.190:8080/api/history/getLogFilelist`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
