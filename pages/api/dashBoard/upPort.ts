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

const fetcher = (url: string) =>
  axios.get<UpPortProps>(url).then((res) => res.data);

export default function useUpPortData() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/getUpPortStatus`,
    fetcher
  );
  return {
    upPortInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
