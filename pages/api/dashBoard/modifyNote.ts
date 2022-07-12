import axios from "axios";
import { toast } from "react-toastify";

const MODIFY_NOTE_API_URL = process.env.NEXT_PUBLIC_MODIFY_NOTE;

export default function modifyNote(ABS_URL: string, userNoteJson: any) {
  axios
    .put(`${ABS_URL}${MODIFY_NOTE_API_URL}`, userNoteJson)
    .then((res) => {
      toast.success("수정되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    })
    .catch((err) => {
      toast.error("수정 오류 !!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
}
