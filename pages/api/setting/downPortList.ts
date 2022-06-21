import axios from "axios";
import useSWR from "swr";

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
  axios.get<DownPortListProps>(url).then((res) => res.data);

export default function useLowPortList() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/portSetting/getDownPortList`,
    fetcher
  );
  return {
    downPortList: data,
    isLoading: !error && !data,
    isError: error,
  };
}
