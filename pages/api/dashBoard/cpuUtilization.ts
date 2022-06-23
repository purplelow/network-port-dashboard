import axios from "axios";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";

interface CpuUtilizationProps {
  detail: [
    {
      load: number;
      device_descr: string;
      id: number;
    }
  ];
  summary: {
    load: number;
  };
}
const CPU_API_URL = process.env.NEXT_PUBLIC_CPU_USAGE;

const fetcher = async (url: string) =>
  await axios
    .get<CpuUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Cpu data error ", err.config));

export default function useCpuUtilization() {
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${CPU_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    cpuUtilization: data,
    isLoading: !data,
    isError: error,
  };
}
