import axios from "axios";
import useSWR from "swr";

const GET_NOTE_APU_URL = process.env.NEXT_PUBLIC_GET_NOTE;

interface getNoteProps {
  deviceNote: string;
}

const fetcher = async (url: string) =>
  await axios
    .get<getNoteProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("Note data error ", err));

export default function useGetNote(ABS_URL: string) {
  const { data, error } = useSWR(`${ABS_URL}${GET_NOTE_APU_URL}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    getNoteData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
