import axios from "axios";
import useSWR from "swr";

const CPU_API_URL = process.env.NEXT_PUBLIC_CPU_USAGE;

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

const fetcher = async (url: string) =>
  await axios
    .get<CpuUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Cpu data error ", err.config));

export default function useCpuUtilization(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${CPU_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    // refreshInterval: 3000,
  });
  return {
    cpuUtilization: data,
    isLoading: !data,
    isError: error,
  };
}
