import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const LOGVIEW_API_URL = process.env.NEXT_PUBLIC_GET_LOGVIEW;

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
  const ABS_URL = useRecoilValue(routerUrl);
  const [loading, setLoading] = useState(true);
  const { data, error, isValidating } = useSWR(
    `${ABS_URL}${LOGVIEW_API_URL}${fileName}`,
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
