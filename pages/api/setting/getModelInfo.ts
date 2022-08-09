import axios from "axios";
import useSWR from "swr";

interface ModelInfoProps {
  modelName: string;
  modelSerial: string;
}

const GET_MODEL_INFO_API_URL = process.env.NEXT_PUBLIC_GET_MODEL_INFO;

const fetcher = (url: string) =>
  axios
    .get<ModelInfoProps>(url)
    .then((res) => res.data)
    .catch((err) => console.error("모델 정보 에러 : ", err));

export default function useModelInfo({ ABS_URL }: any) {
  const { data, error } = useSWR(
    `${ABS_URL}${GET_MODEL_INFO_API_URL}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );
  return {
    modelInfoData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
