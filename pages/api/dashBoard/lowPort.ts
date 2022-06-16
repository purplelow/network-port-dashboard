import axios from "axios";
import useSWR from "swr";

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

const fetcher = (url: string) =>
  axios
    .get<LowPortProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Down port data error ", err));

export default function useLowPortData() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/getDownPortStatus`,
    fetcher
  );
  return {
    lowPortInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
