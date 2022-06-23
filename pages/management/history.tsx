import type { GetServerSideProps, NextPage } from "next";
import HistoryContainer from "../../containers/management/history";

const History: NextPage = ({ data }: any) => {
  return <HistoryContainer data={data} />;
};

export default History;

export const getServerSideProps: GetServerSideProps = async () => {
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
