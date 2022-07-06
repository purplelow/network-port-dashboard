import axios from "axios";
import { toast } from "react-toastify";

const MODIFY_SERIALNUMBER_API_URL = process.env.NEXT_PUBLIC_MODIFY_SERIALNUMBER;

export default function modifySerialNumber(
  { ABS_URL }: any,
  modelInfoJson: any
) {
  axios
    .put(`${ABS_URL}${MODIFY_SERIALNUMBER_API_URL}`, modelInfoJson)
    .then((res) => {
      toast.success("시리얼 넘버가 수정되었습니다.", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch((err) => {
      toast.error("시리얼 넘버 설정 오류 !!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
}
