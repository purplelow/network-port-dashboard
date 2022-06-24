import axios from "axios";
import useSWR from "swr";

interface TimeInfoProps {
  timeInfo: string;
}

const fetcher = (url: string) =>
  axios
    .get<TimeInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("시간 정보 에러 : ", err));

export default function useTimeInfo() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/deviceSetting/getTimeInfo`,
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
