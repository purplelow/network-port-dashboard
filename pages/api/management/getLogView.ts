import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

interface LogFilelistProps {
  filename: string;
  filenames: [];
  logview: string;
}

const fetcher = async (url: string) =>
  await axios
    .get<LogFilelistProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("로그 파일 뷰 에러", err));

export default function useGetLogView(fileName: string) {
  const [loading, setLoading] = useState(true);
  const { data, error, isValidating } = useSWR(
    `http://192.168.123.190:8080/api/history/getLogView?fileName=${fileName}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      loadingTimeout: 800,
      onLoadingSlow: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
      },
    }
  );
  return {
    getLogView: data,
    isLoading: loading,
    isError: error,
    isValidating: isValidating,
  };
}
