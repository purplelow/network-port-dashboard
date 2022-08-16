import axios from "axios";
import useSWR from "swr";

const UPPORT_API_URL = process.env.NEXT_PUBLIC_GET_UPPORT_STATUS;

interface UpPortProps {
  app_service: AppService[];
}
interface AppService {
  name: string;
  port: string;
  status: string;
  protocol: string;
  interface: string;
  id: string;
}

const fetcher = async (url: string) =>
  await axios
    .get<UpPortProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Up port data error ", err));

export default function useUpPortData(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${UPPORT_API_URL}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });
  return {
    upPortInfoData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
