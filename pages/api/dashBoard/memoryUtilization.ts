import axios from "axios";
import useSWR from "swr";

const MEMORY_API_URL = process.env.NEXT_PUBLIC_MEMORY_USAGE;

interface MemoryUtilizationProps {
  details: {
    swap_free: number;
    swap_total: number;
    cached: number;
    buffer: number;
    shared: number;
    free: number;
    total: number;
    used: number;
  };
  summary: {
    percent: number;
    avail: number;
    total: number;
  };
}

const fetcher = async (url: string) =>
  await axios
    .get<MemoryUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Memory data error ", err));

export default function useMemoryUtilization(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${MEMORY_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    // refreshInterval: 3000,
  });
  return {
    memoryUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
