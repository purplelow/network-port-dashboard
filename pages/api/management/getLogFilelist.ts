import axios from "axios";
import useSWR from "swr";

interface LogFilelistProps {
  filename: string;
  filenames: [];
  logview: string | null;
}

const fetcher = (url: string) =>
  axios
    .get<LogFilelistProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("로그파일 리스트 에러", err));
export default function useGetLogFilelist() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/history/getLogFilelist`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    logFilelist: data,
    isLoading: !error && !data,
    isError: error,
  };
}
