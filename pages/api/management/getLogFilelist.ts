import axios from "axios";
import useSWR from "swr";

interface LogFilelistProps {
  filename: string;
  filenames: [];
  logview: string | null;
}

const fetcher = (url: string) =>
  axios.get<LogFilelistProps>(url).then((res) => res.data);
export default function useGetLogFilelist() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/history/getLogFilelist`,
    fetcher
  );
  return {
    logFilelist: data,
    defaultFileName: data?.filenames,
    isLoading: !error && !data,
    isError: error,
  };
}
