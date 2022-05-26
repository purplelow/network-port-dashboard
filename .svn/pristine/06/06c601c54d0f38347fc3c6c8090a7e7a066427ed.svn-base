import axios from "axios";
import useSWR from "swr";

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
  await axios.get<StorageUtilizationProps>(url).then((res) => res.data);

export default function useStorageUtilization() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/dashBoard/storageUsage`,
    fetcher
  );
  return {
    storageUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
