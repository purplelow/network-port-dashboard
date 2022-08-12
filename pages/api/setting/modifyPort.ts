import axios from "axios";
import { toast } from "react-toastify";

const MODIFYPORT_API_URL = process.env.NEXT_PUBLIC_MODIFY_PORT;
const DOWNPORTLIST_API_URL = process.env.NEXT_PUBLIC_GET_DOWNPORT_LIST;

export default async function updatePortSetting(
  ABS_URL: string,
  portJson: any
) {
  await axios
    .put(`${ABS_URL}${MODIFYPORT_API_URL}`, portJson)
    // .put(`11`, portJson)
    .then((res) => {
      // window.location.replace("/settings/portSetting");\
      // axios(`${ABS_URL}${DOWNPORTLIST_API_URL}`, {
      //   method: "GET",
      // });
      toast.success("설정이 적용 되었습니다", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch((err) => {
      toast.error("설정 적용 오류", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  // axios(`${ABS_URL}${DOWNPORTLIST_API_URL}`, {
  //   method: "GET",
  // });
}
