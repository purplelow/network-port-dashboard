import axios from "axios";
import useSWR from "swr";

interface ModelInfoProps {
  modelName: string;
  modelSerial: string;
}

const fetcher = (url: string) =>
  axios.get<ModelInfoProps>(url).then((res) => res.data);

export default function useModelInfo() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/deviceSetting/getModelInfo`,
    fetcher
  );
  return {
    modelInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}
