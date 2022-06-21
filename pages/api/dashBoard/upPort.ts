import axios from "axios";
import useSWR from "swr";

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

export default function useUpPortData() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/getUpPortStatus`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    upPortInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
