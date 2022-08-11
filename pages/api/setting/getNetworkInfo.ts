import axios from "axios";
import useSWR from "swr";

const GETNETWORKINFO_API_URL = process.env.NEXT_PUBLIC_GET_NETWORKINFO;

const fetcher = async (url: string) =>
  await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.error("GetNetworkInfo data e rror ", err));

export default function getNetworkInfo(ABS_URL: string) {
  const { data, error } = useSWR(
    `${ABS_URL}${GETNETWORKINFO_API_URL}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    networkInfoData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
