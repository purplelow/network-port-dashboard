import axios from "axios";
import useSWR from "swr";

interface getNoteProps {
  deviceNote: string;
}

const fetcher = async (url: string) =>
  await axios.get<getNoteProps>(url).then((res) => res.data);

export default function useGetNote() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/dashBoard/getNote`,
    fetcher
  );
  return {
    getNoteData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
