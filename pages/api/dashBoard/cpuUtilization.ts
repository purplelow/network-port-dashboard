import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";
// import dotenv from "dotenv";
// dotenv.config();
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

const fetcher = (url: string) =>
  axios
    .get<CpuUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.log("Cpu data error ", err));

export default function useCpuUtilization() {
  const ABS_URL = useRecoilValue(routerUrl);
  console.log("대시보드 cpu api url", ABS_URL);
  const { data, error } = useSWR(`${ABS_URL}${CPU_API_URL}`, fetcher);
  return {
    cpuUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
