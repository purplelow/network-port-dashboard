import axios from "axios";
import useSWR from "swr";

const STORAGE_API_URL = process.env.NEXT_PUBLIC_STORAGE_USAGE;

interface StorageUtilizationProps {
  details: [
    {
      percent: number;
      used: number;
      avail: number;
      total: number;
      device: string;
      path: string;
    }
  ];
  summary: {
    life: number;
    percent: number;
    used: number;
    avail: number;
    total: number;
    device: string;
    path: number;
  };
}

const fetcher = async (url: string) =>
  await axios
    .get<StorageUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Storage data error ", err));

export default function useStorageUtilization(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${STORAGE_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    storageUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
