import axios from "axios";
import useSWR from "swr";

interface MemoryUtilizationProps {
  details: {
    swap_free: number;
    swap_total: number;
    cached: number;
    buffer: number;
    shared: number;
    free: number;
    total: number;
  };
  summary: {
    percent: number;
    avail: number;
    total: number;
  };
}

const fetcher = (url: string) =>
  axios.get<MemoryUtilizationProps>(url).then((res) => res.data);

export default function useMemoryUtilization() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/dashBoard/memoryUsage`,
    fetcher
  );
  return {
    memoryUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
