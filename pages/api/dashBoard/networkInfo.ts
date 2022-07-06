import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const NETWORKINFO_API_URL = process.env.NEXT_PUBLIC_NETWORK_INFO;

interface NetworkInfoProps {
  interfaces: Interfaces[];
}

interface Interfaces {
  addresses: Address[];
  admin_status: number;
  device: string;
  device_descr: string;
  mac_address: string;
  name: string;
  oper_status: number;
  speed: number;
  statistics: Statistics;
  type: string;
}

interface Address {
  address: string;
  family: string;
  gateway: string;
  mask: string;
  proto: string;
}

interface Statistics {
  rx_bytes: number;
  rx_discards: number;
  rx_errors: number;
  rx_packets: number;
  tx_bytes: number;
  tx_discards: number;
  tx_errors: number;
  tx_packets: number;
}

const fetcher = async (url: string) =>
  await axios
    .get<NetworkInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Network data error ", err));

export default function useNetworkInfo() {
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${NETWORKINFO_API_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    networkInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
