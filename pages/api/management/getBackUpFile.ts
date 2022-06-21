import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios({ url: url, responseType: "json" }).then((res) => res.headers);
export default function getBackUpFile() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/system/backup`,
    fetcher
  );
  return {
    backUpFileName: data,
  };
}
