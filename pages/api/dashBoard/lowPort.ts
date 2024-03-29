import axios from "axios";
import useSWR from "swr";

const DOWNPORT_API_URL = process.env.NEXT_PUBLIC_GET_DOWNPORT_STATUS;

interface LowPortProps {
  sub_device: SubDevice[];
}
interface SubDevice {
  name: string;
  baudrate: string;
  model?: string;
  type?: string;
  status: string;
  protocol: string;
  interface: string;
  id: string;
}

const fetcher = async (url: string) =>
  await axios
    .get<LowPortProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Down port data error ", err));

export default function useLowPortData(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${DOWNPORT_API_URL}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });
  return {
    lowPortInfoData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
