import axios from "axios";
import useSWR from "swr";

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

const fetcher = (url: string) =>
  axios.get<CpuUtilizationProps>(url).then((res) => res.data);

export default function useCpuUtilization() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/cpuUsage`,
    fetcher
  );
  return {
    cpuUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
