import axios from "axios";
import useSWR from "swr";

interface getNoteProps {
  deviceNote: string;
}

const fetcher = async (url: string) =>
  await axios
    .get<getNoteProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Note data error ", err));

export default function useGetNote() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/getNote`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    getNoteData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
