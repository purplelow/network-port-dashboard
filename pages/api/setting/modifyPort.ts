import axios from "axios";
import { toast } from "react-toastify";

const MODIFYPORT_API_URL = process.env.NEXT_PUBLIC_MODIFY_PORT;

export default function updatePortSetting(ABS_URL: string, portJson: any) {
  axios
    .put(`${ABS_URL}${MODIFYPORT_API_URL}`, portJson)
    .then((res) => {
      toast.success("설정이 적용 되었습니다", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch((err) => {
      toast.error("설정 적용 오류", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
}
