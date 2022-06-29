import axios from "axios";
import useSWR from "swr";

interface TimeInfoProps {
  timeInfo: string;
}

const GET_TIME_INFO_API_URL = process.env.NEXT_PUBLIC_GET_TIME_INFO;

const fetcher = (url: string) =>
  axios
    .get<TimeInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("시간 정보 에러 : ", err));

export default function useTimeInfo({ ABS_URL }: any) {
  const { data, error } = useSWR(
    `${ABS_URL}${GET_TIME_INFO_API_URL}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    sysTimeInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
