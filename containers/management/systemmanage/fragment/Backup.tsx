import getBackUpFile from "@api/management/getBackUpFile";
import axios from "axios";
import { useCallback } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { backUpState } from "recoil/atom";

export default function BackUp() {
  // const { backUpFileName } = getBackUpFile();
  const [backUpProp, setBackUpProp] = useRecoilState(backUpState);
  const handleDownload = () => {
    axios({
      method: "GET",
      url: `http://192.168.123.190:8080/api/system/backup`,
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
        setBackUpProp(true);

        // useCallback(() => {
        // }, [setBackUpState]);

        console.log(res.data);
      })
      .catch((err) => {
        console.error("err: ", err);
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
