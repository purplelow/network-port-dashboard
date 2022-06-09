import axios from "axios";
import useSWR from "swr";

interface LogFilelistProps {
  filename: string;
  filenames: [];
  logview: string | null;
}

const fetcher = async (url: string) =>
  await axios.get<LogFilelistProps>(url).then((res) => res.data);

export default function useGetLogView(fileName: string | undefined | null) {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/history/getLogView?fileName=${fileName}`,
    fetcher
  );
  return {
    getLogView: data,
    isLoading: !error && !data,
    isError: error,
  };
}
