import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

interface LogFilelistProps {
  filename: string;
  filenames: [];
  logview: string | null;
}

const fetcher = async (url: string) =>
  await axios
    .get<LogFilelistProps>(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error("로그 파일 보기 에러", err);
      return;
    });

export default function useGetLogView(fileName: string | undefined | null) {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/history/getLogView?fileName=${fileName}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    getLogView: data,
    isLoading: !data,
    isError: error,
  };
}
