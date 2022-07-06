import axios from "axios";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";

const MODIFYPORT_API_URL = process.env.NEXT_PUBLIC_MODIFY_PORT;

export default function updatePortSetting(portJson: any) {
  const ABS_URL = useRecoilValue(routerUrl);
  axios.put(`${ABS_URL}${MODIFYPORT_API_URL}`, portJson).then((res) => {
    console.log("포트정보 : " + res);
  });
}
