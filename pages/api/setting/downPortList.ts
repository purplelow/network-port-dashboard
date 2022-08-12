import axios from "axios";
import useSWR from "swr";

const DOWNPORTLIST_API_URL = process.env.NEXT_PUBLIC_GET_DOWNPORT_LIST;

interface DownPortListProps {
  baudrate: string;
  databits: string;
  deviceName: string;
  deviceId: string;
  id: string;
  model: string;
  name: string;
  parity: string;
  status: string;
  stopbits: string;
  t1: string;
  t2: string;
  t3: string;
  t4: string;
  type: string;
}

const fetcher = (url: string) =>
  axios
    .get<DownPortListProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("DownPortList Error", err.config));

export default function useLowPortList(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${DOWNPORTLIST_API_URL}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });
  return {
    downPortListData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
