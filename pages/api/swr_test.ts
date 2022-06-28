import useSWR from "swr";

export default function useSWRApi({ baseIpUrl, apiUrl, fetch }: any) {
  const { data, error } = useSWR(`${baseIpUrl}${apiUrl}`, fetch, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
  };
}
