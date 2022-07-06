import getBackUpFile from "@api/management/getBackUpFile";
import axios from "axios";
import { useCallback } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { backUpFailState, backUpState, routerUrl } from "recoil/atom";

const BACKUP_API_URL = process.env.NEXT_PUBLIC_BACKUP;

export default function BackUp() {
  const ABS_URL = useRecoilValue(routerUrl);
  // const { backUpFileName } = getBackUpFile();
  const [backUpSuccess, setBackUpSuccess] = useRecoilState(backUpState);
  const [backUpFail, setBackUpFail] = useRecoilState(backUpFailState);
  const handleDownload = () => {
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
        const filename =
          res.headers["content-disposition"].split("filename=")[1];
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
  };
  return (
    <button
      onClick={handleDownload}
      type="submit"
      className="flex min-w-[280px] items-center justify-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
    >
      <AiOutlineDownload className="text-2xl" />
      <span>백업 파일 다운로드</span>
    </button>
  );
}
