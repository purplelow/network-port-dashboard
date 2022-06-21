import axios from "axios";
import useSWR from "swr";

export default function useRestart() {
  console.log("리스타트 api");
  axios({
    method: "GET",
    url: `http://192.168.123.190:8080/api/system/restart`,
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("Restart error ", err));
}
