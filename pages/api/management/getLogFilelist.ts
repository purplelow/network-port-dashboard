import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const LOGFILELIST_API_URL = process.env.NEXT_PUBLIC_GET_LOGFILE_LIST;

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
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${LOGFILELIST_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    logFilelist: data,
    isLoading: !error && !data,
    isError: error,
  };
}
