import axios from "axios";
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

export default function useLowPortList(ABS_URL: string) {
  const fetcher = (url: string) =>
    axios
      .get<DownPortListProps>(url)
      .then((res) => res.data)
      .catch((err) => console.error("DownPortList Error", err.config));
  const { data, error } = useSWR(`${ABS_URL}${DOWNPORTLIST_API_URL}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    // onSuccess: () => {
    //   axios(`${ABS_URL}${DOWNPORTLIST_API_URL}`, {
    //     method: "GET",
    //   });
    //   console.log("@@@@@@@@@@");
    // },
  });

  return {
    downPortListData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
