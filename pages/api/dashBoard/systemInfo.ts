import axios from "axios";
import useSWR from "swr";

interface SystemInfoProps {
  system_info: {
    model: string;
    serial: string;
    version: string;
    system_date: string;
    uptime: number;
  };
}

const fetcher = (url: string) =>
  axios
    .get<SystemInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("System data error ", err));

export default function useSystemInfo() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/systemInfo`,
    fetcher
  );
  return {
    systemInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
