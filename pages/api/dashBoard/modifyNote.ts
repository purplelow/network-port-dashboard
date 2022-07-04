import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";

const MODIFY_NOTE_API_URL = process.env.NEXT_PUBLIC_MODIFY_NOTE;

export default function modifyNote(userNoteJson: any) {
  const ABS_URL = useRecoilValue(routerUrl);
  axios
    .put(`${ABS_URL}${MODIFY_NOTE_API_URL}`, userNoteJson)
    .then((res) => {
      toast.success("수정되었습니다.", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch((err) => {
      toast.error("수정 오류 !!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
}
