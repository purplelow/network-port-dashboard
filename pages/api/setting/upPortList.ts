import axios from "axios";
import useSWR from "swr";

interface UpPortListProps {
  deviceName: string;
  id: string;
  port: string;
  status: string;
  t3: string;
  t5: string;
  t6: string;
  t7: string;
  t8: string;
}

const fetcher = (url: string) =>
  axios.get<UpPortListProps>(url).then((res) => res.data);

export default function useUpPortList() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/portSetting/getUpPortList`,
    fetcher
  );
  return {
    upPortList: data,
    isLoading: !error && !data,
    isError: error,
  };
}
