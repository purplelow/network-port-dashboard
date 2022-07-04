import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import useSWR from "swr";

const RESTART_API_URL = process.env.NEXT_PUBLIC_RESTART;

export default function useRestart() {
  const ABS_URL = useRecoilValue(routerUrl);
  axios({
    method: "GET",
    url: `${ABS_URL}${RESTART_API_URL}`,
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("Restart error ", err));
}
