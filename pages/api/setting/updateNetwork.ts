import axios from "axios";
import { toast } from "react-toastify";

const UPDATE_NETWORK_API_URL = process.env.NEXT_PUBLIC_UPDATE_NETWORK;

export default function updateNetwork({ ABS_URL }: any, neworkInfoJson: any) {
  axios
    .put(`${ABS_URL}${UPDATE_NETWORK_API_URL}`, neworkInfoJson)
    .then((res) => {
      toast.success("네트워크 설정이 적용 되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    })
    .catch((err) => {
      toast.error("설정 오류 !!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.error("네트워크 설정 오류 : ", err);
    });
}
