import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
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

export default function useSystemInfo() {
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${SYSTEMINFO_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    systemInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
