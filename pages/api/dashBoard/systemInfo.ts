import axios from "axios";
import useSWR from "swr";

const SYSTEMINFO_API_URL = process.env.NEXT_PUBLIC_SYSTEM_INFO;

interface SystemInfoProps {
  system_info: {
    model: string;
    serial: string;
    version: string;
    system_date: string;
    uptime: number;
  };
}

const fetcher = async (url: string) =>
  await axios
    .get<SystemInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("System data error ", err));

export default function useSystemInfo(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${SYSTEMINFO_API_URL}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });

  return {
    systemInfoData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
