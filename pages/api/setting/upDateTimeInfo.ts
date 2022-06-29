import axios from "axios";
import { toast } from "react-toastify";

const UPDATETIME_API_URL = process.env.NEXT_PUBLIC_UPDATE_TIME;

export default function upDateTimeInfo({ ABS_URL }: any, updateTimeJson: any) {
  axios
    .put(`${ABS_URL}${UPDATETIME_API_URL}`, updateTimeJson)
    .then((res) => {
      toast.success("설정 완료.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("success", res.data);
    })
    .catch((err) => {
      toast.error("설정 오류 !!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("장비 날짜 수정 오류", err);
    });
}
