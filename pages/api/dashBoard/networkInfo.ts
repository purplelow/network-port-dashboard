import axios from "axios";
import useSWR from "swr";

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

const fetcher = (url: string) =>
  axios.get<NetworkInfoProps>(url).then((res) => res.data);

export default function useNetworkInfo() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/networkInfo`,
    fetcher
  );
  return {
    networkInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
