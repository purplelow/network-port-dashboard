import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const BACKUP_API_URL = process.env.NEXT_PUBLIC_BACKUP;

const fetcher = (url: string) =>
  axios({ url: url, responseType: "json" }).then((res) => res.headers);
export default function getBackUpFile() {
  const ABS_URL = useRecoilValue(routerUrl);
  const { data, error } = useSWR(`${ABS_URL}${BACKUP_API_URL}`, fetcher);
  return {
    backUpFileName: data,
  };
}
