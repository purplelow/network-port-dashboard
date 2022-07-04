import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
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
  axios.get<DownPortListProps>(url).then((res) => res.data);

export default function useLowPortList() {
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${DOWNPORTLIST_API_URL}`, fetcher);
  return {
    downPortList: data,
    isLoading: !error && !data,
    isError: error,
  };
}
