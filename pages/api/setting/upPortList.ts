import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const UPPORTLIST_API_URL = process.env.NEXT_PUBLIC_GET_UPPORT_LIST;

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
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${UPPORTLIST_API_URL}`, fetcher);
  return {
    upPortList: data,
    isLoading: !error && !data,
    isError: error,
  };
}
