import axios from "axios";
import { toast } from "react-toastify";

const BACKUP_API_URL = process.env.NEXT_PUBLIC_BACKUP;

export default function getBackUpFile(ABS_URL: string) {
  axios({
    method: "GET",
    url: `${ABS_URL}${BACKUP_API_URL}`,
    responseType: "blob",
  })
    .then((res) => {
      const blob = new Blob([res.data]);
      const fileObjectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileObjectUrl;
      const filename = res.headers["content-disposition"].split("filename=")[1];
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout((_) => {
        window.URL.revokeObjectURL(fileObjectUrl);
      }, 50000);
      link.remove();

      // setBackUpSuccess(true);
      toast.success("백업 파일 다운로드 완료.", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch((err) => {
      // setBackUpFail(true);
      toast.error("다운로드 오류 !!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
}
